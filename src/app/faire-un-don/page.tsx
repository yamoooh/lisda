'use client';

import { useState } from 'react';

export default function FaireUnDonPage() {
  const [montant, setMontant] = useState<number>(10000);
  const [typeDon, setTypeDon] = useState<'argent' | 'nature'>('argent');
  const [accord, setAccord] = useState<boolean>(true);
  const [nom, setNom] = useState<string>('');
  const [prenom, setPrenom] = useState<string>('');

  const donateursExemples = [
    { nom: "Mme Clarisse N.", montant: "25 000 FCFA", type: "Don financier" },
    { nom: "M. Paulin M.", montant: "Kits de papeterie", type: "Don en nature" },
    { nom: "Fondation Partenaire", montant: "100 000 FCFA", type: "Don financier" }
  ];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirection LeekPay payment gateway simulation
    alert(`Redirection vers LeekPay pour valider votre don de ${montant} FCFA. Merci pour votre générosité !`);
    window.location.href = '/faire-un-don/merci';
  };

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <span className="text-[#feb323] font-bold text-xs uppercase tracking-widest bg-[#083415] px-3 py-1 rounded-full">Don Ponctuel Exclusif</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Faire un Don à LISDA ONG</h1>
        <p className="text-gray-600 text-lg">
          Votre don est ponctuel — aucun abonnement récurrent. Il soutient directement nos actions à Kribi et Dombe.
        </p>
      </div>

      {/* Form Don */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-8">
        <div className="flex rounded-full bg-gray-100 p-1">
          <button
            onClick={() => setTypeDon('argent')}
            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${typeDon === 'argent' ? 'bg-[#083415] text-[#feb323]' : 'text-gray-600'}`}
          >
            Don Financier
          </button>
          <button
            onClick={() => setTypeDon('nature')}
            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${typeDon === 'nature' ? 'bg-[#083415] text-[#feb323]' : 'text-gray-600'}`}
          >
            Don en Nature (Kits, Matériel)
          </button>
        </div>

        {typeDon === 'argent' ? (
          <form onSubmit={handlePay} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase">Choisir ou saisir le montant (FCFA)</label>
              <div className="grid grid-cols-3 gap-3">
                {[5000, 10000, 25000, 50000].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMontant(m)}
                    className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${montant === m ? 'border-[#feb323] bg-[#feb323]/10 text-[#083415]' : 'border-gray-200 text-gray-700'}`}
                  >
                    {m.toLocaleString()} FCFA
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Prénom</label>
                <input
                  type="text"
                  required
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nom</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="accord"
                checked={accord}
                onChange={(e) => setAccord(e.target.checked)}
                className="w-4 h-4 text-[#083415]"
              />
              <label htmlFor="accord" className="text-xs text-gray-600">
                J'accepte que mon nom apparaisse publiquement dans la liste des donateurs.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#feb323] text-[#6b4800] font-extrabold text-base hover:bg-[#f5ab19] shadow-lg transition-all"
            >
              🔒 Payer {montant.toLocaleString()} FCFA via LeekPay
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-sm text-gray-700">
            <p className="font-bold text-[#083415]">Pour les dons en nature (matériel médical, fournitures scolaires, outils) :</p>
            <p>Veuillez contacter directement l'équipe de coordination de LISDA à Kribi par téléphone au <strong>+237 677 593 239</strong> ou par e-mail à <strong>Patrice_segbe@yahoo.fr</strong>.</p>
          </div>
        )}
      </div>

      {/* Liste des Donateurs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#083415] text-center">Nos Généreux Donateurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {donateursExemples.map((d, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 text-center space-y-1">
              <div className="font-bold text-sm text-[#083415]">{d.nom}</div>
              <div className="text-xs text-[#ba6d14] font-semibold">{d.montant}</div>
              <div className="text-[10px] text-gray-400">{d.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
