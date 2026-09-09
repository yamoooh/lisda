'use client';

import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function DevenirMembrePage() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [motivation, setMotivation] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from('membres').insert([
        { nom, prenom, email, telephone, motivation, newsletter }
      ]);
    } catch (err) {
      console.log('Supabase submit fallback');
    }
    setSuccess(true);
  };

  return (
    <div className="w-full bg-[#fbf9f4] text-[#1b1c19] min-h-screen py-12 px-6 lg:px-12 space-y-12">
      {/* Banner Card */}
      <section className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-[#083415] text-white shadow-xl relative border border-[#feb323]/20">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-7 p-8 lg:p-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#feb323] font-bold bg-white/10 px-3 py-1 rounded-full">
              Inscription 100% Gratuite
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Devenir Membre de LISDA ONG
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed">
              L'adhésion est gratuite et ouverte à toute personne désireuse de contribuer au développement durable, à l'agroécologie et aux droits des peuples de la forêt à Kribi.
            </p>
          </div>
          <div className="md:col-span-5 relative h-64 md:h-full min-h-[220px]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW86Ea1z5ZomEgdvBmfrozvAChjXqDe_kundlWUPBmGLTsWmAZOZb-TAKZ8vQ-rE2pevhXKo4EpphaEObNa96Y3pKQBR3pzveumFuD4DY98iUKoUKb3K4ihOcARhvqp_0Ltv4k27pQqx4kp118B6_0_8OB7lpcXySiC3-LDx2pnomQqvb2HX8kbQzicP-aEoGfNaU6p28sJZ_thw21FZAt2JxwDNxUV2LS9Y-xTQKkbfwepIHCzbwFng"
              alt="Membres LISDA ONG à Dombe"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto">
        {success ? (
          <div className="bg-[#083415] text-white p-10 rounded-3xl text-center space-y-4 shadow-2xl border border-[#feb323]">
            <div className="text-5xl">🎉</div>
            <h2 className="text-3xl font-extrabold text-[#feb323]">Inscription validée avec succès !</h2>
            <p className="text-sm text-gray-200 max-w-md mx-auto leading-relaxed">
              Merci <strong>{prenom} {nom}</strong> pour votre engagement auprès de LISDA ONG à Kribi. Nous vous contacterons très prochainement.
            </p>
          </div>
        ) : (
          <div className="bg-white p-8 lg:p-10 rounded-3xl border border-[#083415]/10 shadow-xl space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-[#083415]">Formulaire d'Adhésion Membre</h2>
              <p className="text-xs text-gray-500">Aucun frais d'inscription ou d'abonnement n'est requis.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#083415] uppercase mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#083415] uppercase mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]"
                    placeholder="Votre prénom"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#083415] uppercase mb-1">Adresse E-mail *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#083415] uppercase mb-1">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]"
                    placeholder="+237 677..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#083415] uppercase mb-1">Motivation / Domaine d'intérêt</label>
                <textarea
                  rows={3}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#083415]"
                  placeholder="Pourquoi souhaitez-vous rejoindre LISDA ?"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="w-4 h-4 text-[#083415] accent-[#083415]"
                />
                <label htmlFor="newsletter" className="text-xs text-gray-600">
                  Recevoir les rapports d'activités et la newsletter de LISDA ONG.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#083415] text-[#feb323] font-bold text-sm hover:bg-[#001d07] shadow-lg transition-all"
              >
                Valider mon inscription gratuite 🤝
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

