"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          Imperial <span>Mangas</span>
        </Link>

        {/* Links */}
        <div className="nav-links">
          <Link href="/">Início</Link>
          <Link href="/perfil">Perfil</Link>
          <Link href="/admin">Admin</Link>

          {user ? (
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Sair
            </button>
          ) : (
            <Link href="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}