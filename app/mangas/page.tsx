"use client";

import Link from "next/link";
import { mangas } from "../data/mangas";

export default function MangasPage() {

return (

<div className="container">

<h1 className="page-title">
Lista de Mangás
</h1>

<div className="mangas-grid">

{mangas.map((manga)=>(

<Link key={manga.id} href={`/obra/${manga.id}`}>

<div className="manga-card">

<img
src={`/mangas/${manga.id}/cover.jpg`}
alt={manga.title}
/>

<h3>{manga.title}</h3>

</div>

</Link>

))}

</div>

</div>

);

}