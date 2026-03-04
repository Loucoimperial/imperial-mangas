"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditManga({ params }: any) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("mangas");
    if (!raw) return;

    const mangas = JSON.parse(raw);
    const found = mangas.find((m: any) => m.id === id);

    if (!found) {
      setLoading(false);
      return;
    }

    setTitle(found.title);
    setCover(found.cover);
    setDescription(found.description);
    setChapters(found.chapters.join(","));
    setLoading(false);
  }, [id]);

  function saveChanges() {
    const raw = localStorage.getItem("mangas");
    if (!raw) return;

    let mangas = JSON.parse(raw);

    mangas = mangas.map((m: any) =>
      m.id === id
        ? {
            ...m,
            title,
            cover,
            description,
            chapters: chapters
              ? chapters.split(",").map((n: string) => Number(n.trim()))
              : []
          }
        : m
    );

    localStorage.setItem("mangas", JSON.stringify(mangas));

    alert("Mangá atualizado com sucesso!");
    router.push("/admin/mangas");
  }

  if (loading) {
    return <div style={{ padding: 20 }}>Carregando...</div>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h1>✏️ Editar Mangá</h1>

      {/* ID FIXO */}
      <div style={{ marginTop: 10 }}>
        <label style={{ fontWeight: "bold" }}>ID (fixo)</label>
        <input
          value={id}
          disabled
          style={inputStyleDisabled}
        />
      </div>

      {/* TÍTULO */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={inputStyle}
        placeholder="Título"
      />

      {/* CAPA */}
      <input
        value={cover}
        onChange={e => setCover(e.target.value)}
        style={inputStyle}
        placeholder="URL da capa"
      />

      {/* DESCRIÇÃO */}
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ ...inputStyle, height: 80 }}
        placeholder="Descrição"
      />

      {/* CAPÍTULOS */}
      <input
        value={chapters}
        onChange={e => setChapters(e.target.value)}
        style={inputStyle}
        placeholder="Capítulos (ex: 1,2,3,4)"
      />

      <button onClick={saveChanges} style={btnStyle}>
        💾 Salvar Alterações
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: 6,
  border: "1px solid #333",
  background: "#111",
  color: "#fff"
};

const inputStyleDisabled = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: 6,
  border: "1px solid #333",
  background: "#222",
  color: "#888",
  cursor: "not-allowed"
};

const btnStyle = {
  marginTop: 15,
  padding: "10px",
  width: "100%",
  borderRadius: 6,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};