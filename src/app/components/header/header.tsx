'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header({ onSearch }: { onSearch?: (query: string) => void }) {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch?.(value); 
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-400 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-blue-600">Academix</Link>

        <div className="md:flex flex-1 mx-6 max-w-md">
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={handleSearchChange}
            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="hidden md:flex items-center space-x-6">
               <Link
            href="/enroll"
            className="text-blue-600 font-medium hover:underlineshadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Enroll in a Course
          </Link>
          <Link href="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Sign Up</Link>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-7 space-y-4 px-4">
          <nav className="flex flex-col space-y-2">
               <Link
            href="/enroll"
           className="text-white p-2 text-center rounded-2xl font-medium hover:underline bg-blue-500  w-full"
          >
            Enroll in a Course
          </Link>
            <Link href="/login" className="text-white p-2 text-center rounded-2xl font-medium hover:underline bg-blue-500 w-full">Login</Link>
            <Link href="/register" className="text-white p-2 text-center rounded-2xl font-medium hover:underline bg-blue-500  w-full">Sign Up</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
