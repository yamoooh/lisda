import Link from 'next/link';

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
