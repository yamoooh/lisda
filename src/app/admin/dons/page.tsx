'use client';

import { useState, useEffect } from 'react';
import { DonateurItem, initialDonateurs, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminDonsPage() {
  const [dons, setDons] = useState<DonateurItem[]>([]);

  useEffect(() => {
    setDons(getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs));
    const handleChange = () => setDons(getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs));
    window.addEventListener('lisda_data_changed', handleChange);
    return () => window.removeEventListener('lisda_data_changed', handleChange);
  }, []);

  const toggleStatus = (id: string) => {
    const updated = dons.map(d => {
      if (d.id === id) {
        return {
          ...d,
          statut: d.statut === 'valide' ? ('masque' as const) : ('valide' as const),
          accord_affichage: d.statut !== 'valide'
        };
      }
      return d;
    });
    setStoredData('lisda_dons', updated);
    setDons(updated);
  };

  const totalCollected = dons.reduce((acc, curr) => acc + curr.montant, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Passerelle LeekPay</span>
            <span>•</span>
            <span>Financement & Dons</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#083415]">Dons & Donateurs</h1>
          <p className="text-xs text-gray-500 mt-1">
            Historique des contributions et contrôle de l'affichage public sur le mur des donateurs.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#feb323]/20 border border-[#feb323]/40 text-right">
          <span className="text-[10px] font-bold text-[#6b4800] uppercase tracking-wider block">Total Collecté</span>
          <span className="text-xl font-extrabold text-[#083415]">{totalCollected.toLocaleString('fr-FR')} FCFA</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fbf9f4] border-b border-gray-100 text-[#083415] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Donateur</th>
                <th className="p-4">Montant</th>
                <th className="p-4">Moyen de paiement</th>
                <th className="p-4">Date</th>
                <th className="p-4">Référence</th>
                <th className="p-4">Affichage public</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dons.map((don) => (
                <tr key={don.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-bold text-[#083415]">
                    {don.anonyme ? 'Donateur Anonyme' : `${don.nom} ${don.prenom}`}
                  </td>
                  <td className="p-4 font-extrabold text-emerald-800">
                    {don.montant.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="p-4 text-gray-600">{don.type_don}</td>
                  <td className="p-4 text-gray-400">{don.date_don}</td>
                  <td className="p-4 font-mono text-[11px] text-gray-500">{don.reference || 'LEEK-AUTO'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${don.statut === 'valide' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                      {don.statut === 'valide' ? 'Visible publiquement' : 'Masqué'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleStatus(don.id)}
                      className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all ${don.statut === 'valide' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'}`}
                    >
                      {don.statut === 'valide' ? 'Masquer' : 'Valider Affichage'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
