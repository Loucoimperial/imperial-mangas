"use client";

import { useEffect, useState } from "react";
import { mangas as staticMangas } from "@/app/data/mangas";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default function Obra({ params }: Props) {
  const id = params.id;

  const [manga, setManga] = useState<any>(null);

  useEffect(() => {
    const local = localStorage.getItem("admin_mangas");
    const localMangas = local ? JSON.parse(local) : [];

    const all = [...staticMangas, ...localMangas];

    const found = all.find((m) => m.id === id);

    setManga(found);
  }, [id]);

  if (!manga) {
    return <div style={{ padding: 20 }}>Mangá não encontrado</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{manga.title}</h1>

      <h2 style={{ marginTop: 20 }}>Capítulos</h2>

      <ul style={{ marginTop: 10 }}>
        {manga.chapters.map((cap: any) => (
          <li key={cap.number}>
            <Link href={`/capitulo/${manga.id}/${cap.number}`}>
              Capítulo {cap.number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}