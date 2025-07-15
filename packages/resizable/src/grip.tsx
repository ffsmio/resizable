import { CSSProperties, ReactNode } from "react";
import { 
  gripStyles, 
  defaultGripColors, 
  defaultGradients, 
  getStateStyles, 
  getBoxShadow 
} from "./styles";

export interface GripSettings {
  gripColor?: string;
  gripHoverColor?: string;
  gripActiveColor?: string;
  gripDisabledColor?: string;
}

export interface GripProps {
  horizontal: boolean;
  isDragging: boolean;
  isHovered: boolean;
  className?: string;
  settings?: GripSettings;
}

export type RenderGrip = (props: GripProps) => ReactNode;

export const grips = {
  dots: ({ horizontal, isDragging, isHovered, className, settings }: GripProps) => {
    const baseStyle: CSSProperties = {
      ...gripStyles.base,
      ...(horizontal ? gripStyles.dots.base : gripStyles.dots.baseVertical),
      ...getStateStyles(isDragging, isHovered),
    };

    const dotStyle: CSSProperties = {
      ...gripStyles.dots.dot,
      backgroundColor: isDragging 
        ? (settings?.gripActiveColor || defaultGripColors.gripActiveColor) 
        : isHovered 
          ? (settings?.gripHoverColor || defaultGripColors.gripHoverColor) 
          : (settings?.gripColor || defaultGripColors.gripColor),
      boxShadow: getBoxShadow(isDragging, 'dots'),
    };

    return (
      <div style={baseStyle} className={className}>
        {Array.from({ length: horizontal ? 3 : 5 }, (_, i) => (
          <div key={i} style={dotStyle} />
        ))}
      </div>
    );
  },

  lines: ({ horizontal, isDragging, isHovered, className, settings }: GripProps) => {
    const baseStyle: CSSProperties = {
      ...gripStyles.base,
      ...(horizontal ? gripStyles.lines.base : gripStyles.lines.baseVertical),
      ...getStateStyles(isDragging, isHovered),
    };

    const lineStyle: CSSProperties = {
      ...gripStyles.lines.line,
      ...(horizontal ? gripStyles.lines.lineHorizontal : gripStyles.lines.lineVertical),
      background: isDragging 
        ? (settings?.gripActiveColor || defaultGradients.lines.active) 
        : isHovered 
          ? (settings?.gripHoverColor || defaultGradients.lines.hover) 
          : (settings?.gripColor || defaultGradients.lines.default),
      boxShadow: getBoxShadow(isDragging, 'lines'),
    };

    return (
      <div style={baseStyle} className={className}>
        {Array.from({ length: horizontal ? 3 : 4 }, (_, i) => (
          <div key={i} style={lineStyle} />
        ))}
      </div>
    );
  },

  bars: ({ horizontal, isDragging, isHovered, className, settings }: GripProps) => {
    const baseStyle: CSSProperties = {
      ...gripStyles.base,
      ...(horizontal ? gripStyles.bars.base : gripStyles.bars.baseVertical),
      ...getStateStyles(isDragging, isHovered),
    };

    const barStyle: CSSProperties = {
      ...gripStyles.bars.bar,
      ...(horizontal ? gripStyles.bars.barHorizontal : gripStyles.bars.barVertical),
      background: isDragging 
        ? (settings?.gripActiveColor || defaultGradients.bars.active) 
        : isHovered 
          ? (settings?.gripHoverColor || defaultGradients.bars.hover) 
          : (settings?.gripColor || defaultGradients.bars.default),
      boxShadow: getBoxShadow(isDragging, 'bars'),
    };

    return (
      <div style={baseStyle} className={className}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} style={barStyle} />
        ))}
      </div>
    );
  },

  minimal: ({ horizontal, isDragging, isHovered, className, settings }: GripProps) => {
    const baseStyle: CSSProperties = {
      ...gripStyles.base,
      ...getStateStyles(isDragging, isHovered),
    };

    const minimalStyle: CSSProperties = {
      ...gripStyles.minimal.minimal,
      ...(horizontal ? gripStyles.minimal.minimalHorizontal : gripStyles.minimal.minimalVertical),
      backgroundColor: isDragging 
        ? (settings?.gripActiveColor || defaultGripColors.gripActiveColor) 
        : isHovered 
          ? (settings?.gripHoverColor || defaultGripColors.gripHoverColor) 
          : (settings?.gripColor || defaultGripColors.gripColor),
      boxShadow: getBoxShadow(isDragging, 'minimal'),
    };

    return (
      <div style={baseStyle} className={className}>
        <div style={minimalStyle} />
      </div>
    );
  },
};

type GripKeys = keyof typeof grips;
export type GripVariant = GripKeys | RenderGrip;
