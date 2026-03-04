"use client";

import { useEffect, useState } from "react";
import { mangas as staticMangas } from "../data/mangas";
import Link from "next/link";

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [localMangas, setLocalMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem("user");

    if (!u) {
      setLoading(false);
      return;
    }

    const user = JSON.parse(u);

    // 🔐 PROTEÇÃO REAL
    if (user.logged && user.role === "admin") {
      setAuthorized(true);
    }

    const saved = localStorage.getItem("admin_mangas");
    if (saved) {
      setLocalMangas(JSON.parse(saved));
    }

    setLoading(false);
  }, []);

  function handleDelete(id: string) {
    const confirmDelete = confirm("Deseja realmente excluir este mangá?");
    if (!confirmDelete) return;

    const updated = localMangas.filter((m) => m.id !== id);

    localStorage.setItem("admin_mangas", JSON.stringify(updated));
    setLocalMangas(updated);
  }

  if (loading) {
    return <div className="container">Carregando...</div>;
  }

  if (!authorized) {
    return (
      <div className="container">
        <h1>Acesso negado</h1>
        <p>Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Painel Administrativo</h1>

      {/* BOTÕES ADMIN */}
      <div style={{ margin: "20px 0", display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/admin/mangas/novo">
          <button>+ Novo Mangá</button>
        </Link>

        <Link href="/admin/capitulos/novo">
          <button>+ Novo Capítulo</button>
        </Link>

        <Link href="/admin/capitulos/excluir">
          <button style={{ background: "#900" }}>
            - Excluir Capítulo
          </button>
        </Link>
      </div>

      {/* MANGÁS FIXOS */}
      <h2>Mangás Fixos (Sistema)</h2>

      <div className="chapter-list">
        {staticMangas.map((manga) => (
          <div key={manga.id} className="chapter">
            <strong>{manga.title}</strong>
            <div>Total capítulos: {manga.chapters.length}</div>
          </div>
        ))}
      </div>

      {/* MANGÁS ADMIN */}
      <h2 style={{ marginTop: 40 }}>Mangás Criados pelo Admin</h2>

      {localMangas.length === 0 && (
        <p>Nenhum mangá criado ainda.</p>
      )}

      <div className="chapter-list">
        {localMangas.map((manga) => (
          <div key={manga.id} className="chapter">
            <strong>{manga.title}</strong>
            <div>ID: {manga.id}</div>
            <div>Total capítulos: {manga.chapters.length}</div>

            <button
              style={{ marginTop: 10, background: "#900" }}
              onClick={() => handleDelete(manga.id)}
            >
              Excluir Mangá
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}