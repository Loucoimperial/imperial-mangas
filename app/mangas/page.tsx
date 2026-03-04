"use client";

import { mangas } from "../data/mangas";
import MangaCard from "../components/MangaCard";

export default function MangasPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Mangás</h1>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {mangas.map((manga) => (
          <MangaCard
            key={manga.id}
            id={manga.id}
            title={manga.title}
            cover={manga.cover}
          />
        ))}
      </div>
    </div>
  );
}