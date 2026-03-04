"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Admin() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) return;

    const parsed = JSON.parse(u);
    setUser(parsed);
  }, []);

  if (!user) {
    return <div style={{ padding: 20 }}>Acesso negado ❌ (não logado)</div>;
  }

  if (user.role !== "admin") {
    return <div style={{ padding: 20 }}>Acesso restrito ao administrador 🔒</div>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>📊 Painel Admin</h1>

      <div style={{ marginTop: 30, display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Link href="/admin/mangas">
          <div style={cardStyle}>📚 Gerenciar Mangás</div>
        </Link>

        <Link href="/admin/users">
          <div style={cardStyle}>👥 Usuários</div>
        </Link>

        <div style={cardStyle}>📈 Estatísticas (futuro)</div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1a1a1a",
  color: "#fff",
  padding: "20px 30px",
  borderRadius: 10,
  cursor: "pointer",
  minWidth: 200,
  textAlign: "center",
};