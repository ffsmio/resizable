'use client';

import { useState, useEffect } from 'react';
import { Resizable } from '@ffsm/resizable';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PropDocumentation {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  required?: boolean;
  example?: string;
}

const propDocumentation: PropDocumentation[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Child elements to be rendered as resizable panels. Each child becomes a separate panel. When only one child is provided, no resizer is created and the child takes up the full container space.',
    required: true,
    example: `<Resizable>
  <div>First panel content</div>
  <div>Second panel content</div>
</Resizable>

{/* Single child - no resizer needed */}
<Resizable>
  <div>Only one panel, takes full space</div>
</Resizable>`
  },
  {
    name: 'style',
    type: 'CSSProperties',
    description: 'Custom CSS styles for the resizable container. Note that some internal styles may override your custom styles, particularly layout-related properties like display, flexDirection, and positioning. For layout customization, consider using className with CSS classes instead.',
    required: false,
    example: `<Resizable 
  style={{ 
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#f9fafb',
    padding: '4px'
  }}
>
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

{/* Styles that may be overridden by internal styles */}
<Resizable 
  style={{ 
    display: 'grid',        // Will be overridden to 'flex'
    flexDirection: 'row',   // Will be overridden based on horizontal prop
    position: 'absolute'    // Will be overridden to 'relative'
  }}
>
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

{/* Recommended approach for complex styling */}
<Resizable className="custom-resizable">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

{/* CSS */}
/* .custom-resizable {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  padding: 4px;
} */`
  },
  {
    name: 'defaultSizes',
    type: 'number[]',
    description: 'Array of default sizes in pixels for each panel. For vertical layout (horizontal=false), this sets widths. For horizontal layout (horizontal=true), this sets heights. If not provided, panels will be sized automatically.',
    defaultValue: '[]',
    required: false,
    example: `{/* Vertical layout - sets widths */}
<Resizable defaultSizes={[300, 500]}>
  <div>300px wide panel</div>
  <div>500px wide panel</div>
</Resizable>

{/* Horizontal layout - sets heights */}
<Resizable horizontal defaultSizes={[200, 300]}>
  <div>200px high panel</div>
  <div>300px high panel</div>
</Resizable>`
  },
  {
    name: 'minWidth',
    type: 'number',
    description: 'Minimum width in pixels for all panels. This acts as a global constraint.',
    defaultValue: '200',
    required: false,
    example: `<Resizable minWidth={150}>
  <div>Min 150px panel</div>
  <div>Min 150px panel</div>
</Resizable>`
  },
  {
    name: 'maxWidth',
    type: 'number',
    description: 'Maximum width in pixels for all panels. This acts as a global constraint.',
    defaultValue: '800',
    required: false,
    example: `<Resizable maxWidth={600}>
  <div>Max 600px panel</div>
  <div>Max 600px panel</div>
</Resizable>`
  },
  {
    name: 'horizontal',
    type: 'boolean',
    description: 'When true, panels are stacked vertically (horizontal divider). When false, panels are side-by-side (vertical divider).',
    defaultValue: 'false',
    required: false,
    example: `<Resizable horizontal>
  <div>Top panel</div>
  <div>Bottom panel</div>
</Resizable>`
  },
  {
    name: 'grip',
    type: "'dots' | 'lines' | 'bars' | 'minimal' | RenderGrip",
    description: 'Visual style of the resizer grip. Can be a predefined style ("dots", "lines", "bars", "minimal") or a custom render function that receives grip props.',
    defaultValue: 'lines',
    required: false,
    example: `{/* Predefined grip styles */}
<Resizable grip="dots">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

<Resizable grip="lines">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

<Resizable grip="bars">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

<Resizable grip="minimal">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

{/* Custom grip function */}
<Resizable 
  grip={({ horizontal, isDragging, isHovered, className, settings }) => (
    <div 
      className={className}
      style={{
        width: horizontal ? '100%' : '8px',
        height: horizontal ? '8px' : '100%',
        backgroundColor: isDragging 
          ? '#ef4444' 
          : isHovered 
            ? '#f97316' 
            : '#6b7280',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        cursor: horizontal ? 'row-resize' : 'col-resize'
      }}
    >
      {/* Custom grip content */}
      <div style={{
        width: horizontal ? '12px' : '2px',
        height: horizontal ? '2px' : '12px',
        backgroundColor: 'white',
        borderRadius: '1px',
        opacity: isDragging ? 1 : 0.7
      }} />
    </div>
  )}
>
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

{/* Advanced custom grip with multiple elements */}
<Resizable 
  grip={({ horizontal, isDragging, isHovered }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: horizontal ? '100%' : '6px',
      height: horizontal ? '6px' : '100%',
      backgroundColor: isDragging ? '#3b82f6' : '#e5e7eb',
      borderRadius: '3px',
      flexDirection: horizontal ? 'row' : 'column',
      gap: '1px',
      transition: 'all 0.3s ease'
    }}>
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          style={{
            width: horizontal ? '8px' : '2px',
            height: horizontal ? '2px' : '8px',
            backgroundColor: isDragging ? 'white' : '#9ca3af',
            borderRadius: '1px',
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.2s ease'
          }}
        />
      ))}
    </div>
  )}
>
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>`
  },
  {
    name: 'settings',
    type: 'ResizerSettings',
    description: 'Advanced settings for customizing the resizer appearance and grip styles. Extends GripSettings to include both resizer and grip customization options.',
    required: false,
    example: `<Resizable settings={{
  // Resizer background colors
  color: 'rgba(156, 163, 175, 0.2)',
  hoverColor: 'rgba(59, 130, 246, 0.3)',
  activeColor: 'rgba(59, 130, 246, 0.5)',
  disabledColor: 'rgba(156, 163, 175, 0.1)',
  
  // Resizer dimensions and styling
  size: 4,
  radius: 2,
  shadow: 'none',
  hoverShadow: '0 0 0 1px rgba(59, 130, 246, 0.3)',
  activeShadow: '0 4px 8px rgba(59, 130, 246, 0.3)',
  
  // Grip colors (for dots and minimal styles)
  gripColor: 'rgb(156, 163, 175)',
  gripHoverColor: 'rgb(96, 165, 250)',
  gripActiveColor: 'rgb(147, 197, 253)',
  gripDisabledColor: 'rgb(209, 213, 219)'
}}>
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

{/* For lines and bars grips, use gradient strings */}
<Resizable 
  grip="lines"
  settings={{
    gripColor: 'linear-gradient(to right, #9ca3af, #6b7280)',
    gripHoverColor: 'linear-gradient(to right, #60a5fa, #3b82f6)',
    gripActiveColor: 'linear-gradient(to right, #93c5fd, #60a5fa)'
  }}
>
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>`
  },
  {
    name: 'cursor',
    type: 'string',
    description: 'Custom cursor style for the resizer. If not provided, defaults to "row-resize" for horizontal layout and "col-resize" for vertical layout.',
    required: false,
    example: `{/* Custom cursor styles */}
<Resizable cursor="move">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

<Resizable cursor="grab">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

<Resizable horizontal cursor="ns-resize">
  <div>Top panel</div>
  <div>Bottom panel</div>
</Resizable>

{/* CSS cursor values */}
<Resizable cursor="pointer">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>

<Resizable cursor="crosshair">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>`
  },
  {
    name: '...htmlProps',
    type: 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>',
    description: 'All standard HTML div attributes are supported and will be passed through to the container element. This includes id, style, onClick, onMouseOver, data-* attributes, and more.',
    required: false,
    example: `<Resizable 
  id="my-resizable"
  style={{ border: '1px solid #ccc' }}
  onClick={(e) => console.log('Clicked!')}
  data-testid="resizable-container"
>
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>`
  }
];

// Additional documentation for data attributes
const dataAttributeDocumentation: PropDocumentation[] = [
  {
    name: 'data-pane-width',
    type: 'string | number',
    description: 'Set initial width for a specific panel in vertical layout. Applied to individual panel elements.',
    required: false,
    example: `<Resizable>
  <div data-pane-width="300">300px panel</div>
  <div>Auto-sized panel</div>
</Resizable>`
  },
  {
    name: 'data-pane-height',
    type: 'string | number',
    description: 'Set initial height for a specific panel in horizontal layout. Applied to individual panel elements.',
    required: false,
    example: `<Resizable horizontal>
  <div data-pane-height="200">200px panel</div>
  <div>Auto-sized panel</div>
</Resizable>`
  },
  {
    name: 'data-pane-minwidth',
    type: 'string | number',
    description: 'Set minimum width for a specific panel in vertical layout. Overrides global minWidth for this panel.',
    required: false,
    example: `<Resizable>
  <div data-pane-minwidth="100">Min 100px panel</div>
  <div>Regular panel</div>
</Resizable>`
  },
  {
    name: 'data-pane-minheight',
    type: 'string | number',
    description: 'Set minimum height for a specific panel in horizontal layout. Overrides global minWidth for this panel.',
    required: false,
    example: `<Resizable horizontal>
  <div data-pane-minheight="150">Min 150px panel</div>
  <div>Regular panel</div>
</Resizable>`
  },
  {
    name: 'data-pane-maxwidth',
    type: 'string | number',
    description: 'Set maximum width for a specific panel in vertical layout. Overrides global maxWidth for this panel.',
    required: false,
    example: `<Resizable>
  <div data-pane-maxwidth="500">Max 500px panel</div>
  <div>Regular panel</div>
</Resizable>`
  },
  {
    name: 'data-pane-maxheight',
    type: 'string | number',
    description: 'Set maximum height for a specific panel in horizontal layout. Overrides global maxWidth for this panel.',
    required: false,
    example: `<Resizable horizontal>
  <div data-pane-maxheight="400">Max 400px panel</div>
  <div>Regular panel</div>
</Resizable>`
  }
];

interface DocumentationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentationDrawer({ isOpen, onClose }: DocumentationDrawerProps) {
  const [openCollapsibles, setOpenCollapsibles] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleCollapsible = (propName: string) => {
    const newOpenCollapsibles = new Set(openCollapsibles);
    if (newOpenCollapsibles.has(propName)) {
      newOpenCollapsibles.delete(propName);
    } else {
      newOpenCollapsibles.add(propName);
    }
    setOpenCollapsibles(newOpenCollapsibles);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-[100dvh] w-full max-w-2xl bg-gray-900 border-l border-white/20 shadow-2xl z-50 overflow-hidden transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-white/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">API Documentation</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close documentation"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Resizable horizontal className="h-full">
            {/* Component Props Section */}
            <div className="h-full overflow-y-auto" data-pane-height="350">
              <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-white/20 p-6 z-10">
                <h3 className="text-xl font-semibold text-white mb-2">Component Props</h3>
                <p className="text-white/70">
                  Configure the resizable component with these props.
                </p>
              </div>

              {/* Props List */}
              <div className="p-6 pt-6">
                <div className="space-y-3">
                  {propDocumentation.map((prop) => (
                    <div key={prop.name} className="border border-white/20 rounded-lg overflow-hidden">
                      {/* Collapsible Header */}
                      <button
                        onClick={() => toggleCollapsible(prop.name)}
                        className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <code className="text-purple-400 font-semibold">{prop.name}</code>
                          {prop.required && (
                            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-white/60">{prop.type}</span>
                          <svg 
                            className={`w-4 h-4 text-white/60 transition-transform ${
                              openCollapsibles.has(prop.name) ? 'rotate-180' : ''
                            }`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      </button>

                      {/* Collapsible Content */}
                      {openCollapsibles.has(prop.name) && (
                        <div className="px-4 py-4 bg-white/5 border-t border-white/20">
                          <div className="space-y-4">
                            {/* Description */}
                            <div>
                              <h4 className="text-sm font-medium text-white/80 mb-1">Description</h4>
                              <p className="text-white/70 text-sm leading-relaxed">{prop.description}</p>
                            </div>

                            {/* Type */}
                            <div>
                              <h4 className="text-sm font-medium text-white/80 mb-1">Type</h4>
                              <code className="text-sm bg-gray-800 text-green-400 px-2 py-1 rounded">
                                {prop.type}
                              </code>
                            </div>

                            {/* Default Value */}
                            {prop.defaultValue && (
                              <div>
                                <h4 className="text-sm font-medium text-white/80 mb-1">Default Value</h4>
                                <code className="text-sm bg-gray-800 text-blue-400 px-2 py-1 rounded">
                                  {prop.defaultValue}
                                </code>
                              </div>
                            )}

                            {/* Example */}
                            {prop.example && (
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-medium text-white/80">Example</h4>
                                  <button
                                    onClick={() => copyToClipboard(prop.example!)}
                                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                  >
                                    Copy
                                  </button>
                                </div>
                                <SyntaxHighlighter
                                  language="tsx"
                                  style={vscDarkPlus}
                                  customStyle={{
                                    fontSize: '12px',
                                    borderRadius: '4px',
                                    margin: 0,
                                    padding: '12px'
                                  }}
                                >
                                  {prop.example}
                                </SyntaxHighlighter>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Attributes Section */}
            <div className="h-full overflow-y-auto bg-gray-800/50" data-pane-height="450">
              <div className="sticky top-0 bg-gray-800/95 backdrop-blur-md border-b border-white/20 p-6 z-10">
                <h3 className="text-xl font-semibold text-white mb-2">Panel Data Attributes</h3>
                <p className="text-white/70">
                  Apply these to individual panel elements for per-panel configuration.
                </p>
              </div>

              <div className="p-6 pt-6">
                <div className="space-y-3">
                  {dataAttributeDocumentation.map((attr) => (
                    <div key={attr.name} className="border border-white/20 rounded-lg overflow-hidden">
                      {/* Collapsible Header */}
                      <button
                        onClick={() => toggleCollapsible(attr.name)}
                        className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <code className="text-orange-400 font-semibold">{attr.name}</code>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-white/60">{attr.type}</span>
                          <svg 
                            className={`w-4 h-4 text-white/60 transition-transform ${
                              openCollapsibles.has(attr.name) ? 'rotate-180' : ''
                            }`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      </button>

                      {/* Collapsible Content */}
                      {openCollapsibles.has(attr.name) && (
                        <div className="px-4 py-4 bg-white/5 border-t border-white/20">
                          <div className="space-y-4">
                            {/* Description */}
                            <div>
                              <h4 className="text-sm font-medium text-white/80 mb-1">Description</h4>
                              <p className="text-white/70 text-sm leading-relaxed">{attr.description}</p>
                            </div>

                            {/* Type */}
                            <div>
                              <h4 className="text-sm font-medium text-white/80 mb-1">Type</h4>
                              <code className="text-sm bg-gray-800 text-green-400 px-2 py-1 rounded">
                                {attr.type}
                              </code>
                            </div>

                            {/* Example */}
                            {attr.example && (
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-medium text-white/80">Example</h4>
                                  <button
                                    onClick={() => copyToClipboard(attr.example!)}
                                    className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                                  >
                                    Copy
                                  </button>
                                </div>
                                <SyntaxHighlighter
                                  language="tsx"
                                  style={vscDarkPlus}
                                  customStyle={{
                                    fontSize: '12px',
                                    borderRadius: '4px',
                                    margin: 0,
                                    padding: '12px'
                                  }}
                                >
                                  {attr.example}
                                </SyntaxHighlighter>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white/80 mb-2">RenderGrip Function Type</h4>
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{
                        fontSize: '12px',
                        borderRadius: '4px',
                        margin: 0,
                        padding: '12px'
                      }}
                    >
{`type RenderGrip = (props: GripProps) => ReactNode;

interface GripProps {
  horizontal: boolean;      // Whether the resizer is horizontal
  isDragging: boolean;      // Whether the grip is being dragged
  isHovered: boolean;       // Whether the grip is being hovered
  className?: string;       // CSS class name to apply
  settings?: GripSettings;  // Grip settings from component props
}`}
                    </SyntaxHighlighter>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white/80 mb-2">ResizerSettings Interface</h4>
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{
                        fontSize: '12px',
                        borderRadius: '4px',
                        margin: 0,
                        padding: '12px'
                      }}
                    >
{`interface ResizerSettings extends GripSettings {
  // Resizer background colors
  color?: string;              // Default: 'rgba(156, 163, 175, 0.2)'
  hoverColor?: string;         // Default: 'rgba(59, 130, 246, 0.3)'
  activeColor?: string;        // Default: 'rgba(59, 130, 246, 0.5)'
  disabledColor?: string;      // Default: 'rgba(156, 163, 175, 0.1)'
  
  // Resizer dimensions and styling
  size?: number;               // Default: 4 (pixels)
  radius?: number;             // Default: 2 (pixels)
  shadow?: string;             // Default: 'none'
  hoverShadow?: string;        // Default: '0 0 0 1px rgba(59, 130, 246, 0.3)'
  activeShadow?: string;       // Default: '0 4px 8px rgba(59, 130, 246, 0.3)'
  
  // Grip colors (inherited from GripSettings)
  gripColor?: string;          // Default: 'rgb(156, 163, 175)'
  gripHoverColor?: string;     // Default: 'rgb(96, 165, 250)'
  gripActiveColor?: string;    // Default: 'rgb(147, 197, 253)'
  gripDisabledColor?: string;  // Default: 'rgb(209, 213, 219)'
}`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </Resizable>
        </div>
      </div>
    </>
  );
}
