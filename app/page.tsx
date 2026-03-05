"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { mangas as staticMangas } from "./data/mangas";

export default function Home() {
  const [allMangas, setAllMangas] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_mangas");
    const localMangas = saved ? JSON.parse(saved) : [];
    setAllMangas([...staticMangas, ...localMangas]);
  }, []);

  const filtered = allMangas.filter((manga) =>
    manga.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* 🔥 HERO CINEMATOGRÁFICO */}
      <section className="relative h-[520px] flex items-center justify-center text-center overflow-hidden">

        <Image
          src="/banner.jpg"
          alt="Banner"
          fill
          priority
          className="object-cover animate-[zoom_15s_ease-in-out_infinite_alternate]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-[#0b0b0f]" />

        <div className="relative z-10 max-w-3xl px-6 animate-[fadeUp_1.2s_ease-out]">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
            Imperial <span className="text-red-500">Mangas</span>
          </h1>

          <p className="text-lg text-gray-300 mb-8">
            Leia seus mangás favoritos online com qualidade premium.
          </p>

          <a
            href="#mangas"
            className="inline-block bg-red-500 hover:bg-red-600 transition px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-red-500/40 hover:scale-105 duration-300"
          >
            📖 Começar a Ler
          </a>
        </div>
      </section>

      {/* 📚 LISTA */}
      <section id="mangas" className="max-w-6xl mx-auto px-6 py-16">

        <input
          type="text"
          placeholder="Buscar mangá..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-12 px-5 py-4 rounded-xl bg-[#14141a] border border-white/10 focus:outline-none focus:border-red-500 transition"
        />

        {filtered.length === 0 ? (
          <p className="text-gray-400">Nenhum mangá encontrado.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {filtered.map((manga) => (
              <Link key={manga.id} href={`/obra/${manga.id}`}>
                <div className="group bg-[#14141a] rounded-xl overflow-hidden hover:-translate-y-2 transition duration-300 cursor-pointer shadow-lg hover:shadow-red-500/20">

                  <div className="relative w-full h-[300px] overflow-hidden">
                    <Image
                      src={`/mangas/${manga.id}/cover.jpg`}
                      alt={manga.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="text-sm font-semibold truncate group-hover:text-red-400 transition">
                      {manga.title}
                    </h2>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}