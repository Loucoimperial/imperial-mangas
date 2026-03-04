import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Imperial Mangas",
  description: "Plataforma privada",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}