import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      {/* IBM Header */}
      <header className="bg-[#161616] text-white h-12 flex items-center px-4 md:px-12 sticky top-0 z-50 border-b border-[#393939]">
        <Link to="/" className="flex items-center gap-2 hover:bg-[#262626] h-full px-4 -ml-4 transition-colors">
          <div className="font-semibold text-sm tracking-wide">Agenda Técnica 2026</div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#f4f4f4] py-12 px-4 md:px-12 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-4">IBM España</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:underline">Contactar</a></li>
              <li><a href="#" className="hover:underline">Privacidad</a></li>
              <li><a href="#" className="hover:underline">Términos de uso</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
