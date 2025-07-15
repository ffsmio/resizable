'use client';

import { Resizable } from '@ffsm/resizable';
import { TestCaseProvider, useTestCase, TestCase } from '@/components/providers/testcase-context';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Test case definitions
const testCases: TestCase[] = [
  {
    id: 'basic',
    props: {
      className: 'h-full'
    },
    data: [
      {
        content: 'Panel 1',
        attributes: {}
      },
      {
        content: 'Panel 2',
        attributes: {}
      }
    ],
    name: 'Basic Usage',
    summary: 'Simple two-panel layout with default settings',
    code: `<Resizable className="h-full">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>`
  },
  {
    id: 'grip-styles',
    props: {
      grip: 'dots',
      className: 'h-full'
    },
    data: [
      {
        content: 'Panel 1',
        attributes: {}
      },
      {
        content: 'Panel 2',
        attributes: {}
      }
    ],
    name: 'Grip Styles',
    summary: 'Different visual styles for the resizer grip',
    code: `<Resizable grip="dots">
  <div>Panel 1</div>
  <div>Panel 2</div>
</Resizable>`
  },
  {
    id: 'horizontal',
    props: {
      horizontal: true,
      className: 'h-full'
    },
    data: [
      {
        content: 'Top Panel',
        attributes: {}
      },
      {
        content: 'Bottom Panel',
        attributes: {}
      }
    ],
    name: 'Horizontal Layout',
    summary: 'Horizontal resizer with top/bottom panels',
    code: `<Resizable horizontal>
  <div>Top Panel</div>
  <div>Bottom Panel</div>
</Resizable>`
  },
  {
    id: 'constraints',
    props: {
      minWidth: 150,
      maxWidth: 600,
      defaultSizes: [200, 300],
      className: 'h-full'
    },
    data: [
      {
        content: 'Constrained Panel (150px - 600px)',
        attributes: {}
      },
      {
        content: 'Flexible Panel',
        attributes: {}
      }
    ],
    name: 'Size Constraints',
    summary: 'Minimum and maximum width constraints',
    code: `<Resizable 
  minWidth={150} 
  maxWidth={600}
  defaultSizes={[200, 300]}
>
  <div>Constrained Panel (150px - 600px)</div>
  <div>Flexible Panel</div>
</Resizable>`
  },
  {
    id: 'pane-attributes',
    props: {
      className: 'h-full'
    },
    data: [
      {
        content: 'Panel 1',
        attributes: {}
      },
      {
        content: 'Panel 2 (max 400px)',
        attributes: {
          'data-pane-maxsize': '400'
        }
      }
    ],
    name: 'Pane Attributes',
    summary: 'Using data attributes to control individual pane behavior',
    code: `<Resizable>
  <div>Panel 1</div>
  <div data-pane-maxsize="400">
    Panel 2 (max 400px)
  </div>
</Resizable>`
  }
];

function TestCaseSelector() {
  const { activeTestCase, setActiveTestCase, testCases } = useTestCase();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700/50">
        <h3 className="text-white font-semibold mb-2">Test Cases</h3>
        <p className="text-white/70 text-sm">
          Select a test case to see it in action
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {testCases.map((testCase) => (
            <button
              key={testCase.id}
              onClick={() => setActiveTestCase(testCase)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                activeTestCase?.id === testCase.id
                  ? 'bg-blue-500/20 border-blue-500/50 text-white'
                  : 'bg-gray-800/50 border-gray-700/50 text-white/70 hover:bg-gray-800/70 hover:border-gray-600/50'
              }`}
            >
              <div className="font-medium text-sm mb-1">{testCase.name}</div>
              <div className="text-xs opacity-80">{testCase.summary}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestCaseDemo() {
  const { activeTestCase } = useTestCase();

  if (!activeTestCase) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-white/50">Select a test case to see the demo</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700/50">
        <h3 className="text-white font-semibold mb-1">{activeTestCase.name}</h3>
        <p className="text-white/70 text-sm">{activeTestCase.summary}</p>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <Resizable horizontal className="h-full">
          {/* Demo Area */}
          <div className="h-full p-4" data-pane-size="60%">
            <div className="h-full bg-gray-900/50 rounded-lg border border-gray-700/50 p-4">
              <h4 className="text-white font-medium mb-3 text-sm">Demo</h4>
              <Resizable {...activeTestCase.props}>
                {activeTestCase.data.map((item, index) => (
                  <div 
                    key={index} 
                    className="h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4 flex items-center justify-center text-white font-medium"
                    {...item.attributes}
                  >
                    {item.content}
                  </div>
                ))}
              </Resizable>
            </div>
          </div>
          
          {/* Code Area */}
          <div className="h-full p-4" data-pane-size="40%">
            <div className="h-full bg-gray-900/50 rounded-lg border border-gray-700/50 overflow-hidden">
              <div className="p-3 border-b border-gray-700/50">
                <h4 className="text-white font-medium text-sm">Code</h4>
              </div>
              <div className="h-full overflow-y-auto">
                <SyntaxHighlighter
                  language="tsx"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '16px',
                    background: 'transparent',
                    fontSize: '12px',
                    lineHeight: '1.5'
                  }}
                >
                  {activeTestCase.code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </Resizable>
      </div>
    </div>
  );
}

export function TestCases() {
  return (
    <section id="testcases" className="h-[100dvh] flex flex-col bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="container mx-auto px-6 py-12 flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Test Cases
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Interactive examples demonstrating various features and use cases of the Resizable component
          </p>
        </div>
        
        <div className="flex-1 min-h-0">
          <TestCaseProvider testCases={testCases}>
            <Resizable className="h-full">
              {/* Demo Area */}
              <TestCaseDemo />
              
              {/* Test Case Selector */}
              <div className="h-full bg-gray-800/50" data-pane-minsize="300" data-pane-maxsize="400">
                <TestCaseSelector />
              </div>
            </Resizable>
          </TestCaseProvider>
        </div>
      </div>
    </section>
  );
}
