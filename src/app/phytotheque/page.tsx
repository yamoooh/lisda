export default function PhytothequePage() {
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
