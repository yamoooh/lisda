import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Équipe dirigeante & Gouvernance — LISDA ONG",
  description: "Découvrez les femmes et les hommes du Bureau Exécutif de LISDA ONG engagés pour le développement durable à Kribi et dans le Bassin du Congo.",
};

export default function EquipePage() {
  const membreBureau = [
    {
      nom: "NSEGBE Patrice",
      fonction: "Président Coordonnateur & Fondateur",
      roleShort: "Coordination Générale",
      bio: "Supervise la gouvernance stratégique, les partenariats institutionnels et le plaidoyer pour les droits coutumiers et la préservation de la forêt littorale.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1XxknWRwNUC7LKKM_x4Wlpb1WIbQSeRfkAVfY6MQbNkZA_ksAifuaVjLQPadw3xnlbp6pyVRi4N4v598C95z2w4MaAW5t0Kuop14PYz2zPUk2PaXjMSeBiL9z-1FF_wmV28-6ZoAK5VNiLtYyWnXijVFOC_Q0LB6OMm6YvWxJkndZMWUNCmTF1sRtnLjjroyjGUCw5n9oAIS4gollvJjK516KrpZWWJDlyHklMmBOdRVu_e4oAaMSQbC_HH",
      badge: "Coordination & Stratégie",
      email: "Patrice_segbe@yahoo.fr"
    },
    {
      nom: "INIKWA épse NSEGBE Victoire",
      fonction: "Secrétaire Générale",
      roleShort: "Bureau Exécutif",
      bio: "Supervise l'administration centrale, la tenue des registres légaux et mène activement les programmes d'autonomisation des femmes rurales de l'Océan.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYrikBM-zkZvEBV-roTc6Wc2qjciqs4mB4KQOZiXQjZU3QBhCTsc9aC8Sz8-U_QvEB8UBSp90V0C1gWgDjmd3yGr73nrYiRf-1V9A7-ImQ5LNcan-EnXFc7h6dzvp3Hnej5g4-iPRwNcmBYmdl8Nv4HjouPngrAqp7pXbU3vB9QbDZjlkiZWwWLjUM-4n9LWpGhoQKkKwDm0IsXxuMeS0uN355imbNuRcYXcdeKdV9s-c3lpqAJ9EHag",
      badge: "Coordination & Genre"
    },
    {
      nom: "AMBANI OKOUNOU Guy Dénis",
      fonction: "Secrétaire Général Adjoint chargé des projets",
      roleShort: "Gestion de Projets",
      bio: "Dirige l'ingénierie et le déploiement des opérations agroforestières sur le terrain et coordonne la cartographie participative avec les chefferies.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0UT0cWfbmyhDL-Tw-TSlI4DyxMWdPqcdSix7e0klhOPqLOLO4qwU2p2fXAy_h-20pRrjuu6aI2ghuPmzMR8dxHqFi7gIrWw5mPdQPAXdxXEuaMKct6Rq2qIc-L5u4dmlvzgNZcZ-UoCgINnT09grbcoeLiq9FRBJB46FKJl_KOY1-17D8trWDngNtvSCLDLy94wPPCaaw20wzT-t5vwU-ymq9ukU92Cz9M5naRT6el9jWF71pMS21_Q",
      badge: "Opérations & Agroécologie"
    },
    {
      nom: "ELIMBI Jean Gustave",
      fonction: "Trésorier Comptable",
      roleShort: "Finance & Audit",
      bio: "Garantit la traçabilité financière intégrale des dotations, la tenue des états financiers certifiés et la conformité administrative fiscale.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArVKRPzmRVw6VKAB-zf82CvVaLkGO6VKl2X_82JA7hy0vJcGYHSE5_tWYiE5-wdvOcrVmIP3KkKUMt949pNl-8kVS-kipGTmO6FSV1-T5yWZmALnezwQ1ffNnQFZY3xmOkRDFXDQ0En4_Xp1jq98pIOJz3yuXqN25_6vjrE1mYx4bHTO67BPfocMMlyKdb9Eqf9s-KZ0IAkmZwCbnw8cTPmCeA9m4PsL9-5QvQAt_TXHuFsu8thZdBXg",
      badge: "Traçabilité & Conformité"
    },
    {
      nom: "MPOUED Idrice",
      fonction: "Commissaire aux Comptes",
      roleShort: "Contrôle & Transparence",
      bio: "Assure l'audit interne permanent et indépendant des opérations comptables et certifie l'utilisation transparente des fonds de l'association.",
      initials: "MI",
      badge: "Audit Externe & Quitus"
    },
    {
      nom: "NNA BIWOLE MINDJOM Pierre Magloire",
      fonction: "Resp. Communication et Relations Publiques",
      roleShort: "Plaidoyer & Médias",
      bio: "Porte la parole publique de LISDA auprès des médias nationaux et internationaux et anime les campagnes de sensibilisation environnementale.",
      initials: "NM",
      badge: "Influence & Médias"
    },
    {
      nom: "NOUCK NSEGBE Thomas",
      fonction: "Censeur de l'Association",
      roleShort: "Éthique & Statuts",
      bio: "Garant du strict respect des textes statutaires, du règlement intérieur, et médiateur déontologique pour les actions de bienfaisance.",
      initials: "NT",
      badge: "Médiation & Discipline"
    }
  ];

  return (
    <div className="w-full bg-[#fbf9f4] text-[#1b1c19] min-h-screen">
      {/* Top Banner & Breadcrumbs */}
      <section className="relative w-full bg-[#f5f3ee] px-6 lg:px-12 py-12 overflow-hidden border-b border-[#083415]/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#424941]">
            <Link href="/" className="hover:text-[#083415] transition-colors flex items-center gap-1">
              <span>Accueil</span>
            </Link>
            <span className="text-[#c1c9be]">/</span>
            <span className="font-semibold text-[#083415]">Équipe & Gouvernance</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#083415] text-[#bfefc0] text-xs uppercase tracking-wider font-bold">
                  Gouvernance & Dévouement Humain
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#424941] text-xs font-medium border border-[#083415]/10">
                  Dombe, Kribi • Bassin du Congo
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#083415] tracking-tight leading-tight">
                Les femmes et les hommes au cœur de notre engagement
              </h1>
              <p className="text-lg text-[#424941] max-w-3xl leading-relaxed">
                Une équipe pluridisciplinaire unie par la défense inconditionnelle des droits des peuples autochtones, la régénération écologique des forêts littorales et le développement équitable du Sud-Cameroun.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#083415]/10 flex items-center gap-4 w-full sm:w-auto">
                <div className="w-12 h-12 rounded-full bg-[#083415] flex items-center justify-center text-[#feb323] shrink-0 font-bold text-xl">
                  ✓
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#083415] text-base">Statuts Récépissés</span>
                  <span className="text-xs text-[#424941]">Association Officielle déclarée au Cameroun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Figures */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-[#083415]/10 shadow-sm">
              <span className="text-4xl font-extrabold text-[#083415]">7</span>
              <p className="font-bold text-[#083415] mt-2 text-sm">Membres Exécutifs</p>
              <p className="text-xs text-[#424941]">Direction collégiale & élue</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#083415]/10 shadow-sm">
              <span className="text-4xl font-extrabold text-[#ba6d14]">100%</span>
              <p className="font-bold text-[#083415] mt-2 text-sm">Ancrage Terroir</p>
              <p className="text-xs text-[#424941]">Natif du littoral & forêt Kribi</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#083415]/10 shadow-sm">
              <span className="text-4xl font-extrabold text-[#537f1b]">35+</span>
              <p className="font-bold text-[#083415] mt-2 text-sm">Sentinelles Locales</p>
              <p className="text-xs text-[#424941]">Bénévoles de brousse actifs</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#083415]/10 shadow-sm">
              <span className="text-4xl font-extrabold text-[#feb323]">14</span>
              <p className="font-bold text-[#083415] mt-2 text-sm">Chefferies Unies</p>
              <p className="text-xs text-[#424941]">Clans et villages partenaires</p>
            </div>
          </div>
        </div>
      </section>

      {/* President Spotlight */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-[#083415] text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full">
              <Image
                src={membreBureau[0].image!}
                alt="Portrait officiel de Patrice NSEGBE, Président Coordonnateur de l'ONG LISDA"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute top-4 left-4 bg-[#feb323] text-[#083415] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                Coordination Générale
              </div>
            </div>

            <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-[#bfefc0] font-bold">
                  Mise en Avant • Présidence de l'ONG
                </span>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    {membreBureau[0].nom}
                  </h2>
                  <span className="text-xl text-[#feb323] font-semibold">
                    {membreBureau[0].fonction}
                  </span>
                </div>

                <div className="mt-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <blockquote className="text-lg italic text-gray-100 leading-relaxed">
                    « Notre force réside dans notre proximité indéfectible avec nos terroirs de Dombe et les communautés de la forêt. Chaque décision, chaque plaidoyer porte la voix de ceux qui protègent le poumon vert du monde. »
                  </blockquote>
                </div>

                <p className="text-sm text-gray-200 leading-relaxed mt-2">
                  {membreBureau[0].bio}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-[#bfefc0]">
                  <span>✉ {membreBureau[0].email}</span>
                  <span>•</span>
                  <span>📍 Dombe, Kribi (Cameroun)</span>
                </div>
                <a
                  href="https://wa.me/237677593239?text=Bonjour%20M.%20NSEGBE%2C%20je%20vous%20contacte%20via%20le%20site%20LISDA."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full font-bold bg-[#feb323] text-[#083415] hover:bg-amber-400 transition-all text-sm shadow-md"
                >
                  Contacter la présidence
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Board Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="flex flex-col gap-3 mb-10">
          <span className="text-xs uppercase tracking-widest text-[#ba6d14] font-bold">
            Instances Dirigeantes
          </span>
          <h2 className="text-3xl font-bold text-[#083415]">
            Le Bureau Exécutif de LISDA ONG
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm">
            Une gouvernance structurée assurant la transparence, l'imputabilité et l'efficience des actions sur le terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {membreBureau.slice(1).map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-sm border border-[#083415]/10 hover:border-[#feb323] hover:shadow-md transition-all flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-2xl aspect-square w-full bg-[#f0eee9] flex items-center justify-center">
                  {m.image ? (
                    <Image
                      src={m.image}
                      alt={m.nom}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#083415] text-[#feb323] flex items-center justify-center text-3xl font-extrabold shadow-inner">
                      {m.initials}
                    </div>
                  )}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#083415] text-[#bfefc0] text-[11px] font-bold uppercase tracking-wider">
                    {m.roleShort}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-[#ba6d14] uppercase tracking-wider">
                    {m.fonction}
                  </span>
                  <h3 className="text-xl font-bold text-[#083415] leading-snug">
                    {m.nom}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {m.bio}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f5f3ee] flex items-center justify-between text-xs text-[#083415] font-semibold">
                <span>{m.badge}</span>
                <span className="text-[#ba6d14]">LISDA ONG</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

