import { Resizable } from '@ffsm/resizable';

export function BasicDemo() {
  return (
    <section id="demo" className="h-[100dvh] flex flex-col justify-center px-6 py-16 relative bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interactive Demo
          </h3>
          <p className="text-white/70 text-lg">
            Try dragging the resizers to see the magic in action
          </p>
        </div>
        
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8">
          <div className="relative h-[60vh] bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-white/10 overflow-hidden">
            {/* Background pattern for demo */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            
            <div className="relative h-full">
              <Resizable className="h-full" grip="dots">
                <div className="h-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm border-r border-white/10 flex flex-col items-center justify-center p-6">
                  <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-2">Panel One</h4>
                    <p className="text-white/70 text-sm">Drag the resizer to adjust width</p>
                  </div>
                </div>
                <div className="h-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm border-r border-white/10 flex flex-col items-center justify-center p-6">
                  <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-2">Panel Two</h4>
                    <p className="text-white/70 text-sm">Smooth animations included</p>
                  </div>
                </div>
                <div className="h-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 backdrop-blur-sm flex flex-col items-center justify-center p-6">
                  <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-2">Panel Three</h4>
                    <p className="text-white/70 text-sm">TypeScript ready</p>
                  </div>
                </div>
              </Resizable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
