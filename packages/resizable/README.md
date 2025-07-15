# @ffsm/resizable

A React component library for creating resizable panels with various grip styles and customization options.

## Installation

```bash
npm install @ffsm/resizable
# or
yarn add @ffsm/resizable
```

## Usage

```tsx
import { Resizable } from '@ffsm/resizable';

function App() {
  return (
    <Resizable horizontal={false} grip="dots">
      <div>Panel 1</div>
      <div>Panel 2</div>
      <div>Panel 3</div>
    </Resizable>
  );
}
```

## Features & Roadmap

### ✅ **Core Features** (Available)
- ✅ **Multiple grip styles**: dots, lines, bars, minimal
- ✅ **Horizontal and vertical layouts**
- ✅ **Customizable styling**: Colors, sizes, shadows
- ✅ **TypeScript support**
- ✅ **Inline styles**: No external CSS dependencies
- ✅ **Responsive design**
- ✅ **forwardRef support**

### ✅ **Basic Props** (Available)
- ✅ `children`: ReactNode - The panels to render
- ✅ `className?`: string - CSS class name
- ✅ `defaultSizes?`: number[] - Default sizes for panels
- ✅ `minWidth?`: number - Minimum width (default: 200)
- ✅ `maxWidth?`: number - Maximum width (default: 800)
- ✅ `horizontal?`: boolean - Layout direction (default: false)
- ✅ `grip?`: GripVariant - Grip style (default: 'lines')
- ✅ `settings?`: ResizerSettings - Customization options
- ✅ `cursor?`: string - Custom cursor style for resizer

### ✅ **Callback Props** (Available)
- ✅ `onResize?`: (sizes: number[], index: number) => void - Callback when user resizes panels

### � **Planned Callback Props** (Work In Progress)
- ⏳ `onCollapse?: (index: number) => void` - Callback when panel collapses
- ⏳ `onExpand?: (index: number) => void` - Callback when panel expands

### 🚧 **Planned Behavior Props** (Work In Progress)
- ⏳ `disabled?: boolean` - Disable all resizing functionality
- ⏳ `allowResize?: boolean[]` - Control which specific resizers can be used
- ⏳ `collapsible?: boolean[] | boolean` - Allow panels to collapse to size 0
- ⏳ `snapToGrid?: number` - Snap resize to grid increments (pixels)

### 🚧 **Planned Size Control Props** (Work In Progress)
- ⏳ `minSizes?: number[]` - Individual minimum sizes for each panel
- ⏳ `maxSizes?: number[]` - Individual maximum sizes for each panel

### 🚧 **Planned Persistence Props** (Work In Progress)
- ⏳ `persistKey?: string` - Auto save/restore sizes to localStorage

### 🚧 **Planned Animation Props** (Work In Progress)
- ⏳ `animationDuration?: number` - Control transition animation speed

### 🚧 **Planned Customization Props** (Work In Progress)
- ⏳ `resizerProps?: React.HTMLAttributes<HTMLDivElement>` - Pass props directly to resizer elements

### 🔄 **Planned Component: Scrollable** (Future Release)

A new component that wraps `Resizable` to provide scrollable container functionality:

```tsx
import { Scrollable } from '@ffsm/resizable';

function App() {
  return (
    <Scrollable className="w-full h-screen">
      <Resizable horizontal={false} defaultSizes={[300, 400, 500]}>
        <div>Panel 1 - 300px initial width</div>
        <div>Panel 2 - 400px initial width</div>
        <div>Panel 3 - 500px initial width</div>
      </Resizable>
    </Scrollable>
  );
}
```

#### **Scrollable Features:**
- ⏳ **Overflow handling**: Panels can exceed container width/height
- ⏳ **Smart initialization**: Uses `width` → `minWidth` → `defaultSizes` priority
- ⏳ **Scroll behavior**: Automatic scrollbars when content overflows
- ⏳ **Unlimited resize**: Panels can resize beyond container boundaries
- ⏳ **Direction aware**: Works with both horizontal and vertical layouts

#### **Scrollable Props:**
- ⏳ `children`: ReactNode - Should contain Resizable component
- ⏳ `className?`: string - CSS class name
- ⏳ `direction?`: 'horizontal' | 'vertical' | 'both' - Scroll direction
- ⏳ `maxScrollWidth?`: number - Maximum scrollable width
- ⏳ `maxScrollHeight?`: number - Maximum scrollable height

## Legend
- ✅ **Available**: Feature is implemented and ready to use
- ⏳ **Work In Progress**: Feature is planned for future releases
- 🚧 **Planned**: Feature is in the roadmap
- 🔄 **Future Release**: Major feature planned for later versions

## License

MIT
