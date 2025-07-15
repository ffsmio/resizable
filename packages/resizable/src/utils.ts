import { ReactElement } from "react";

export interface PaneConfig {
  size: number;
  minSize: number;
  maxSize: number;
  hasMaxSize: boolean;
  hasSize: boolean;
}

export function extractConfig(element: ReactElement, defaultConfig: PaneConfig, horizontal: boolean): PaneConfig {
  const props = element.props as Record<string, string | number | undefined>;
  
  const sizeAttr = horizontal ? 'data-pane-height' : 'data-pane-width';
  const minSizeAttr = horizontal ? 'data-pane-minheight' : 'data-pane-minwidth';
  const maxSizeAttr = horizontal ? 'data-pane-maxheight' : 'data-pane-maxwidth';
  
  const hasSize = props[sizeAttr] !== undefined;
  const size = hasSize
    ? parseInt(String(props[sizeAttr]), 10) 
    : defaultConfig.size;
    
  const minSize = props[minSizeAttr] 
    ? parseInt(String(props[minSizeAttr]), 10) 
    : defaultConfig.minSize;
    
  const hasMaxSize = props[maxSizeAttr] !== undefined;
  const maxSize = hasMaxSize
    ? parseInt(String(props[maxSizeAttr]), 10) 
    : defaultConfig.maxSize;

  return {
    size: Number.isNaN(size) ? defaultConfig.size : size,
    minSize: Number.isNaN(minSize) ? defaultConfig.minSize : minSize,
    maxSize: Number.isNaN(maxSize) ? defaultConfig.maxSize : maxSize,
    hasMaxSize,
    hasSize,
  };
}