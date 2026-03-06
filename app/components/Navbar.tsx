"use client";

import Link from "next/link";

export default function Navbar() {

return (

<nav className="navbar">

<div className="nav-container">

<Link href="/" className="logo">
Imperial <span>Mangas</span>
</Link>

<div className="nav-links">

<Link href="/">Início</Link>

<Link href="/mangas">Mangás</Link>

<Link href="/login">Login</Link>

</div>

</div>

</nav>

);

}