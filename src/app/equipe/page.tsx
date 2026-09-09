export default function EquipePage() {
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
