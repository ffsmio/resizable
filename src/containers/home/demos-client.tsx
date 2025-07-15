'use client';

import { useState, useEffect } from 'react';
import { Demos } from './demos';

export function DemosClient() {
  const [demoMode, setDemoMode] = useState<'vertical' | 'horizontal'>('vertical');

  useEffect(() => {
    // Listen for demo mode changes from fallback bar
    const handleDemoModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode: 'vertical' | 'horizontal' }>;
      setDemoMode(customEvent.detail.mode);
    };

    window.addEventListener('demo-mode-change', handleDemoModeChange);
    return () => {
      window.removeEventListener('demo-mode-change', handleDemoModeChange);
    };
  }, []);

  const handleModeChange = (mode: 'vertical' | 'horizontal') => {
    setDemoMode(mode);
    // Dispatch event to notify fallback bar
    window.dispatchEvent(
      new CustomEvent('demo-mode-change', {
        detail: { mode }
      })
    );
  };

  return (
    <Demos 
      mode={demoMode} 
      onModeChange={handleModeChange}
      onEnterSection={() => {
        // Dispatch event to show mode switch in fallback bar
        window.dispatchEvent(
          new CustomEvent('demo-section-enter')
        );
      }}
      onLeaveSection={() => {
        // Dispatch event to hide mode switch in fallback bar
        window.dispatchEvent(
          new CustomEvent('demo-section-leave')
        );
      }}
    />
  );
}
