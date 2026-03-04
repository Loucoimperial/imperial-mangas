"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { mangas as staticMangas } from "../../data/mangas";

export default function Obra({ params }: any) {
  const resolvedParams = use(params);
  const [manga, setManga] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin_mangas");
    const localMangas = saved ? JSON.parse(saved) : [];

    const all = [...staticMangas, ...localMangas];

    const found = all.find((m) => m.id === resolvedParams.id);

    setManga(found);

    const u = localStorage.getItem("user");
    if (u && found) {
      const user = JSON.parse(u);
      const favorites = user.favorites || [];
      if (favorites.includes(found.id)) {
        setIsFavorite(true);
      }
    }
  }, [resolvedParams.id]);

  function toggleFavorite() {
    const u = localStorage.getItem("user");
    if (!u || !manga) {
      alert("Você precisa estar logado.");
      return;
    }

    const user = JSON.parse(u);
    let favorites = user.favorites || [];

    if (favorites.includes(manga.id)) {
      favorites = favorites.filter((id: string) => id !== manga.id);
      setIsFavorite(false);
    } else {
      favorites.push(manga.id);
      setIsFavorite(true);
    }

    user.favorites = favorites;
    localStorage.setItem("user", JSON.stringify(user));
  }

  if (!manga) return <div className="container">Carregando...</div>;

  return (
    <div className="container">
      <h1>{manga.title}</h1>

      <button onClick={toggleFavorite}>
        {isFavorite ? "★ Remover dos Favoritos" : "☆ Adicionar aos Favoritos"}
      </button>

      <div className="chapter-list">
        {manga.chapters?.map((cap: any) => (
          <Link
            key={cap.number}
            href={`/capitulo/${manga.id}/${cap.number}`}
          >
            <div className="chapter">
              Capítulo {cap.number}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}