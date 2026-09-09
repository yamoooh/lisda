'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [tab, setTab] = useState<'actualites' | 'phototheque' | 'documents' | 'equipe' | 'donateurs'>('actualites');

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-[#083415] text-white p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-[#feb323]">Espace d'Administration LISDA ONG</h1>
          <p className="text-xs text-gray-300">Gestion du contenu sans coder (Kribi, Cameroun)</p>
        </div>
        <span className="bg-[#feb323] text-[#6b4800] px-3 py-1 rounded-full text-xs font-bold">Admin Connecté</span>
      </div>

      <div className="flex border-b border-gray-200 gap-2 overflow-x-auto">
        {(['actualites', 'phototheque', 'documents', 'equipe', 'donateurs'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 font-bold text-xs capitalize rounded-t-xl transition-all ${tab === t ? 'bg-white border-t border-x border-gray-300 text-[#083415]' : 'text-gray-500 hover:text-gray-800'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-6">
        <h2 className="text-xl font-bold text-[#083415] capitalize">Mettre à jour : {tab}</h2>
        <p className="text-xs text-gray-500">Interface de mise à jour rapide alimentée par Supabase.</p>
        <button className="px-5 py-2.5 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs">
          + Ajouter un nouvel élément dans {tab}
        </button>
      </div>
    </div>
  );
}
