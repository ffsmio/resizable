import { ReactElement } from "react";

export interface PaneConfig {
  size: number;
  minSize: number;
  maxSize: number;
  hasMaxSize: boolean;
  hasSize: boolean;
}

export function extractConfig(element: ReactElement, defaultConfig: PaneConfig): PaneConfig {
  const props = element.props as Record<string, string | number | undefined>;
  
  const hasSize = props['data-pane-size'] !== undefined;
  const size = hasSize
    ? parseInt(String(props['data-pane-size']), 10) 
    : defaultConfig.size;
    
  const minSize = props['data-pane-minsize'] 
    ? parseInt(String(props['data-pane-minsize']), 10) 
    : defaultConfig.minSize;
    
  const hasMaxSize = props['data-pane-maxsize'] !== undefined;
  const maxSize = hasMaxSize
    ? parseInt(String(props['data-pane-maxsize']), 10) 
    : defaultConfig.maxSize;

  return {
    size: Number.isNaN(size) ? defaultConfig.size : size,
    minSize: Number.isNaN(minSize) ? defaultConfig.minSize : minSize,
    maxSize: Number.isNaN(maxSize) ? defaultConfig.maxSize : maxSize,
    hasMaxSize,
    hasSize,
  };
}