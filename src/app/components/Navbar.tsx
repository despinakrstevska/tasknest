'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? 'text-indigo-600 font-semibold' : 'text-slate-700';

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* Left section: Logo + Board link */}
      <div className="flex items-center space-x-6">
        <span className="text-2xl font-bold text-indigo-700">Tasknest 🐣</span>
        <Link href="/dashboard" className={isActive('/dashboard')}>
          Dashboard
        </Link>
        <Link href="/board" className={isActive('/board')}>
          Board
        </Link>
      </div>

      {/* Right section: Help + User */}
      <div className="flex items-center space-x-6">
        <Link href="/help" className={isActive('/help')}>
          Help
        </Link>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full font-bold">
            DK
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;