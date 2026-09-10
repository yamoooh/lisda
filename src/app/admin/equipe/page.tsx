'use client';

import { useState, useEffect, useRef } from 'react';
import { EquipeItem, initialEquipe, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminEquipePage() {
  const [equipe, setEquipe] = useState<EquipeItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EquipeItem | null>(null);

  // Form states
  const [nom, setNom] = useState('');
  const [role, setRole] = useState('');
  const [roleShort, setRoleShort] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');
  const [badge, setBadge] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [ordre, setOrdre] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEquipe(getStoredData<EquipeItem[]>('lisda_equipe', initialEquipe));
    const handleChange = () => setEquipe(getStoredData<EquipeItem[]>('lisda_equipe', initialEquipe));
    window.addEventListener('lisda_data_changed', handleChange);
    return () => window.removeEventListener('lisda_data_changed', handleChange);
  }, []);

  const openNewModal = () => {
    setEditingItem(null);
    setNom('');
    setRole('');
    setRoleShort('');
    setBio('');
    setPhoto('');
    setBadge('Bureau Exécutif');
    setEmail('');
    setTelephone('');
    setOrdre(equipe.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (eq: EquipeItem) => {
    setEditingItem(eq);
    setNom(eq.nom);
    setRole(eq.role);
    setRoleShort(eq.roleShort || 'Bureau Exécutif');
    setBio(eq.bio);
    setPhoto(eq.photo || '');
    setBadge(eq.badge || 'Bureau Exécutif');
    setEmail(eq.email || '');
    setTelephone(eq.telephone || '');
    setOrdre(eq.ordre || 1);
    setModalOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setPhoto(reader.result.toString());
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      alert("Erreur lors de la lecture de la photo.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !role.trim()) return;

    if (editingItem) {
      const updated = equipe.map(eq => eq.id === editingItem.id ? {
        ...eq,
        nom,
        role,
        roleShort: roleShort || 'Bureau Exécutif',
        bio,
        photo,
        badge: badge || 'Bureau Exécutif',
        email,
        telephone,
        ordre: Number(ordre) || eq.ordre
      } : eq);
      setStoredData('lisda_equipe', updated);
      setEquipe(updated);
    } else {
      const newItem: EquipeItem = {
        id: 'eq-' + Date.now(),
        nom,
        role,
        roleShort: roleShort || 'Bureau Exécutif',
        bio,
        photo: photo || '',
        badge: badge || 'Bureau Exécutif',
        email,
        telephone,
        ordre: Number(ordre) || equipe.length + 1
      };
      const updated = [...equipe, newItem];
      setStoredData('lisda_equipe', updated);
      setEquipe(updated);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Retirer ce membre de la liste du bureau exécutif ?')) {
      const updated = equipe.filter(e => e.id !== id);
      setStoredData('lisda_equipe', updated);
      setEquipe(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Gouvernance & Dévouement</span>
            <span>•</span>
            <span>Bureau Exécutif (7 Membres)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#083415]">Équipe & Dirigeants</h1>
          <p className="text-xs text-gray-500 mt-1">
            Gérez tous les profils des membres du Bureau Exécutif, leurs photos et leurs biographies avec synchronisation immédiate sur <strong>/equipe</strong>.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-5 py-3 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
        >
          <span>👤</span>
          <span>Ajouter un Dirigeant</span>
        </button>
      </div>

      {/* Grid of 7 Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipe.map((eq) => (
          <div key={eq.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-2xl bg-[#083415] overflow-hidden flex-shrink-0 shadow-md border border-gray-100 flex items-center justify-center">
                  {eq.photo ? (
                    <img src={eq.photo} alt={eq.nom} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-[#feb323] font-black text-xl">
                      {eq.initials || eq.nom.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#ba6d14] uppercase tracking-wider block truncate">
                    {eq.roleShort || 'Bureau Exécutif'}
                  </span>
                  <h3 className="font-extrabold text-base text-[#083415] leading-snug">{eq.nom}</h3>
                  <span className="text-xs font-semibold text-gray-600 block mt-0.5">{eq.role}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 bg-[#fbf9f4] p-3 rounded-2xl">
                {eq.bio}
              </p>

              {(eq.email || eq.telephone) && (
                <div className="space-y-0.5 text-[11px] text-gray-500">
                  {eq.email && <div className="truncate">✉ {eq.email}</div>}
                  {eq.telephone && <div>📞 {eq.telephone}</div>}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={() => openEditModal(eq)}
                className="flex-1 py-2 rounded-full bg-[#f5f3ee] hover:bg-gray-200 text-[#083415] text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span>✏️</span>
                <span>Modifier le profil</span>
              </button>
              <button
                onClick={() => handleDelete(eq.id)}
                className="p-2 rounded-full text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                title="Supprimer ce profil"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL AJOUT / MODIFICATION MEMBRE */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-[#083415]">
                  {editingItem ? 'Modifier le dirigeant' : 'Nouveau membre du Bureau'}
                </h3>
                <p className="text-[11px] text-gray-500">Mise à jour en direct sur la page /equipe</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* PHOTO UPLOAD & PREVIEW */}
              <div className="p-4 rounded-2xl bg-[#fbf9f4] border border-[#083415]/10 space-y-3">
                <label className="block font-bold text-[#083415]">Photo / Portrait du membre</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl bg-[#083415] overflow-hidden flex-shrink-0 shadow-md flex items-center justify-center">
                    {photo ? (
                      <img src={photo} alt="Portrait" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[#feb323] font-bold text-lg">?</span>
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-4 py-2 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs shadow-sm hover:bg-[#001d07] transition-all flex items-center gap-1.5"
                    >
                      <span>📷</span>
                      <span>{isUploading ? 'Chargement...' : 'Importer une photo'}</span>
                    </button>
                    <input
                      type="url"
                      value={photo.startsWith('data:') ? '' : photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      placeholder="Ou collez une URL de photo..."
                      className="w-full h-8 px-3 rounded-full bg-white border border-gray-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex: NSEGBE Patrice"
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Fonction / Titre Officiel *</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex: Président Coordonnateur & Fondateur"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Rôle Court (Badge)</label>
                  <input
                    type="text"
                    value={roleShort}
                    onChange={(e) => setRoleShort(e.target.value)}
                    placeholder="Ex: Coordination Générale"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Bio & Responsabilités *</label>
                <textarea
                  rows={3}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Décrivez les expertises et missions au sein de l'ONG..."
                  className="w-full p-3 rounded-2xl bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Adresse Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@lisda-ong.org"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="+237 6XX XX XX XX"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-bold text-xs shadow-lg transition-all"
                >
                  {editingItem ? 'Enregistrer les modifications' : 'Ajouter au Bureau'}
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
