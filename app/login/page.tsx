"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email || !password) {
      alert("Preencha email e senha");
      return;
    }

    const existing = localStorage.getItem("user");
    let oldData: any = existing ? JSON.parse(existing) : {};

    let role = "user";

    // 🔐 ADMIN FIXO
    if (email === "admin@imperial.com" && password === "123456") {
      role = "admin";
    }

    const newUser = {
      ...oldData,
      email,
      logged: true,
      role
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/perfil");
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}