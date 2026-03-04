"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mangas } from "@/app/data/mangas";

interface Props {
  params: {
    obra: string;
    cap: string;
  };
}

export default function Capitulo({ params }: Props) {
  const obraId = params.obra;
  const capNumber = Number(params.cap);

  const [manga, setManga] = useState<any>(null);

  useEffect(() => {
    const found = mangas.find((m) => m.id === obraId);
    setManga(found);
  }, [obraId]);

  if (!manga) {
    return <div style={{ padding: 20 }}>Mangá não encontrado</div>;
  }

  const currentIndex = manga.chapters.indexOf(capNumber);
  const prevCap = manga.chapters[currentIndex - 1];
  const nextCap = manga.chapters[currentIndex + 1];

  return (
    <div style={{ padding: 20 }}>
      <h1>{manga.title}</h1>
      <h2>Capítulo {capNumber}</h2>

      <div style={{ marginTop: 20 }}>
        {[1, 2, 3, 4].map((page) => (
          <img
            key={page}
            src={`/mangas/${obraId}/${capNumber}/${page}.jpg`}
            style={{ width: "100%", marginBottom: 20 }}
          />
        ))}
      </div>

      <div style={{ marginTop: 30, display: "flex", gap: 15 }}>
        {prevCap && (
          <Link href={`/capitulo/${obraId}/${prevCap}`}>
            <button>⬅ Capítulo {prevCap}</button>
          </Link>
        )}

        {nextCap && (
          <Link href={`/capitulo/${obraId}/${nextCap}`}>
            <button>Capítulo {nextCap} ➡</button>
          </Link>
        )}
      </div>
    </div>
  );
}