import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "À propos de LISDA ONG — Histoire, Mission & Valeurs",
  description: "Découvrez l'histoire, la mission et les actions de terrain de l'ONG LISDA basée à Kribi (Cameroun) pour le développement durable dans le Bassin du Congo.",
};

export default function AProposPage() {
  return (
    <div className="w-full bg-[#fbf9f4] text-[#1b1c19] min-h-screen space-y-16 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-[#083415] text-[#bfefc0] text-xs uppercase tracking-wider font-bold">
                Identité & Gouvernance Officielle
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white text-[#424941] text-xs border border-[#083415]/10 font-medium">
                Siège Social : Dombe, Kribi (Cameroun)
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#083415] leading-tight">
              Ancrés dans le littoral et la forêt du Bassin du Congo
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>LISDA</strong> (<em>Local Initiatives for a Sustainable Development in Africa</em>) est une organisation non gouvernementale humanitaire et environnementale fondée par des acteurs locaux engagés pour la protection des écosystèmes littoraux, l'autonomisation des communautés rurales et la défense des droits des peuples autochtones Bagyeli.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/equipe"
                className="px-6 py-3.5 rounded-full font-bold bg-[#083415] text-[#feb323] hover:bg-[#001d07] transition-all text-sm shadow-md"
              >
                Découvrir notre équipe 👥
              </Link>
              <Link
                href="/documents"
                className="px-6 py-3.5 rounded-full font-bold bg-white text-[#083415] border border-[#083415]/20 hover:bg-[#f5f3ee] transition-all text-sm"
              >
                Consulter les statuts officiels 📄
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[420px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="https://lh3.googleusercontent.com/aida/AEtjO1VFbSmGSavr_HPFZmQoHX-RIpwQKN-SssYZHRDgD_GB3NkJXOpgKzw-q879xtyefgHJGcJiNRJBNwzLW7KSTgwWud1AH84pZVLtXDzRH4hAZzHaCHtixpezp7EPXIm3_60OMUCauAyHmGJhdcFkXM56VmEt824ZbC9kONRx3PPsXnMdHe2IeHGcsnSBhT63E2lk9LwlSVPrSLYxPanA2miZkxzIFskg2uAxLCjeG-X0UEel8xyfipIcEBI"
              alt="Rassemblement communautaire LISDA ONG à Kribi"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-[#083415]/10 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#083415] text-[#feb323] font-bold flex items-center justify-center text-2xl shadow-inner">
                🎯
              </div>
              <h2 className="text-2xl font-bold text-[#083415]">Notre Mission</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Promouvoir un développement local équitable et durable en Afrique centrale en restaurant les écosystèmes littoraux, en soutenant l'agroécologie villageoise et en garantissant l'accès aux droits fondamentaux pour les populations vulnérables.
              </p>
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden mt-2">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2a1OwSW6kWJDKOre3FEhDYysm9EuvdSjWcHKV1C3HUwn2vdR8JzvQAmbdjcvwGWZfzIt7Y23yyFBNv2k_Gd3IkwqCWbf1SF1TDFGoDeOcqvBeL3qZwzVvwLzfbbOWitD8sGJ86-0o2_VU8fRdF_q2frGkYUji8BlrmqxHGmnM9Uap0b2bgH3d_0SZcmp5fXFmDoewcZ7gycY--Zf5b6l9_gS9tAg2en7r2beZW2ZpP6yUb2IB00lLyw"
                alt="Forêt littorale du Sud Cameroun"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#083415]/10 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#ba6d14] text-white font-bold flex items-center justify-center text-2xl shadow-inner">
                🌿
              </div>
              <h2 className="text-2xl font-bold text-[#083415]">Notre Vision</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bâtir des communautés riveraines résilientes dans le Bassin du Congo où la souveraineté alimentaire, la protection de la biodiversité et les savoirs traditionnels s'harmonisent durablement avec la modernité.
              </p>
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden mt-2">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqcLG2-3iRk1f5Gry94sv8RoHn3tYF3MVPPFeNU7U2BiS8HgrblOemrOqbWomPX0aJC1Gc3ngb1p8ZhSNBJhMjPkaF-KsqRDkFyYLp1dFL8u4jcoKhGki0mnfgMTOK_Xnod1p-bB1evM_A4w5w1GfX5zqbrRmtY4kYQffWdsLRjuMnYTroTSnHq_ytHLT5bSl0AcCve6KLGi9POMULqvGz1hIKmhjoEp7AocQAzcutYu_DUE2pyAYrIA"
                alt="Littoral de Kribi Ocean"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Communities Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-[#f0eee9] p-8 lg:p-12 rounded-3xl space-y-8 border border-[#083415]/10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#ba6d14] font-bold">Action Inclusive</span>
            <h2 className="text-3xl font-extrabold text-[#083415]">Populations & Communautés Accompagnées</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#ba6d14]">Peuples Autochtones</span>
                <h3 className="font-bold text-lg text-[#083415]">Communautés Bagyeli</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Plaidoyer pour les droits fonciers coutumiers, délivrance d'actes d'état-civil, valorisation des connaissances éco-forestières traditionnelles.
                </p>
              </div>
              <div className="relative h-36 rounded-xl overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1JMDGgaI49iFUOcDpmP4GyxVo-n6F5CzvcwvEDaRVaEIEYmI0KCYDe2ck8Ws6z79RKUp3GtK21yJce4YNhMjO7z5YULKTfwrwF3H4MIRjZfFXCH42Yi-J9CAiSL7zGFxRodHScBfdNvR5fm1DRJU9hCK05HpqYJZHzOYB27RDaisAYANH_pv5xI2-Y8G2NBjpfisg7yg9vl1EEQ9jm1oE-2AkDImFkupK65FewO_agcmPzccTFZgEDA"
                  alt="Arbre à palabres et concertation Bagyeli"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#537f1b]">Autonomisation Rurale</span>
                <h3 className="font-bold text-lg text-[#083415]">Femmes & Jeunes Ruraux</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Formations agroécologiques, pépinières communautaires d'espèces autochtones, micro-projets de transformation de produits forestiers non ligneux.
                </p>
              </div>
              <div className="relative h-36 rounded-xl overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida/AEtjO1VFbSmGSavr_HPFZmQoHX-RIpwQKN-SssYZHRDgD_GB3NkJXOpgKzw-q879xtyefgHJGcJiNRJBNwzLW7KSTgwWud1AH84pZVLtXDzRH4hAZzHaCHtixpezp7EPXIm3_60OMUCauAyHmGJhdcFkXM56VmEt824ZbC9kONRx3PPsXnMdHe2IeHGcsnSBhT63E2lk9LwlSVPrSLYxPanA2miZkxzIFskg2uAxLCjeG-X0UEel8xyfipIcEBI"
                  alt="Femmes rurales engagées dans l'agroforesterie"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#feb323]">Résilience Climatique</span>
                <h3 className="font-bold text-lg text-[#083415]">Riverains du Littoral</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Restauration des mangroves côtières contre l'érosion marine, mise en place de comités de surveillance communautaire du littoral atlantique.
                </p>
              </div>
              <div className="relative h-36 rounded-xl overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqcLG2-3iRk1f5Gry94sv8RoHn3tYF3MVPPFeNU7U2BiS8HgrblOemrOqbWomPX0aJC1Gc3ngb1p8ZhSNBJhMjPkaF-KsqRDkFyYLp1dFL8u4jcoKhGki0mnfgMTOK_Xnod1p-bB1evM_A4w5w1GfX5zqbrRmtY4kYQffWdsLRjuMnYTroTSnHq_ytHLT5bSl0AcCve6KLGi9POMULqvGz1hIKmhjoEp7AocQAzcutYu_DUE2pyAYrIA"
                  alt="Littoral et mangrove de Kribi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Recognition Card */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-[#083415] text-white p-8 lg:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#feb323]/30">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#feb323]">Cadre Légal Officiel</span>
            <h3 className="text-2xl font-bold">Association déclarée auprès des autorités du Cameroun</h3>
            <p className="text-sm text-gray-200 max-w-2xl leading-relaxed">
              LISDA ONG est légalement enregistrée conformément aux lois de la République du Cameroun régissant les associations, avec récépissé de déclaration déposé à la Préfecture de l'Océan à Kribi.
            </p>
          </div>
          <Link
            href="/documents"
            className="px-8 py-4 rounded-full bg-[#feb323] text-[#083415] font-extrabold hover:bg-amber-400 transition-all text-sm shrink-0 shadow-lg"
          >
            Télécharger les statuts 📄
          </Link>
        </div>
      </section>
    </div>
  );
}

