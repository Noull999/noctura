import type { Metadata } from "next";
import Script from "next/script";
import { Anton, JetBrains_Mono, Pirata_One } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const pirata = Pirata_One({
  variable: "--font-pirata",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noctura-wheat.vercel.app"),
  title: "{NÓCTURA} — RITO Y CÓDIGO",
  description:
    "Construimos liturgias digitales. Cada pixel es un sacramento, cada animación un encantamiento. Diseño de experiencias — Puerto Montt, Chile.",
  keywords: ["diseño web", "experiencias digitales", "three.js", "webgl", "ritual", "nóctura"],
  authors: [{ name: "José Esteban Asencio" }],
  creator: "José Esteban Asencio",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://noctura-wheat.vercel.app",
    title: "{NÓCTURA} — RITO Y CÓDIGO",
    description:
      "Construimos liturgias digitales. Cada pixel es un sacramento, cada animación un encantamiento.",
    siteName: "NÓCTURA",
    // Sin `images`: se deja que app/opengraph-image.tsx (generada en
    // runtime con next/og) sea la fuente automática — un `images`
    // explicito aca pisa esa generacion, y apuntaba a /og-image.png,
    // un archivo que nunca existio en public/.
  },
  twitter: {
    card: "summary_large_image",
    title: "{NÓCTURA} — RITO Y CÓDIGO",
    description:
      "Construimos liturgias digitales. Cada pixel es un sacramento.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jetbrains.variable} ${anton.variable} ${pirata.variable} antialiased`}
    >
      <body className="bg-void text-ink font-mono">
        <Providers>{children}</Providers>
        <Script
          defer
          src="https://admingloubal.vercel.app/track.js"
          data-app="glb_071982e96fef"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
