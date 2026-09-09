export default function DocumentsPage() {
  const documents = [
    { titre: "Récépissé officiel de déclaration d'association", categorie: "Documents Officiels", annee: "2026", url: "#" },
    { titre: "Plan d'action triennal (2026-2029) - LISDA ONG", categorie: "Plans d'Action", annee: "2026", url: "#" },
    { titre: "Rapport annuel d'activités & Bilan financier", categorie: "Rapports d'Activités", annee: "2025", url: "#" },
    { titre: "Étude d'impact environnemental du littoral de Kribi", categorie: "Études Techniques", annee: "2025", url: "#" },
    { titre: "Charte éthique de protection des savoirs Bagyeli", categorie: "Plaidoyer", annee: "2024", url: "#" }
  ];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Publications Officielles</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Documents & Reports Téléchargeables</h1>
        <p className="text-gray-600 text-lg">
          Tous nos documents officiels, rapports d'activités et fiches d'action (PDF) disponibles en téléchargement libre.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {documents.map((doc, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#feb323] transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#083415]/10 text-[#083415] text-[10px] font-bold px-2.5 py-0.5 rounded-full">{doc.categorie}</span>
                <span className="text-xs text-gray-400 font-semibold">{doc.annee}</span>
              </div>
              <h3 className="font-bold text-base text-[#083415]">{doc.titre}</h3>
            </div>
            <a
              href="mailto:Patrice_segbe@yahoo.fr?subject=Demande%20de%20document%20officiel"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs hover:bg-[#001d07] shrink-0"
            >
              📥 Télécharger (PDF)
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
