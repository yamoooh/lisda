'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ActualiteItem, initialActualites, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminActualitesPage() {
  const [actualites, setActualites] = useState<ActualiteItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ActualiteItem | null>(null);

  // Form states
  const [titre, setTitre] = useState('');
  const [categorie, setCategorie] = useState('Agroécologie');
  const [date, setDate] = useState('Mars 2026 • Kribi');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [statut, setStatut] = useState<'publie' | 'brouillon'>('publie');

  useEffect(() => {
    setActualites(getStoredData<ActualiteItem[]>('lisda_actualites', initialActualites));
    const handleChange = () => setActualites(getStoredData<ActualiteItem[]>('lisda_actualites', initialActualites));
    window.addEventListener('lisda_data_changed', handleChange);
    return () => window.removeEventListener('lisda_data_changed', handleChange);
  }, []);

  const openNewModal = () => {
    setEditingItem(null);
    setTitre('');
    setCategorie('Agroécologie');
    setDate('Mars 2026 • Kribi');
    setDescription('');
    setImage('https://lh3.googleusercontent.com/aida-public/AB6AXuBzYllvG22lMKHQvWROKgpUCyTF8Iy_aH63VOzXTHrPBbO7Gb6lK6RtKKzr3ZJjK8UJ7nDQq_6Eo7rbPwd1gASzVfEhd0PXtOMMgMaY7KS-Wt5F55LHkcDu1qiPNgxuj7wOtEQZPIu9Mklkn5QsCzJjIzz8TKUWM2vPWE8EN5U8GzFx2pEUtUOLlboV0RRQj7h8EC0IyVtkb3AjSNbVBd1kDS-2FC1t4qL_eTxI4j3oh7uvCJSA2i16IA');
    setStatut('publie');
    setModalOpen(true);
  };

  const openEditModal = (item: ActualiteItem) => {
    setEditingItem(item);
    setTitre(item.titre);
    setCategorie(item.categorie);
    setDate(item.date);
    setDescription(item.description);
    setImage(item.image);
    setStatut(item.statut);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim() || !description.trim()) return;

    if (editingItem) {
      const updated = actualites.map(a => a.id === editingItem.id ? {
        ...a,
        titre,
        categorie,
        date,
        description,
        image,
        statut
      } : a);
      setStoredData('lisda_actualites', updated);
      setActualites(updated);
    } else {
      const newItem: ActualiteItem = {
        id: 'act-' + Date.now(),
        titre,
        categorie,
        date,
        description,
        image: image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzYllvG22lMKHQvWROKgpUCyTF8Iy_aH63VOzXTHrPBbO7Gb6lK6RtKKzr3ZJjK8UJ7nDQq_6Eo7rbPwd1gASzVfEhd0PXtOMMgMaY7KS-Wt5F55LHkcDu1qiPNgxuj7wOtEQZPIu9Mklkn5QsCzJjIzz8TKUWM2vPWE8EN5U8GzFx2pEUtUOLlboV0RRQj7h8EC0IyVtkb3AjSNbVBd1kDS-2FC1t4qL_eTxI4j3oh7uvCJSA2i16IA',
        statut
      };
      const updated = [newItem, ...actualites];
      setStoredData('lisda_actualites', updated);
      setActualites(updated);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      const updated = actualites.filter(a => a.id !== id);
      setStoredData('lisda_actualites', updated);
      setActualites(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Publications</span>
            <span>•</span>
            <span>Site Public</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#083415]">Actualités & Événements</h1>
          <p className="text-xs text-gray-500 mt-1">
            Ajoutez, modifiez ou dépubliez les articles affichés sur la page d'accueil.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-5 py-3 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
        >
          <span>➕</span>
          <span>Nouvelle Actualité</span>
        </button>
      </div>

      {/* Grid of Actualités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actualites.map((act) => (
          <div key={act.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="h-44 w-full bg-gray-100 relative">
                <img src={act.image} alt={act.titre} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#083415] shadow-sm">
                  {act.categorie}
                </span>
                <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${act.statut === 'publie' ? 'bg-emerald-500 text-white' : 'bg-gray-400 text-white'}`}>
                  {act.statut === 'publie' ? 'En ligne' : 'Brouillon'}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[11px] text-gray-400 font-semibold block">{act.date}</span>
                <h3 className="font-bold text-sm text-[#083415] leading-snug line-clamp-2">{act.titre}</h3>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">{act.description}</p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-gray-50 flex items-center justify-between gap-2 mt-2">
              <button
                onClick={() => openEditModal(act)}
                className="flex-1 py-2 rounded-full bg-[#f5f3ee] hover:bg-gray-200 text-[#083415] text-xs font-bold transition-colors"
              >
                ✏️ Modifier
              </button>
              <button
                onClick={() => handleDelete(act.id)}
                className="p-2 rounded-full text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL AJOUT / MODIFICATION */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-lg text-[#083415]">
                {editingItem ? 'Modifier l\'actualité' : 'Nouvelle Actualité'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#083415] mb-1">Titre de l'article / événement</label>
                <input
                  type="text"
                  required
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Ex: Formation pratique en agroforesterie..."
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Catégorie</label>
                  <select
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  >
                    <option value="Agroécologie">Agroécologie</option>
                    <option value="Éducation & Droits">Éducation & Droits</option>
                    <option value="Environnement">Environnement</option>
                    <option value="Climat & Mangroves">Climat & Mangroves</option>
                    <option value="Vie Associative">Vie Associative</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Date & Lieu</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Ex: Mars 2026 • Kribi"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">URL de l'image de couverture</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Description / Contenu</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Détaillez les objectifs, participants et résultats obtenus..."
                  className="w-full p-4 rounded-2xl bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#083415]">
                  <input
                    type="radio"
                    name="statut"
                    checked={statut === 'publie'}
                    onChange={() => setStatut('publie')}
                    className="accent-[#083415]"
                  />
                  <span>Publier immédiatement sur le site</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-500">
                  <input
                    type="radio"
                    name="statut"
                    checked={statut === 'brouillon'}
                    onChange={() => setStatut('brouillon')}
                    className="accent-[#083415]"
                  />
                  <span>Brouillon (non visible)</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-bold text-xs shadow-lg transition-all"
                >
                  {editingItem ? 'Enregistrer les modifications' : 'Publier l\'actualité'}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 h-11 rounded-full bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200"
                >
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
