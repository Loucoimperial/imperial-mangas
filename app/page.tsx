"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
      {/* 🔥 BANNER */}
      <div className="home-banner">
        <div className="banner-overlay left">
          <h1>Imperial Mangas</h1>
          <p>Leia seus mangás favoritos online</p>

          <a href="#mangas" className="banner-btn">
            📖 Começar a Ler
          </a>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="container" id="mangas">
        <input
          type="text"
          placeholder="Buscar mangá..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid">
          {filtered.length === 0 && (
            <p>Nenhum mangá encontrado.</p>
          )}

          {filtered.map((manga) => (
            <Link key={manga.id} href={`/obra/${manga.id}`}>
              <div className="card">
                <img
                  src={`/mangas/${manga.id}/cover.jpg`}
                  alt={manga.title}
                  onError={(e: any) => (e.target.src = "/logo.png")}
                />
                <h2>{manga.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}