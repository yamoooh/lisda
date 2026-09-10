import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SchemaOrg from "@/components/SchemaOrg";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lisda-site.vercel.app"),
  title: "LISDA ONG - Développement Local Durable Afrique, Kribi Cameroun",
  description: "LISDA (Local Initiatives for a Sustainable Development in Africa) à Dombe, Kribi. Association humanitaire pour la biodiversité du Bassin du Congo et la dignité des peuples autochtones Bagyeli.",
  keywords: ["LISDA", "développement local durable Afrique", "ONG Cameroun", "communautés autochtones", "bassin du Congo", "Kribi", "Bagyeli"],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  openGraph: {
    title: "LISDA ONG - Bassin du Congo, Kribi Cameroun",
    description: "Association humanitaire dédiée au développement local durable et à la préservation du Bassin du Congo.",
    url: "https://lisda-site.org",
    siteName: "LISDA ONG",
    type: "website",
    images: [
      { url: "/logo-officiel.png", width: 500, height: 500, alt: "Logo LISDA ONG" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <SchemaOrg />
      </head>
      <body className="min-h-full flex flex-col bg-[#fbf9f4] text-[#1b1c19]">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
