import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Projets & Programmes de terrain — LISDA ONG",
  description: "Découvrez les initiatives d'agroforesterie, de restauration des mangroves et de défense des droits coutumiers Bagyeli par l'ONG LISDA à Kribi.",
};

export default function ProjetsPage() {
  const projets = [
    {
      titre: "Pépinières Agroforestières & Restauration des Sols à Dombe",
      domaine: "Agroécologie & Conservation",
      tagColor: "bg-[#537f1b] text-white",
      description: "Mise en place de pépinières communautaires d'arbres autochtones et fruitiers gérées par des femmes rurales pour lutter contre la déforestation littorale et renforcer la souveraineté alimentaire.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1WoDJP0nGuA_3K7tEEUjPIRRaBatfjctocegqq3ghmbREWGyQuh-9zMlPtpkCFXhkEWT1z382KDx1Ls80oVLmdjnyvV4x-JROPtVZGjrGex1wluU3c5-YDupZsevvkw_q1-ikP88OCYbXSWO565StKsZszJ-MVUu4XZ43I_Zb5uhBweDuiBOKJS2LHcsKfwunA0e6irXtRIcabXV-ZoDCNktYTEBiS_roD7V_fiOzyyJouvCgL9ibiOFm_O",
      stats: "15 000+ plants régénérés • 8 villages engagés"
    },
    {
      titre: "Protection des Mangroves & Ceintures Côtières à Kribi",
      domaine: "Littoral & Résilience Climatique",
      tagColor: "bg-[#083415] text-[#bfefc0]",
      description: "Restauration participative des bandes de mangroves littorales contre l'érosion atlantique, replantation de propagules par des sentinelles jeunes et surveillance de la biodiversité marine.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1WXNLRBK0uKhghz7VMXf_WDNkM0j4m_nWqbmg2gV_ihL4QTy7raJ0TLixsNt3KYV5jIurnWIrzDnTufpKhgev_Gaq9r8fzZsuWh8GSko6KXAjiCu2pomzhzs58Z-meD-xR0pSaA3K_7-SmBQXib7ICTvAsnNbkM23Et8Lu8BS6e6Lcfo7rEgRvJRrAN7lyMRMrPY39t1jx7VDcrLIqVVvVo64QT8DYMLUwDu3kLu7rl2OqNmflZ2YukLT2u",
      stats: "24 km de littoral protégé • 120 volontaires côtiers"
    },
    {
      titre: "Cartographie Participative & Droits Foncier Bagyeli",
      domaine: "Droits Humains & Peuple Autochtone",
      tagColor: "bg-[#ba6d14] text-white",
      description: "Identification et sécurisation des territoires de chasse et de cueillette séculaires du peuple autochtone Bagyeli, couplées à l'octroi d'actes d'état-civil et à l'accès aux soins de santé de base.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1XaoGYJiT3GnGup3X-rTM7c7KGvUAPoErFNmfKON0BGdwflJLBnpwXi-irhc8FY2ALQIfAIRF9TlLeg5J7eC_RpKezsyhipLE17UoXe7JCqhjdflT2bEGDMy030zBI-4qoNiyzFC4hLWsXeJ4Hc9hPc4LueUIeVpI-vktsBBVDrveN0z2J0C5X5bJVv_dhiXtlOlVMI9-XcRzir5-5IvwZf4n2W3I_HgA1Cr5CCN5BefxtOZrdt8COAZIQT",
      stats: "14 campements certifiés • 350+ actes d'état-civil délivrés"
    }
  ];

  return (
    <div className="w-full bg-[#fbf9f4] text-[#1b1c19] min-h-screen py-12 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#ba6d14] font-bold">
          Actions Opérationnelles de Terrain
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#083415]">
          Projets & Programmes d'Impact à Kribi
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Découvrez nos initiatives de préservation écologique, d'autonomisation communautaire et de gouvernance inclusive menées au plus près des réalités du Sud-Cameroun.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projets.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-[#083415]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full bg-[#f0eee9]">
                  <Image
                    src={p.image}
                    alt={p.titre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${p.tagColor}`}>
                      {p.domaine}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-[#083415] leading-snug">
                    {p.titre}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#f5f3ee] border-t border-[#083415]/10 flex items-center justify-between text-xs font-semibold text-[#083415]">
                <span>{p.stats}</span>
                <span className="text-[#ba6d14]">Dombe, Kribi</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-[#083415] text-white p-8 lg:p-12 rounded-3xl shadow-2xl text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-[#feb323]">
            Soutenez nos actions sur le terrain
          </h2>
          <p className="text-sm text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Vos contributions financières et votre engagement bénévole financent directement l'achat de graines pour les pépinières, le transport des équipements de plantation et l'assistance administrative aux familles Bagyeli.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/faire-un-don"
              className="px-8 py-4 rounded-full bg-[#feb323] text-[#083415] font-extrabold hover:bg-amber-400 transition-all text-sm shadow-lg"
            >
              Faire un don ponctuel 💳
            </Link>
            <Link
              href="/devenir-membre"
              className="px-8 py-4 rounded-full bg-white/10 text-white border border-white/20 font-bold hover:bg-white/20 transition-all text-sm"
            >
              Rejoindre en tant que membre bénévole 🤝
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

