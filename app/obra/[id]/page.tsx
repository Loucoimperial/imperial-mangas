"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { mangas } from "@/data/mangas";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Obra({ params }: Props) {
  const { id } = use(params);
  const manga = mangas.find((m) => m.id === id);

  if (!manga) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Obra não encontrada
      </div>
    );
  }

  const orderedChapters = [...manga.chapters].reverse();

  return (
    <div className="min-h-screen flex justify-center py-20 bg-[#0b0b0f]">

      <div className="w-full max-w-[1000px] px-6">

        {/* CARD PRINCIPAL */}
        <div className="bg-[#14141a] rounded-md shadow-lg p-6">

          <div className="flex gap-8">

            {/* CAPA */}
            <div className="w-[170px] flex-shrink-0">
              <Image
                src={manga.cover}
                alt={manga.title}
                width={170}
                height={250}
                className="rounded"
              />
            </div>

            {/* INFORMAÇÕES */}
            <div className="flex-1">

              <h1 className="text-xl font-bold mb-3">
                {manga.title}
              </h1>

              <div className="flex gap-2 mb-4">
                <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                  Ação
                </span>
                <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                  Fantasia
                </span>
                <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                  Manhwa
                </span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                {manga.description}
              </p>

              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-400 mb-5">
                <p><span className="text-white">Status:</span> Em andamento</p>
                <p><span className="text-white">Tipo:</span> Manhwa</p>
                <p><span className="text-white">Ano:</span> 2024</p>
                <p><span className="text-white">Autor:</span> Desconhecido</p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/capitulo/${manga.id}/${manga.chapters[0].number}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-4 py-2 rounded font-semibold transition"
                >
                  Primeiro Capítulo
                </Link>

                <Link
                  href={`/capitulo/${manga.id}/${manga.chapters[manga.chapters.length - 1].number}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-4 py-2 rounded font-semibold transition"
                >
                  Último Capítulo
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* CARD CAPÍTULOS */}
        <div className="bg-[#14141a] rounded-md shadow-lg p-6 mt-6">

          <h2 className="text-sm font-semibold mb-4 border-b border-gray-700 pb-2">
            Lista de Capítulos
          </h2>

          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {orderedChapters.map((cap) => (
              <Link
                key={cap.number}
                href={`/capitulo/${manga.id}/${cap.number}`}
                className="bg-[#1c1c24] hover:bg-yellow-500 hover:text-black text-sm p-2 rounded transition flex justify-between"
              >
                <span>Capítulo {cap.number}</span>
                <span>→</span>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}