"use client";

import { useState } from 'react';
import { DocumentationDrawer } from '@/components/documentation-drawer';

export function Hero() {
  const [isDocDrawerOpen, setIsDocDrawerOpen] = useState(false);

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll to next section
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const openDocumentation = () => {
    setIsDocDrawerOpen(true);
  };

  return (
    <section className="h-[100dvh] flex items-center justify-center px-6 py-12 relative">
      <div className="max-w-5xl mx-auto text-center">
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 mb-12">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Beautiful
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Resizable Panels
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
            A powerful React component library for creating resizable panels with stunning grip styles, smooth animations, and TypeScript support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToDemo}
              className="group backdrop-blur-md bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span className="flex items-center space-x-2">
                <span>Get Started</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </span>
            </button>
            <button 
              onClick={openDocumentation}
              className="backdrop-blur-md bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
            >
              View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Documentation Drawer */}
      <DocumentationDrawer 
        isOpen={isDocDrawerOpen} 
        onClose={() => setIsDocDrawerOpen(false)} 
      />
    </section>
  );
}
