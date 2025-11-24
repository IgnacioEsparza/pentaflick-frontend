import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, List } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Film className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              PentaFlick
            </h1>
          </Link>

          <nav className="flex gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <Film className="w-5 h-5" />
              <span className="hidden sm:inline">Inicio</span>
            </Link>
            <Link
              to="/watched"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/watched'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <List className="w-5 h-5" />
              <span className="hidden sm:inline">Películas Vistas</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
