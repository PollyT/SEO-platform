
import React from 'react';

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onLogoClick}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">S</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            SEO Title Master
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Tools</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Docs</a>
          <button className="text-sm font-semibold bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors">
            Get Pro
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
