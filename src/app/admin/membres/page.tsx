'use client';

import { useState, useEffect } from 'react';
import { MembreInscritItem, NewsletterItem, initialMembres, initialNewsletters, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminMembresPage() {
  const [membres, setMembres] = useState<MembreInscritItem[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [activeTab, setActiveTab] = useState<'membres' | 'newsletter'>('membres');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setMembres(getStoredData<MembreInscritItem[]>('lisda_membres', initialMembres));
    setNewsletters(getStoredData<NewsletterItem[]>('lisda_newsletters', initialNewsletters));
    const handleChange = () => {
      setMembres(getStoredData<MembreInscritItem[]>('lisda_membres', initialMembres));
      setNewsletters(getStoredData<NewsletterItem[]>('lisda_newsletters', initialNewsletters));
    };
    window.addEventListener('lisda_data_changed', handleChange);
    return () => window.removeEventListener('lisda_data_changed', handleChange);
  }, []);

  const exportCSV = () => {
    const csvRows = [
      ['Email', 'Date Inscription', 'Statut'],
      ...newsletters.map(n => [n.email, n.date_inscription, n.actif ? 'Actif' : 'Désabonné'])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lisda_newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredMembres = membres.filter(m => 
    m.nom.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Communauté LISDA</span>
            <span>•</span>
            <span>Base Adhérents</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#083415]">Membres & Newsletter</h1>
          <p className="text-xs text-gray-500 mt-1">
            Consultez les personnes inscrites via "Devenir membre" et exportez la liste des abonnés.
          </p>
        </div>

        <div className="flex gap-2">
          {activeTab === 'newsletter' && (
            <button
              onClick={exportCSV}
              className="px-5 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <span>📥</span>
              <span>Exporter CSV</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex border-b border-gray-200 gap-4">
        <button
          onClick={() => setActiveTab('membres')}
          className={`pb-3 font-bold text-xs transition-colors relative ${activeTab === 'membres' ? 'text-[#083415] border-b-2 border-[#083415]' : 'text-gray-400 hover:text-gray-700'}`}
        >
          Adhérents & Volontaires ({membres.length})
        </button>
        <button
          onClick={() => setActiveTab('newsletter')}
          className={`pb-3 font-bold text-xs transition-colors relative ${activeTab === 'newsletter' ? 'text-[#083415] border-b-2 border-[#083415]' : 'text-gray-400 hover:text-gray-700'}`}
        >
          Abonnés Newsletter ({newsletters.length})
        </button>
      </div>

      {activeTab === 'membres' ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom ou email..."
              className="w-full max-w-sm h-10 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fbf9f4] border-b border-gray-100 text-[#083415] uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Nom complet</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Motivation</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMembres.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-bold text-[#083415]">{m.nom} {m.prenom}</td>
                    <td className="p-4 space-y-0.5">
                      <div className="text-gray-700">{m.email}</div>
                      <div className="text-gray-400 text-[11px]">{m.telephone}</div>
                    </td>
                    <td className="p-4 text-gray-600 max-w-xs truncate">{m.motivation}</td>
                    <td className="p-4 text-gray-400">{m.date_inscription}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Validé
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fbf9f4] border-b border-gray-100 text-[#083415] uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Adresse Email</th>
                  <th className="p-4">Date d'inscription</th>
                  <th className="p-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {newsletters.map((nl) => (
                  <tr key={nl.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-bold text-[#083415]">{nl.email}</td>
                    <td className="p-4 text-gray-400">{nl.date_inscription}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Abonné actif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
