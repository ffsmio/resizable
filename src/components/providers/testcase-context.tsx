'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TestCase {
  id: string;
  props: Record<string, unknown>;
  data: Array<{
    content: string;
    attributes?: Record<string, string | number>;
  }>;
  name: string;
  summary: string;
  code: string;
}

interface TestCaseContextType {
  activeTestCase: TestCase | null;
  setActiveTestCase: (testCase: TestCase) => void;
  testCases: TestCase[];
}

const TestCaseContext = createContext<TestCaseContextType | undefined>(undefined);

export function useTestCase() {
  const context = useContext(TestCaseContext);
  if (!context) {
    throw new Error('useTestCase must be used within a TestCaseProvider');
  }
  return context;
}

interface TestCaseProviderProps {
  children: ReactNode;
  testCases: TestCase[];
}

export function TestCaseProvider({ children, testCases }: TestCaseProviderProps) {
  const [activeTestCase, setActiveTestCase] = useState<TestCase | null>(
    testCases.length > 0 ? testCases[0] : null
  );

  return (
    <TestCaseContext.Provider value={{ activeTestCase, setActiveTestCase, testCases }}>
      {children}
    </TestCaseContext.Provider>
  );
}

export type { TestCase };
