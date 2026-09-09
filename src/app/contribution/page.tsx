import Link from 'next/link';

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
