const fs = require('fs');

const pageAccueilContent = `import Link from 'next/link';

export default function Home() {
  const actualites = [
    {
      titre: "Atelier de formation en agroforesterie à Dombe",
      date: "Mars 2026 • Kribi",
      categorie: "Agroécologie",
      description: "Plus de 40 agriculteurs de la commune de Kribi ont appris les techniques de semis d'arbres fertilisants pour régénérer les sols dégradés sans intrants chimiques.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzYllvG22lMKHQvWROKgpUCyTF8Iy_aH63VOzXTHrPBbO7Gb6lK6RtKKzr3ZJjK8UJ7nDQq_6Eo7rbPwd1gASzVfEhd0PXtOMMgMaY7KS-Wt5F55LHkcDu1qiPNgxuj7wOtEQZPIu9Mklkn5QsCzJjIzz8TKUWM2vPWE8EN5U8GzFx2pEUtUOLlboV0RRQj7h8EC0IyVtkb3AjSNbVBd1kDS-2FC1t4qL_eTxI4j3oh7uvCJSA2i16IA"
    },
    {
      titre: "Appui scolaire pour les enfants autochtones Bagyeli",
      date: "Février 2026 • Bipindi",
      categorie: "Éducation & Droits",
      description: "Remise solennelle de 150 trousseaux scolaires et couverture des frais d'inscription pour encourager la scolarisation des jeunes filles et garçons autochtones.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYqfiULPt37uT6NIzHYrsjAfV31CNvfWCNiT0vx1bWEddu-w9Ijaa422NlguLPAhbgkgpEzf_ktaJT9LpYFYrmdeAvFJbKPrrk2jf26uygSwUVx0JUOVKe6qJfxGHiU2LogU0soUFQp52wZA-uUZDePR0OHLkNxQihBbL5iaDtxyfeOdponG9bJ9bRXY9Bh4pOa1BjoIA-zr_fyPynns5Z8petjVo7ynXYVmxnjozkhzzcvduqhO_pDg"
    },
    {
      titre: "Comité local de veille climatique et des cours d'eau",
      date: "Janvier 2026 • Bassin de la Kienké",
      categorie: "Environnement",
      description: "Création d'un réseau de sentinelles citoyennes chargées de signaler les pollutions industrielles et les risques d'inondation soudaine pour les pêcheurs locaux.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABLsyXf98GZN8z2lmhkc9hU_WpnLYLcoGGY5RV4aDn0h5Z5_ViScAKogr1bQnT7AJBbWdyMZx_X1tf_Oy7FzbQM9NZWCzdz6Ue4RmJ0TAQRPWlDaAwGFkxuVEFGL68Ka0_TzIm3D_np4efhEosmZweinGbH870o5QcVp-Go19YjuaudlfWHNH0bUISc6HYMSWy_53o1GxRBJCPwu2mfce3EQg3aC3GsrCXPb-bDRxIq1QtFmlIhC3wVA"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section Stitch avec l'image de fond d'origine */}
      <section className="relative w-full overflow-hidden bg-[#083415] text-white py-20 lg:py-28 px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6_dti4xkWAyNrBVa9z6CEcN6gLf_XqYlgczIMkwHN2gqBNlzELYuH9GwWbWnHMdr73NNeilU5ZN2NS8PyKZbtz_01L42TlyL7GQDzJ8Y2MwoO6jdbq4FoHP_y-MhQlwvgob7WMJx2n66OKglVHFIjH5_l4C1wngKWNMk3Hg61tBSIDQhrgYBmyaMUIiryWnj4pt4ykEMXbOcfDlZ2CSs5yFfePerscADmxWo2TxkCdZtXxl4j_dKQyA"
            alt="Communauté locale et équipe de LISDA à Kribi"
            className="w-full h-full object-cover object-center opacity-35 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001d07] via-[#083415]/90 to-[#083415]/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#083415] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#feb323] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#feb323] animate-pulse"></span>
              <span>Kribi, Cameroun • Bassin du Congo</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Ensemble pour un <span className="text-[#feb323] underline decoration-[#feb323]/50 decoration-wavy">développement local durable</span> en Afrique.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
              LISDA œuvre à Kribi et dans le bassin du Congo pour l'autonomisation des peuples autochtones, la résilience face au changement climatique et la préservation de nos écosystèmes vitaux.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/faire-un-don"
                className="px-8 py-4 rounded-full bg-[#feb323] text-[#6b4800] font-bold text-base shadow-xl hover:bg-[#f5ab19] transition-all transform hover:-translate-y-0.5"
              >
                Faire un don
              </Link>
              <Link
                href="/devenir-membre"
                className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-all border border-white/20"
              >
                Devenir membre
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#001d07] p-8 rounded-3xl border border-[#feb323]/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <span className="text-[#feb323] font-bold text-xs uppercase tracking-wider">Siège & Zone d'Impact</span>
                <span className="bg-[#537f1b]/20 text-[#729e75] px-2.5 py-1 rounded-full text-xs font-semibold">ONG Déclarée</span>
              </div>
              <h3 className="text-xl font-bold text-white">Dombe, Kribi (Cameroun)</h3>
              <p className="text-sm text-gray-300">
                Installée à Dombe aux portes de Kribi, l'équipe LISDA conjugue présence quotidienne auprès des populations maritimes et expéditions régulières dans les forêts profondes du Sud Cameroun.
              </p>
              <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-xs text-gray-400">
                <span>Président Coordonnateur :</span>
                <span className="font-bold text-[#feb323]">NSEGBE Patrice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domaine d'intervention Bento */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[#ba6d14] font-bold text-xs uppercase tracking-widest">Nos Domaines d'Intervention</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#083415]">Agir avec rigueur, préserver avec passion</h2>
          </div>
          <p className="text-gray-600 text-sm max-w-md">
            Chaque programme est co-construit avec les chefferies traditionnelles et les populations riveraines pour garantir durabilité et souveraineté locale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#083415]/10 text-[#083415] flex items-center justify-center text-2xl font-bold">🌲</div>
            <h3 className="text-xl font-bold text-[#083415]">Préservation de la Biodiversité & Forêts</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Conservation active du couvert végétal du Bassin du Congo, programmes de reboisement d'arbres endémiques et cartographie participative.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#ba6d14]/10 text-[#ba6d14] flex items-center justify-center text-2xl font-bold">🛡️</div>
            <h3 className="text-xl font-bold text-[#083415]">Droits & Dignité des Peuples Autochtones</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Accompagnement juridique et citoyen des communautés Bagyeli, préservation des savoirs ancestraux et garantie d'accès à l'état-civil et aux soins.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#486990]/10 text-[#486990] flex items-center justify-center text-2xl font-bold">💨</div>
            <h3 className="text-xl font-bold text-[#083415]">Résilience au Changement Climatique</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Adaptation côtière face à l'érosion marine sur le littoral de Kribi, agroécologie résistante aux aléas et comités locaux d'alerte.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#feb323]/20 text-[#6b4800] flex items-center justify-center text-2xl font-bold">💳</div>
            <h3 className="text-xl font-bold text-[#083415]">Entrepreneuriat & Autonomie des Femmes</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Structuration de coopératives de transformation des produits forestiers non ligneux (moabi, njansang), tontines solidaires et indépendance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#001d07] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="text-4xl font-extrabold text-[#feb323]">12 500+</div>
            <p className="text-xs text-gray-300 mt-2 font-medium">Communautés & villageois directement accompagnés</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="text-4xl font-extrabold text-[#feb323]">48</div>
            <p className="text-xs text-gray-300 mt-2 font-medium">Projets écologiques & sociaux menés avec succès</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="text-4xl font-extrabold text-[#feb323]">18</div>
            <p className="text-xs text-gray-300 mt-2 font-medium">Forêts communautaires & terroirs protégés</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="text-4xl font-extrabold text-[#feb323]">100%</div>
            <p className="text-xs text-gray-300 mt-2 font-medium">Des dons affectés directement aux initiatives de terrain</p>
          </div>
        </div>
      </section>

      {/* Actualités avec les 3 vraies images Stitch */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[#ba6d14] font-bold text-xs uppercase tracking-widest">Sur le Terrain</span>
            <h2 className="text-3xl font-extrabold text-[#083415]">Dernières actualités & actions concrètes</h2>
          </div>
          <Link href="/documents" className="text-sm font-bold text-[#083415] hover:text-[#ba6d14]">
            Consulter toutes nos actions →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actualites.map((actu, idx) => (
            <article key={idx} className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-56 w-full overflow-hidden">
                <img src={actu.image} alt={actu.titre} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-[#083415] text-[#feb323] uppercase">
                  {actu.categorie}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs text-gray-400 font-semibold">{actu.date}</span>
                  <h3 className="text-lg font-bold text-[#083415]">{actu.titre}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{actu.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Map Kribi Background Image */}
      <section className="w-full bg-[#f5f3ee] py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[#ba6d14] font-bold text-xs uppercase tracking-widest">Siège & Zone d'Impact</span>
            <h2 className="text-3xl font-extrabold text-[#083415]">Au cœur du littoral camerounais et du sanctuaire équatorial</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Installée à Dombe, aux portes de Kribi, l'équipe LISDA conjugue présence quotidienne auprès des populations maritimes et expéditions régulières dans les forêts profondes du Sud Cameroun.
            </p>
            <div className="pt-2">
              <Link href="/contact" className="inline-flex px-6 py-3 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs hover:bg-[#001d07]">
                ✉️ Prendre contact avec le bureau de Kribi
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white p-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg94jxMUkZUi8xhB8dazFUt5GRh13cB42J0FMWArhOOimM0NuNFk94us5vv3N7xI8Icj4BI86ALUcvBnbvTNJEcix77WwYcgB4Maj-xAga17hk8YhJ6NY26_7g_NxphvPUfCsAx1fM1msLp1vLBmiuqJqwcCEmwAJ4cCpAEB0I4djvzkJByK7_c9ynFK6uIhqkCVKM93inZGaN0dpLWVz7a_FrXir-ExZtZ1AqZaqGHI32sq3RpeVzTg"
                alt="Carte du littoral de Kribi et Dombe"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="p-3 flex justify-between text-xs text-gray-600 font-medium">
                <span>📍 Coordonnées : 2°56'N, 9°54'E</span>
                <span className="font-bold text-[#083415]">LISDA Dombe HQ</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync('d:/lisda-site/src/app/page.tsx', pageAccueilContent, 'utf8');
console.log('Injected all exact Stitch images into src/app/page.tsx!');
