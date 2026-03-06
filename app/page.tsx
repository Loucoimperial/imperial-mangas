"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mangas as staticMangas } from "./data/mangas";
import { Manga } from "./types/manga";

export default function Home() {

const [allMangas,setAllMangas] = useState<Manga[]>([]);
const [search,setSearch] = useState("");

useEffect(()=>{

const saved = localStorage.getItem("admin_mangas");
const localMangas = saved ? JSON.parse(saved) : [];

setAllMangas([...staticMangas,...localMangas]);

},[]);

const filtered = allMangas.filter(manga =>
manga.title.toLowerCase().includes(search.toLowerCase())
);

const populares = allMangas.slice(0,8);
const recentes = [...allMangas].reverse().slice(0,8);

return(

<div>

{/* BANNER */}

<div className="home-banner">

<div className="banner-overlay">

<h1>Imperial Mangas</h1>
<p>Leia seus mangás favoritos online</p>

<a href="#mangas" className="banner-btn">
📖 Começar a Ler
</a>

</div>

</div>


<div className="container" id="mangas">

{/* BUSCA */}

<input
type="text"
placeholder="Buscar mangá..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>


{/* POPULARES */}

<h2 className="section-title">🔥 Populares</h2>

<div className="horizontal-scroll">

{populares.map((manga)=>(
<Link key={manga.id} href={`/obra/${manga.id}`}>

<div className="card horizontal">

<img
src={`/mangas/${manga.id}/cover.jpg`}
alt={manga.title}
/>

<h2>{manga.title}</h2>

</div>

</Link>
))}

</div>


{/* RECENTES */}

<h2 className="section-title">⚡ Recentes</h2>

<div className="horizontal-scroll">

{recentes.map((manga)=>(
<Link key={manga.id} href={`/obra/${manga.id}`}>

<div className="card horizontal">

<img
src={`/mangas/${manga.id}/cover.jpg`}
alt={manga.title}
/>

<h2>{manga.title}</h2>

</div>

</Link>
))}

</div>


{/* TODOS */}

<h2 className="section-title">📚 Todos os Mangás</h2>

<div className="grid">

{filtered.map((manga)=>(
<Link key={manga.id} href={`/obra/${manga.id}`}>

<div className="card">

<img
src={`/mangas/${manga.id}/cover.jpg`}
alt={manga.title}
/>

<h2>{manga.title}</h2>

</div>

</Link>
))}

</div>

</div>

</div>

);

}