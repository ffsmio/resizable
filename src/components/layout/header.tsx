"use client";

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 px-6 py-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">FFSM Resizable</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <a 
                href="#demo" 
                onClick={(e) => handleNavClick(e, 'demo')}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                Demo
              </a>
              <a 
                href="#features" 
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                Features
              </a>
              <a 
                href="#demos" 
                onClick={(e) => handleNavClick(e, 'demos')}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                Demos
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
