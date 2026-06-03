import type { Metadata } from "next";
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
  title: "{NÓCTURA} — RITO Y CÓDIGO",
  description:
    "Showcase de experiencias visuales. Diseño premium, rito y código.",
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
      </body>
    </html>
  );
}
