"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mangas as initialMangas } from "@/app/data/mangas";

export default function AdminMangas() {
  const [mangas, setMangas] = useState<any[]>([]);

  useEffect(() => {
    const local = localStorage.getItem("mangas");

    if (local) {
      setMangas(JSON.parse(local));
    } else {
      localStorage.setItem("mangas", JSON.stringify(initialMangas));
      setMangas(initialMangas);
    }
  }, []);

  function deleteManga(id: string) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este mangá?");
    if (!confirmDelete) return;

    const updated = mangas.filter(m => m.id !== id);
    setMangas(updated);
    localStorage.setItem("mangas", JSON.stringify(updated));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Gerenciar Mangás</h1>

      {/* BOTÃO NOVO */}
      <Link href="/admin/mangas/novo">
        <button
          style={{
            marginTop: 15,
            marginBottom: 20,
            padding: "10px 16px",
            borderRadius: 6,
            background: "#16a34a",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          ➕ Novo Mangá
        </button>
      </Link>

      {/* VOLTAR */}
      <div>
        <Link href="/admin">
          <button
            style={{
              marginBottom: 20,
              padding: "8px 14px",
              borderRadius: 6,
              background: "#333",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            ⬅ Voltar ao Painel
          </button>
        </Link>
      </div>

      {/* LISTA */}
      {mangas.length === 0 && <p>Nenhum mangá cadastrado.</p>}

      {mangas.map(manga => (
        <div
          key={manga.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#111",
            padding: 12,
            borderRadius: 6,
            marginBottom: 10
          }}
        >
          <div>
            <strong>{manga.title}</strong>
            <p style={{ fontSize: 12, opacity: 0.7 }}>
              {manga.description}
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {/* EDITAR */}
            <Link href={`/admin/mangas/${manga.id}`}>
              <button
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  background: "#444",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                ✏️ Editar
              </button>
            </Link>

            {/* EXCLUIR */}
            <button
              onClick={() => deleteManga(manga.id)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                background: "#dc2626",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}
            >
              🗑 Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}