'use client';

import { useState, useEffect } from 'react';
import { PhotothequeItem, initialPhototheque, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminPhotothequePage() {
  const [photos, setPhotos] = useState<PhotothequeItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PhotothequeItem | null>(null);

  // Form states
  const [titre, setTitre] = useState('');
  const [categorie, setCategorie] = useState('Vie Associative');
  const [date, setDate] = useState('Mars 2026');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<'image' | 'video'>('image');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setPhotos(getStoredData<PhotothequeItem[]>('lisda_phototheque', initialPhototheque));
    const handleChange = () => setPhotos(getStoredData<PhotothequeItem[]>('lisda_phototheque', initialPhototheque));
    window.addEventListener('lisda_data_changed', handleChange);
    return () => window.removeEventListener('lisda_data_changed', handleChange);
  }, []);

  const openNewModal = () => {
    setEditingItem(null);
    setTitre('');
    setCategorie('Vie Associative');
    setDate('Mars 2026');
    setDescription('');
    setUrl('/images/phototheque-1.webp');
    setType('image');
    setUploadFileName('');
    setUploadProgress(0);
    setModalOpen(true);
  };

  const openEditModal = (item: PhotothequeItem) => {
    setEditingItem(item);
    setTitre(item.titre);
    setCategorie(item.categorie);
    setDate(item.date);
    setDescription(item.description);
    setUrl(item.url);
    setType(item.type);
    setUploadFileName('');
    setUploadProgress(0);
    setModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert('Le fichier dépasse la limite maximale de 100 Mo.');
        return;
      }
      setUploadFileName(file.name);
      setType(file.type.startsWith('video') ? 'video' : 'image');
      // Simulate direct preview URL
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) return;

    if (editingItem) {
      const updated = photos.map(p => p.id === editingItem.id ? {
        ...p,
        titre,
        categorie,
        date,
        description,
        url: url || p.url,
        type
      } : p);
      setStoredData('lisda_phototheque', updated);
      setPhotos(updated);
    } else {
      const newItem: PhotothequeItem = {
        id: 'photo-' + Date.now(),
        titre,
        categorie,
        date,
        description,
        url: url || '/images/phototheque-1.webp',
        type,
        taille: uploadFileName ? 'Fichier importé' : '1.4 Mo'
      };
      const updated = [newItem, ...photos];
      setStoredData('lisda_phototheque', updated);
      setPhotos(updated);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Voulez-vous supprimer ce média de la photothèque ?')) {
      const updated = photos.filter(p => p.id !== id);
      setStoredData('lisda_phototheque', updated);
      setPhotos(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Médias & Galerie</span>
            <span>•</span>
            <span>Limite 100 Mo</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#083415]">Photothèque & Vidéos</h1>
          <p className="text-xs text-gray-500 mt-1">
            Gérez les {photos.length} photos et reportages vidéo présentés sur /phototheque.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-5 py-3 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
        >
          <span>📸</span>
          <span>Importer un Média (100 Mo max)</span>
        </button>
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="h-44 w-full bg-gray-900 relative">
                {item.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                    <span className="text-3xl">🎥</span>
                  </div>
                ) : (
                  <img src={item.url} alt={item.titre} className="w-full h-full object-cover" />
                )}
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#083415] shadow-sm">
                  {item.categorie}
                </span>
                {item.taille && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[9px]">
                    {item.taille}
                  </span>
                )}
              </div>

              <div className="p-4 space-y-1.5">
                <span className="text-[10px] text-gray-400 font-semibold block">{item.date}</span>
                <h3 className="font-bold text-xs text-[#083415] leading-snug line-clamp-2">{item.titre}</h3>
                <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">{item.description}</p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-gray-50 flex items-center justify-between gap-2 mt-2">
              <button
                onClick={() => openEditModal(item)}
                className="flex-1 py-1.5 rounded-full bg-[#f5f3ee] hover:bg-gray-200 text-[#083415] text-xs font-bold transition-colors"
              >
                ✏️ Modifier
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-full text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL UPLOAD / MODIF */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-lg text-[#083415]">
                {editingItem ? 'Modifier le média' : 'Importer une photo / vidéo'}
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
                <label className="block font-bold text-[#083415] mb-1">Titre de la photo / vidéo</label>
                <input
                  type="text"
                  required
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Ex: Restauration des mangroves à Kribi..."
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Catégorie</label>
                  <select
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  >
                    <option value="Vie Associative">Vie Associative</option>
                    <option value="Autonomisation">Autonomisation</option>
                    <option value="Environnement">Environnement</option>
                    <option value="Plaidoyer & Droits">Plaidoyer & Droits</option>
                    <option value="Gouvernance">Gouvernance</option>
                    <option value="Climat & Littoral">Climat & Littoral</option>
                    <option value="Droits Autochtones">Droits Autochtones</option>
                    <option value="Agroécologie">Agroécologie</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Ex: Mars 2026"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                </div>
              </div>

              {/* Upload Zone (Max 100 Mo) */}
              <div>
                <label className="block font-bold text-[#083415] mb-1">
                  Fichier Média (JPG, PNG, WebP, MP4, MOV • Max 100 Mo)
                </label>
                <div className="border-2 border-dashed border-gray-300 hover:border-[#083415] rounded-2xl p-4 text-center cursor-pointer bg-[#fbf9f4] transition-colors relative">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="space-y-1">
                    <span className="text-2xl">📁</span>
                    <p className="font-bold text-gray-700">
                      {uploadFileName || 'Cliquez ou glissez un fichier ici'}
                    </p>
                    <p className="text-[10px] text-gray-400">Limite autorisée : 100 Mo par élément</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Contexte, lieu exact et impact de l'action..."
                  className="w-full p-3 rounded-2xl bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-bold text-xs shadow-lg transition-all"
                >
                  {editingItem ? 'Enregistrer les modifications' : 'Ajouter à la photothèque'}
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
