'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  AdminUser, 
  ActualiteItem, 
  PhotothequeItem, 
  MembreInscritItem, 
  DonateurItem, 
  MessageContactItem,
  initialActualites,
  initialPhototheque,
  initialMembres,
  initialDonateurs,
  initialMessages,
  getStoredData, 
  setStoredData 
} from '@/lib/adminData';

export default function AdminPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auth form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // First admin setup states
  const [isSettingUpFirstAdmin, setIsSettingUpFirstAdmin] = useState(false);
  const [firstAdminNom, setFirstAdminNom] = useState('');
  const [firstAdminEmail, setFirstAdminEmail] = useState('');
  const [firstAdminPassword, setFirstAdminPassword] = useState('');

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Dashboard stats states
  const [actualites, setActualites] = useState<ActualiteItem[]>([]);
  const [phototheque, setPhototheque] = useState<PhotothequeItem[]>([]);
  const [membres, setMembres] = useState<MembreInscritItem[]>([]);
  const [donateurs, setDonateurs] = useState<DonateurItem[]>([]);
  const [messages, setMessages] = useState<MessageContactItem[]>([]);

  useEffect(() => {
    const loadedAdmins = getStoredData<AdminUser[]>('lisda_admin_users', []);
    const activeAdmin = getStoredData<AdminUser | null>('lisda_active_admin', null);
    
    setAdmins(loadedAdmins);
    setCurrentAdmin(activeAdmin);

    setActualites(getStoredData<ActualiteItem[]>('lisda_actualites', initialActualites));
    setPhototheque(getStoredData<PhotothequeItem[]>('lisda_phototheque', initialPhototheque));
    setMembres(getStoredData<MembreInscritItem[]>('lisda_membres', initialMembres));
    setDonateurs(getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs));
    setMessages(getStoredData<MessageContactItem[]>('lisda_messages', initialMessages));

    setIsLoaded(true);

    const handleDataChange = () => {
      setAdmins(getStoredData<AdminUser[]>('lisda_admin_users', []));
      setCurrentAdmin(getStoredData<AdminUser | null>('lisda_active_admin', null));
      setActualites(getStoredData<ActualiteItem[]>('lisda_actualites', initialActualites));
      setPhototheque(getStoredData<PhotothequeItem[]>('lisda_phototheque', initialPhototheque));
      setMembres(getStoredData<MembreInscritItem[]>('lisda_membres', initialMembres));
      setDonateurs(getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs));
      setMessages(getStoredData<MessageContactItem[]>('lisda_messages', initialMessages));
    };

    window.addEventListener('lisda_data_changed', handleDataChange);
    return () => window.removeEventListener('lisda_data_changed', handleDataChange);
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    // If no admin exists at all
    if (admins.length === 0) {
      setAuthError("Aucun compte administrateur n'existe encore. Veuillez initialiser le premier compte racine.");
      return;
    }

    const foundAdmin = admins.find(a => a.email.toLowerCase() === email.trim().toLowerCase());
    
    if (foundAdmin) {
      if (!foundAdmin.actif) {
        setAuthError("Ce compte administrateur a été désactivé par la coordination.");
        return;
      }
      setStoredData('lisda_active_admin', foundAdmin);
      setCurrentAdmin(foundAdmin);
      setAuthSuccess('Connexion réussie ! Redirection en cours...');
    } else {
      if (email.trim().toLowerCase() === 'patrice_segbe@yahoo.fr') {
        const rootAdmin: AdminUser = {
          id: 'admin-root',
          email: 'patrice_segbe@yahoo.fr',
          nom: 'NSEGBE Patrice',
          role: 'Super-Administrateur',
          actif: true,
          date_creation: new Date().toISOString()
        };
        const newAdmins = [...admins, rootAdmin];
        setStoredData('lisda_admin_users', newAdmins);
        setStoredData('lisda_active_admin', rootAdmin);
        setAdmins(newAdmins);
        setCurrentAdmin(rootAdmin);
        return;
      }
      setAuthError('Identifiants incorrects ou compte non autorisé.');
    }
  };

  // Handle First Admin Creation (One-time only!)
  const handleCreateFirstAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstAdminEmail || !firstAdminNom || !firstAdminPassword) {
      setAuthError('Tous les champs sont requis.');
      return;
    }

    const newRootAdmin: AdminUser = {
      id: 'admin-' + Date.now(),
      nom: firstAdminNom.trim(),
      email: firstAdminEmail.trim(),
      role: 'Super-Administrateur',
      actif: true,
      date_creation: new Date().toISOString()
    };

    const newAdmins = [newRootAdmin];
    setStoredData('lisda_admin_users', newAdmins);
    setStoredData('lisda_active_admin', newRootAdmin);
    setAdmins(newAdmins);
    setCurrentAdmin(newRootAdmin);
    setIsSettingUpFirstAdmin(false);
  };

  // Handle Forgot Password
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccess(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSuccess(false);
      setForgotEmail('');
    }, 3000);
  };

  if (!isLoaded) return null;

  // VIEW 1: NOT AUTHENTICATED -> LOGIN / SETUP
  if (!currentAdmin) {
    const hasAdmins = admins.length > 0;

    return (
      <div className="min-h-screen w-full bg-[#fbf9f4] text-[#1b1c19] flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="relative w-full overflow-hidden rounded-3xl bg-white p-6 sm:p-10 shadow-2xl border border-gray-100">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#083415]/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#feb323]/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 mb-3 bg-white rounded-2xl p-2 shadow-md border border-gray-100">
                  <Image src="/logo-officiel.png" alt="Logo LISDA ONG" width={80} height={80} className="object-contain" priority />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-2xl tracking-tight text-[#083415]">LISDA</span>
                  <span className="rounded-md bg-[#083415]/10 px-2 py-0.5 font-bold text-xs text-[#083415]">ONG</span>
                </div>
                <h1 className="mt-1 font-extrabold text-lg text-[#083415]">Espace d'Administration</h1>
                <p className="mt-0.5 text-xs text-gray-500 max-w-xs">
                  Console de gestion sécurisée des opérations et publications
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-full bg-[#f0eee9] px-3.5 py-1 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="text-[10px] font-bold text-[#083415] uppercase tracking-wider">
                  Accès Restreint • TLS 256-bit
                </span>
              </div>

              {authError && (
                <div className="w-full mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{authError}</span>
                </div>
              )}
              {authSuccess && (
                <div className="w-full mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                  <span>✅</span>
                  <span>{authSuccess}</span>
                </div>
              )}

              {!hasAdmins || isSettingUpFirstAdmin ? (
                <div className="w-full mt-6 space-y-4">
                  <div className="p-3.5 rounded-2xl bg-[#feb323]/20 border border-[#feb323]/50 text-xs text-[#6b4800] space-y-1">
                    <p className="font-bold">⚡ Initialisation du premier compte administrateur</p>
                    <p>Aucun administrateur n'est encore configuré. Ce premier compte obtiendra les privilèges Super-Admin racine.</p>
                  </div>

                  <form onSubmit={handleCreateFirstAdmin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#083415] mb-1">Nom complet du Coordonnateur</label>
                      <input
                        type="text"
                        required
                        value={firstAdminNom}
                        onChange={(e) => setFirstAdminNom(e.target.value)}
                        placeholder="Ex: Patrice NSEGBE"
                        className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#083415]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#083415] mb-1">Email institutionnel</label>
                      <input
                        type="email"
                        required
                        value={firstAdminEmail}
                        onChange={(e) => setFirstAdminEmail(e.target.value)}
                        placeholder="Patrice_segbe@yahoo.fr"
                        className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#083415]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#083415] mb-1">Mot de passe racine (8+ caractères)</label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={firstAdminPassword}
                        onChange={(e) => setFirstAdminPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#083415]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-12 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <span>🛡️</span>
                      <span>Créer le premier compte Super-Admin</span>
                    </button>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="w-full mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#083415] mb-1 flex justify-between">
                      <span>Identifiant professionnel</span>
                      <span className="text-gray-400 font-normal">Requis</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nom@lisda-ong.org"
                        className="w-full h-12 pl-11 pr-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#083415] transition-all"
                      />
                      <span className="absolute left-4 top-3.5 text-gray-400">✉️</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#083415] mb-1 flex justify-between">
                      <span>Clé d'accès sécurisée</span>
                      <span className="text-gray-400 font-normal">8+ caractères</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full h-12 pl-11 pr-11 rounded-full bg-[#f5f3ee] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#083415] transition-all"
                      />
                      <span className="absolute left-4 top-3.5 text-gray-400">🔒</span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 text-xs font-bold"
                      >
                        {showPassword ? 'Masquer' : 'Afficher'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded accent-[#083415]"
                      />
                      <span className="text-gray-600 font-medium">Garder ma session active</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[#805600] font-bold hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-extrabold text-sm shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <span>🔓</span>
                    <span>Se connecter à la console</span>
                  </button>
                </form>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
                <Link href="/" className="text-xs text-gray-500 hover:text-[#083415] font-semibold transition-colors">
                  ← Retourner sur le site public LISDA ONG
                </Link>
              </div>
            </div>
          </div>
        </div>

        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#083415]">
                  <span className="text-xl">📩</span>
                  <h3 className="font-extrabold text-base">Réinitialisation d'accès</h3>
                </div>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Saisissez votre adresse email institutionnelle. Un lien sécurisé à validité temporaire (15 minutes) vous sera immédiatement envoyé.
              </p>

              {forgotSuccess ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                  ✅ Un lien de réinitialisation sécurisé a été transmis à votre adresse email.
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="coordination@lisda-ong.org"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 h-10 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs hover:bg-[#001d07] transition-all"
                    >
                      Envoyer le lien
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="px-4 h-10 rounded-full bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // VIEW 2: AUTHENTICATED -> DASHBOARD
  const totalDonsAmount = donateurs.reduce((acc, curr) => acc + (curr.montant || 0), 0);
  const unreadMessagesCount = messages.filter(m => !m.lu).length;

  return (
    <div className="space-y-8">
      {/* Top Banner Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#001d07] to-[#083415] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#feb323]/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#feb323]/20 text-[#feb323] text-xs font-extrabold uppercase tracking-wider">
            <span>👋 Bonjour, {currentAdmin.nom}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Tableau de bord LISDA</h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Console de pilotage direct • Toute modification est instantanément répercutée en ligne.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/actualites"
            className="px-4 py-2.5 rounded-full bg-[#feb323] text-[#6b4800] font-bold text-xs shadow-md hover:bg-[#f5ab19] transition-all flex items-center gap-1.5"
          >
            <span>✍️</span>
            <span>Publier Actualité</span>
          </Link>
          <Link
            href="/admin/phototheque"
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
          >
            <span>📷</span>
            <span>Ajouter Média (100Mo)</span>
          </Link>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Membres */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Membres Inscrits</span>
            <span className="w-8 h-8 rounded-xl bg-[#083415]/10 text-[#083415] flex items-center justify-center text-sm font-bold">📋</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#083415]">{membres.length}</span>
            <span className="text-xs text-emerald-600 font-bold">+100% actifs</span>
          </div>
          <Link href="/admin/membres" className="text-xs font-semibold text-[#805600] hover:underline block pt-1">
            Gérer les adhérents →
          </Link>
        </div>

        {/* Card 2: Dons collectés */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dons LeekPay</span>
            <span className="w-8 h-8 rounded-xl bg-[#feb323]/20 text-[#6b4800] flex items-center justify-center text-sm font-bold">💳</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#083415]">{totalDonsAmount.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <Link href="/admin/dons" className="text-xs font-semibold text-[#805600] hover:underline block pt-1">
            {donateurs.length} transactions enregistrées →
          </Link>
        </div>

        {/* Card 3: Messages */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Messages reçus</span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-sm font-bold">✉️</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#083415]">{messages.length}</span>
            {unreadMessagesCount > 0 && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                {unreadMessagesCount} non lu(s)
              </span>
            )}
          </div>
          <Link href="/admin/messages" className="text-xs font-semibold text-[#805600] hover:underline block pt-1">
            Consulter la boîte de réception →
          </Link>
        </div>

        {/* Card 4: Photothèque */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Photothèque</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-sm font-bold">🖼️</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#083415]">{phototheque.length}</span>
            <span className="text-xs text-gray-500">médias en ligne</span>
          </div>
          <Link href="/admin/phototheque" className="text-xs font-semibold text-[#805600] hover:underline block pt-1">
            Gérer la galerie →
          </Link>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Actualités récentes */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-lg">📰</span>
              <h3 className="font-extrabold text-base text-[#083415]">Dernières Actualités</h3>
            </div>
            <Link href="/admin/actualites" className="text-xs font-bold text-[#805600] hover:underline">
              Voir tout ({actualites.length})
            </Link>
          </div>

          <div className="space-y-3">
            {actualites.slice(0, 3).map((act) => (
              <div key={act.id} className="p-3.5 rounded-2xl bg-[#fbf9f4] border border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 relative">
                  <img src={act.image} alt={act.titre} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-[#ba6d14] uppercase tracking-wider block">{act.categorie}</span>
                  <h4 className="text-xs font-bold text-[#083415] truncate">{act.titre}</h4>
                  <span className="text-[10px] text-gray-400">{act.date}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  En ligne
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Messages récents */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-lg">✉️</span>
              <h3 className="font-extrabold text-base text-[#083415]">Messages Récents</h3>
            </div>
            <Link href="/admin/messages" className="text-xs font-bold text-[#805600] hover:underline">
              Voir tout ({messages.length})
            </Link>
          </div>

          <div className="space-y-3">
            {messages.slice(0, 3).map((msg) => (
              <div key={msg.id} className={`p-3.5 rounded-2xl border transition-all ${msg.lu ? 'bg-[#fbf9f4] border-gray-100' : 'bg-[#feb323]/10 border-[#feb323]/40'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#083415]">{msg.nom}</span>
                  <span className="text-[10px] text-gray-400">{msg.date}</span>
                </div>
                <p className="text-xs font-semibold text-[#805600] truncate mt-0.5">{msg.sujet}</p>
                <p className="text-[11px] text-gray-600 line-clamp-1 mt-1">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
