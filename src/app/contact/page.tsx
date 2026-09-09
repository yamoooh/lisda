'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="w-full bg-[#fbf9f4] text-[#1b1c19] min-h-screen py-12 px-6 lg:px-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest bg-[#083415]/10 px-3.5 py-1 rounded-full">
          Implantation Terrain & Secrétariat
        </span>
        <h1 className="text-4xl font-extrabold text-[#083415]">
          Contact & Localisation à Kribi
        </h1>
        <p className="text-gray-600 text-lg">
          Basée à Dombe (Kribi, Cameroun), l'équipe de LISDA est à votre disposition pour toute opportunité de partenariat, demande d'information ou appui bénévole.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
        <div className="lg:col-span-5 bg-[#083415] text-white p-8 lg:p-10 rounded-3xl space-y-8 flex flex-col justify-between shadow-xl border border-[#feb323]/20">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#feb323]">Coordonnées Officielles</h2>
            <div className="space-y-4 text-sm text-gray-200">
              <p className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <span><strong>Siège Social :</strong> Dombe, Kribi (Département de l'Océan, Région du Sud, Cameroun)</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-xl">✉️</span>
                <a href="mailto:Patrice_segbe@yahoo.fr" className="hover:text-[#feb323] transition-colors underline font-medium">
                  Patrice_segbe@yahoo.fr
                </a>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <a href="tel:+237677593239" className="hover:text-[#feb323] transition-colors font-medium">
                  +237 677 593 239
                </a>
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <span className="text-xs font-bold text-[#feb323] uppercase tracking-wider">Ligne directe WhatsApp</span>
            <div>
              <a
                href="https://wa.me/237677593239?text=Bonjour%20LISDA%20ONG%2C%20je%20vous%20contacte%20depuis%20votre%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#feb323] text-[#083415] font-extrabold text-xs shadow-md hover:bg-amber-400 transition-all"
              >
                💬 Échanger sur WhatsApp (+237677593239)
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl border border-[#083415]/10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-[#083415]">Envoyer un Message à la Coordination</h2>
          {success ? (
            <div className="p-6 bg-[#083415] text-[#bfefc0] rounded-2xl text-center font-bold text-sm space-y-2 border border-[#feb323]">
              <div className="text-3xl">✉️</div>
              <p className="text-base text-[#feb323]">Votre message a été transmis avec succès !</p>
              <p className="text-xs text-gray-200 font-normal">L'équipe du secrétariat général de LISDA vous répondra sous 24 à 48 heures.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSuccess(true); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#083415] uppercase mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]"
                  placeholder="Votre nom complet"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#083415] uppercase mb-1">E-mail *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#083415] uppercase mb-1">Sujet / Objet</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]"
                  placeholder="Ex: Partenariat, Don en nature, Information"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#083415] uppercase mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]"
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#083415] text-[#feb323] font-bold text-sm hover:bg-[#001d07] shadow-lg transition-all"
              >
                Envoyer le message 🚀
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Map visual card */}
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-xl relative h-80 border-4 border-white">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2rzVDfMP-gH0G-ZSvYUcV6MqSPsDCdlEOhTKbJnVOZGRAVDR4Tgzs-mBdHAtV1neXIrXfIB4ClM51PorNGA6ZvWMYuYWszGIMkrVSa3hhh1M69oFAPoSgVhndc7cYBL2w0VrjoIgoJ4Qvjz_6_krkkYaZiZB77gEM8qjfCSxBwpFvJRVqaXrZy49cQKlDnT3ZtD0uaEG6Tyjy3mcZ7eKk--9IUDJEMxGpOqO0mvFe3TVom_2B3-9rRw"
          alt="Localisation géographique de Dombe Kribi Cameroun"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#083415]/80 via-transparent to-transparent flex items-end p-8">
          <div className="text-white space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#feb323]">Repère Géographique</span>
            <p className="text-xl font-extrabold">Siège de LISDA ONG • Dombe, Kribi (Cameroun)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

