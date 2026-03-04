"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoManga() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  function handleCreate() {
    if (!title || !id) {
      alert("Preencha todos os campos");
      return;
    }

    const existing = localStorage.getItem("admin_mangas");
    let mangas = existing ? JSON.parse(existing) : [];

    mangas.push({
      id,
      title,
      chapters: []
    });

    localStorage.setItem("admin_mangas", JSON.stringify(mangas));

    alert("Mangá criado com sucesso!");
    router.push("/admin");
  }

  return (
    <div className="container">
      <h1>Novo Mangá</h1>

      <input
        placeholder="ID (ex: solo-leveling)"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={handleCreate}>
        Criar Mangá
      </button>
    </div>
  );
}