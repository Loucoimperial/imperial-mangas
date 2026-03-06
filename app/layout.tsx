import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Imperial Mangas",
  description: "Leia mangás online gratuitamente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>

        <Navbar />

        <main>
          {children}
        </main>

      </body>
    </html>
  );
}