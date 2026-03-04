"use client";

import { useEffect, useState } from "react";
import { mangas } from "../data/mangas";
import Link from "next/link";

export default function Perfil() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) return;
    setUser(JSON.parse(u));
  }, []);

  if (!user || !user.logged) {
    return <div>Acesso restrito</div>;
  }

  return (
    <div className="container">
      <h1>Perfil</h1>

      <h2>Favoritos</h2>
      {user.favorites?.map((fav: string) => {
        const manga = mangas.find(m => m.id === fav);
        return (
          <Link key={fav} href={`/obra/${fav}`}>
            <div>{manga?.title}</div>
          </Link>
        );
      })}

      <h2>Histórico</h2>
      {user.history?.map((h: any, i: number) => (
        <Link
          key={i}
          href={`/capitulo/${h.mangaId}/${h.chapter}`}
        >
          <div>
            {h.mangaId} - Capítulo {h.chapter}
          </div>
        </Link>
      ))}
    </div>
  );
}