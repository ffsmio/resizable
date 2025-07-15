export function Features() {
  return (
    <section id="features" className="h-[100dvh] flex flex-col justify-center px-6 py-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features
          </h3>
          <p className="text-white/70 text-lg">
            Everything you need to build amazing resizable interfaces
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Flexible Layouts</h4>
            <p className="text-white/70">Create both horizontal and vertical resizable panels with intuitive controls.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Beautiful Grips</h4>
            <p className="text-white/70">Choose from dots, lines, bars, or minimal grip styles with smooth animations.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">TypeScript Ready</h4>
            <p className="text-white/70">Built with TypeScript for better development experience and type safety.</p>
          </div>
          
          {/* Feature 4 */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Customizable</h4>
            <p className="text-white/70">Extensive customization options for colors, sizes, and behaviors.</p>
          </div>
          
          {/* Feature 5 */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Easy to Use</h4>
            <p className="text-white/70">Simple API and intuitive props make integration effortless.</p>
          </div>
          
          {/* Feature 6 */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Modern React</h4>
            <p className="text-white/70">Built with modern React patterns, hooks, and best practices.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
