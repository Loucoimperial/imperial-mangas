"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoCapitulo() {
  const router = useRouter();

  const [mangas, setMangas] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [number, setNumber] = useState("");
  const [pages, setPages] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_mangas");
    if (saved) {
      setMangas(JSON.parse(saved));
    }
  }, []);

  function handleAdd() {
    if (!selectedId || !number || !pages) {
      alert("Preencha todos os campos");
      return;
    }

    const updated = mangas.map((manga) => {
      if (manga.id === selectedId) {
        return {
          ...manga,
          chapters: [
            ...manga.chapters,
            {
              number: Number(number),
              pages: Number(pages)
            }
          ]
        };
      }
      return manga;
    });

    localStorage.setItem("admin_mangas", JSON.stringify(updated));

    alert("Capítulo adicionado com sucesso!");
    router.push("/admin");
  }

  return (
    <div className="container">
      <h1>Novo Capítulo</h1>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={{ padding: 10, marginBottom: 10 }}
      >
        <option value="">Selecione o Mangá</option>
        {mangas.map((m) => (
          <option key={m.id} value={m.id}>
            {m.title}
          </option>
        ))}
      </select>

      <input
        placeholder="Número do capítulo"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <input
        placeholder="Quantidade de páginas"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
      />

      <button onClick={handleAdd}>
        Adicionar Capítulo
      </button>
    </div>
  );
}