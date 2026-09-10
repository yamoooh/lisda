'use client';

import Link from 'next/link';
import Image from 'next/image';
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
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/logo-officiel.png"
                alt="Logo LISDA ONG"
                width={48}
                height={48}
                className="object-contain group-hover:scale-105 transition-transform duration-200"
                priority
              />
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
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#083415] text-white shadow-sm font-bold'
                      : 'text-gray-700 hover:text-[#083415] hover:bg-gray-200/60'
                  }`}
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
