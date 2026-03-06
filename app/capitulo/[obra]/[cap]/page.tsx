"use client";

import { use } from "react";
import Image from "next/image";

interface Props {
  params: Promise<{ obra: string; cap: string }>;
}

export default function Capitulo({ params }: Props) {
  const resolvedParams = use(params);

  const obra = resolvedParams.obra;
  const cap = resolvedParams.cap;

  const pages = [1,2,3,4,5,6,7,8,9,10];

  return (
    <div className="container">

      <h1 style={{ marginBottom: "30px" }}>
        Capítulo {cap}
      </h1>

      <div
        style={{
          maxWidth: "800px",
          margin: "auto"
        }}
      >
        {pages.map((page) => (
          <Image
            key={page}
            src={`/mangas/${obra}/${cap}/${page}.jpg`}
            alt={`Página ${page}`}
            width={800}
            height={1200}
            style={{
              width: "100%",
              height: "auto",
              marginBottom: "10px"
            }}
          />
        ))}
      </div>

    </div>
  );
}