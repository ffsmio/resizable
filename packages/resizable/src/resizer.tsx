"use client";

import { MouseEvent as ReactMouseEvent, useState, useRef, useEffect, useCallback } from "react";
import { grips, GripSettings, type GripVariant } from "./grip";
import { defaultResizerSettings, getResizerStyles } from "./styles";

export interface ResizerSettings extends GripSettings {
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  size?: number;
  radius?: number;
  shadow?: string;
  hoverShadow?: string;
  activeShadow?: string;
}

interface ResizerProps {
  className?: string;
  onResize?: (delta: number) => void;
  disabled?: boolean;
  horizontal?: boolean;
  grip?: GripVariant;
  settings?: ResizerSettings;
  cursor?: string;
}

export function Resizer({
  className,
  onResize,
  disabled = false,
  horizontal = false,
  grip = 'lines',
  settings = {},
  cursor,
}: ResizerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const resizerRef = useRef<HTMLDivElement>(null);

  // Merge settings with defaults
  const mergedSettings = { ...defaultResizerSettings, ...settings };

  const handleMouseDown = useCallback((e: ReactMouseEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    setIsDragging(true);
    setStartPos(horizontal ? e.clientY : e.clientX);
    
    // Add cursor style to body - use custom cursor or default
    const dragCursor = cursor || (horizontal ? "row-resize" : "col-resize");
    document.body.style.cursor = dragCursor;
    document.body.style.userSelect = "none";
  }, [disabled, horizontal, cursor]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    // Constrain mouse within viewport
    const viewport = horizontal ? window.innerHeight : window.innerWidth;
    const clientPos = horizontal ? e.clientY : e.clientX;
    const constrainedPos = Math.max(0, Math.min(viewport, clientPos));
    
    const delta = constrainedPos - startPos;
    onResize?.(delta);
    setStartPos(constrainedPos);
  }, [isDragging, startPos, onResize, horizontal]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    // Remove cursor style from body
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Render grip using grip system
  const renderGrip = () => {
    const gripProps = {
      horizontal,
      isDragging,
      isHovered,
      className: "",
      settings: mergedSettings,
    };

    if (typeof grip === 'function') {
      return grip(gripProps);
    }
    
    return grips[grip]?.(gripProps);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={resizerRef}
      className={className}
      style={getResizerStyles(horizontal, isDragging, isHovered, disabled, mergedSettings, cursor)}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grip - rendered based on variant */}
      {renderGrip()}
    </div>
  );
}
