import Link from "next/link";

type Props = {
  title: string;
  cover: string;
  id: string;
};

export default function MangaCard({ title, cover, id }: Props) {
  return (
    <Link href={`/obra/${id}`}>
      <div style={{
        background: "#1a1a1a",
        borderRadius: 8,
        overflow: "hidden",
        width: 160,
        color: "#fff",
        textAlign: "center",
        cursor: "pointer"
      }}>
        <img 
          src={cover} 
          style={{ width: "100%", height: 220, objectFit: "cover" }} 
        />
        <div style={{ padding: 8 }}>
          <h3 style={{ fontSize: 14 }}>{title}</h3>
        </div>
      </div>
    </Link>
  );
}