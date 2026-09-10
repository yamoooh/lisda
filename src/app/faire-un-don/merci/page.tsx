'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

function MerciContent() {
  const searchParams = useSearchParams();
  const [montant, setMontant] = useState<number>(10000);
  const [nom, setNom] = useState<string>('Généreux Donateur');

  useEffect(() => {
    const paramAmount = searchParams?.get('amount');
    const paramName = searchParams?.get('name');
    if (paramAmount) {
      setMontant(Number(paramAmount) || 10000);
    }
    if (paramName) {
      setNom(decodeURIComponent(paramName));
    }
  }, [searchParams]);

  const calculateImpact = (amount: number) => {
    if (amount >= 50000) {
      return {
        titre: "Protection Majeure de Mangrove & Appui Communautaire",
        description: "Votre don permet de financer 2 missions complètes de surveillance écologique des mangroves côtières à Kribi et la dotation de 100 plants d'arbres nobles en pépinière.",
        icone: "🌳"
      };
    } else if (amount >= 25000) {
      return {
        titre: "Équipement d'une Pépinière Autochtone",
        description: "Votre don assure l'achat de semences vivrières, de substrat fertile et de gaines pour 50 jeunes plants d'arbres fertilisants entretenus par les femmes rurales.",
        icone: "🌱"
      };
    } else if (amount >= 10000) {
      return {
        titre: "Kit Scolaire & Soutien aux Enfants Bagyeli",
        description: "Votre don finance un trousseau scolaire complet (cahiers, stylos, livres) et l'appui administratif pour la scolarisation d'un enfant autochtone.",
        icone: "📚"
      };
    } else {
      return {
        titre: "Plantation Citoyenne de Palétuviers",
        description: "Votre contribution finance la mise en terre et le suivi de 10 jeunes plants de palétuviers pour lutter activement contre l'érosion côtière.",
        icone: "🌊"
      };
    }
  };

  const impact = calculateImpact(montant);

  return (
    <div className="w-full bg-[#fbf9f4] text-[#1b1c19] min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Main Gratitude Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 text-center space-y-6 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#feb323]/20 blur-2xl"></div>
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#083415]/10 blur-2xl"></div>

          <div className="relative z-10 space-y-4">
            <div className="w-20 h-20 bg-[#083415] text-[#feb323] rounded-3xl flex items-center justify-center text-3xl mx-auto shadow-xl">
              ❤️
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs">
              <span>✅</span>
              <span>Paiement LeekPay Confirmé</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#083415] tracking-tight">
              Un Grand Merci, {nom} !
            </h1>

            <p className="text-gray-600 text-sm leading-relaxed max-w-lg mx-auto">
              Votre don ponctuel de <strong className="text-[#083415] font-extrabold">{montant.toLocaleString('fr-FR')} FCFA</strong> a été validé avec succès par la passerelle LeekPay. Votre générosité permet à LISDA ONG d'agir directement sur le terrain à Dombe et Kribi.
            </p>
          </div>

          {/* Concrete Impact Section */}
          <div className="bg-[#fbf9f4] p-6 rounded-2xl border border-gray-200/80 text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{impact.icone}</span>
              <h3 className="font-extrabold text-sm text-[#083415]">L'Impact Concret de Votre Don</h3>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              {impact.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 py-3.5 rounded-full bg-[#083415] text-[#feb323] hover:bg-[#001d07] font-bold text-xs shadow-lg transition-all text-center"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/phototheque"
              className="flex-1 py-3.5 rounded-full bg-[#f0eee9] hover:bg-gray-200 text-[#083415] font-bold text-xs transition-colors text-center"
            >
              Découvrir nos actions de terrain
            </Link>
          </div>
        </div>

        {/* Security & Traceability Footer */}
        <div className="text-center text-xs text-gray-400 space-y-1">
          <p>Transaction sécurisée par LeekPay • LISDA ONG - Kribi, Cameroun</p>
          <p>Pour toute question sur votre reçu : <a href="mailto:Patrice_segbe@yahoo.fr" className="text-[#805600] font-semibold underline">Patrice_segbe@yahoo.fr</a></p>
        </div>
      </div>
    </div>
  );
}

export default function MerciPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fbf9f4] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#083415] border-t-[#feb323] rounded-full animate-spin"></div>
      </div>
    }>
      <MerciContent />
    </Suspense>
  );
}
