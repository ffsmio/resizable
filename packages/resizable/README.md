# @ffsm/resizable

A React component library for creating resizable panels with various grip styles and customization options.

## Installation

```bash
npm install @ffsm/resizable
# or
yarn add @ffsm/resizable
```

## Usage

### Basic Usage

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

### With onResize Callback

```tsx
import { Resizable } from '@ffsm/resizable';

function App() {
  const handleResize = (sizes: number[], index: number) => {
    console.log(`Panel ${index} resized to ${sizes[index]}px`);
    console.log('All panel sizes:', sizes);
  };

  return (
    <Resizable onResize={handleResize} defaultSizes={[300, 400]}>
      <div>Panel 1</div>
      <div>Panel 2</div>
    </Resizable>
  );
}
```

### With Data Attributes for Individual Panel Control

```tsx
import { Resizable } from '@ffsm/resizable';

function App() {
  return (
    <Resizable>
      <div data-pane-size="300px" data-pane-minsize="200px" data-pane-maxsize="500px">
        Constrained Panel
      </div>
      <div data-pane-size="50%">
        Flexible Panel
      </div>
    </Resizable>
  );
}
```

## API Documentation

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The panels to render |
| `className?` | `string` | - | CSS class name |
| `defaultSizes?` | `number[]` | - | Default sizes for panels |
| `minWidth?` | `number` | `200` | Global minimum width |
| `maxWidth?` | `number` | `800` | Global maximum width |
| `horizontal?` | `boolean` | `false` | Layout direction |
| `grip?` | `'dots' \| 'lines' \| 'bars' \| 'minimal'` | `'lines'` | Grip style |
| `settings?` | `ResizerSettings` | - | Customization options |
| `cursor?` | `string` | - | Custom cursor style |
| `onResize?` | `(sizes: number[], index: number) => void` | - | Resize callback |

### Data Attributes

You can use these data attributes on individual panel elements to control their behavior:

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `data-pane-size` | `string` | Initial size of the panel | `"300px"`, `"50%"` |
| `data-pane-minsize` | `string` | Minimum size of the panel | `"200px"`, `"20%"` |
| `data-pane-maxsize` | `string` | Maximum size of the panel | `"500px"`, `"80%"` |

### Grip Styles

- `dots`: Dotted grip pattern
- `lines`: Parallel lines pattern (default)
- `bars`: Thick bars pattern
- `minimal`: Minimal visual style

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

### ✅ **Data Attributes** (Available)
- ✅ `data-pane-size`: string - Individual panel size (e.g., "300px", "50%")
- ✅ `data-pane-minsize`: string - Individual panel minimum size (e.g., "200px", "20%")
- ✅ `data-pane-maxsize`: string - Individual panel maximum size (e.g., "500px", "80%")

### � **Planned Callback Props** (Work In Progress)
- ⏳ `onCollapse?: (index: number) => void` - Callback when panel collapses
- ⏳ `onExpand?: (index: number) => void` - Callback when panel expands

### 🚧 **Planned Behavior Props** (Work In Progress)
- ⏳ `disabled?: boolean` - Disable all resizing functionality
- ⏳ `allowResize?: boolean[]` - Control which specific resizers can be used
- ⏳ `collapsible?: boolean[] | boolean` - Allow panels to collapse to size 0
- ⏳ `snapToGrid?: number` - Snap resize to grid increments (pixels)

### 🚧 **Planned Size Control Props** (Work In Progress)
- ⏳ `minSizes?: number[]` - Individual minimum sizes for each panel (note: use `data-pane-minsize` attribute for individual control)
- ⏳ `maxSizes?: number[]` - Individual maximum sizes for each panel (note: use `data-pane-maxsize` attribute for individual control)

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

### 🔄 **Planned Component: Container** (Future Release)

A component that provides edge-based resizing functionality:

```tsx
import { Container } from '@ffsm/resizable';

function App() {
  return (
    <Container 
      edges={['top', 'right', 'bottom', 'left']}
      minWidth={200}
      maxWidth={800}
      onResize={(dimensions) => console.log(dimensions)}
    >
      <div>Resizable content by edges</div>
    </Container>
  );
}
```

#### **Container Features:**
- ⏳ **Edge-based resizing**: Resize from any edge (top, right, bottom, left)
- ⏳ **Corner resizing**: Resize from corners for width and height simultaneously
- ⏳ **Size constraints**: Min/max width and height support
- ⏳ **Aspect ratio**: Maintain aspect ratio during resize
- ⏳ **Resize handles**: Customizable resize handles with different styles

#### **Container Props:**
- ⏳ `edges?`: Array<'top' | 'right' | 'bottom' | 'left'> - Enabled resize edges
- ⏳ `corners?`: boolean - Enable corner resizing
- ⏳ `minWidth?`: number - Minimum width constraint
- ⏳ `maxWidth?`: number - Maximum width constraint
- ⏳ `minHeight?`: number - Minimum height constraint
- ⏳ `maxHeight?`: number - Maximum height constraint
- ⏳ `aspectRatio?`: number - Maintain aspect ratio
- ⏳ `onResize?`: (dimensions: {width: number, height: number}) => void

### 🔄 **Planned Component: Windows** (Future Release)

A window management system that provides overlay windows on top of UI:

```tsx
import { Windows, WindowPanel } from '@ffsm/resizable';

function App() {
  return (
    <Windows>
      <WindowPanel 
        id="window1" 
        title="My Window"
        initialPosition={{ x: 100, y: 100 }}
        initialSize={{ width: 400, height: 300 }}
        resizable
        draggable
      >
        <div>Window content</div>
      </WindowPanel>
    </Windows>
  );
}
```

#### **Windows Features:**
- ⏳ **Overlay system**: Windows float over existing UI
- ⏳ **Drag and drop**: Move windows by dragging title bar
- ⏳ **Resize support**: Integration with Container component for edge resizing
- ⏳ **Z-index management**: Automatic layering and focus management
- ⏳ **Window controls**: Minimize, maximize, close buttons
- ⏳ **Snapping**: Snap to edges and other windows
- ⏳ **Multi-window**: Support for multiple windows simultaneously

#### **Windows Props:**
- ⏳ `children`: ReactNode - Window components
- ⏳ `zIndexBase?`: number - Base z-index for window layering
- ⏳ `snapDistance?`: number - Distance for edge snapping
- ⏳ `onWindowFocus?`: (windowId: string) => void

#### **WindowPanel Props:**
- ⏳ `id`: string - Unique window identifier
- ⏳ `title?`: string - Window title
- ⏳ `initialPosition?`: {x: number, y: number} - Initial window position
- ⏳ `initialSize?`: {width: number, height: number} - Initial window size
- ⏳ `resizable?`: boolean - Enable window resizing
- ⏳ `draggable?`: boolean - Enable window dragging
- ⏳ `closable?`: boolean - Show close button
- ⏳ `minimizable?`: boolean - Show minimize button
- ⏳ `maximizable?`: boolean - Show maximize button
- ⏳ `onClose?`: () => void - Close callback
- ⏳ `onMinimize?`: () => void - Minimize callback
- ⏳ `onMaximize?`: () => void - Maximize callback

## Legend
- ✅ **Available**: Feature is implemented and ready to use
- ⏳ **Work In Progress**: Feature is planned for future releases
- 🚧 **Planned**: Feature is in the roadmap
- 🔄 **Future Release**: Major feature planned for later versions

## License

MIT
