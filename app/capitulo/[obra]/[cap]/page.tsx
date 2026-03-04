"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { mangas as staticMangas } from "../../../data/mangas";

export default function Capitulo({ params }: any) {
  const resolvedParams = use(params);
  const obraId = resolvedParams.obra;
  const capNumber = Number(resolvedParams.cap);

  const [manga, setManga] = useState<any>(null);
  const [chapter, setChapter] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("admin_mangas");
    const localMangas = saved ? JSON.parse(saved) : [];

    const all = [...staticMangas, ...localMangas];
    const found = all.find((m) => m.id === obraId);

    setManga(found);

    const foundChapter = found?.chapters?.find(
      (c: any) => c.number === capNumber
    );

    setChapter(foundChapter);

    if (foundChapter) {
      const pages = [];
      for (let i = 1; i <= foundChapter.pages; i++) {
        pages.push(`/mangas/${obraId}/${capNumber}/${i}.jpg`);
      }
      setImages(pages);
    }
  }, [obraId, capNumber]);

  if (!manga || !chapter)
    return <div className="container">Capítulo não encontrado</div>;

  const index = manga.chapters.findIndex(
    (c: any) => c.number === capNumber
  );

  const prev = manga.chapters[index - 1];
  const next = manga.chapters[index + 1];

  return (
    <div className="reader">
      <h1>{manga.title}</h1>
      <h2>Capítulo {capNumber}</h2>

      <div className="nav">
        {prev && (
          <Link href={`/capitulo/${obraId}/${prev.number}`}>
            ← {prev.number}
          </Link>
        )}
        {next && (
          <Link href={`/capitulo/${obraId}/${next.number}`}>
            {next.number} →
          </Link>
        )}
      </div>

      {images.map((src, i) => (
        <img key={i} src={src} className="reader-img" />
      ))}
    </div>
  );
}