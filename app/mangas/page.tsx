import Link from "next/link";
import Image from "next/image";
import { mangas } from "@/data/mangas";

export default function MangasPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Lista de Mangás</h1>

      <div className="grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {mangas.map((manga) => (
          <Link key={manga.id} href={`/obra/${manga.id}`}>
            <div className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300 cursor-pointer shadow-lg">
              
              <div className="relative w-full h-44">
                <Image
                  src={manga.cover}
                  alt={manga.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {manga.title}
                </h2>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}