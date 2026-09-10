'use client';

import { useState, useEffect } from 'react';
import { DocumentItem, initialDocuments, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DocumentItem | null>(null);

  const [titre, setTitre] = useState('');
  const [categorie, setCategorie] = useState('Rapports Annuels');
  const [annee, setAnnee] = useState('2026');
  const [taille, setTaille] = useState('2.5 Mo');

  useEffect(() => {
    setDocs(getStoredData<DocumentItem[]>('lisda_documents', initialDocuments));
    const handleChange = () => setDocs(getStoredData<DocumentItem[]>('lisda_documents', initialDocuments));
    window.addEventListener('lisda_data_changed', handleChange);
    return () => window.removeEventListener('lisda_data_changed', handleChange);
  }, []);

  const openNewModal = () => {
    setEditingItem(null);
    setTitre('');
    setCategorie('Rapports Annuels');
    setAnnee('2026');
    setTaille('2.5 Mo');
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) return;

    if (editingItem) {
      const updated = docs.map(d => d.id === editingItem.id ? { ...d, titre, categorie, annee, taille } : d);
      setStoredData('lisda_documents', updated);
      setDocs(updated);
    } else {
      const newItem: DocumentItem = {
        id: 'doc-' + Date.now(),
        titre,
        categorie,
        annee,
        url: '#',
        taille,
        telechargements: 0
      };
      const updated = [newItem, ...docs];
      setStoredData('lisda_documents', updated);
      setDocs(updated);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce document officiel ?')) {
      const updated = docs.filter(d => d.id !== id);
      setStoredData('lisda_documents', updated);
      setDocs(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Publications Officielles</span>
            <span>•</span>
            <span>PDF & Rapports</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#083415]">Documents & Rapports</h1>
          <p className="text-xs text-gray-500 mt-1">
            Ajoutez et gérez les documents téléchargeables sur /documents.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-5 py-3 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
        >
          <span>📄</span>
          <span>Ajouter un Document PDF</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fbf9f4] border-b border-gray-100 text-[#083415] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Titre du document</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Année</th>
                <th className="p-4">Taille</th>
                <th className="p-4">Téléchargements</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {docs.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-bold text-[#083415] flex items-center gap-2">
                    <span>📕</span>
                    <span>{d.titre}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#083415]/10 text-[#083415] font-semibold text-[10px]">
                      {d.categorie}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-gray-600">{d.annee}</td>
                  <td className="p-4 text-gray-500">{d.taille}</td>
                  <td className="p-4 font-bold text-[#ba6d14]">{d.telechargements}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingItem(d);
                        setTitre(d.titre);
                        setCategorie(d.categorie);
                        setAnnee(d.annee);
                        setTaille(d.taille);
                        setModalOpen(true);
                      }}
                      className="text-xs text-gray-600 hover:text-[#083415] font-bold"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="text-xs text-red-600 hover:text-red-800 font-bold"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-[#083415]">
                {editingItem ? 'Modifier le document' : 'Nouveau document officiel'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#083415] mb-1">Titre du document</label>
                <input
                  type="text"
                  required
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Ex: Rapport d'activité 2026..."
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Catégorie</label>
                <select
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                >
                  <option value="Rapports Annuels">Rapports Annuels</option>
                  <option value="Gouvernance">Gouvernance</option>
                  <option value="Statuts Officiels">Statuts Officiels</option>
                  <option value="Études & Recherches">Études & Recherches</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Année</label>
                  <input
                    type="text"
                    required
                    value={annee}
                    onChange={(e) => setAnnee(e.target.value)}
                    placeholder="2026"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Taille estimée</label>
                  <input
                    type="text"
                    required
                    value={taille}
                    onChange={(e) => setTaille(e.target.value)}
                    placeholder="2.5 Mo"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <button type="submit" className="flex-1 h-11 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs">
                  Enregistrer
                </button>
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 h-11 rounded-full bg-gray-100 text-gray-700 font-bold text-xs">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
