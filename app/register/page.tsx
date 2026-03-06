"use client";

import { useState } from "react";

export default function Register(){

const [email,setEmail] = useState("");
const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

async function register(){

 await fetch("/api/register",{

  method:"POST",

  body:JSON.stringify({
   email,
   username,
   password
  })

 });

 alert("Conta criada");

}

return(

<div className="container">

<h1>Criar Conta</h1>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
placeholder="Usuário"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="Senha"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={register}>
Criar conta
</button>

</div>

);

}