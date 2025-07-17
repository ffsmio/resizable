"use client";

import { useState, useRef, useCallback, Children, ReactElement, Fragment, forwardRef } from "react";
import { extractConfig, PaneConfig } from "./utils";
import { Resizer } from "./resizer";
import { panelsContainerStyles } from "./styles";
import { BaseResizableProps } from "./types";

export const Vertical = forwardRef<HTMLDivElement, BaseResizableProps>(({
  children,
  className,
  defaultSizes = [],
  minWidth = 200,
  maxWidth = 800,
  grip = 'lines',
  settings,
  cursor,
  onResize,
  ...htmlProps
}, ref) => {
  const horizontal = false;
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
              newWidths[i] = paneElement.offsetWidth;
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
      
      // Calculate dynamic minimum size based on container constraints
      const paneElement = paneRefs.current[index];
      if (paneElement) {
        const containerSize = paneElement.parentElement?.offsetWidth || 0;
        
        // Calculate total size of resizers (each resizer has size = settings.size or 4px)
        const resizerSize = settings?.size || 4;
        const totalResizerSize = (childrenCount - 1) * resizerSize;
        
        // Calculate total current size of other panes (excluding current pane and last pane)
        let totalOtherPanesSize = 0;
        for (let i = 0; i < childrenCount - 1; i++) { // Don't count last pane
          if (i !== index) {
            const paneSize = typeof newWidths[i] === 'number' ? newWidths[i] as number : 0;
            // If pane has no size, use its minSize
            totalOtherPanesSize += paneSize || paneConfigs[i].minSize;
          }
        }
        
        // Max size of last pane (if exists and has maxSize)
        const lastPaneIndex = childrenCount - 1;
        const lastPaneMaxSize = paneConfigs[lastPaneIndex].hasMaxSize ? paneConfigs[lastPaneIndex].maxSize : 0;
        
        // Dynamic min size = container size - resizers - size of other panes - max size of last pane
        const dynamicMinSize = containerSize - totalResizerSize - totalOtherPanesSize - lastPaneMaxSize;
        
        // Take max between dynamic min size and config min size
        const effectiveMinSize = Math.max(paneMinSize, dynamicMinSize);
        
        // Max achievable size = container size - resizers - size of other panes - min size of last pane
        const lastPaneMinSize = paneConfigs[lastPaneIndex].minSize || 0;
        const maxPossibleSize = containerSize - totalResizerSize - totalOtherPanesSize - lastPaneMinSize;
        
        // Limit effective max size
        const effectiveMaxSize = hasMaxSize 
          ? Math.min(paneMaxSize, maxPossibleSize)
          : maxPossibleSize;
        
        const newSize = Math.max(
          effectiveMinSize, 
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
          currentSizes[i] = paneElement.offsetWidth;
        } else {
          currentSizes[i] = typeof widths[i] === 'number' ? widths[i] as number : 0;
        }
      });
      onResize(currentSizes, index);
    }
  }, [paneConfigs, isResizing, childrenCount, childrenArray, settings?.size, onResize, widths]);

  // If only 1 element, no resizer needed
  if (childrenCount <= 1) {
    return (
      <div ref={ref} className={className} {...htmlProps}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={panelsContainerStyles.vertical} {...htmlProps}>
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
                width: shouldFlexGrow ? undefined : (typeof widths[index] === 'string' ? widths[index] : widths[index]),
                minWidth: paneMinSize,
                ...(hasMaxSize && { maxWidth: paneMaxSize })
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

Vertical.displayName = "Vertical";
