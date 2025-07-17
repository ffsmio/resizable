import { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";
import { type GripVariant } from "./grip";
import { type ResizerSettings } from "./resizer";

export interface BaseResizableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  defaultSizes?: number[];
  minWidth?: number;
  maxWidth?: number;
  grip?: GripVariant;
  settings?: ResizerSettings;
  cursor?: string;
  onResize?: (sizes: number[], index: number) => void;
}
