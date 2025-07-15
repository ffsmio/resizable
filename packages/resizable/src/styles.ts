import { CSSProperties } from "react";

export const gripStyles = {
  // Base styles for all grip variants
  base: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    transition: "all 0.3s ease-out",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  // Dots grip styles
  dots: {
    base: {
      flexDirection: "row",
      gap: "2px",
    } as CSSProperties,
    baseVertical: {
      flexDirection: "column",
      gap: "2px",
    } as CSSProperties,
    dot: {
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      transition: "all 0.3s ease-out",
    } as CSSProperties,
  },

  // Lines grip styles
  lines: {
    base: {
      flexDirection: "row",
      gap: "1px",
    } as CSSProperties,
    baseVertical: {
      flexDirection: "column",
      gap: "1px",
    } as CSSProperties,
    line: {
      transition: "all 0.3s ease-out",
      borderRadius: "9999px",
    } as CSSProperties,
    lineHorizontal: {
      width: "2px",
      height: "6px",
    } as CSSProperties,
    lineVertical: {
      width: "6px",
      height: "2px",
    } as CSSProperties,
  },

  // Bars grip styles
  bars: {
    base: {
      flexDirection: "row",
      gap: "2px",
    } as CSSProperties,
    baseVertical: {
      flexDirection: "column",
      gap: "2px",
    } as CSSProperties,
    bar: {
      transition: "all 0.3s ease-out",
      borderRadius: "2px",
    } as CSSProperties,
    barHorizontal: {
      width: "2px",
      height: "8px",
    } as CSSProperties,
    barVertical: {
      width: "8px",
      height: "2px",
    } as CSSProperties,
  },

  // Minimal grip styles
  minimal: {
    minimal: {
      transition: "all 0.3s ease-out",
      borderRadius: "9999px",
    } as CSSProperties,
    minimalHorizontal: {
      width: "2px",
      height: "4px",
    } as CSSProperties,
    minimalVertical: {
      width: "4px",
      height: "2px",
    } as CSSProperties,
  },
};

// Default colors
export const defaultGripColors = {
  gripColor: "rgb(156, 163, 175)",
  gripHoverColor: "rgb(96, 165, 250)",
  gripActiveColor: "rgb(147, 197, 253)",
  gripDisabledColor: "rgb(209, 213, 219)",
};

// Default gradients for lines and bars
export const defaultGradients = {
  lines: {
    default: "linear-gradient(to right, rgb(156, 163, 175), rgb(107, 114, 128))",
    hover: "linear-gradient(to right, rgb(96, 165, 250), rgb(59, 130, 246))",
    active: "linear-gradient(to right, rgb(147, 197, 253), rgb(96, 165, 250))",
  },
  bars: {
    default: "linear-gradient(to right, rgb(156, 163, 175), rgb(75, 85, 99))",
    hover: "linear-gradient(to right, rgb(96, 165, 250), rgb(37, 99, 235))",
    active: "linear-gradient(to right, rgb(147, 197, 253), rgb(59, 130, 246))",
  },
};

// Default shadow styles
export const defaultShadows = {
  dots: "0 1px 2px rgba(59, 130, 246, 0.5)",
  lines: "0 2px 4px rgba(59, 130, 246, 0.3)",
  bars: "0 2px 4px rgba(59, 130, 246, 0.5)",
  minimal: "0 1px 2px rgba(59, 130, 246, 0.5)",
};

// Helper function to get state-based styles
export const getStateStyles = (isDragging: boolean, isHovered: boolean) => ({
  opacity: isDragging ? 1 : (isHovered ? 0.9 : 0.4),
  transform: isDragging ? "scale(1.1)" : "scale(1)",
});

// Helper function to get box shadow based on state
export const getBoxShadow = (isDragging: boolean, shadowType: keyof typeof defaultShadows) => 
  isDragging ? defaultShadows[shadowType] : "none";

// Resizer styles
export const resizerStyles = {
  base: {
    position: "relative",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease-out",
  } as CSSProperties,
  
  horizontal: {
    cursor: "row-resize",
    width: "100%",
  } as CSSProperties,
  
  vertical: {
    cursor: "col-resize",
    height: "100%",
  } as CSSProperties,
  
  disabled: {
    cursor: "not-allowed",
  } as CSSProperties,
};

// Default resizer settings
export const defaultResizerSettings = {
  color: "rgba(156, 163, 175, 0.2)", // gray-400/20
  hoverColor: "rgba(59, 130, 246, 0.3)", // blue-500/30  
  activeColor: "rgba(59, 130, 246, 0.5)", // blue-500/50
  disabledColor: "rgba(156, 163, 175, 0.1)", // gray-400/10
  size: 4,
  radius: 2,
  shadow: "none",
  hoverShadow: "0 0 0 1px rgba(59, 130, 246, 0.3)",
  activeShadow: "0 4px 8px rgba(59, 130, 246, 0.3)",
};

// Helper function to get resizer dynamic styles
export const getResizerStyles = (
  horizontal: boolean,
  isDragging: boolean,
  isHovered: boolean,
  disabled: boolean,
  settings: typeof defaultResizerSettings,
  cursor?: string
): CSSProperties => {
  const styles: CSSProperties = {
    ...resizerStyles.base,
    ...(horizontal ? resizerStyles.horizontal : resizerStyles.vertical),
    backgroundColor: settings.color,
    borderRadius: settings.radius,
    boxShadow: settings.shadow,
  };

  // Size
  if (horizontal) {
    styles.height = `${settings.size}px`;
  } else {
    styles.width = `${settings.size}px`;
  }

  // Custom cursor or default
  if (cursor) {
    styles.cursor = cursor;
  } else {
    styles.cursor = horizontal ? resizerStyles.horizontal.cursor : resizerStyles.vertical.cursor;
  }

  // Hover state
  if (isHovered && !isDragging) {
    styles.backgroundColor = settings.hoverColor;
    styles.boxShadow = settings.hoverShadow;
  }

  // Active/Dragging state
  if (isDragging) {
    styles.backgroundColor = settings.activeColor;
    styles.boxShadow = settings.activeShadow;
  }

  // Disabled state
  if (disabled) {
    styles.backgroundColor = settings.disabledColor;
    styles.cursor = resizerStyles.disabled.cursor;
  }

  return styles;
};

// ResizablePanels container styles
export const panelsContainerStyles = {
  horizontal: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  } as CSSProperties,
  
  vertical: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
  } as CSSProperties,
  
  singlePaneHorizontal: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  } as CSSProperties,
  
  singlePaneVertical: {
    display: "flex",
    height: "100%",
  } as CSSProperties,
};

// Individual pane styles
export const paneStyles = {
  base: {
    flexShrink: 0,
    overflow: "hidden",
  } as CSSProperties,
  
  flexGrow: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
  } as CSSProperties,
};
