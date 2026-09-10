'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full bg-[#001d07] text-white pt-16 pb-12 border-t border-[#083415]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Col */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-white p-1.5 shadow-md">
              <Image
                src="/logo-officiel.png"
                alt="Logo LISDA ONG"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl text-white">LISDA ONG</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Local Initiatives for a Sustainable Development in Africa. Ancrée à Dombe, Kribi (Cameroun), l'ONG agit pour la biodiversité du Bassin du Congo et la résilience des communautés.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook LISDA ONG"
              className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-85 hover:scale-105 transition-all shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M24 12.073C24 5.403 18.627 0 12 0S0 5.403 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok LISDA ONG"
              className="w-9 h-9 rounded-full bg-[#010101] flex items-center justify-center hover:opacity-85 hover:scale-105 transition-all shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn LISDA ONG"
              className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-85 hover:scale-105 transition-all shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
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
