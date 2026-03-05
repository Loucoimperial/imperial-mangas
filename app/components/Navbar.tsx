"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-bold">
          Imperial <span className="text-red-500">Mangas</span>
        </Link>

        <nav className="flex gap-6 text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition">
            Início
          </Link>
          <Link href="/mangas" className="hover:text-white transition">
            Mangás
          </Link>
        </nav>

      </div>
    </header>
  );
}