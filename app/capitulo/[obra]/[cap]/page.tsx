"use client";

import { use } from "react";
import Link from "next/link";
import { mangas } from "@/data/mangas";

interface Props {
  params: Promise<{ obra: string; cap: string }>;
}

export default function Capitulo({ params }: Props) {
  const resolvedParams = use(params);

  const obraId = resolvedParams.obra;
  const capNumber = Number(resolvedParams.cap);

  const manga = mangas.find((m) => m.id === obraId);

  if (!manga) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Obra não encontrada.
      </div>
    );
  }

  const chapterIndex = manga.chapters.findIndex(
    (c) => c.number === capNumber
  );

  if (chapterIndex === -1) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Capítulo não encontrado.
      </div>
    );
  }

  const chapter = manga.chapters[chapterIndex];
  const previous = manga.chapters[chapterIndex - 1];
  const next = manga.chapters[chapterIndex + 1];

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Topo */}
        <div className="flex justify-between items-center mb-10">
          <Link
            href={`/obra/${manga.id}`}
            className="text-zinc-400 hover:text-white"
          >
            ← Voltar
          </Link>

          <h1 className="text-xl font-semibold">
            {manga.title} - Cap {chapter.number}
          </h1>

          <div />
        </div>

        {/* Área do capítulo */}
        <div className="bg-zinc-900 p-10 rounded-2xl text-center text-zinc-400">
          Aqui futuramente aparecerão as páginas do capítulo.
        </div>

        {/* Navegação */}
        <div className="flex justify-between mt-10">
          {previous ? (
            <Link
              href={`/capitulo/${manga.id}/${previous.number}`}
              className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl"
            >
              ← Cap Anterior
            </Link>
          ) : <div />}

          {next && (
            <Link
              href={`/capitulo/${manga.id}/${next.number}`}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
            >
              Próximo Cap →
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}