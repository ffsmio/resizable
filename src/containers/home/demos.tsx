'use client';

import { useEffect, useRef, useState } from 'react';
import { Resizable } from '@ffsm/resizable';

interface DemosProps {
  mode: 'vertical' | 'horizontal';
  onModeChange: (mode: 'vertical' | 'horizontal') => void;
  onEnterSection: () => void;
  onLeaveSection: () => void;
}

type GripVariant = 'bars' | 'dots' | 'lines' | 'minimal';

interface ResizableSettings {
  grip: GripVariant;
  minWidth: number;
  maxWidth: number;
  defaultSizes: number[];
}

export function Demos({ mode, onEnterSection, onLeaveSection }: DemosProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [settings, setSettings] = useState<ResizableSettings>({
    grip: 'bars',
    minWidth: 20,
    maxWidth: 80,
    defaultSizes: [50, 50]
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
            onEnterSection();
          } else {
            onLeaveSection();
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onEnterSection, onLeaveSection]);

  useEffect(() => {
    const handleSettingsChange = (event: CustomEvent) => {
      const { setting, value } = event.detail;
      setSettings(prev => ({
        ...prev,
        [setting]: value
      }));
    };

    window.addEventListener('resizable-settings-change', handleSettingsChange as EventListener);
    return () => window.removeEventListener('resizable-settings-change', handleSettingsChange as EventListener);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="demos" 
      className="h-[100dvh] flex flex-col justify-center px-6 py-16 relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interactive Demos
          </h3>
          <p className="text-white/70 text-lg">
            Switch between vertical and horizontal layouts
          </p>
        </div>
        
        <div className="relative h-[70vh] overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(${mode === 'vertical' ? '0%' : '-50%'})`,
              width: '200%'
            }}
          >
            {/* Vertical Demo */}
            <div className="w-1/2 px-4 relative">
              <div 
                className="h-full transition-all duration-700 ease-in-out"
                style={{
                  transform: mode === 'vertical' 
                    ? 'perspective(1000px) rotateY(0deg)' 
                    : 'perspective(1000px) rotateY(45deg)',
                  transformOrigin: 'right center'
                }}
              >
                <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 h-full">
                  <div className="relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-white/10 overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20" />
                    
                    <Resizable
                      horizontal={true}
                      defaultSizes={settings.defaultSizes}
                      minWidth={settings.minWidth}
                      maxWidth={settings.maxWidth}
                      className="h-full w-full"
                      grip={settings.grip}
                    >
                      <div className="p-6 flex items-center justify-center text-white">
                        <div className="text-center">
                          <h4 className="text-xl font-semibold mb-2">Left Panel</h4>
                          <p className="text-white/70">Vertical layout divides panels horizontally</p>
                        </div>
                      </div>
                      <div className="p-6 flex items-center justify-center text-white">
                        <div className="text-center">
                          <h4 className="text-xl font-semibold mb-2">Right Panel</h4>
                          <p className="text-white/70">Drag the resizer to resize panels</p>
                        </div>
                      </div>
                    </Resizable>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Demo */}
            <div className="w-1/2 px-4 relative">
              <div 
                className="h-full transition-all duration-700 ease-in-out"
                style={{
                  transform: mode === 'horizontal' 
                    ? 'perspective(1000px) rotateY(0deg)' 
                    : 'perspective(1000px) rotateY(-45deg)',
                  transformOrigin: 'left center'
                }}
              >
                <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 h-full">
                  <div className="relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-white/10 overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20" />
                    
                    <Resizable
                      horizontal={false}
                      defaultSizes={settings.defaultSizes}
                      minWidth={settings.minWidth}
                      maxWidth={settings.maxWidth}
                      className="h-full w-full"
                      grip={settings.grip}
                    >
                      <div className="p-6 flex items-center justify-center text-white">
                        <div className="text-center">
                          <h4 className="text-xl font-semibold mb-2">Top Panel</h4>
                          <p className="text-white/70">Horizontal layout stacks panels vertically</p>
                        </div>
                      </div>
                      <div className="p-6 flex items-center justify-center text-white">
                        <div className="text-center">
                          <h4 className="text-xl font-semibold mb-2">Bottom Panel</h4>
                          <p className="text-white/70">Drag the resizer above to resize</p>
                        </div>
                      </div>
                    </Resizable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
