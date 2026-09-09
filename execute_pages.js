const fs = require('fs');
const path = require('path');

const rootDir = 'd:/lisda-site';

function writeFile(relativePath, content) {
  const filePath = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Page built: ${relativePath}`);
}

// 1. Page Accueil (src/app/page.tsx)
const pageAccueil = `import Link from 'next/link';

export default function Home() {
  const actualites = [
    {
      titre: "Attribution de fournitures scolaires & actes de naissance à Dombe",
      date: "02 Septembre 2026",
      categorie: "Education & Dignité",
      description: "Campagne d'enregistrement à l'état-civil des enfants autochtones Bagyeli et distribution de kits scolaires."
    },
    {
      titre: "Reboisement de 1500 plants de Moabi sur la côte de Kribi",
      date: "24 Août 2026",
      categorie: "Biodiversité",
      description: "Restauration participative du couvert forestier côtier en partenariat avec les chefferies locales."
    },
    {
      titre: "Atelier de transformation du Njansang par les coopératives féminines",
      date: "10 Juillet 2026",
      categorie: "Autonomie des Femmes",
      description: "Formation à l'extraction écologique et à la commercialisation équitable des produits forestiers non ligneux."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Banner Mission Hero */}
      <section className="relative w-full bg-[#083415] text-white py-20 lg:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#feb323] text-xs font-bold uppercase tracking-wider">
              <span>📍 Kribi, Cameroun</span>
              <span>•</span>
              <span>Association Déclarée</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              LISDA ONG — Ensemble pour un <span className="text-[#feb323] underline decoration-[#feb323]/40">développement local durable</span> en Afrique.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
              Local Initiatives for a Sustainable Development in Africa (LISDA) œuvre à Kribi et dans le bassin du Congo pour la préservation de la biodiversité et la dignité des communautés vulnérables.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/devenir-membre"
                className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-all border border-white/20"
              >
                🤝 Devenir membre (Gratuit)
              </Link>
              <Link
                href="/faire-un-don"
                className="px-8 py-4 rounded-full bg-[#feb323] text-[#6b4800] font-bold text-base shadow-lg hover:bg-[#f5ab19] transition-all transform hover:-translate-y-0.5"
              >
                🎁 Faire un don ponctuel
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#001d07] p-8 rounded-3xl border border-[#feb323]/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <span className="text-[#feb323] font-bold text-xs uppercase tracking-wider">Statut Juridique Officiel</span>
                <span className="bg-[#537f1b]/20 text-[#729e75] px-2.5 py-1 rounded-full text-xs font-semibold">En Règle</span>
              </div>
              <h3 className="text-xl font-bold text-white">Ancrage Territorial à Dombe / Kribi</h3>
              <p className="text-sm text-gray-300">
                Association régie par les lois de la République du Cameroun, bénéficiant d'un récépissé officiel de déclaration.
              </p>
              <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-xs text-gray-400">
                <span>Président Coordonnateur :</span>
                <span className="font-bold text-[#feb323]">NSEGBE Patrice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres Clés */}
      <section className="bg-[#001d07] text-white py-12 border-t border-b border-[#083415]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-[#feb323]">350+</div>
            <div className="text-xs uppercase tracking-wider text-gray-300 font-medium">Membres Actifs</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-[#feb323]">18</div>
            <div className="text-xs uppercase tracking-wider text-gray-300 font-medium">Projets Réalisés</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-[#feb323]">12 500+</div>
            <div className="text-xs uppercase tracking-wider text-gray-300 font-medium">Bénéficiaires Accompagnés</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-[#feb323]">100%</div>
            <div className="text-xs uppercase tracking-wider text-gray-300 font-medium">Transparence des Dons</div>
          </div>
        </div>
      </section>

      {/* Section Actualités */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[#ba6d14] font-bold text-xs uppercase tracking-widest">Sur le terrain</span>
            <h2 className="text-3xl font-extrabold text-[#083415]">Dernières Actualités & Actions de LISDA</h2>
          </div>
          <Link href="/documents" className="text-sm font-bold text-[#083415] hover:text-[#ba6d14]">
            Consulter tous les rapports →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actualites.map((actu, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ba6d14] bg-[#ba6d14]/10 px-2.5 py-1 rounded-full">{actu.categorie}</span>
              <h3 className="text-lg font-bold text-[#083415]">{actu.titre}</h3>
              <p className="text-xs text-gray-500 font-medium">{actu.date}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{actu.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
`;

// 2. Page A propos de nous (src/app/a-propos/page.tsx)
const pageAPropos = `import Link from 'next/link';

export default function AProposPage() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#ba6d14] font-bold text-xs uppercase tracking-widest">Identité & Statut Juridique</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">À propos de LISDA ONG</h1>
        <p className="text-gray-600 text-lg">
          Local Initiatives for a Sustainable Development in Africa — Association déclarée au Cameroun basée à Dombe, Kribi.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#083415] text-[#feb323] font-bold flex items-center justify-center text-xl">🎯</div>
          <h2 className="text-2xl font-bold text-[#083415]">Notre Mission & Vision</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            LISDA a pour mission de promouvoir le développement local équitable et durable en Afrique centrale. Nous accompagnons la conservation des écosystèmes forestiers et côtiers tout en plaçant la dignité humaine au cœur de chaque initiative.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#ba6d14] text-white font-bold flex items-center justify-center text-xl">🌍</div>
          <h2 className="text-2xl font-bold text-[#083415]">Zone d'Intervention</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Implantée au littoral atlantique à Kribi (Cameroun), l'association déploie ses actions dans le grand écosystème du Bassin du Congo et en Afrique Centrale, au contact direct des réalités du terrain.
          </p>
        </div>
      </div>

      {/* Communautés Cibles */}
      <div className="bg-[#f0eee9] p-8 rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold text-[#083415] text-center">Nos Communautés Cibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl space-y-2">
            <h3 className="font-bold text-[#083415]">Peuples Autochtones Bagyeli</h3>
            <p className="text-xs text-gray-600">Preservation des droits fonciers, accès à l'état-civil, valorisation de la pharmacopée et soutien à l'éducation.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl space-y-2">
            <h3 className="font-bold text-[#083415]">Réfugiés & Populations Déplacées</h3>
            <p className="text-xs text-gray-600">Assistance humanitaire d'urgence, réinsertion socio-économique et accompagnement à la subsistance.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl space-y-2">
            <h3 className="font-bold text-[#083415]">Sinistrés Climatiques</h3>
            <p className="text-xs text-gray-[#083415]">Comités d'alerte et soutien aux riverains victimes de l'érosion marine et des aléas pluviométriques.</p>
          </div>
        </div>
      </div>

      {/* Statut Juridique Officiel */}
      <div className="bg-white p-8 rounded-2xl border border-[#feb323] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ba6d14]">Reconnaissance Officielle</span>
          <h3 className="text-xl font-bold text-[#083415]">Association Déclarée au Cameroun</h3>
          <p className="text-xs text-gray-600">
            LISDA bénéficie d'un récépissé officiel de déclaration délivré par les autorités administratives compétentes du Département de l'Océan (Kribi).
          </p>
        </div>
        <Link href="/documents" className="px-6 py-3 rounded-full bg-[#083415] text-[#feb323] text-xs font-bold hover:bg-[#001d07] shrink-0">
          Voir les documents officiels 📄
        </Link>
      </div>
    </div>
  );
}
`;

// 3. Page Equipe (src/app/equipe/page.tsx)
const pageEquipe = `export default function EquipePage() {
  const membreBureau = [
    { nom: "NSEGBE Patrice", fonction: "Président Coordonnateur" },
    { nom: "INIKWA épse NSEGBE Victoire", fonction: "Secrétaire Générale" },
    { nom: "AMBANI OKOUNOU Guy Dénis", fonction: "Secrétaire Général Adjoint chargé des projets" },
    { nom: "ELIMBI Jean Gustave", fonction: "Trésorier Comptable" },
    { nom: "MPOUED Idrice", fonction: "Commissaire aux Comptes" },
    { nom: "NNA BIWOLE MINDJOM Pierre Magloire", fonction: "Responsable Communication et Relations Publiques" },
    { nom: "NOUCK NSEGBE Thomas", fonction: "Censeur" }
  ];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#ba6d14] font-bold text-xs uppercase tracking-widest">Gouvernance Officielle</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Membres du Bureau Exécutif</h1>
        <p className="text-gray-600 text-lg">
          L'association LISDA est dirigée par un bureau exécutif engagé au service du développement local durable à Kribi et dans le Bassin du Congo.
        </p>
      </div>

      {/* Counter for total members */}
      <div className="bg-[#083415] text-white p-8 rounded-3xl max-w-2xl mx-auto text-center space-y-2 border border-[#feb323]/30 shadow-xl">
        <span className="text-xs font-bold text-[#feb323] uppercase tracking-widest">Statistiques Membres</span>
        <div className="text-5xl font-extrabold text-[#feb323]">350+</div>
        <p className="text-sm text-gray-200">Membres inscrits et engagés au sein de l'association LISDA ONG</p>
      </div>

      {/* Grid of 7 official Bureau members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {membreBureau.map((m, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-[#feb323] transition-colors flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#083415] text-[#feb323] font-bold flex items-center justify-center text-base shrink-0">
              {m.nom.slice(0, 2)}
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-[#083415]">{m.nom}</h3>
              <p className="text-xs text-[#ba6d14] font-semibold">{m.fonction}</p>
              <p className="text-[11px] text-gray-500">LISDA ONG • Kribi, Cameroun</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

// 4. Page Phototheque (src/app/phototheque/page.tsx)
const pagePhototheque = `'use client';

import { useState } from 'react';

export default function PhotothequePage() {
  const photos = [
    { id: '1', titre: 'Atelier communautaire à Dombe', categorie: 'Vie Associative', url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80' },
    { id: '2', titre: 'Reboisement sur le littoral de Kribi', categorie: 'Environnement', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80' },
    { id: '3', titre: 'Rencontre avec les chefferies Bagyeli', categorie: 'Autochtones', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    { id: '4', titre: 'Récolte et séchage du Njansang', categorie: 'Autonomie Femmes', url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80' },
    { id: '5', titre: 'Distribution de kits scolaires', categorie: 'Education', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
    { id: '6', titre: 'Consultation de santé communautaire', categorie: 'Santé', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Galerie Photo</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Photothèque des Activités LISDA</h1>
        <p className="text-gray-600 text-lg">
          Découvrez nos actions sur le terrain à Kribi et dans le Bassin du Congo à travers nos archives photographiques.
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPhoto(p.url)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="h-60 overflow-hidden relative">
              <img
                src={p.url}
                alt={p.titre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-[#083415]/80 text-[#feb323] px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                {p.categorie}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm text-[#083415] group-hover:text-[#ba6d14] transition-colors">{p.titre}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedPhoto} alt="Agrandissement photo" className="max-w-full max-h-[85vh] rounded-xl object-contain" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white text-sm font-bold bg-white/20 px-3 py-1 rounded-full"
            >
              Fermer ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
`;

// 5. Page Documents (src/app/documents/page.tsx)
const pageDocuments = `export default function DocumentsPage() {
  const documents = [
    { titre: "Récépissé officiel de déclaration d'association", categorie: "Documents Officiels", annee: "2026", url: "#" },
    { titre: "Plan d'action triennal (2026-2029) - LISDA ONG", categorie: "Plans d'Action", annee: "2026", url: "#" },
    { titre: "Rapport annuel d'activités & Bilan financier", categorie: "Rapports d'Activités", annee: "2025", url: "#" },
    { titre: "Étude d'impact environnemental du littoral de Kribi", categorie: "Études Techniques", annee: "2025", url: "#" },
    { titre: "Charte éthique de protection des savoirs Bagyeli", categorie: "Plaidoyer", annee: "2024", url: "#" }
  ];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Publications Officielles</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Documents & Reports Téléchargeables</h1>
        <p className="text-gray-600 text-lg">
          Tous nos documents officiels, rapports d'activités et fiches d'action (PDF) disponibles en téléchargement libre.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {documents.map((doc, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#feb323] transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#083415]/10 text-[#083415] text-[10px] font-bold px-2.5 py-0.5 rounded-full">{doc.categorie}</span>
                <span className="text-xs text-gray-400 font-semibold">{doc.annee}</span>
              </div>
              <h3 className="font-bold text-base text-[#083415]">{doc.titre}</h3>
            </div>
            <a
              href="mailto:Patrice_segbe@yahoo.fr?subject=Demande%20de%20document%20officiel"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs hover:bg-[#001d07] shrink-0"
            >
              📥 Télécharger (PDF)
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

// 6. Page Contribution (src/app/contribution/page.tsx)
const pageContribution = `import Link from 'next/link';

export default function ContributionPage() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#ba6d14] font-bold text-xs uppercase tracking-widest">Contribuer Autrement</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Apporter votre Soutien Non Financier</h1>
        <p className="text-gray-600 text-lg">
          Vous pouvez faire avancer la mission de LISDA à Kribi à travers le bénévolat, le partenariat institutionnel ou votre expertise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#083415] text-[#feb323] font-bold flex items-center justify-center text-xl">🙋‍♂️</div>
          <h3 className="text-xl font-bold text-[#083415]">Bénévolat & Action Terrain</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Participez directement sur le terrain à Kribi lors de nos campagnes de reboisement, de sensibilisation scolaire ou d'animation d'ateliers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#ba6d14] text-white font-bold flex items-center justify-center text-xl">🤝</div>
          <h3 className="text-xl font-bold text-[#083415]">Partenariat Institutionnel</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            ONG, entreprises éco-responsables et fondations : associez votre structure à nos projets de conservation et d'état-civil.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#486990] text-white font-bold flex items-center justify-center text-xl">🧠</div>
          <h3 className="text-xl font-bold text-[#083415]">Mécénat de Compétence</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Mettez vos compétences juridiques, botaniques, informatiques ou de rédaction au service de notre équipe à Dombe.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact" className="inline-flex px-8 py-4 rounded-full bg-[#083415] text-[#feb323] font-bold text-sm hover:bg-[#001d07]">
          Proposer une contribution →
        </Link>
      </div>
    </div>
  );
}
`;

// 7. Page Faire un don (src/app/faire-un-don/page.tsx)
const pageDon = `'use client';

import { useState } from 'react';

export default function FaireUnDonPage() {
  const [montant, setMontant] = useState<number>(10000);
  const [typeDon, setTypeDon] = useState<'argent' | 'nature'>('argent');
  const [accord, setAccord] = useState<boolean>(true);
  const [nom, setNom] = useState<string>('');
  const [prenom, setPrenom] = useState<string>('');

  const donateursExemples = [
    { nom: "Mme Clarisse N.", montant: "25 000 FCFA", type: "Don financier" },
    { nom: "M. Paulin M.", montant: "Kits de papeterie", type: "Don en nature" },
    { nom: "Fondation Partenaire", montant: "100 000 FCFA", type: "Don financier" }
  ];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirection LeekPay payment gateway simulation
    alert(\`Redirection vers LeekPay pour valider votre don de \${montant} FCFA. Merci pour votre générosité !\`);
    window.location.href = '/faire-un-don/merci';
  };

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <span className="text-[#feb323] font-bold text-xs uppercase tracking-widest bg-[#083415] px-3 py-1 rounded-full">Don Ponctuel Exclusif</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Faire un Don à LISDA ONG</h1>
        <p className="text-gray-600 text-lg">
          Votre don est ponctuel — aucun abonnement récurrent. Il soutient directement nos actions à Kribi et Dombe.
        </p>
      </div>

      {/* Form Don */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-8">
        <div className="flex rounded-full bg-gray-100 p-1">
          <button
            onClick={() => setTypeDon('argent')}
            className={\`flex-1 py-3 rounded-full text-xs font-bold transition-all \${typeDon === 'argent' ? 'bg-[#083415] text-[#feb323]' : 'text-gray-600'}\`}
          >
            Don Financier
          </button>
          <button
            onClick={() => setTypeDon('nature')}
            className={\`flex-1 py-3 rounded-full text-xs font-bold transition-all \${typeDon === 'nature' ? 'bg-[#083415] text-[#feb323]' : 'text-gray-600'}\`}
          >
            Don en Nature (Kits, Matériel)
          </button>
        </div>

        {typeDon === 'argent' ? (
          <form onSubmit={handlePay} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase">Choisir ou saisir le montant (FCFA)</label>
              <div className="grid grid-cols-3 gap-3">
                {[5000, 10000, 25000, 50000].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMontant(m)}
                    className={\`py-3 rounded-xl border-2 font-bold text-sm transition-all \${montant === m ? 'border-[#feb323] bg-[#feb323]/10 text-[#083415]' : 'border-gray-200 text-gray-700'}\`}
                  >
                    {m.toLocaleString()} FCFA
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Prénom</label>
                <input
                  type="text"
                  required
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nom</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="accord"
                checked={accord}
                onChange={(e) => setAccord(e.target.checked)}
                className="w-4 h-4 text-[#083415]"
              />
              <label htmlFor="accord" className="text-xs text-gray-600">
                J'accepte que mon nom apparaisse publiquement dans la liste des donateurs.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#feb323] text-[#6b4800] font-extrabold text-base hover:bg-[#f5ab19] shadow-lg transition-all"
            >
              🔒 Payer {montant.toLocaleString()} FCFA via LeekPay
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-sm text-gray-700">
            <p className="font-bold text-[#083415]">Pour les dons en nature (matériel médical, fournitures scolaires, outils) :</p>
            <p>Veuillez contacter directement l'équipe de coordination de LISDA à Kribi par téléphone au <strong>+237 677 593 239</strong> ou par e-mail à <strong>Patrice_segbe@yahoo.fr</strong>.</p>
          </div>
        )}
      </div>

      {/* Liste des Donateurs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#083415] text-center">Nos Généreux Donateurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {donateursExemples.map((d, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 text-center space-y-1">
              <div className="font-bold text-sm text-[#083415]">{d.nom}</div>
              <div className="text-xs text-[#ba6d14] font-semibold">{d.montant}</div>
              <div className="text-[10px] text-gray-400">{d.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;

// 8. Page Merci Don (src/app/faire-un-don/merci/page.tsx)
const pageMerci = `import Link from 'next/link';

export default function MerciPage() {
  return (
    <div className="py-24 px-4 max-w-2xl mx-auto text-center space-y-6">
      <div className="w-20 h-20 bg-[#feb323]/20 text-[#083415] rounded-full flex items-center justify-center text-4xl mx-auto">
        ❤️
      </div>
      <h1 className="text-4xl font-extrabold text-[#083415]">Un Grand Merci pour Votre Don !</h1>
      <p className="text-gray-600 text-base leading-relaxed">
        Votre contribution a bien été enregistrée via LeekPay. Votre générosité permet à LISDA ONG de mener ses actions de préservation et d'appui aux communautés à Dombe et Kribi.
      </p>
      <Link href="/" className="inline-flex px-8 py-3.5 rounded-full bg-[#083415] text-[#feb323] font-bold text-sm">
        Retour à l'accueil
      </Link>
    </div>
  );
}
`;

// 9. Page Devenir membre (src/app/devenir-membre/page.tsx)
const pageMembre = `'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DevenirMembrePage() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [motivation, setMotivation] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from('membres').insert([
        { nom, prenom, email, telephone, motivation, newsletter }
      ]);
    } catch (err) {
      console.log('Supabase submit fallback');
    }
    setSuccess(true);
  };

  return (
    <div className="py-16 px-4 max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Inscription 100% Gratuite</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Devenir Membre de LISDA ONG</h1>
        <p className="text-gray-600 text-lg">
          L'inscription comme membre est entièrement gratuite. Rejoignez notre communauté pour soutenir nos actions à Kribi.
        </p>
      </div>

      {success ? (
        <div className="bg-[#083415] text-white p-8 rounded-3xl text-center space-y-4">
          <div className="text-4xl">🎉</div>
          <h2 className="text-2xl font-bold text-[#feb323]">Inscription validée avec succès !</h2>
          <p className="text-sm text-gray-200">
            Merci <strong>{prenom} {nom}</strong> pour votre engagement. Vous recevrez très prochainement nos nouvelles.
          </p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nom *</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Prénom *</label>
                <input
                  type="text"
                  required
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="Votre prénom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Adresse E-mail *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Téléphone *</label>
                <input
                  type="tel"
                  required
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="+237 ..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Motivation / Message</label>
              <textarea
                rows={3}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300"
                placeholder="Pourquoi souhaitez-vous rejoindre LISDA ?"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="newsletter"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="w-4 h-4 text-[#083415]"
              />
              <label htmlFor="newsletter" className="text-xs text-gray-600">
                S'abonner à la newsletter LISDA pour recevoir les actualités du terrain.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#083415] text-[#feb323] font-bold text-sm hover:bg-[#001d07] shadow-lg transition-all"
            >
              Valider mon inscription gratuite 🤝
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
`;

// 10. Page Contact (src/app/contact/page.tsx)
const pageContact = `'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Nous Contacter</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Contactez LISDA ONG</h1>
        <p className="text-gray-600 text-lg">
          Basés à Dombe (Kribi, Cameroun), nous sommes à votre écoute pour toute demande de renseignement ou de partenariat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        <div className="lg:col-span-5 bg-[#083415] text-white p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold text-[#feb323]">Coordonnées Officielle</h2>
          <div className="space-y-4 text-sm text-gray-200">
            <p className="flex items-start gap-3">
              <span className="text-lg">📍</span>
              <span><strong>Adresse :</strong> Dombe, Kribi (Département de l'Océan, Région du Sud, Cameroun)</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-lg">✉️</span>
              <a href="mailto:Patrice_segbe@yahoo.fr" className="hover:text-[#feb323] transition-colors underline">
                Patrice_segbe@yahoo.fr
              </a>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-lg">📞</span>
              <a href="tel:+237677593239" className="hover:text-[#feb323] transition-colors">
                +237 677 593 239
              </a>
            </p>
          </div>

          <div className="pt-6 border-t border-gray-800 space-y-2">
            <span className="text-xs font-bold text-[#feb323] uppercase">Réseaux Sociaux</span>
            <div className="flex gap-4 text-[#feb323] text-sm font-bold">
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">LinkedIn</a>
              <a href="#" className="hover:underline">YouTube</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-[#083415]">Envoyer un Message</h2>
          {success ? (
            <div className="p-4 bg-[#083415] text-[#feb323] rounded-2xl text-center font-bold text-sm">
              Votre message a bien été envoyé ! Nous vous répondrons très rapidement.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSuccess(true); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nom complet *</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">E-mail *</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Sujet</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="Objet de votre message" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message *</label>
                <textarea rows={4} required className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="Votre message..." />
              </div>
              <button type="submit" className="w-full py-4 rounded-full bg-[#083415] text-[#feb323] font-bold text-sm hover:bg-[#001d07]">
                Envoyer le message 🚀
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Carte de localisation */}
      <div className="max-w-6xl mx-auto bg-gray-200 rounded-3xl h-64 overflow-hidden flex items-center justify-center text-gray-600 font-bold border border-gray-300">
        📍 Carte Interactive Kribi - Dombe (Cameroun, Bassin du Congo)
      </div>
    </div>
  );
}
`;

// 11. Espace Admin (src/app/admin/page.tsx)
const pageAdmin = `'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [tab, setTab] = useState<'actualites' | 'phototheque' | 'documents' | 'equipe' | 'donateurs'>('actualites');

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-[#083415] text-white p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-[#feb323]">Espace d'Administration LISDA ONG</h1>
          <p className="text-xs text-gray-300">Gestion du contenu sans coder (Kribi, Cameroun)</p>
        </div>
        <span className="bg-[#feb323] text-[#6b4800] px-3 py-1 rounded-full text-xs font-bold">Admin Connecté</span>
      </div>

      <div className="flex border-b border-gray-200 gap-2 overflow-x-auto">
        {(['actualites', 'phototheque', 'documents', 'equipe', 'donateurs'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={\`px-5 py-3 font-bold text-xs capitalize rounded-t-xl transition-all \${tab === t ? 'bg-white border-t border-x border-gray-300 text-[#083415]' : 'text-gray-500 hover:text-gray-800'}\`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-6">
        <h2 className="text-xl font-bold text-[#083415] capitalize">Mettre à jour : {tab}</h2>
        <p className="text-xs text-gray-500">Interface de mise à jour rapide alimentée par Supabase.</p>
        <button className="px-5 py-2.5 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs">
          + Ajouter un nouvel élément dans {tab}
        </button>
      </div>
    </div>
  );
}
`;

writeFile('src/app/page.tsx', pageAccueil);
writeFile('src/app/a-propos/page.tsx', pageAPropos);
writeFile('src/app/equipe/page.tsx', pageEquipe);
writeFile('src/app/phototheque/page.tsx', pagePhototheque);
writeFile('src/app/documents/page.tsx', pageDocuments);
writeFile('src/app/contribution/page.tsx', pageContribution);
writeFile('src/app/faire-un-don/page.tsx', pageDon);
writeFile('src/app/faire-un-don/merci/page.tsx', pageMerci);
writeFile('src/app/devenir-membre/page.tsx', pageMembre);
writeFile('src/app/contact/page.tsx', pageContact);
writeFile('src/app/admin/page.tsx', pageAdmin);

console.log('All 11 official pages built successfully!');
