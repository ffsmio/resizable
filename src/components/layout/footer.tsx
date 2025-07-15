export function Footer() {
  return (
    <footer className="px-6 pt-32 pb-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <span className="text-white font-medium">FFSM Resizable</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Examples</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-white/50 text-sm">
              © 2025 FFSM Resizable. Built with love for the React community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
