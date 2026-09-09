const fs = require('fs');
const path = require('path');

const rootDir = 'd:/lisda-site';

function writeFile(relativePath, content) {
  const filePath = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Page built: ${relativePath}`);
}

// 1. Page Accueil (src/app/page.tsx)
const pageAccueil = `import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-[#083415] text-white py-20 lg:py-28 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#feb323] text-xs font-bold uppercase tracking-wider">
              <span>📍 Kribi, Cameroun</span>
              <span>•</span>
              <span>Bassin du Congo</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Ensemble pour un <span className="text-[#feb323] underline decoration-[#feb323]/40">développement local durable</span> en Afrique.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
              LISDA œuvre à Kribi et dans le bassin du Congo pour l'autonomisation des peuples autochtones, la résilience climatique et la préservation de nos forêts et zones côtières.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/faire-un-don"
                className="px-8 py-4 rounded-full bg-[#feb323] text-[#6b4800] font-bold text-base shadow-lg hover:bg-[#f5ab19] transition-all transform hover:-translate-y-0.5"
              >
                🎁 Faire un don
              </Link>
              <Link
                href="/devenir-membre"
                className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-all border border-white/20"
              >
                🤝 Devenir membre
              </Link>
            </div>

            <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span>✅</span> ONG Déclarée au Cameroun
              </div>
              <div className="flex items-center gap-2">
                <span>🌲</span> Forêts du Bassin du Congo
              </div>
              <div className="flex items-center gap-2">
                <span>🌊</span> Littoral Atlantique Kribi
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="bg-[#001d07] p-8 rounded-3xl border border-[#feb323]/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <span className="text-[#feb323] font-bold text-sm uppercase">Mission Terrain</span>
                <span className="bg-[#537f1b]/20 text-[#729e75] px-2.5 py-1 rounded-full text-xs font-semibold">En cours</span>
              </div>
              
              <h3 className="text-xl font-bold text-white">Cartographie & Protection des Terroirs Bagyeli</h3>
              <p className="text-sm text-gray-300">
                Accompagnement juridique, accès aux soins et préservation de la pharmacopée traditionnelle dans les communautés forestières de Dombe et Kribi.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Impact bénéficiaires</span>
                  <span className="font-bold text-[#feb323]">12 500+ villageois</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#feb323] h-full w-4/5 rounded-full"></div>
                </div>
              </div>

              <Link
                href="/projets-impact"
                className="block text-center w-full py-3 rounded-xl bg-[#083415] hover:bg-[#001d07] text-[#feb323] text-sm font-bold transition-colors border border-[#feb323]/20"
              >
                Découvrir tous les projets →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Domaine d'intervention */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-[#ba6d14] font-bold text-xs uppercase tracking-widest">Nos Domaines d'Intervention</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#083415]">Agir avec rigueur, préserver avec passion</h2>
          <p className="text-gray-600 text-base">
            Chaque programme est co-construit avec les chefferies traditionnelles et les populations riveraines de Kribi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#083415]/10 text-[#083415] flex items-center justify-center text-2xl font-bold">🌲</div>
            <h3 className="text-xl font-bold text-[#083415]">Biodiversité & Forêts</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Conservation du couvert végétal du Bassin du Congo, reboisement d'espèces endémiques et lutte contre la déforestation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#ba6d14]/10 text-[#ba6d14] flex items-center justify-center text-2xl font-bold">🛡️</div>
            <h3 className="text-xl font-bold text-[#083415]">Peuples Autochtones</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dignité, état-civil, droits fonciers et protection du patrimoine immatériel des populations pygmées Bagyeli.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#486990]/10 text-[#486990] flex items-center justify-center text-2xl font-bold">🌊</div>
            <h3 className="text-xl font-bold text-[#083415]">Résilience Côticole</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Protection contre l'érosion marine du littoral de Kribi, préservation de la mangrove et comités d'alerte.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#feb323]/20 text-[#6b4800] flex items-center justify-center text-2xl font-bold">👩‍🌾</div>
            <h3 className="text-xl font-bold text-[#083415]">Autonomie des Femmes</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Coopératives de transformation des produits forestiers non ligneux (moabi, njansang) et tontines écologiques.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
`;

// 2. Page Equipe (src/app/equipe/page.tsx)
const pageEquipe = `export default function EquipePage() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#ba6d14] font-bold text-xs uppercase tracking-widest">Gouvernance & Ancrage Terrain</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">L'Équipe & la Direction de LISDA ONG</h1>
        <p className="text-gray-600 text-lg">
          Une équipe engagée d'experts en développement local, environnementalistes et leaders communautaires basés à Kribi (Cameroun).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-center">
          <div className="w-24 h-24 rounded-full bg-[#083415] text-[#feb323] text-3xl font-bold flex items-center justify-center mx-auto">
            PS
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#083415]">Patrice SEGBE</h3>
            <p className="text-sm text-[#ba6d14] font-semibold">Président Fondateur</p>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Pionnier du développement local durable à Kribi, expert en coordination de projets environnementaux et plaidoyer pour les peuples autochtones.
          </p>
          <p className="text-xs text-gray-500 font-mono">Patrice_segbe@yahoo.fr</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-center">
          <div className="w-24 h-24 rounded-full bg-[#083415]/20 text-[#083415] text-3xl font-bold flex items-center justify-center mx-auto">
            CT
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#083415]">Coordination Terrain</h3>
            <p className="text-sm text-[#ba6d14] font-semibold">Equipe Dombe / Kribi</p>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Animateurs communautaires, techniciens forestiers et traducteurs bilingues (français/langues locales).
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-center">
          <div className="w-24 h-24 rounded-full bg-[#feb323]/30 text-[#6b4800] text-3xl font-bold flex items-center justify-center mx-auto">
            CS
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#083415]">Conseil Scientifique & Ethique</h3>
            <p className="text-sm text-[#ba6d14] font-semibold">Sages & Chefferies</p>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Représentants des chefferies traditionnelles du littoral et chercheurs associés en botanique du Bassin du Congo.
          </p>
        </div>
      </div>
    </div>
  );
}
`;

// 3. Page Phytotheque (src/app/phytotheque/page.tsx)
const pagePhytotheque = `export default function PhytothequePage() {
  const plantes = [
    { nom: 'Moabi (Baillonella toxisperma)', usage: 'Huile précieuse, pharmacopée & conservation forestière', statut: 'Vulnérable / Protégé' },
    { nom: 'Njansang (Ricinodendron heudelotii)', usage: 'Produit forestier non ligneux, autonomie des femmes', statut: 'Abondant' },
    { nom: 'Iboga (Tabernanthe iboga)', usage: 'Plante rituelle et médicinale traditionnelle Bagyeli', statut: 'Patrimoine Culturel' },
    { nom: 'Arbre à Ail (Scorodophloeus zenkeri)', usage: 'Écorce condimentaire et soins antiparasitaires', statut: 'Endémique Kribi' }
  ];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#537f1b] font-bold text-xs uppercase tracking-widest">Herbier & Savoirs Botaniques</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Phytothèque du Bassin du Congo (Kribi)</h1>
        <p className="text-gray-600 text-lg">
          Inventaire participatif des plantes médicinales et essences forestières protégées par l'ONG LISDA et les gardiens de la forêt Bagyeli.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plantes.map((p, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-[#083415]">{p.nom}</h3>
              <span className="bg-[#083415]/10 text-[#083415] text-xs font-bold px-3 py-1 rounded-full">{p.statut}</span>
            </div>
            <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Usages & Valeur :</span> {p.usage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

// 4. Page Documents (src/app/documents/page.tsx)
const pageDocuments = `export default function DocumentsPage() {
  const docs = [
    { titre: "Statuts & Déclaration officielle LISDA ONG", type: "PDF Legal", date: "2026" },
    { titre: "Rapport d'activité annuel & Bilan d'impact Kribi", type: "Rapport Annuel", date: "2025-2026" },
    { titre: "Étude d'impact sur la vulnérabilité côtière de Dombe", type: "Document Technique", date: "2025" },
    { titre: "Charte de protection des savoirs autochtones Bagyeli", type: "Plaidoyer", date: "2024" }
  ];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Transparence & Publications</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Documents & Publications Officiels</h1>
        <p className="text-gray-600 text-lg">
          Consultez nos rapports d'activité, statuts juridiques et guides techniques de terrain en accès libre.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {docs.map((d, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between hover:border-[#feb323] transition-colors">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-[#083415]">{d.titre}</h3>
              <p className="text-xs text-gray-500">{d.type} • Publié en {d.date}</p>
            </div>
            <a href="mailto:Patrice_segbe@yahoo.fr" className="px-4 py-2 rounded-full bg-[#f5f3ee] text-[#083415] text-xs font-bold hover:bg-[#feb323]">
              Demander la copie 📄
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

// 5. Page Projets & Impact (src/app/projets-impact/page.tsx)
const pageProjets = `export default function ProjetsPage() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#ba6d14] font-bold text-xs uppercase tracking-widest">Missions Terrain</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Projets & Impact Social à Kribi</h1>
        <p className="text-gray-600 text-lg">
          Découvrez nos programmes de conservation, de développement communautaire et d'adaptation au changement climatique.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <span className="text-xs font-bold text-[#537f1b] bg-[#537f1b]/10 px-3 py-1 rounded-full">Programme 1</span>
          <h3 className="text-2xl font-bold text-[#083415]">Reboisement & Protection de la Mangrove de Kribi</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Restauration des écosystèmes côtiers contre l'érosion marine et sensibilisation des communautés de pêcheurs artisanaux.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <span className="text-xs font-bold text-[#ba6d14] bg-[#ba6d14]/10 px-3 py-1 rounded-full">Programme 2</span>
          <h3 className="text-2xl font-bold text-[#083415]">Accès aux soins & État-Civil pour les Pygmées Bagyeli</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Campagnes d'établissement d'actes de naissance, kits médicaux de première urgence et appui à la scolarisation.
          </p>
        </div>
      </div>
    </div>
  );
}
`;

// 6. Page Contact (src/app/contact/page.tsx)
const pageContact = `export default function ContactPage() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Écrivez-nous</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Contactez LISDA ONG</h1>
        <p className="text-gray-600 text-lg">
          Notre équipe est basée à Dombe, Kribi (Cameroun). Nous répondons à toutes les demandes de partenariats et d'informations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
        <div className="lg:col-span-5 bg-[#083415] text-white p-8 rounded-2xl space-y-6">
          <h3 className="text-2xl font-bold text-[#feb323]">Siège Social</h3>
          <div className="space-y-4 text-sm text-gray-200">
            <p>📍 <strong>Adresse :</strong> Dombe, Kribi (Département de l'Océan, Région du Sud, Cameroun)</p>
            <p>✉️ <strong>E-mail :</strong> Patrice_segbe@yahoo.fr</p>
            <p>📞 <strong>Téléphone :</strong> +237 677 593 239</p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nom complet</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]" placeholder="Votre nom" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Adresse E-mail</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]" placeholder="votre@email.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]" placeholder="Votre message..." />
            </div>
            <button type="submit" className="w-full py-4 rounded-full bg-[#083415] text-[#feb323] font-bold hover:bg-[#001d07]">
              Envoyer le message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
`;

// 7. Page Devenir Membre (src/app/devenir-membre/page.tsx)
const pageMembre = `export default function DevenirMembrePage() {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Engagement Citoyen</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Rejoindre LISDA ONG comme Membre</h1>
        <p className="text-gray-600 text-lg">
          Devenez membre actif ou sympathisant pour soutenir le développement durable dans le Bassin du Congo.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nom</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Prénom</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">E-mail</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Ville / Pays de résidence</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="ex: Kribi, Douala, Paris..." />
          </div>
          <button type="submit" className="w-full py-4 rounded-full bg-[#083415] text-[#feb323] font-bold hover:bg-[#001d07]">
            Soumettre la demande d'adhésion 🤝
          </button>
        </form>
      </div>
    </div>
  );
}
`;

// 8. Page Faire un don (src/app/faire-un-don/page.tsx)
const pageDon = `export default function FaireUnDonPage() {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <span className="text-[#feb323] font-bold text-xs uppercase tracking-widest bg-[#083415] px-3 py-1 rounded-full">Soutien Financier</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Soutenez les actions de LISDA ONG</h1>
        <p className="text-gray-600 text-lg">
          Votre don finance directement le reboisement, la santé des communautés autochtones et la résilience côtière à Kribi.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <button className="py-4 rounded-xl border-2 border-[#feb323] bg-[#feb323]/10 font-bold text-lg text-[#083415]">5 000 FCFA</button>
          <button className="py-4 rounded-xl border border-gray-300 hover:border-[#feb323] font-bold text-lg text-[#083415]">15 000 FCFA</button>
          <button className="py-4 rounded-xl border border-gray-300 hover:border-[#feb323] font-bold text-lg text-[#083415]">50 000 FCFA</button>
        </div>

        <div className="bg-[#f5f3ee] p-6 rounded-xl space-y-2 text-sm text-[#083415]">
          <p className="font-bold">📍 Mobile Money & Virement Direct :</p>
          <p>Contactez directement le Président Patrice SEGBE à Kribi au <strong>+237 677 593 239</strong> ou par e-mail à <strong>Patrice_segbe@yahoo.fr</strong>.</p>
        </div>
      </div>
    </div>
  );
}
`;

writeFile('src/app/page.tsx', pageAccueil);
writeFile('src/app/equipe/page.tsx', pageEquipe);
writeFile('src/app/phytotheque/page.tsx', pagePhytotheque);
writeFile('src/app/documents/page.tsx', pageDocuments);
writeFile('src/app/projets-impact/page.tsx', pageProjets);
writeFile('src/app/contact/page.tsx', pageContact);
writeFile('src/app/devenir-membre/page.tsx', pageMembre);
writeFile('src/app/faire-un-don/page.tsx', pageDon);

console.log('All LISDA pages created successfully!');
