import Link from 'next/link';

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
