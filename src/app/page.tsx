import Link from 'next/link';

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
