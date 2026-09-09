'use client';

import { useState } from 'react';
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
    <div className="py-16 px-4 max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Inscription 100% Gratuite</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Devenir Membre de LISDA ONG</h1>
        <p className="text-gray-600 text-lg">
          L'inscription comme membre est entièrement gratuite. Rejoignez notre communauté pour soutenir nos actions à Kribi.
        </p>
      </div>

      {success ? (
        <div className="bg-[#083415] text-white p-8 rounded-3xl text-center space-y-4">
          <div className="text-4xl">🎉</div>
          <h2 className="text-2xl font-bold text-[#feb323]">Inscription validée avec succès !</h2>
          <p className="text-sm text-gray-200">
            Merci <strong>{prenom} {nom}</strong> pour votre engagement. Vous recevrez très prochainement nos nouvelles.
          </p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nom *</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Prénom *</label>
                <input
                  type="text"
                  required
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="Votre prénom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Adresse E-mail *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Téléphone *</label>
                <input
                  type="tel"
                  required
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  placeholder="+237 ..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Motivation / Message</label>
              <textarea
                rows={3}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300"
                placeholder="Pourquoi souhaitez-vous rejoindre LISDA ?"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="newsletter"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="w-4 h-4 text-[#083415]"
              />
              <label htmlFor="newsletter" className="text-xs text-gray-600">
                S'abonner à la newsletter LISDA pour recevoir les actualités du terrain.
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
  );
}
