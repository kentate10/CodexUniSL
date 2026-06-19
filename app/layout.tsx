import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.usloccidente.com"),
  title: "Universidad Santa Lucía - Sede Occidente",
  description:
    "Educación con Excelencia para Todos. Carreras técnicas, bachilleratos, licenciaturas y maestrías en Alajuela y San Carlos.",
  openGraph: {
    title: "Universidad Santa Lucía - Sede Occidente",
    description:
      "30 años de trayectoria, más de 25.000 egresados, sedes en Alajuela y San Carlos.",
    url: "https://www.usloccidente.com",
    siteName: "USL Occidente",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "https://usercontent.one/wp/www.usloccidente.com/wp-content/uploads/2023/06/Header.webp",
        width: 1920,
        height: 1080,
        alt: "Universidad Santa Lucía Occidente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universidad Santa Lucía - Sede Occidente",
    description:
      "Conocé la oferta académica de USL Occidente en Alajuela y San Carlos.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CR">
      <body>{children}</body>
    </html>
  );
}
