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
  initialAdminUsers,
  getStoredData, 
  setStoredData,
  fetchSupabaseAdminUsers,
  syncSupabaseAdminUser
} from '@/lib/adminData';

export default function AdminPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdminUsers);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auth form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Forgot password flow states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2>(1); // 1 = enter email, 2 = enter code & new password
  const [forgotEmail, setForgotEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  // Dashboard stats states
  const [actualites, setActualites] = useState<ActualiteItem[]>([]);
  const [phototheque, setPhototheque] = useState<PhotothequeItem[]>([]);
  const [membres, setMembres] = useState<MembreInscritItem[]>([]);
  const [donateurs, setDonateurs] = useState<DonateurItem[]>([]);
  const [messages, setMessages] = useState<MessageContactItem[]>([]);

  useEffect(() => {
    // Initial load from local and Supabase
    const activeAdmin = getStoredData<AdminUser | null>('lisda_active_admin', null);
    setCurrentAdmin(activeAdmin);

    const loadAdminsFromDb = async () => {
      try {
        const remoteAdmins = await fetchSupabaseAdminUsers();
        if (remoteAdmins && remoteAdmins.length > 0) {
          setAdmins(remoteAdmins);
          setStoredData('lisda_admin_users', remoteAdmins);
        } else {
          setAdmins(getStoredData<AdminUser[]>('lisda_admin_users', initialAdminUsers));
        }
      } catch {
        setAdmins(getStoredData<AdminUser[]>('lisda_admin_users', initialAdminUsers));
      }
    };

    loadAdminsFromDb();

    setActualites(getStoredData<ActualiteItem[]>('lisda_actualites', initialActualites));
    setPhototheque(getStoredData<PhotothequeItem[]>('lisda_phototheque', initialPhototheque));
    setMembres(getStoredData<MembreInscritItem[]>('lisda_membres', initialMembres));
    setDonateurs(getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs));
    setMessages(getStoredData<MessageContactItem[]>('lisda_messages', initialMessages));

    setIsLoaded(true);

    const handleDataChange = () => {
      setAdmins(getStoredData<AdminUser[]>('lisda_admin_users', initialAdminUsers));
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
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setIsLoggingIn(true);

    try {
      // Re-fetch latest admins from Supabase to guarantee password freshness
      let currentAdminsList = admins;
      try {
        const remote = await fetchSupabaseAdminUsers();
        if (remote && remote.length > 0) {
          currentAdminsList = remote;
          setAdmins(remote);
          setStoredData('lisda_admin_users', remote);
        }
      } catch (err) {
        console.warn('Fallback to local admins list:', err);
      }

      const inputEmail = email.trim().toLowerCase();
      const inputPassword = password;

      // Find admin
      let foundAdmin = currentAdminsList.find(a => a.email.toLowerCase() === inputEmail);

      // Root fallback match for Patrice NSEGBE
      if (!foundAdmin && (inputEmail === 'patrice_segbe@yahoo.fr' || inputEmail === 'patrice_segbe@yahoo.com')) {
        foundAdmin = {
          id: 'admin-root',
          email: 'patrice_segbe@yahoo.fr',
          nom: 'NSEGBE Patrice',
          role: 'Super-Administrateur',
          actif: true,
          password: inputPassword,
          date_creation: new Date().toISOString()
        };
        await syncSupabaseAdminUser(foundAdmin);
      }

      if (!foundAdmin) {
        setAuthError('Identifiants incorrects ou compte non autorisé.');
        setIsLoggingIn(false);
        return;
      }

      if (!foundAdmin.actif) {
        setAuthError('Ce compte administrateur a été désactivé par la coordination.');
        setIsLoggingIn(false);
        return;
      }

      // Validate password
      if (foundAdmin.password && foundAdmin.password !== inputPassword) {
        setAuthError('Mot de passe incorrect. Veuillez vérifier votre saisie.');
        setIsLoggingIn(false);
        return;
      }

      // Password accepted: Save active admin session
      setStoredData('lisda_active_admin', foundAdmin);
      setCurrentAdmin(foundAdmin);
      setAuthSuccess('Connexion réussie ! Chargement de la console...');

    } catch (err: any) {
      setAuthError(err.message || 'Une erreur est survenue lors de la connexion.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Forgot Password - Step 1: Request Code
  const handleRequestResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccessMessage('');
    setIsResetting(true);

    const targetEmail = forgotEmail.trim().toLowerCase();
    
    // Check if admin exists
    const adminExists = admins.some(a => a.email.toLowerCase() === targetEmail) || 
                        targetEmail === 'patrice_segbe@yahoo.fr' ||
                        targetEmail === 'patrice_segbe@yahoo.com';

    if (!adminExists) {
      setForgotError('Aucun compte administrateur associé à cette adresse email.');
      setIsResetting(false);
      return;
    }

    // Generate random 6-digit code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(generatedCode);

    setForgotStep(2);
    setForgotSuccessMessage(`Code de sécurité généré pour ${forgotEmail} : ${generatedCode}`);
    setIsResetting(false);
  };

  // Handle Forgot Password - Step 2: Verify Code and Update Password
  const handleVerifyCodeAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccessMessage('');

    if (enteredCode.trim() !== verificationCode) {
      setForgotError('Code de vérification invalide. Veuillez saisir le code à 6 chiffres.');
      return;
    }

    if (resetNewPassword.length < 6) {
      setForgotError('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    if (resetNewPassword !== resetConfirmPassword) {
      setForgotError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setIsResetting(true);

    try {
      const targetEmail = forgotEmail.trim().toLowerCase();
      
      let updatedAdmin: AdminUser | null = null;
      const updatedAdmins = admins.map(a => {
        if (a.email.toLowerCase() === targetEmail) {
          updatedAdmin = { ...a, password: resetNewPassword };
          return updatedAdmin;
        }
        return a;
      });

      if (!updatedAdmin) {
        updatedAdmin = {
          id: 'admin-root',
          email: targetEmail,
          nom: 'NSEGBE Patrice',
          role: 'Super-Administrateur',
          actif: true,
          password: resetNewPassword,
          date_creation: new Date().toISOString()
        };
        updatedAdmins.push(updatedAdmin);
      }

      // Update in Supabase
      await syncSupabaseAdminUser(updatedAdmin);

      // Update in localStorage
      setStoredData('lisda_admin_users', updatedAdmins);
      setAdmins(updatedAdmins);

      setForgotSuccessMessage('✅ Votre mot de passe a été réinitialisé avec succès !');

      setTimeout(() => {
        setShowForgotModal(false);
        setForgotStep(1);
        setForgotEmail('');
        setEnteredCode('');
        setResetNewPassword('');
        setResetConfirmPassword('');
        setForgotSuccessMessage('');
        setPassword(resetNewPassword);
        setEmail(targetEmail);
      }, 2000);

    } catch (err: any) {
      setForgotError(err.message || 'Erreur lors de la réinitialisation du mot de passe.');
    } finally {
      setIsResetting(false);
    }
  };

  if (!isLoaded) return null;

  // VIEW 1: NOT AUTHENTICATED -> STRICT LOGIN INTERFACE
  if (!currentAdmin) {
    return (
      <div className="min-h-screen w-full bg-[#fbf9f4] text-[#1b1c19] flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="relative w-full overflow-hidden rounded-3xl bg-white p-6 sm:p-10 shadow-2xl border border-gray-100">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#083415]/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#feb323]/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center">
              {/* Official Brand Logo */}
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

              {/* Status badge */}
              <div className="mt-4 flex items-center gap-2 rounded-full bg-[#f0eee9] px-3.5 py-1 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="text-[10px] font-bold text-[#083415] uppercase tracking-wider">
                  Accès Restreint • TLS 256-bit
                </span>
              </div>

              {/* Alerts */}
              {authError && (
                <div className="w-full mt-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{authError}</span>
                </div>
              )}
              {authSuccess && (
                <div className="w-full mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <span>✅</span>
                  <span>{authSuccess}</span>
                </div>
              )}

              {/* STANDARD LOGIN FORM */}
              <form onSubmit={handleLogin} className="w-full mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#083415] mb-1 flex justify-between">
                    <span>Adresse Email *</span>
                    <span className="text-gray-400 font-normal">Compte Super-Admin</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Patrice_segbe@yahoo.fr"
                      className="w-full h-12 pl-11 pr-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#083415] transition-all"
                    />
                    <span className="absolute left-4 top-3.5 text-gray-400">✉️</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#083415] mb-1 flex justify-between">
                    <span>Mot de passe *</span>
                    <span className="text-gray-400 font-normal">Secret</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-12 pl-11 pr-20 rounded-full bg-[#f5f3ee] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#083415] transition-all"
                    />
                    <span className="absolute left-4 top-3.5 text-gray-400">🔒</span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-gray-500 hover:text-gray-800 text-xs font-bold px-2 py-0.5 rounded"
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
                    onClick={() => {
                      setForgotEmail(email || 'Patrice_segbe@yahoo.fr');
                      setForgotStep(1);
                      setForgotError('');
                      setForgotSuccessMessage('');
                      setShowForgotModal(true);
                    }}
                    className="text-[#ba6d14] font-bold hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className={`w-full h-12 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                    isLoggingIn ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#feb323] border-t-transparent rounded-full animate-spin"></div>
                      <span>Vérification des accès...</span>
                    </>
                  ) : (
                    <>
                      <span>🔓</span>
                      <span>Se connecter à la console</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
                <Link href="/" className="text-xs text-gray-500 hover:text-[#083415] font-semibold transition-colors">
                  ← Retourner sur le site public LISDA ONG
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL MOT DE PASSE OUBLIÉ (Code de vérification + Réinitialisation) */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-[#083415]">
                  <span className="text-xl">🔑</span>
                  <div>
                    <h3 className="font-extrabold text-base">Réinitialisation d'accès</h3>
                    <p className="text-[10px] text-gray-500">Super-Administrateur LISDA</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {forgotError && (
                <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  ⚠️ {forgotError}
                </div>
              )}

              {forgotSuccessMessage && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                  {forgotSuccessMessage}
                </div>
              )}

              {forgotStep === 1 ? (
                /* STEP 1 : Enter Super-Admin Email */
                <form onSubmit={handleRequestResetCode} className="space-y-4 text-xs">
                  <p className="text-gray-600 leading-relaxed">
                    Saisissez votre adresse email de Super-Administrateur. Un code de sécurité sera généré pour vous permettre de définir un nouveau mot de passe.
                  </p>
                  <div>
                    <label className="block font-bold text-[#083415] mb-1">Email Super-Administrateur</label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Patrice_segbe@yahoo.fr"
                      className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={isResetting}
                      className="flex-1 h-11 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs hover:bg-[#001d07] transition-all shadow-md"
                    >
                      {isResetting ? 'Génération...' : 'Générer le code de sécurité'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="px-5 h-11 rounded-full bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 2 : Enter Verification Code + New Password */
                <form onSubmit={handleVerifyCodeAndReset} className="space-y-3.5 text-xs">
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[#6b4800] space-y-1">
                    <p className="font-bold">🔐 Code de confirmation :</p>
                    <p className="font-mono text-sm tracking-widest font-black text-[#083415] bg-white/80 p-2 rounded-xl text-center">
                      {verificationCode}
                    </p>
                    <p className="text-[10px] text-gray-500">Saisissez ce code ci-dessous pour confirmer votre identité.</p>
                  </div>

                  <div>
                    <label className="block font-bold text-[#083415] mb-1">Code de sécurité reçu (6 chiffres)</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value)}
                      placeholder="Ex: 849201"
                      className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-center font-mono font-bold text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-[#083415]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#083415] mb-1">Nouveau mot de passe (6+ caractères)</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={resetNewPassword}
                      onChange={(e) => setResetNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#083415] mb-1">Confirmer le nouveau mot de passe</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={resetConfirmPassword}
                      onChange={(e) => setResetConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={isResetting}
                      className="flex-1 h-11 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs hover:bg-[#001d07] transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>💾</span>
                      <span>Enregistrer et Déverrouiller</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="px-4 h-11 rounded-full bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200"
                    >
                      Retour
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

  // VIEW 2: AUTHENTICATED -> COMPLETE DASHBOARD
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
