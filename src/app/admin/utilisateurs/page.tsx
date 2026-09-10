'use client';

import { useState, useEffect } from 'react';
import { AdminUser, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminUtilisateursPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [activeAdmin, setActiveAdmin] = useState<AdminUser | null>(null);

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [selectedAdminForPassword, setSelectedAdminForPassword] = useState<AdminUser | null>(null);

  // New admin form
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Administrateur' | 'Éditeur'>('Administrateur');
  const [initialPassword, setInitialPassword] = useState('');

  // Password change form
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    setAdmins(getStoredData<AdminUser[]>('lisda_admin_users', []));
    setActiveAdmin(getStoredData<AdminUser | null>('lisda_active_admin', null));

    const handleChange = () => {
      setAdmins(getStoredData<AdminUser[]>('lisda_admin_users', []));
      setActiveAdmin(getStoredData<AdminUser | null>('lisda_active_admin', null));
    };

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
      password: initialPassword.trim() || 'LisdaAdmin2026!',
      date_creation: new Date().toISOString()
    };

    const updated = [...admins, newAdmin];
    setStoredData('lisda_admin_users', updated);
    setAdmins(updated);
    setAddModalOpen(false);
    setNom('');
    setEmail('');
    setInitialPassword('');
  };

  const openPasswordModal = (admin: AdminUser) => {
    setSelectedAdminForPassword(admin);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setPasswordSuccess('');
    setShowPassword(false);
    setPasswordModalOpen(true);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!selectedAdminForPassword) return;

    if (newPassword.length < 6) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    const updated = admins.map(a => 
      a.id === selectedAdminForPassword.id ? { ...a, password: newPassword } : a
    );

    setStoredData('lisda_admin_users', updated);
    setAdmins(updated);

    // If changing password for current logged in admin
    if (activeAdmin && activeAdmin.id === selectedAdminForPassword.id) {
      const updatedActive = { ...activeAdmin, password: newPassword };
      setStoredData('lisda_active_admin', updatedActive);
      setActiveAdmin(updatedActive);
    }

    setPasswordSuccess(`✅ Mot de passe mis à jour avec succès pour ${selectedAdminForPassword.nom} !`);

    setTimeout(() => {
      setPasswordModalOpen(false);
      setPasswordSuccess('');
      setNewPassword('');
      setConfirmPassword('');
    }, 2000);
  };

  const toggleStatus = (id: string) => {
    const updated = admins.map(a => a.id === id ? { ...a, actif: !a.actif } : a);
    setStoredData('lisda_admin_users', updated);
    setAdmins(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Sécurité & Permissions</span>
            <span>•</span>
            <span>Gestion des Mots de Passe</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#083415]">Gestion des Administrateurs</h1>
          <p className="text-xs text-gray-500 mt-1">
            Gérez les comptes d'accès et modifiez les mots de passe des administrateurs.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {activeAdmin && (
            <button
              onClick={() => openPasswordModal(activeAdmin)}
              className="px-5 py-3 rounded-full bg-[#f5f3ee] hover:bg-gray-200 text-[#083415] font-extrabold text-xs transition-all flex items-center gap-2"
            >
              <span>🔑</span>
              <span>Modifier mon mot de passe</span>
            </button>
          )}
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-5 py-3 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <span>➕</span>
            <span>Ajouter un Administrateur</span>
          </button>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fbf9f4] border-b border-gray-100 text-[#083415] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Administrateur</th>
                <th className="p-4">Email</th>
                <th className="p-4">Rôle</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Actions & Mot de Passe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-bold text-[#083415]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#feb323] text-[#083415] font-black flex items-center justify-center text-xs shadow-sm">
                        {admin.nom.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span>{admin.nom}</span>
                        {activeAdmin?.id === admin.id && (
                          <span className="ml-2 text-[10px] bg-[#083415] text-[#feb323] px-2 py-0.5 rounded-full font-bold">
                            Vous
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 font-mono text-[11px]">{admin.email}</td>
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
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openPasswordModal(admin)}
                      className="px-3 py-1.5 rounded-full bg-[#083415]/10 hover:bg-[#083415] hover:text-[#feb323] text-[#083415] font-bold text-[11px] transition-colors"
                      title="Modifier le mot de passe"
                    >
                      🔑 Modifier Mot de passe
                    </button>

                    {admin.role !== 'Super-Administrateur' && (
                      <button
                        onClick={() => toggleStatus(admin.id)}
                        className={`px-3 py-1.5 rounded-full font-bold text-[11px] transition-colors ${admin.actif ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
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

      {/* MODAL MODIFIER MOT DE PASSE */}
      {passwordModalOpen && selectedAdminForPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔑</span>
                <div>
                  <h3 className="font-extrabold text-base text-[#083415]">Modifier le mot de passe</h3>
                  <p className="text-[11px] text-gray-500">{selectedAdminForPassword.nom} ({selectedAdminForPassword.email})</p>
                </div>
              </div>
              <button
                onClick={() => setPasswordModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {passwordError && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <span>⚠️</span>
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                {passwordSuccess}
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#083415] mb-1">Nouveau mot de passe (6+ caractères)</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-11 px-4 pr-16 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[11px] font-bold text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? 'Masquer' : 'Afficher'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Confirmer le nouveau mot de passe</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 space-y-0.5">
                <p className="font-bold">🛡️ Sécurité recommandée :</p>
                <p>Combinez lettres majuscules, minuscules, chiffres et caractères spéciaux.</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>💾</span>
                  <span>Enregistrer le mot de passe</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-5 h-11 rounded-full bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL AJOUT ADMINISTRATEUR */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-[#083415]">Ajouter un Administrateur</h3>
              <button onClick={() => setAddModalOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleAddAdmin} className="space-y-3.5 text-xs">
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
                  <option value="Administrateur">Administrateur (Gestion complète)</option>
                  <option value="Éditeur">Éditeur (Publications & Photothèque)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Mot de passe temporaire initial</label>
                <input
                  type="text"
                  value={initialPassword}
                  onChange={(e) => setInitialPassword(e.target.value)}
                  placeholder="Par défaut: LisdaAdmin2026!"
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <button type="submit" className="flex-1 h-11 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs shadow-lg hover:bg-[#001d07]">
                  Créer et activer le compte
                </button>
                <button type="button" onClick={() => setAddModalOpen(false)} className="px-6 h-11 rounded-full bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200">
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
