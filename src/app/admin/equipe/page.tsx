'use client';

import { useState, useEffect } from 'react';
import { EquipeItem, initialEquipe, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminEquipePage() {
  const [equipe, setEquipe] = useState<EquipeItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EquipeItem | null>(null);

  const [nom, setNom] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

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
    setBio('');
    setEmail('');
    setTelephone('');
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !role.trim()) return;

    if (editingItem) {
      const updated = equipe.map(eq => eq.id === editingItem.id ? { ...eq, nom, role, bio, email, telephone } : eq);
      setStoredData('lisda_equipe', updated);
      setEquipe(updated);
    } else {
      const newItem: EquipeItem = {
        id: 'eq-' + Date.now(),
        nom,
        role,
        bio,
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9y3E63eL_g6FvD6K9NlYd6F5v4n7Xp_9r-M',
        email,
        telephone,
        ordre: equipe.length + 1
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Gouvernance</span>
            <span>•</span>
            <span>Bureau Exécutif</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#083415]">Équipe & Dirigeants</h1>
          <p className="text-xs text-gray-500 mt-1">
            Mettez à jour les fiches et biographies des membres affichés sur /equipe.
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {equipe.map((eq) => (
          <div key={eq.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#083415] text-[#feb323] font-black text-xl flex items-center justify-center shadow-md">
                {eq.nom.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#083415]">{eq.nom}</h3>
                <span className="text-xs font-bold text-[#ba6d14] block mt-0.5">{eq.role}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{eq.bio}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setEditingItem(eq);
                  setNom(eq.nom);
                  setRole(eq.role);
                  setBio(eq.bio);
                  setEmail(eq.email || '');
                  setTelephone(eq.telephone || '');
                  setModalOpen(true);
                }}
                className="flex-1 py-1.5 rounded-full bg-[#f5f3ee] hover:bg-gray-200 text-[#083415] text-xs font-bold"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(eq.id)}
                className="p-1.5 rounded-full text-red-600 hover:bg-red-50 text-xs font-bold"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-[#083415]">
                {editingItem ? 'Modifier le dirigeant' : 'Nouveau membre du bureau'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#083415] mb-1">Nom complet</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex: Patrice NSEGBE"
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Fonction / Poste</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex: Président Coordonnateur Exécutif"
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Bio courte & Expertises</label>
                <textarea
                  rows={3}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Parcours et spécialités..."
                  className="w-full p-3 rounded-2xl bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
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
