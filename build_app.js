const fs = require('fs');
const path = require('path');

const rootDir = 'd:/lisda-site';

// Helper to ensure dir and write file
function writeFile(relativePath, content) {
  const filePath = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Wrote: ${relativePath}`);
}

// 1. Header component
const headerContent = `'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Équipe', href: '/equipe' },
    { name: 'Phytothèque', href: '/phytotheque' },
    { name: 'Documents', href: '/documents' },
    { name: 'Projets & Impact', href: '/projets-impact' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top bar info */}
      <div className="w-full bg-[#001d07] text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-300">
            <span className="flex items-center gap-1">
              📍 Dombe, Kribi (Cameroun)
            </span>
            <span className="hidden lg:inline text-gray-500">•</span>
            <a href="mailto:Patrice_segbe@yahoo.fr" className="hover:text-[#feb323] transition-colors flex items-center gap-1">
              ✉️ Patrice_segbe@yahoo.fr
            </a>
            <span className="hidden lg:inline text-gray-500">•</span>
            <a href="tel:+237677593239" className="hover:text-[#feb323] transition-colors flex items-center gap-1">
              📞 +237 677 593 239
            </a>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-gray-400 text-xs hidden sm:inline">LISDA ONG • Bassin du Congo</span>
            <span className="bg-[#083415] px-2.5 py-0.5 rounded-full text-[10px] text-[#feb323] border border-[#feb323]/30">ONG Déclarée</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          {/* Logo LISDA */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-[#083415] text-[#feb323] font-bold flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
              🌿
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#083415] group-hover:text-[#001d07] transition-colors">LISDA ONG</span>
              <span className="text-[10px] text-gray-500 font-medium leading-tight hidden sm:block">
                Local Initiatives for a Sustainable Development in Africa
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#f0eee9] p-1.5 rounded-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={\`px-4 py-2 rounded-full text-sm font-semibold transition-all \${
                    isActive
                      ? 'bg-[#083415] text-white shadow-sm'
                      : 'text-gray-700 hover:text-[#083415] hover:bg-gray-200/60'
                  }\`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/devenir-membre"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-[#083415] hover:bg-[#f5f3ee] transition-all"
            >
              Devenir membre
            </Link>
            <Link
              href="/faire-un-don"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold bg-[#feb323] text-[#6b4800] hover:bg-[#f5ab19] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              ❤️ Faire un don
            </Link>

            {/* Mobile Toggle */}
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

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-gray-800 hover:bg-gray-100"
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
                Devenir membre
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
`;

// 2. Footer component
const footerContent = `import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#001d07] text-white pt-16 pb-12 border-t border-[#083415]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Col */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#083415] text-[#feb323] font-bold flex items-center justify-center text-lg border border-[#feb323]/20">
              🌿
            </div>
            <span className="font-bold text-xl text-white">LISDA ONG</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Local Initiatives for a Sustainable Development in Africa. Ancrée à Dombe, Kribi (Cameroun), l'ONG agit pour la biodiversité du Bassin du Congo et la résilience des communautés.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="w-8 h-8 rounded-full bg-[#083415] text-[#feb323] flex items-center justify-center text-sm">🌍</span>
            <span className="w-8 h-8 rounded-full bg-[#083415] text-[#feb323] flex items-center justify-center text-sm">🤝</span>
            <span className="w-8 h-8 rounded-full bg-[#083415] text-[#feb323] flex items-center justify-center text-sm">📜</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-base text-[#feb323] mb-4 uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
            <li><Link href="/equipe" className="hover:text-white transition-colors">À propos & Équipe</Link></li>
            <li><Link href="/phytotheque" className="hover:text-white transition-colors">Phytothèque</Link></li>
            <li><Link href="/documents" className="hover:text-white transition-colors">Documents & Publications</Link></li>
            <li><Link href="/projets-impact" className="hover:text-white transition-colors">Projets & Impact</Link></li>
          </ul>
        </div>

        {/* Engagement */}
        <div>
          <h4 className="font-bold text-base text-[#feb323] mb-4 uppercase tracking-wider">Agir avec nous</h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li><Link href="/devenir-membre" className="hover:text-white transition-colors">Devenir membre ou bénévole</Link></li>
            <li><Link href="/faire-un-don" className="hover:text-white transition-colors">Faire un don ponctuel ou mensuel</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Devenir partenaire institutionnel</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Chefferies & Communautés Bagyeli</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold text-base text-[#feb323] mb-4 uppercase tracking-wider">Siège Social & Contact</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Dombe, Kribi (Littoral Atlantique, Cameroun)</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:Patrice_segbe@yahoo.fr" className="hover:text-[#feb323] transition-colors">Patrice_segbe@yahoo.fr</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+237677593239" className="hover:text-[#feb323] transition-colors">+237 677 593 239</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-[#083415] flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© {new Date().getFullYear()} LISDA ONG. Tous droits réservés. Bassin du Congo - Kribi, Cameroun.</p>
        <div className="flex gap-6">
          <Link href="/contact" className="hover:text-gray-300">Mentions Légales</Link>
          <Link href="/contact" className="hover:text-gray-300">Politique de Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
`;

writeFile('src/components/Header.tsx', headerContent);
writeFile('src/components/Footer.tsx', footerContent);

console.log('Components built successfully!');
