import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Imperial Mangas",
  description: "Leia mangás online no Imperial Mangas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0b0b0f] text-white min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}