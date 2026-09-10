'use client';

import { useState, useEffect } from 'react';
import { AdminUser, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminUtilisateursPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Administrateur' | 'Éditeur'>('Administrateur');

  useEffect(() => {
    setAdmins(getStoredData<AdminUser[]>('lisda_admin_users', []));
    const handleChange = () => setAdmins(getStoredData<AdminUser[]>('lisda_admin_users', []));
    window.addEventListener('lisda_data_changed', handleChange);
    return () => window.removeEventListener('lisda_data_changed', handleChange);
  }, []);

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !email.trim()) return;

    const newAdmin: AdminUser = {
      id: 'admin-' + Date.now(),
      nom: nom.trim(),
      email: email.trim(),
      role,
      actif: true,
      date_creation: new Date().toISOString()
    };

    const updated = [...admins, newAdmin];
    setStoredData('lisda_admin_users', updated);
    setAdmins(updated);
    setModalOpen(false);
    setNom('');
    setEmail('');
  };

  const toggleStatus = (id: string) => {
    const updated = admins.map(a => a.id === id ? { ...a, actif: !a.actif } : a);
    setStoredData('lisda_admin_users', updated);
    setAdmins(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Sécurité & Permissions</span>
            <span>•</span>
            <span>Gestion Interne</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#083415]">Gestion des Administrateurs</h1>
          <p className="text-xs text-gray-500 mt-1">
            Invitez et gérez les comptes autorisés à accéder à cette console d'administration.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-3 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
        >
          <span>➕</span>
          <span>Ajouter un Administrateur</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fbf9f4] border-b border-gray-100 text-[#083415] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Administrateur</th>
                <th className="p-4">Email</th>
                <th className="p-4">Rôle</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-bold text-[#083415] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#feb323] text-[#083415] font-black flex items-center justify-center text-xs">
                      {admin.nom.substring(0, 2).toUpperCase()}
                    </div>
                    <span>{admin.nom}</span>
                  </td>
                  <td className="p-4 text-gray-600">{admin.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${admin.role === 'Super-Administrateur' ? 'bg-[#feb323]/20 text-[#6b4800]' : 'bg-[#083415]/10 text-[#083415]'}`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${admin.actif ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>
                      {admin.actif ? 'Actif' : 'Désactivé'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {admin.role !== 'Super-Administrateur' && (
                      <button
                        onClick={() => toggleStatus(admin.id)}
                        className={`px-3 py-1 rounded-full font-bold text-[10px] ${admin.actif ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                      >
                        {admin.actif ? 'Désactiver' : 'Réactiver'}
                      </button>
                    )}
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
              <h3 className="font-extrabold text-base text-[#083415]">Inviter un Administrateur</h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center">✕</button>
            </div>

            <form onSubmit={handleAddAdmin} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#083415] mb-1">Nom complet</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex: Jeanne Essomba"
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Email institutionnel</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="j.essomba@lisda-ong.org"
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Rôle et permissions</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                >
                  <option value="Administrateur">Administrateur (Gestion contenu & membres)</option>
                  <option value="Éditeur">Éditeur (Publications & Photothèque)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <button type="submit" className="flex-1 h-11 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs">
                  Créer et activer le compte
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
