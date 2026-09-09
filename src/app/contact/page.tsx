'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Nous Contacter</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Contactez LISDA ONG</h1>
        <p className="text-gray-600 text-lg">
          Basés à Dombe (Kribi, Cameroun), nous sommes à votre écoute pour toute demande de renseignement ou de partenariat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        <div className="lg:col-span-5 bg-[#083415] text-white p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold text-[#feb323]">Coordonnées Officielle</h2>
          <div className="space-y-4 text-sm text-gray-200">
            <p className="flex items-start gap-3">
              <span className="text-lg">📍</span>
              <span><strong>Adresse :</strong> Dombe, Kribi (Département de l'Océan, Région du Sud, Cameroun)</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-lg">✉️</span>
              <a href="mailto:Patrice_segbe@yahoo.fr" className="hover:text-[#feb323] transition-colors underline">
                Patrice_segbe@yahoo.fr
              </a>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-lg">📞</span>
              <a href="tel:+237677593239" className="hover:text-[#feb323] transition-colors">
                +237 677 593 239
              </a>
            </p>
          </div>

          <div className="pt-6 border-t border-gray-800 space-y-2">
            <span className="text-xs font-bold text-[#feb323] uppercase">Réseaux Sociaux</span>
            <div className="flex gap-4 text-[#feb323] text-sm font-bold">
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">LinkedIn</a>
              <a href="#" className="hover:underline">YouTube</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-[#083415]">Envoyer un Message</h2>
          {success ? (
            <div className="p-4 bg-[#083415] text-[#feb323] rounded-2xl text-center font-bold text-sm">
              Votre message a bien été envoyé ! Nous vous répondrons très rapidement.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSuccess(true); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nom complet *</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">E-mail *</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Sujet</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="Objet de votre message" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message *</label>
                <textarea rows={4} required className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="Votre message..." />
              </div>
              <button type="submit" className="w-full py-4 rounded-full bg-[#083415] text-[#feb323] font-bold text-sm hover:bg-[#001d07]">
                Envoyer le message 🚀
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Carte de localisation */}
      <div className="max-w-6xl mx-auto bg-gray-200 rounded-3xl h-64 overflow-hidden flex items-center justify-center text-gray-600 font-bold border border-gray-300">
        📍 Carte Interactive Kribi - Dombe (Cameroun, Bassin du Congo)
      </div>
    </div>
  );
}
