'use client';

import { useState, useEffect } from 'react';
import { DonateurItem, initialDonateurs, initialDonationAmounts, getStoredData, setStoredData, fetchSupabaseDonateurs, syncSupabaseDonateur } from '@/lib/adminData';

export default function AdminDonsPage() {
  const [dons, setDons] = useState<DonateurItem[]>([]);
  const [suggestedAmounts, setSuggestedAmounts] = useState<number[]>([]);
  const [newAmountInput, setNewAmountInput] = useState<string>('');
  
  // Modal states for donor management
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDon, setEditingDon] = useState<DonateurItem | null>(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [montant, setMontant] = useState<number>(10000);
  const [typeDon, setTypeDon] = useState('Mobile Money (LeekPay)');
  const [anonyme, setAnonyme] = useState(false);
  const [accordAffichage, setAccordAffichage] = useState(true);
  const [statut, setStatut] = useState<'valide' | 'masque' | 'en_attente'>('valide');
  const [reference, setReference] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setDons(getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs));
    setSuggestedAmounts(getStoredData<number[]>('lisda_donation_amounts', initialDonationAmounts));

    // Try fetching from Supabase if online
    fetchSupabaseDonateurs().then(fetched => {
      if (fetched && fetched.length > 0) {
        setDons(fetched);
        setStoredData('lisda_dons', fetched);
      }
    });

    const handleChange = () => {
      setDons(getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs));
      setSuggestedAmounts(getStoredData<number[]>('lisda_donation_amounts', initialDonationAmounts));
    };

    window.addEventListener('lisda_data_changed', handleChange);
    return () => window.removeEventListener('lisda_data_changed', handleChange);
  }, []);

  // Suggested amounts management
  const handleAddAmount = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(newAmountInput.replace(/\D/g, ''), 10);
    if (!val || val <= 0) return;
    if (suggestedAmounts.includes(val)) {
      alert('Ce montant suggéré existe déjà.');
      return;
    }
    const updated = [...suggestedAmounts, val].sort((a, b) => a - b);
    setSuggestedAmounts(updated);
    setStoredData('lisda_donation_amounts', updated);
    setNewAmountInput('');
  };

  const handleDeleteAmount = (amtToDelete: number) => {
    if (suggestedAmounts.length <= 1) {
      alert('Il doit rester au moins un montant suggéré par défaut.');
      return;
    }
    const updated = suggestedAmounts.filter(a => a !== amtToDelete);
    setSuggestedAmounts(updated);
    setStoredData('lisda_donation_amounts', updated);
  };

  // Donor item toggle visibility
  const toggleStatus = (id: string) => {
    const updated = dons.map(d => {
      if (d.id === id) {
        const newStatut = d.statut === 'valide' ? ('masque' as const) : ('valide' as const);
        const newAccord = newStatut === 'valide';
        const updatedItem = { ...d, statut: newStatut, accord_affichage: newAccord };
        syncSupabaseDonateur(updatedItem);
        return updatedItem;
      }
      return d;
    });
    setStoredData('lisda_dons', updated);
    setDons(updated);
  };

  const openNewDonModal = () => {
    setEditingDon(null);
    setNom('');
    setPrenom('');
    setMontant(10000);
    setTypeDon('Mobile Money (LeekPay)');
    setAnonyme(false);
    setAccordAffichage(true);
    setStatut('valide');
    setReference('DON-' + Math.floor(100000 + Math.random() * 900000));
    setModalOpen(true);
  };

  const openEditDonModal = (don: DonateurItem) => {
    setEditingDon(don);
    setNom(don.nom);
    setPrenom(don.prenom);
    setMontant(don.montant);
    setTypeDon(don.type_don);
    setAnonyme(don.anonyme);
    setAccordAffichage(don.accord_affichage);
    setStatut(don.statut);
    setReference(don.reference || '');
    setModalOpen(true);
  };

  const handleSaveDon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() && !anonyme) {
      alert('Veuillez indiquer un nom ou cocher "Donateur anonyme".');
      return;
    }

    if (editingDon) {
      const updatedItem: DonateurItem = {
        ...editingDon,
        nom: anonyme ? 'Anonyme' : nom.trim(),
        prenom: anonyme ? '' : prenom.trim(),
        montant: Number(montant) || 0,
        type_don: typeDon,
        anonyme,
        accord_affichage: accordAffichage,
        statut,
        reference: reference || editingDon.reference
      };
      const updated = dons.map(d => d.id === editingDon.id ? updatedItem : d);
      setStoredData('lisda_dons', updated);
      setDons(updated);
      syncSupabaseDonateur(updatedItem);
    } else {
      const newItem: DonateurItem = {
        id: 'don-' + Date.now(),
        nom: anonyme ? 'Anonyme' : nom.trim(),
        prenom: anonyme ? '' : prenom.trim(),
        montant: Number(montant) || 0,
        type_don: typeDon,
        anonyme,
        accord_affichage: accordAffichage,
        date_don: new Date().toISOString().split('T')[0],
        statut,
        reference: reference || 'LEEK-' + Math.floor(10000 + Math.random() * 90000)
      };
      const updated = [newItem, ...dons];
      setStoredData('lisda_dons', updated);
      setDons(updated);
      syncSupabaseDonateur(newItem);
    }
    setModalOpen(false);
  };

  const handleDeleteDon = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement de don ?')) {
      const updated = dons.filter(d => d.id !== id);
      setStoredData('lisda_dons', updated);
      setDons(updated);
    }
  };

  const totalCollected = dons.reduce((acc, curr) => acc + curr.montant, 0);
  const visibleDonsCount = dons.filter(d => d.statut === 'valide' && d.accord_affichage !== false).length;
  const filteredDons = dons.filter(d => {
    const q = searchTerm.toLowerCase();
    return (
      d.nom.toLowerCase().includes(q) ||
      d.prenom.toLowerCase().includes(q) ||
      (d.reference && d.reference.toLowerCase().includes(q)) ||
      d.type_don.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Top Banner & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Passerelle LeekPay & Personnalisation</span>
            <span>•</span>
            <span>Financement & Dons</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#083415]">Dons & Montants Personnalisables</h1>
          <p className="text-xs text-gray-500 mt-1 max-w-xl">
            Gérez les montants suggérés affichés sur la page publique <strong>/faire-un-don</strong>, ainsi que l'historique complet des donateurs et leur visibilité sur le mur public.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="p-4 rounded-2xl bg-[#083415] text-white text-right shadow-md">
            <span className="text-[10px] font-bold text-[#feb323] uppercase tracking-wider block">Total Collecté</span>
            <span className="text-xl font-black text-white">{totalCollected.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#feb323]/20 border border-[#feb323]/40 text-right">
            <span className="text-[10px] font-bold text-[#6b4800] uppercase tracking-wider block">Dons Publics</span>
            <span className="text-xl font-extrabold text-[#083415]">{visibleDonsCount} / {dons.length}</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: MONTANTS SUGGÉRÉS PERSONNALISABLES */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <h2 className="text-lg font-extrabold text-[#083415]">Montants suggérés par défaut</h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Ces boutons de montants prédéfinis sont déployés automatiquement en temps réel sur la page <code className="bg-[#f0eee9] px-1.5 py-0.5 rounded text-[#ba6d14]">/faire-un-don</code>.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Synchronisation Automatique Active
          </span>
        </div>

        {/* Existing Amounts Badges / Cards */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {suggestedAmounts.map((amt) => (
              <div
                key={amt}
                className="group relative p-4 rounded-2xl bg-[#fbf9f4] border-2 border-[#083415]/10 hover:border-[#feb323] transition-all flex flex-col items-center justify-center gap-2 text-center shadow-sm hover:shadow-md"
              >
                <span className="text-base sm:text-lg font-black text-[#083415]">
                  {amt.toLocaleString('fr-FR')} <span className="text-xs font-bold text-[#ba6d14]">FCFA</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteAmount(amt)}
                  className="px-2.5 py-1 rounded-full bg-red-100 hover:bg-red-200 text-red-700 text-[10px] font-bold transition-colors flex items-center gap-1 opacity-80 group-hover:opacity-100"
                  title="Supprimer ce montant suggéré"
                >
                  <span>🗑️</span>
                  <span>Supprimer</span>
                </button>
              </div>
            ))}
          </div>

          {/* Add new amount form */}
          <form onSubmit={handleAddAmount} className="flex flex-wrap items-center gap-3 pt-2">
            <div className="relative">
              <input
                type="number"
                min="500"
                step="500"
                placeholder="Ex: 75000"
                value={newAmountInput}
                onChange={(e) => setNewAmountInput(e.target.value)}
                className="h-11 px-4 pr-16 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs font-bold text-[#083415] focus:outline-none focus:ring-2 focus:ring-[#083415] w-48"
              />
              <span className="absolute right-3.5 top-3 text-[10px] font-bold text-[#ba6d14]">FCFA</span>
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>➕</span>
              <span>Ajouter ce montant suggéré</span>
            </button>
            <span className="text-[11px] text-gray-400 italic">
              (Les modifications sont instantanément appliquées au formulaire de don public)
            </span>
          </form>
        </div>
      </div>

      {/* SECTION 2: DONATEURS & TRANSACTIONS */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden space-y-4 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💳</span>
              <h2 className="text-lg font-extrabold text-[#083415]">Historique des contributions & Donateurs</h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Validez ou masquez l'affichage des donateurs sur le mur public de l'ONG.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Rechercher un donateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415] w-48 sm:w-60"
            />
            <button
              onClick={openNewDonModal}
              className="h-10 px-4 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>➕</span>
              <span>Nouveau Donateur</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fbf9f4] border-b border-gray-100 text-[#083415] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Donateur</th>
                <th className="p-4">Montant</th>
                <th className="p-4">Moyen de paiement</th>
                <th className="p-4">Date</th>
                <th className="p-4">Référence</th>
                <th className="p-4">Affichage public</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    Aucun don ne correspond à votre recherche.
                  </td>
                </tr>
              ) : (
                filteredDons.map((don) => (
                  <tr key={don.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#083415] text-[#feb323] font-bold text-[10px] flex items-center justify-center">
                          {don.anonyme ? '?' : (don.nom.substring(0, 1) || 'D')}
                        </div>
                        <div>
                          <span className="font-bold text-[#083415] block">
                            {don.anonyme ? 'Donateur Anonyme' : `${don.nom} ${don.prenom}`.trim()}
                          </span>
                          {don.anonyme && (
                            <span className="text-[10px] text-gray-400 italic">Identité masquée</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-black text-emerald-800 text-sm">
                      {don.montant.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="p-4 text-gray-600 font-medium">{don.type_don}</td>
                    <td className="p-4 text-gray-400">{don.date_don}</td>
                    <td className="p-4 font-mono text-[11px] text-gray-500">{don.reference || 'LEEK-AUTO'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] inline-flex items-center gap-1.5 ${
                        don.statut === 'valide' && don.accord_affichage !== false
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${don.statut === 'valide' && don.accord_affichage !== false ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                        {don.statut === 'valide' && don.accord_affichage !== false ? 'Visible sur le mur' : 'Masqué du mur'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => toggleStatus(don.id)}
                          className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all ${
                            don.statut === 'valide' && don.accord_affichage !== false
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          }`}
                          title={don.statut === 'valide' ? 'Masquer du site public' : 'Afficher sur le site public'}
                        >
                          {don.statut === 'valide' && don.accord_affichage !== false ? 'Masquer' : 'Afficher'}
                        </button>
                        <button
                          onClick={() => openEditDonModal(don)}
                          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteDon(don.id)}
                          className="p-1.5 rounded-full hover:bg-red-50 text-red-600 transition-colors"
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL AJOUT / MODIFICATION DONATEUR */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-lg text-[#083415]">
                {editingDon ? 'Modifier la contribution' : 'Enregistrer un don'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDon} className="space-y-4 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#fbf9f4] border border-gray-200">
                <input
                  type="checkbox"
                  id="don_anonyme"
                  checked={anonyme}
                  onChange={(e) => setAnonyme(e.target.checked)}
                  className="w-4 h-4 text-[#083415] accent-[#083415]"
                />
                <label htmlFor="don_anonyme" className="font-bold text-[#083415] cursor-pointer">
                  Donateur Anonyme (l'identité ne sera pas affichée en clair sur le mur)
                </label>
              </div>

              {!anonyme && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#083415] mb-1">Prénom</label>
                    <input
                      type="text"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Ex: Samuel"
                      className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#083415] mb-1">Nom ou Organisation *</label>
                    <input
                      type="text"
                      required={!anonyme}
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Ex: Mballa ou Fondation..."
                      className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Montant (FCFA) *</label>
                  <input
                    type="number"
                    required
                    min="500"
                    step="500"
                    value={montant}
                    onChange={(e) => setMontant(Number(e.target.value))}
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs font-bold text-[#083415] focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Moyen de règlement</label>
                  <select
                    value={typeDon}
                    onChange={(e) => setTypeDon(e.target.value)}
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  >
                    <option value="Mobile Money (LeekPay)">Mobile Money (LeekPay)</option>
                    <option value="Carte Bancaire">Carte Bancaire</option>
                    <option value="Virement bancaire">Virement bancaire</option>
                    <option value="Espèces / Chèque">Espèces / Chèque</option>
                    <option value="Don en nature">Don en nature</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Référence / Identifiant transaction</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Ex: LEEK-98231"
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="block font-bold text-[#083415]">Affichage sur le mur public (/faire-un-don)</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-emerald-800">
                    <input
                      type="radio"
                      name="statut_don"
                      checked={statut === 'valide'}
                      onChange={() => {
                        setStatut('valide');
                        setAccordAffichage(true);
                      }}
                      className="accent-[#083415]"
                    />
                    <span>Visible publiquement</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-500">
                    <input
                      type="radio"
                      name="statut_don"
                      checked={statut === 'masque'}
                      onChange={() => {
                        setStatut('masque');
                        setAccordAffichage(false);
                      }}
                      className="accent-[#083415]"
                    />
                    <span>Masqué du mur</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-bold text-xs shadow-lg transition-all"
                >
                  {editingDon ? 'Enregistrer les modifications' : 'Ajouter le don'}
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
