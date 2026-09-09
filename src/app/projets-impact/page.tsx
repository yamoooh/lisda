export default function ProjetsPage() {
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
