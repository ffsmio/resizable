"use client";

import { forwardRef } from "react";
import { Vertical } from "./vertical";
import { Horizontal } from "./horizontal";
import { BaseResizableProps } from "./types";

export interface ResizableProps extends BaseResizableProps {
  horizontal?: boolean;
}

export const Resizable = forwardRef<HTMLDivElement, ResizableProps>(({
  horizontal = false,
  ...props
}, ref) => {
  if (horizontal) {
    return <Horizontal {...props} ref={ref} />;
  }
  
  return <Vertical {...props} ref={ref} />;
});

Resizable.displayName = "Resizable";
