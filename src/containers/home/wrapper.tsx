'use client';

import { useState, useEffect } from 'react';
import { FallbackBar } from '@/components/layout/fallback-bar';
import { useScrollSnap } from '@/hooks/use-scroll-snap';

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  const [demoMode, setDemoMode] = useState<'vertical' | 'horizontal'>('vertical');
  const [showModeSwitch, setShowModeSwitch] = useState(false);

  // Enable scroll snapping
  useScrollSnap();

  useEffect(() => {
    // Listen for demo mode changes
    const handleDemoModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode: 'vertical' | 'horizontal' }>;
      setDemoMode(customEvent.detail.mode);
    };

    // Listen for demo section enter/leave events
    const handleDemoSectionEnter = () => {
      setShowModeSwitch(true);
    };

    const handleDemoSectionLeave = () => {
      setShowModeSwitch(false);
    };

    window.addEventListener('demo-mode-change', handleDemoModeChange);
    window.addEventListener('demo-section-enter', handleDemoSectionEnter);
    window.addEventListener('demo-section-leave', handleDemoSectionLeave);

    return () => {
      window.removeEventListener('demo-mode-change', handleDemoModeChange);
      window.removeEventListener('demo-section-enter', handleDemoSectionEnter);
      window.removeEventListener('demo-section-leave', handleDemoSectionLeave);
    };
  }, []);

  const handleModeChange = (mode: 'vertical' | 'horizontal') => {
    setDemoMode(mode);
    // Dispatch event to notify demos section
    window.dispatchEvent(
      new CustomEvent('demo-mode-change', {
        detail: { mode }
      })
    );
  };

  return (
    <>
      {children}

      {/* Fallback Bar */}
      <FallbackBar 
        demoMode={demoMode} 
        onModeChange={handleModeChange}
        showModeSwitch={showModeSwitch}
      />
    </>
  );
}
