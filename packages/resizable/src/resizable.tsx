"use client";

import { useState, useRef, useCallback, Children, ReactNode, ReactElement, Fragment, forwardRef, DetailedHTMLProps, HTMLAttributes } from "react";
import { type GripVariant } from "./grip";
import { extractConfig, PaneConfig } from "./utils";
import { Resizer, type ResizerSettings } from "./resizer";
import { panelsContainerStyles } from "./styles";

export interface ResizableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  defaultSizes?: number[];
  minWidth?: number;
  maxWidth?: number;
  horizontal?: boolean;
  grip?: GripVariant;
  settings?: ResizerSettings;
  cursor?: string;
  onResize?: (sizes: number[], index: number) => void;
}

export const Resizable = forwardRef<HTMLDivElement, ResizableProps>(({
  children,
  className,
  defaultSizes = [],
  minWidth = 200,
  maxWidth = 800,
  horizontal = false,
  grip = 'lines',
  settings,
  cursor,
  onResize,
  ...htmlProps
}, ref) => {
  const childrenArray = Children.toArray(children);
  const childrenCount = childrenArray.length;

  // Refs to store DOM elements of panes
  const paneRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Extract pane configs from data attributes
  const paneConfigs = childrenArray.map((child, index) => {
    const defaultConfig: PaneConfig = {
      size: defaultSizes[index] || 300,
      minSize: minWidth,
      maxSize: maxWidth,
      hasMaxSize: false,
      hasSize: defaultSizes[index] !== undefined,
    };

    // Only extract config if child is ReactElement
    if (typeof child === 'object' && child !== null && 'props' in child) {
      return extractConfig(child as ReactElement, defaultConfig);
    }

    return defaultConfig;
  });

  const [widths, setWidths] = useState<(number | string)[]>(
    paneConfigs.map(config => config.size)
  );
  
  const [hasBeenResized, setHasBeenResized] = useState<boolean[]>(
    paneConfigs.map(config => config.hasSize)
  );

  const [isResizing, setIsResizing] = useState(false);

  const handleResize = useCallback((index: number, delta: number) => {
    // If not resizing yet, snapshot all widths from DOM
    if (!isResizing) {
      setWidths(prevWidths => {
        const newWidths = [...prevWidths];
        
        // Snapshot width of all panes from DOM
        childrenArray.forEach((_, i) => {
          const paneElement = paneRefs.current[i];
          if (paneElement) {
            if (i === childrenCount - 1) {
              // Last pane: clear width to return to flex
              newWidths[i] = "";
            } else {
              // Other panes: snapshot current size
              newWidths[i] = horizontal ? paneElement.offsetHeight : paneElement.offsetWidth;
            }
          }
        });
        
        return newWidths;
      });
      
      // Mark all panes as resized (except last pane)
      setHasBeenResized(prev => {
        const newResized = [...prev];
        childrenArray.forEach((_, i) => {
          newResized[i] = i !== childrenCount - 1; // Last pane still flex
        });
        return newResized;
      });
      
      setIsResizing(true);
    }
    
    // Resize current pane with limit calculation
    setWidths(prevWidths => {
      const newWidths = [...prevWidths];
      const currentWidth = typeof newWidths[index] === 'number' ? newWidths[index] as number : 0;
      const { minSize: paneMinSize, maxSize: paneMaxSize, hasMaxSize } = paneConfigs[index];
      
      // Calculate maximum achievable size
      const paneElement = paneRefs.current[index];
      if (paneElement) {
        const containerSize = horizontal 
          ? (paneElement.parentElement?.offsetHeight || 0)
          : (paneElement.parentElement?.offsetWidth || 0);
        
        // Calculate total size of resizers (each resizer has size = settings.size or 4px)
        const resizerSize = settings?.size || 4;
        const totalResizerSize = (childrenCount - 1) * resizerSize;
        
        // Calculate total current size of other panes (excluding current pane and last pane)
        let totalOtherPanesSize = 0;
        for (let i = 0; i < childrenCount - 1; i++) { // Don't count last pane
          if (i !== index) {
            const paneSize = typeof newWidths[i] === 'number' ? newWidths[i] as number : 0;
            totalOtherPanesSize += paneSize;
          }
        }
        
        // Min size of last pane (if exists)
        const lastPaneMinSize = paneConfigs[childrenCount - 1].minSize || 0;
        
        // Max achievable size = container size - resizers - size of other panes - min size of last pane
        const maxPossibleSize = containerSize - totalResizerSize - totalOtherPanesSize - lastPaneMinSize;
        
        // Limit effective max size
        const effectiveMaxSize = hasMaxSize 
          ? Math.min(paneMaxSize, maxPossibleSize)
          : maxPossibleSize;
        
        const newSize = Math.max(
          paneMinSize, 
          Math.min(effectiveMaxSize, currentWidth + delta)
        );
        
        newWidths[index] = newSize;
      } else {
        // Fallback if container not found
        const effectiveMaxSize = hasMaxSize ? paneMaxSize : Infinity;
        const newSize = Math.max(
          paneMinSize, 
          Math.min(effectiveMaxSize, currentWidth + delta)
        );
        newWidths[index] = newSize;
      }
      
      return newWidths;
    });
    
    // Call onResize callback if provided
    if (onResize) {
      // Get current sizes of all panes
      const currentSizes: number[] = [];
      childrenArray.forEach((_, i) => {
        const paneElement = paneRefs.current[i];
        if (paneElement) {
          currentSizes[i] = horizontal ? paneElement.offsetHeight : paneElement.offsetWidth;
        } else {
          currentSizes[i] = typeof widths[i] === 'number' ? widths[i] as number : 0;
        }
      });
      onResize(currentSizes, index);
    }
  }, [paneConfigs, isResizing, childrenCount, childrenArray, horizontal, settings?.size, onResize, widths]);

  // If only 1 element, no resizer needed
  if (childrenCount <= 1) {
    return (
      <div ref={ref} className={className} style={horizontal ? panelsContainerStyles.singlePaneHorizontal : panelsContainerStyles.singlePaneVertical} {...htmlProps}>
        {childrenArray[0]}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={horizontal ? panelsContainerStyles.horizontal : panelsContainerStyles.vertical} {...htmlProps}>
      {childrenArray.map((child, index) => {
        const isLast = index === childrenArray.length - 1;
        const { hasMaxSize, hasSize, minSize: paneMinSize, maxSize: paneMaxSize } = paneConfigs[index];
        
        // Elements without size will flex grow 1, unless already resized
        // Last pane always flex when resizing or when size is empty string
        const shouldFlexGrow = (!hasSize && !hasBeenResized[index]) || 
                               (isLast && !hasMaxSize && (!hasBeenResized[index] || isResizing)) ||
                               (widths[index] === "");
        
        return (
          <Fragment key={index}>
            {/* Panel */}
            <div
              ref={(el) => {
                paneRefs.current[index] = el;
              }}
              style={{ 
                overflow: "hidden",
                ...(shouldFlexGrow 
                  ? {
                      flexGrow: 1,
                      flexShrink: 1,
                      flexBasis: "auto",
                    }
                  : {
                      flexShrink: 0,
                    }
                ),
                ...(horizontal 
                  ? {
                      height: shouldFlexGrow ? undefined : (typeof widths[index] === 'string' ? widths[index] : widths[index]),
                      minHeight: paneMinSize,
                      ...(hasMaxSize && { maxHeight: paneMaxSize })
                    }
                  : {
                      width: shouldFlexGrow ? undefined : (typeof widths[index] === 'string' ? widths[index] : widths[index]),
                      minWidth: paneMinSize,
                      ...(hasMaxSize && { maxWidth: paneMaxSize })
                    })
              }}
            >
              {child}
            </div>
            
            {/* Resizer - not displayed for last panel */}
            {!isLast && (
              <Resizer
                horizontal={horizontal}
                grip={grip}
                settings={settings}
                cursor={cursor}
                onResize={(delta: number) => handleResize(index, delta)}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
});

Resizable.displayName = "Resizable";
