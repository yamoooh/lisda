'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { DonateurItem, initialDonateurs, initialDonationAmounts, getStoredData } from '@/lib/adminData';

export default function FaireUnDonPage() {
  const [suggestedAmounts, setSuggestedAmounts] = useState<number[]>(initialDonationAmounts);
  const [montant, setMontant] = useState<number>(10000);
  const [montantCustom, setMontantCustom] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [typeDon, setTypeDon] = useState<'argent' | 'nature'>('argent');
  const [accord, setAccord] = useState<boolean>(true);
  const [nom, setNom] = useState<string>('');
  const [prenom, setPrenom] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [publicDonateurs, setPublicDonateurs] = useState<DonateurItem[]>([]);

  useEffect(() => {
    // Load suggested amounts dynamically
    const loadedAmounts = getStoredData<number[]>('lisda_donation_amounts', initialDonationAmounts);
    setSuggestedAmounts(loadedAmounts);
    if (loadedAmounts.length > 0 && !loadedAmounts.includes(montant)) {
      setMontant(loadedAmounts[0]);
    }

    // Load dynamic public donators wall
    const loadedDons = getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs);
    const visible = loadedDons.filter(d => d.statut === 'valide' && d.accord_affichage !== false);
    setPublicDonateurs(visible);

    const handleDataChange = () => {
      const updatedAmounts = getStoredData<number[]>('lisda_donation_amounts', initialDonationAmounts);
      setSuggestedAmounts(updatedAmounts);

      const updatedDons = getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs);
      setPublicDonateurs(updatedDons.filter(d => d.statut === 'valide' && d.accord_affichage !== false));
    };

    window.addEventListener('lisda_data_changed', handleDataChange);
    return () => window.removeEventListener('lisda_data_changed', handleDataChange);
  }, []);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    const finalAmount = isCustom ? Number(montantCustom) : montant;
    if (!finalAmount || finalAmount <= 0) {
      setErrorMessage("Veuillez sélectionner ou saisir un montant de don valide.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Veuillez renseigner votre adresse email pour recevoir votre confirmation.");
      return;
    }

    setIsLoading(true);

    try {
      const returnUrl = `${window.location.origin}/faire-un-don/merci?amount=${finalAmount}&name=${encodeURIComponent(`${prenom} ${nom}`.trim())}&currency=XOF`;

      const { data, error } = await supabase.functions.invoke('leekpay-checkout', {
        body: {
          amount: finalAmount,
          customer_email: email.trim(),
          customer_name: `${prenom} ${nom}`.trim() || "Donateur LISDA",
          return_url: returnUrl,
          accord_affichage: accord,
          type_don: 'argent'
        }
      });

      if (error) {
        console.warn("Échec invoke standard, tentative via fetch direct:", error);
        const directResp = await fetch('https://neqnbrhmacperiinpstp.supabase.co/functions/v1/leekpay-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: finalAmount,
            customer_email: email.trim(),
            customer_name: `${prenom} ${nom}`.trim() || "Donateur LISDA",
            return_url: returnUrl,
            accord_affichage: accord,
            type_don: 'argent'
          })
        });

        const directData = await directResp.json();
        if (directData.payment_url) {
          window.location.href = directData.payment_url;
          return;
        } else {
          throw new Error(directData.error || error.message || "Erreur lors de l'initialisation LeekPay.");
        }
      }

      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error(data?.error || "L'URL de paiement LeekPay n'a pas été renvoyée.");
      }
    } catch (err: any) {
      console.error("Échec du paiement LeekPay:", err);
      setErrorMessage(
        err.message || "Une erreur est survenue lors de l'accès à la passerelle de paiement LeekPay. Veuillez réessayer."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#fbf9f4] text-[#1b1c19] min-h-screen py-12 px-6 lg:px-12 space-y-12">
      {/* Banner */}
      <section className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-[#083415] text-white shadow-2xl relative border border-[#feb323]/30">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-7 p-8 lg:p-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#feb323] font-bold bg-white/10 px-3.5 py-1 rounded-full">
              Don Ponctuel Sécurisé via LeekPay
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Soutenez les actions de LISDA ONG
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed">
              Vos dons sont 100% ponctuels sans aucun prélèvement ni abonnement récurrent. Ils financent directement l'agroforesterie, la protection des mangroves et l'aide aux familles Bagyeli à Kribi.
            </p>
          </div>
          <div className="md:col-span-5 relative h-64 md:h-full min-h-[240px]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxltCnMChy32SBjVTGQ6SuIp2R9nUrXvz9Z5bKOWPMuKDEKByyf1zdsfL4lBM3wltTMXYd8KcaUjWLEABseMW_S-MZrm33ZVOq-O3whycWdK9s6nLwz1sgZnn3QRTBQk1d9hIYWOhsFqjmOxPlFTPkZbP8YkaWqax-ZE9CHPlRCSbMWC2XoNIr079pLAgG78PtIGqSHSNo6Zr4GfjpQGV4v2QqaVA41v-eLmiudHIIlXb7J7Ad1sv5HQ"
              alt="Action humanitaire et écologique LISDA"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto bg-white p-8 lg:p-10 rounded-3xl border border-[#083415]/10 shadow-xl space-y-8">
        <div className="flex rounded-full bg-[#f0eee9] p-1 border border-[#083415]/10">
          <button
            onClick={() => setTypeDon('argent')}
            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${
              typeDon === 'argent' ? 'bg-[#083415] text-[#feb323] shadow-md' : 'text-[#424941]'
            }`}
          >
            Don Financier (LeekPay Mobile Money & Carte)
          </button>
          <button
            onClick={() => setTypeDon('nature')}
            className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${
              typeDon === 'nature' ? 'bg-[#083415] text-[#feb323] shadow-md' : 'text-[#424941]'
            }`}
          >
            Don en Nature (Kits, Matériel)
          </button>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {typeDon === 'argent' ? (
          <form onSubmit={handlePay} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#083415] uppercase tracking-wider">
                1. Sélectionner le montant du don (FCFA)
              </label>
              
              {/* Dynamic Suggested Amounts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {suggestedAmounts.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMontant(m);
                      setIsCustom(false);
                    }}
                    className={`py-3.5 rounded-2xl border-2 font-bold text-sm transition-all ${
                      montant === m && !isCustom
                        ? 'border-[#feb323] bg-[#feb323]/20 text-[#083415] shadow-sm'
                        : 'border-gray-200 text-gray-700 hover:border-[#083415]'
                    }`}
                  >
                    {m.toLocaleString('fr-FR')} FCFA
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="pt-2 space-y-1.5">
                <label className="block text-xs font-bold text-[#083415] uppercase">
                  Ou saisissez un montant personnalisé (FCFA)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="500"
                    step="500"
                    placeholder="Montant libre (ex: 15 000)"
                    value={isCustom ? montantCustom : ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setMontantCustom(val);
                      setIsCustom(true);
                      const num = Number(val);
                      if (num > 0) {
                        setMontant(num);
                      }
                    }}
                    onFocus={() => setIsCustom(true)}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-sm font-bold text-[#083415] focus:outline-none ${
                      isCustom ? 'border-[#feb323] bg-[#feb323]/10' : 'border-gray-300 focus:border-[#083415]'
                    }`}
                  />
                  <span className="absolute right-4 top-3.5 text-xs font-bold text-[#ba6d14]">FCFA</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#083415] uppercase tracking-wider">
                2. Vos coordonnées
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415] text-sm"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415] text-sm"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Adresse Email * (pour le reçu de paiement)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415] text-sm"
                  placeholder="votre.email@exemple.com"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="accord"
                checked={accord}
                onChange={(e) => setAccord(e.target.checked)}
                className="w-4 h-4 text-[#083415] accent-[#083415]"
              />
              <label htmlFor="accord" className="text-xs text-gray-600">
                J'accepte que mon prénom/nom figure dans la liste publique des donateurs de LISDA ONG.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-full bg-[#feb323] hover:bg-amber-400 text-[#083415] font-extrabold text-base shadow-xl transition-all flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#083415] border-t-transparent rounded-full animate-spin"></div>
                  <span>Connexion à LeekPay en cours...</span>
                </>
              ) : (
                <>
                  <span>🔒</span>
                  <span>Faire mon don maintenant ({ (isCustom ? (Number(montantCustom) || 0) : montant).toLocaleString('fr-FR') } FCFA)</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
              <span className="flex items-center gap-1">🛡️ Paiement sécurisé LeekPay</span>
              <span>•</span>
              <span>📱 MTN & Orange Money</span>
              <span>•</span>
              <span>💳 Carte Bancaire</span>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-sm text-gray-700 p-6 bg-[#f5f3ee] rounded-2xl border border-[#083415]/10">
            <p className="font-bold text-[#083415] text-base">
              Instructions pour les dons en nature :
            </p>
            <p className="leading-relaxed">
              Pour faire don de matériel médical, de plants d'arbres, de matériel informatique ou de fournitures scolaires, contactez notre secrétariat à Kribi :
            </p>
            <div className="p-4 bg-white rounded-xl space-y-1 text-xs font-medium text-[#083415]">
              <p>📞 <strong>Téléphone :</strong> +237 677 593 239</p>
              <p>✉ <strong>E-mail :</strong> Patrice_segbe@yahoo.fr</p>
              <p>📍 <strong>Adresse :</strong> Quartier Dombe, Kribi, Cameroun</p>
            </div>
          </div>
        )}
      </div>

      {/* DYNAMIC DONORS WALL */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-[#083415] text-center">Nos Donateurs & Partenaires</h2>
        <p className="text-xs text-gray-500 text-center -mt-2">
          Un immense merci à toutes les femmes et tous les hommes qui soutiennent nos actions de terrain.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {publicDonateurs.length === 0 ? (
            <div className="col-span-3 bg-white p-6 rounded-2xl border border-[#083415]/10 text-center text-gray-500 text-xs">
              Les premiers donateurs de la campagne apparaîtront ici.
            </div>
          ) : (
            publicDonateurs.map((d) => (
              <div key={d.id} className="bg-white p-5 rounded-2xl border border-[#083415]/10 text-center space-y-1 shadow-sm hover:shadow-md transition-shadow">
                <div className="font-bold text-sm text-[#083415]">
                  {d.anonyme ? 'Donateur Anonyme' : `${d.prenom ? d.prenom + ' ' : ''}${d.nom}`.trim()}
                </div>
                <div className="text-xs text-[#ba6d14] font-extrabold">{d.montant.toLocaleString('fr-FR')} FCFA</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{d.type_don}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
