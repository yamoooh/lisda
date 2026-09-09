const fs = require('fs');
const path = require('path');

const rootDir = 'd:/lisda-site';

function writeFile(relativePath, content) {
  const filePath = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Built: ${relativePath}`);
}

// 1. Supabase Client Configuration & Fallback Storage (src/lib/supabase.ts)
const supabaseContent = `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Membre {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motivation: string;
  newsletter: boolean;
  date_inscription?: string;
}

export interface Donateur {
  id?: string;
  nom: string;
  prenom: string;
  montant: number;
  type_don: string;
  anonyme: boolean;
  accord_affichage: boolean;
  date_don?: string;
}

export interface DocumentOfficiel {
  id: string;
  titre: string;
  categorie: string;
  annee: string;
  url: string;
}

export interface PhotoPhototheque {
  id: string;
  titre: string;
  categorie: string;
  url: string;
  date: string;
}
`;

// 2. WhatsApp Floating Button (src/components/WhatsAppButton.tsx)
const whatsappContent = `'use client';

export default function WhatsAppButton() {
  const phone = '237677593239';
  const text = encodeURIComponent("Bonjour LISDA, je souhaite avoir plus d'informations sur vos actions.");
  const waUrl = \`https://wa.me/\${phone}?text=\${text}\`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter LISDA sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-sm"
    >
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      <span className="hidden sm:inline">WhatsApp LISDA</span>
    </a>
  );
}
`;

// 3. SchemaOrg JSON-LD (src/components/SchemaOrg.tsx)
const schemaContent = `export default function SchemaOrg() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "LISDA ONG (Local Initiatives for a Sustainable Development in Africa)",
    "url": "https://lisda-site.org",
    "logo": "https://lisda-site.org/logo.png",
    "description": "Association humanitaire et de développement durable basée à Kribi (Cameroun), œuvrant pour la biodiversité du Bassin du Congo et la dignité des peuples autochtones Bagyeli.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dombe",
      "addressLocality": "Kribi",
      "addressRegion": "Sud",
      "addressCountry": "CM"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+237677593239",
      "contactType": "customer service",
      "email": "Patrice_segbe@yahoo.fr"
    },
    "founder": {
      "@type": "Person",
      "name": "NSEGBE Patrice"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
`;

// 4. Sitemap Generator (src/app/sitemap.ts)
const sitemapContent = `import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lisda-site.org';
  const routes = [
    '',
    '/a-propos',
    '/equipe',
    '/phototheque',
    '/documents',
    '/projets-impact',
    '/contribution',
    '/faire-un-don',
    '/devenir-membre',
    '/contact',
  ];

  return routes.map((route) => ({
    url: \`\${baseUrl}\${route}\`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
`;

// 5. Robots Generator (src/app/robots.ts)
const robotsContent = `import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: 'https://lisda-site.org/sitemap.xml',
  };
}
`;

// 6. Updated Header (src/components/Header.tsx)
const headerContent = `'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'Équipe', href: '/equipe' },
    { name: 'Photothèque', href: '/phototheque' },
    { name: 'Documents', href: '/documents' },
    { name: 'Projets & Impact', href: '/projets-impact' },
    { name: 'Contribution', href: '/contribution' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <div className="w-full bg-[#001d07] text-white py-2 px-4 text-xs border-b border-[#083415]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-300">
            <span>📍 Dombe, Kribi (Cameroun)</span>
            <span className="hidden lg:inline text-gray-600">•</span>
            <a href="mailto:Patrice_segbe@yahoo.fr" className="hover:text-[#feb323] transition-colors">
              ✉️ Patrice_segbe@yahoo.fr
            </a>
            <span className="hidden lg:inline text-gray-600">•</span>
            <a href="tel:+237677593239" className="hover:text-[#feb323] transition-colors">
              📞 +237 677 593 239
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#083415] px-2.5 py-0.5 rounded-full text-[10px] text-[#feb323] border border-[#feb323]/30 font-semibold">
              Association Déclarée - Récépissé Officiel
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-[#083415] text-[#feb323] font-bold flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
              🌿
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#083415]">LISDA ONG</span>
              <span className="text-[10px] text-gray-500 font-medium leading-tight hidden sm:block">
                Local Initiatives for a Sustainable Development in Africa
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1 bg-[#f0eee9] p-1.5 rounded-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={\`px-3.5 py-2 rounded-full text-xs font-semibold transition-all \${
                    isActive
                      ? 'bg-[#083415] text-white shadow-sm font-bold'
                      : 'text-gray-700 hover:text-[#083415] hover:bg-gray-200/60'
                  }\`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/devenir-membre"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold text-[#083415] hover:bg-[#f5f3ee] transition-all"
            >
              Devenir membre
            </Link>
            <Link
              href="/faire-un-don"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold bg-[#feb323] text-[#6b4800] hover:bg-[#f5ab19] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              ❤️ Faire un don
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Menu Mobile"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-800 hover:bg-gray-100"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/devenir-membre"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full text-sm font-bold text-[#083415] bg-[#f5f3ee]"
              >
                Devenir membre (Gratuit)
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
`;

// 7. Updated Layout (src/app/layout.tsx)
const layoutContent = `import type { Metadata } from "next";
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
  title: "LISDA ONG - Développement Local Durable Afrique, Kribi Cameroun",
  description: "LISDA (Local Initiatives for a Sustainable Development in Africa) à Dombe, Kribi. Association humanitaire pour la biodiversité du Bassin du Congo et la dignité des peuples autochtones Bagyeli.",
  keywords: ["LISDA", "développement local durable Afrique", "ONG Cameroun", "communautés autochtones", "bassin du Congo", "Kribi", "Bagyeli"],
  openGraph: {
    title: "LISDA ONG - Bassin du Congo, Kribi Cameroun",
    description: "Association humanitaire dédiée au développement local durable et à la préservation du Bassin du Congo.",
    url: "https://lisda-site.org",
    siteName: "LISDA ONG",
    type: "website",
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
      className={\`\${montserrat.variable} \${inter.variable} h-full antialiased scroll-smooth\`}
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
`;

writeFile('src/lib/supabase.ts', supabaseContent);
writeFile('src/components/WhatsAppButton.tsx', whatsappContent);
writeFile('src/components/SchemaOrg.tsx', schemaContent);
writeFile('src/app/sitemap.ts', sitemapContent);
writeFile('src/app/robots.ts', robotsContent);
writeFile('src/components/Header.tsx', headerContent);
writeFile('src/app/layout.tsx', layoutContent);

console.log('Core components and SEO files generated successfully!');
