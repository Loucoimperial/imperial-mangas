"use client";

import { useEffect, useState } from "react";

export default function ExcluirCapitulo() {
  const [mangas, setMangas] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_mangas");
    if (saved) {
      setMangas(JSON.parse(saved));
    }
  }, []);

  function handleDelete(capNumber: number) {
    const confirmDelete = confirm("Deseja excluir este capítulo?");
    if (!confirmDelete) return;

    const updated = mangas.map((manga) => {
      if (manga.id === selectedId) {
        return {
          ...manga,
          chapters: manga.chapters.filter(
            (c: any) => c.number !== capNumber
          )
        };
      }
      return manga;
    });

    localStorage.setItem("admin_mangas", JSON.stringify(updated));
    setMangas(updated);
  }

  const selectedManga = mangas.find((m) => m.id === selectedId);

  return (
    <div className="container">
      <h1>Excluir Capítulo</h1>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={{ padding: 10, marginBottom: 20 }}
      >
        <option value="">Selecione o Mangá</option>
        {mangas.map((m) => (
          <option key={m.id} value={m.id}>
            {m.title}
          </option>
        ))}
      </select>

      {selectedManga && (
        <div className="chapter-list">
          {selectedManga.chapters.length === 0 && (
            <p>Este mangá não tem capítulos.</p>
          )}

          {selectedManga.chapters.map((cap: any) => (
            <div key={cap.number} className="chapter">
              <strong>Capítulo {cap.number}</strong>
              <button
                style={{ marginLeft: 10, background: "#900" }}
                onClick={() => handleDelete(cap.number)}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}