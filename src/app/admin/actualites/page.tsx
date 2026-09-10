'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [typeMedia, setTypeMedia] = useState<'image' | 'video'>('image');
  const [statut, setStatut] = useState<'publie' | 'brouillon'>('publie');
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setTypeMedia('image');
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
    setTypeMedia(item.type_media || (item.image.includes('.mp4') || item.image.includes('.webm') ? 'video' : 'image'));
    setStatut(item.statut);
    setModalOpen(true);
  };

  // Handle file import for all image & video formats
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const isVideo = file.type.startsWith('video/');
    setTypeMedia(isVideo ? 'video' : 'image');

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setImage(reader.result.toString());
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      alert("Erreur lors de la lecture du fichier. Veuillez réessayer.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
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
        image: image || a.image,
        type_media: typeMedia,
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
        type_media: typeMedia,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Publications & Médias</span>
            <span>•</span>
            <span>Site Public</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#083415]">Actualités & Événements</h1>
          <p className="text-xs text-gray-500 mt-1">
            Personnalisez, ajoutez et remplacez les images ou vidéos d'actualités avec déploiement automatique sur la page d'accueil.
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
              <div className="h-48 w-full bg-gray-900 relative flex items-center justify-center overflow-hidden">
                {act.type_media === 'video' || (act.image && (act.image.startsWith('data:video') || act.image.includes('.mp4') || act.image.includes('.webm'))) ? (
                  <video src={act.image} controls className="w-full h-full object-cover" />
                ) : (
                  <img src={act.image} alt={act.titre} className="w-full h-full object-cover" />
                )}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#083415] shadow-sm">
                  {act.categorie}
                </span>
                <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${act.statut === 'publie' ? 'bg-emerald-500 text-white' : 'bg-gray-400 text-white'}`}>
                  {act.statut === 'publie' ? 'En ligne' : 'Brouillon'}
                </span>
                {act.type_media === 'video' && (
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-black/70 text-[#feb323]">
                    🎬 Vidéo
                  </span>
                )}
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
                ✏️ Modifier & Médias
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

      {/* MODAL AJOUT / MODIFICATION AVEC UPLOADER COMPLET */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-5 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-extrabold text-lg text-[#083415]">
                  {editingItem ? 'Modifier l\'actualité & Média' : 'Nouvelle Actualité'}
                </h3>
                <p className="text-[11px] text-gray-500">Mise à jour en temps réel sur la page d'accueil</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#083415] mb-1">Titre de l'article / événement *</label>
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
                    <option value="Gouvernance">Gouvernance</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Date & Lieu *</label>
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

              {/* MEDIA IMPORT & PREVIEW ZONE */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#fbf9f4] border border-[#083415]/10">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#083415] block">
                    Illustration / Vidéo de l'actualité
                  </label>
                  <span className="text-[10px] text-gray-500">Formats supportés : JPG, PNG, WebP, GIF, MP4, WebM, MOV</span>
                </div>

                {/* Real-time Media Preview Box */}
                {image && (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 shadow-inner flex items-center justify-center">
                    {typeMedia === 'video' || image.startsWith('data:video') ? (
                      <video src={image} controls className="w-full h-full object-contain" />
                    ) : (
                      <img src={image} alt="Aperçu actualité" className="w-full h-full object-cover" />
                    )}
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full text-xs transition-colors"
                      title="Supprimer cette image"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Import Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2.5 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>📁</span>
                    <span>{isUploading ? 'Chargement du fichier...' : 'Importer depuis mon appareil (Image / Vidéo)'}</span>
                  </button>

                  <div className="flex-1 min-w-[200px]">
                    <input
                      type="url"
                      value={image.startsWith('data:') ? '' : image}
                      onChange={(e) => {
                        setImage(e.target.value);
                        setTypeMedia(e.target.value.includes('.mp4') ? 'video' : 'image');
                      }}
                      placeholder="Ou collez une URL d'image/vidéo..."
                      className="w-full h-9 px-3.5 rounded-full bg-white border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#083415]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Description / Contenu *</label>
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
                  <span>Publier immédiatement sur la page d'accueil</span>
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
