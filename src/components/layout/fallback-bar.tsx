'use client';

import { useEffect, useState, useRef } from 'react';

interface FallbackBarProps {
  demoMode?: 'vertical' | 'horizontal';
  onModeChange?: (mode: 'vertical' | 'horizontal') => void;
  showModeSwitch?: boolean;
}

export function FallbackBar({ 
  demoMode = 'vertical', 
  onModeChange, 
  showModeSwitch = false 
}: FallbackBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHeaderVisibility = () => {
      // Check if header is out of viewport
      const scrollY = window.scrollY;
      const headerHeight = 120; // Approximate header height
      
      setIsVisible(scrollY > headerHeight);
    };

    // Check initial scroll position
    checkHeaderVisibility();

    const handleScroll = () => {
      checkHeaderVisibility();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close settings popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  const sections = ['hero', 'demo', 'demos', 'features', 'testcases'];
  
  const scrollToSection = (direction: 'up' | 'down') => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const currentSectionIndex = Math.round(currentScrollY / viewportHeight);
    
    let targetIndex;
    if (direction === 'up') {
      targetIndex = Math.max(0, currentSectionIndex - 1);
    } else {
      targetIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
    }
    
    const targetY = targetIndex * viewportHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const scrollToCurrentSection = () => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const currentSectionIndex = Math.round(currentScrollY / viewportHeight);
    const targetY = currentSectionIndex * viewportHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const handleModeChange = (mode: 'vertical' | 'horizontal') => {
    onModeChange?.(mode);
    // Scroll to ensure demos section is properly in viewport
    setTimeout(() => {
      scrollToCurrentSection();
    }, 100);
  };

  const handleSettingsChange = (setting: string, value: string | number | number[]) => {
    // Dispatch custom event to update demos settings
    const event = new CustomEvent('resizable-settings-change', {
      detail: { setting, value }
    });
    window.dispatchEvent(event);
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="backdrop-blur-lg bg-black/80 rounded-2xl border border-white/20 shadow-2xl px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Up Button */}
          <button
            onClick={() => scrollToSection('up')}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Scroll to previous section"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/>
            </svg>
          </button>

          {/* Mode Switch - Only show when in demos section */}
          {showModeSwitch && (
            <div className="flex items-center space-x-2">
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => handleModeChange('vertical')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    demoMode === 'vertical'
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Vertical mode"
                >
                  {/* Vertical Layout Icon */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleModeChange('horizontal')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    demoMode === 'horizontal'
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Horizontal mode"
                >
                  {/* Horizontal Layout Icon */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1H4zM10 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zM16 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z"/>
                  </svg>
                </button>
              </div>
              
              {/* Settings Button */}
              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Settings"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                  </svg>
                </button>
                
                {/* Settings Popover */}
                {showSettings && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 backdrop-blur-lg bg-black/90 rounded-xl border border-white/20 shadow-2xl p-4">
                    <h4 className="text-white font-medium mb-3">Resizable Settings</h4>
                    
                    {/* Grip Style */}
                    <div className="mb-3">
                      <label className="text-white/70 text-sm mb-1 block">Grip Style</label>
                      <select 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                        onChange={(e) => handleSettingsChange('grip', e.target.value)}
                        defaultValue="bars"
                      >
                        <option value="bars">Bars</option>
                        <option value="dots">Dots</option>
                        <option value="lines">Lines</option>
                        <option value="minimal">Minimal</option>
                      </select>
                    </div>
                    
                    {/* Min Width */}
                    <div className="mb-3">
                      <label className="text-white/70 text-sm mb-1 block">Min Width (%)</label>
                      <input 
                        type="range"
                        min="10"
                        max="40"
                        defaultValue="20"
                        className="w-full"
                        onChange={(e) => handleSettingsChange('minWidth', parseInt(e.target.value))}
                      />
                      <span className="text-white/50 text-xs">10% - 40%</span>
                    </div>
                    
                    {/* Max Width */}
                    <div className="mb-3">
                      <label className="text-white/70 text-sm mb-1 block">Max Width (%)</label>
                      <input 
                        type="range"
                        min="60"
                        max="90"
                        defaultValue="80"
                        className="w-full"
                        onChange={(e) => handleSettingsChange('maxWidth', parseInt(e.target.value))}
                      />
                      <span className="text-white/50 text-xs">60% - 90%</span>
                    </div>
                    
                    {/* Default Widths */}
                    <div className="mb-3">
                      <label className="text-white/70 text-sm mb-1 block">Default Split (%)</label>
                      <div className="flex space-x-2">
                        <input 
                          type="number"
                          min="10"
                          max="90"
                          defaultValue="50"
                          className="w-1/2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                          onChange={(e) => handleSettingsChange('defaultSizes', [parseInt(e.target.value), 100 - parseInt(e.target.value)])}
                        />
                        <span className="text-white/50 text-sm flex items-center">:</span>
                        <input 
                          type="number"
                          min="10"
                          max="90"
                          defaultValue="50"
                          className="w-1/2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Brand - Always visible when not in demos */}
          {!showModeSwitch && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <span className="text-white font-medium text-sm">FFSM</span>
            </div>
          )}

          {/* Down Button */}
          <button
            onClick={() => scrollToSection('down')}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Scroll to next section"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
