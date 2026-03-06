"use client";

import { use } from "react";
import Link from "next/link";
import { mangas } from "../../data/mangas";

interface Props {
params: Promise<{ id: string }>;
}

export default function Obra({ params }: Props) {

const resolved = use(params);

const manga = mangas.find((m) => m.id === resolved.id);

if (!manga) {
return <div className="container">Obra não encontrada</div>;
}

const ordered = [...manga.chapters].reverse();

return (

<div className="obra-wrapper">

<div className="obra-card">

<img
src={`/mangas/${manga.id}/cover.jpg`}
className="obra-cover"
alt={manga.title}
/>

<div className="obra-info">

<h1>{manga.title}</h1>

{/* GENEROS */}

<div className="genres">
<span>Ação</span>
<span>Fantasia</span>
<span>Aventura</span>
</div>

{/* INFO */}

<div className="obra-meta">

<p>
<strong>Autor:</strong> {manga.author}
</p>

<p>
<strong>Status:</strong> {manga.status}
</p>

<p>
<strong>Ano:</strong> {manga.year}
</p>

</div>

{/* DESCRIÇÃO */}

<div className="obra-description">

<h3>Descrição</h3>

<p>
{manga.description}
</p>

</div>

{/* BOTÕES */}

<div className="obra-buttons">

<Link
href={`/capitulo/${manga.id}/${manga.chapters[0].number}`}
className="gold-btn"
>
Primeiro Capítulo
</Link>

<Link
href={`/capitulo/${manga.id}/${manga.chapters[manga.chapters.length - 1].number}`}
className="gold-btn"
>
Último Capítulo
</Link>

<button className="fav-btn">
⭐ Favoritar
</button>

</div>

</div>
</div>

{/* CAPITULOS */}

<div className="chapters-card">

<h2>Lista de Capítulos</h2>

{ordered.map((cap) => (

<Link
key={cap.number}
href={`/capitulo/${manga.id}/${cap.number}`}
className="chapter-item"
>
Capítulo {cap.number}
</Link>

))}

</div>

</div>

);
}