"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
    }
  }, []);

  function handleLogout() {
    if (!user) return;

    const updatedUser = {
      ...user,
      logged: false
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.location.href = "/";
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link href="/" className="logo">
          Imperial Mangas
        </Link>

        <div className="nav-links">
          {user?.logged ? (
            <>
              <Link href="/perfil">Perfil</Link>
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}