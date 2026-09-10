'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EquipeItem, initialEquipe, getStoredData } from '@/lib/adminData';

export default function EquipePage() {
  const [equipe, setEquipe] = useState<EquipeItem[]>(initialEquipe);

  useEffect(() => {
    setEquipe(getStoredData<EquipeItem[]>('lisda_equipe', initialEquipe));
    const handleDataChange = () => setEquipe(getStoredData<EquipeItem[]>('lisda_equipe', initialEquipe));
    window.addEventListener('lisda_data_changed', handleDataChange);
    return () => window.removeEventListener('lisda_data_changed', handleDataChange);
  }, []);

  const president = equipe[0] || initialEquipe[0];
  const members = equipe.slice(1);

  return (
    <div className="w-full bg-[#fbf9f4] text-[#1b1c19] min-h-screen">
      {/* Top Banner & Breadcrumbs */}
      <section className="relative w-full bg-[#f5f3ee] px-6 lg:px-12 py-12 overflow-hidden border-b border-[#083415]/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#424941]">
            <Link href="/" className="hover:text-[#083415] transition-colors flex items-center gap-1">
              <span>Accueil</span>
            </Link>
            <span className="text-[#c1c9be]">/</span>
            <span className="font-semibold text-[#083415]">Équipe & Gouvernance</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#083415] text-[#bfefc0] text-xs uppercase tracking-wider font-bold">
                  Gouvernance & Dévouement Humain
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#424941] text-xs font-medium border border-[#083415]/10">
                  Dombe, Kribi • Bassin du Congo
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#083415] tracking-tight leading-tight">
                Les femmes et les hommes au cœur de notre engagement
              </h1>
              <p className="text-lg text-[#424941] max-w-3xl leading-relaxed">
                Une équipe pluridisciplinaire unie par la défense inconditionnelle des droits des peuples autochtones, la régénération écologique des forêts littorales et le développement équitable du Sud-Cameroun.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#083415]/10 flex items-center gap-4 w-full sm:w-auto">
                <div className="w-12 h-12 rounded-full bg-[#083415] flex items-center justify-center text-[#feb323] shrink-0 font-bold text-xl">
                  ✓
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#083415] text-base">Statuts Récépissés</span>
                  <span className="text-xs text-[#424941]">Association Officielle déclarée au Cameroun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Figures */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-[#083415]/10 shadow-sm">
              <span className="text-4xl font-extrabold text-[#083415]">{equipe.length}</span>
              <p className="font-bold text-[#083415] mt-2 text-sm">Membres Exécutifs</p>
              <p className="text-xs text-[#424941]">Direction collégiale & élue</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#083415]/10 shadow-sm">
              <span className="text-4xl font-extrabold text-[#ba6d14]">100%</span>
              <p className="font-bold text-[#083415] mt-2 text-sm">Ancrage Terroir</p>
              <p className="text-xs text-[#424941]">Natif du littoral & forêt Kribi</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#083415]/10 shadow-sm">
              <span className="text-4xl font-extrabold text-[#537f1b]">35+</span>
              <p className="font-bold text-[#083415] mt-2 text-sm">Sentinelles Locales</p>
              <p className="text-xs text-[#424941]">Bénévoles de brousse actifs</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#083415]/10 shadow-sm">
              <span className="text-4xl font-extrabold text-[#feb323]">14</span>
              <p className="font-bold text-[#083415] mt-2 text-sm">Chefferies Unies</p>
              <p className="text-xs text-[#424941]">Clans et villages partenaires</p>
            </div>
          </div>
        </div>
      </section>

      {/* President Spotlight */}
      {president && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="relative overflow-hidden rounded-3xl bg-[#083415] text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full">
                {president.photo ? (
                  <img
                    src={president.photo}
                    alt={`Portrait officiel de ${president.nom}`}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full min-h-[380px] bg-[#001d07] flex items-center justify-center text-6xl font-black text-[#feb323]">
                    {president.nom.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-[#feb323] text-[#083415] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                  {president.roleShort || "Coordination Générale"}
                </div>
              </div>

              <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-widest text-[#bfefc0] font-bold">
                    Mise en Avant • Présidence de l'ONG
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                      {president.nom}
                    </h2>
                    <span className="text-xl text-[#feb323] font-semibold">
                      {president.role}
                    </span>
                  </div>

                  <div className="mt-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                    <blockquote className="text-lg italic text-gray-100 leading-relaxed">
                      « Notre force réside dans notre proximité indéfectible avec nos terroirs de Dombe et les communautés de la forêt. Chaque décision, chaque plaidoyer porte la voix de ceux qui protègent le poumon vert du monde. »
                    </blockquote>
                  </div>

                  <p className="text-sm text-gray-200 leading-relaxed mt-2">
                    {president.bio}
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-[#bfefc0]">
                    {president.email && <span>✉ {president.email}</span>}
                    <span>•</span>
                    <span>📍 Dombe, Kribi (Cameroun)</span>
                  </div>
                  <a
                    href="https://wa.me/237677593239?text=Bonjour%20M.%20NSEGBE%2C%20je%20vous%20contacte%20via%20le%20site%20LISDA."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full font-bold bg-[#feb323] text-[#083415] hover:bg-amber-400 transition-all text-sm shadow-md"
                  >
                    Contacter la présidence
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Executive Board Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="flex flex-col gap-3 mb-10">
          <span className="text-xs uppercase tracking-widest text-[#ba6d14] font-bold">
            Instances Dirigeantes
          </span>
          <h2 className="text-3xl font-bold text-[#083415]">
            Le Bureau Exécutif de LISDA ONG
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm">
            Une gouvernance structurée assurant la transparence, l'imputabilité et l'efficience des actions sur le terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((m, idx) => (
            <div
              key={m.id || idx}
              className="bg-white rounded-3xl p-6 shadow-sm border border-[#083415]/10 hover:border-[#feb323] hover:shadow-md transition-all flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-2xl aspect-square w-full bg-[#f0eee9] flex items-center justify-center shadow-inner">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.nom}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#083415] text-[#feb323] flex items-center justify-center text-3xl font-extrabold shadow-inner">
                      {m.initials || m.nom.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#083415] text-[#bfefc0] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {m.roleShort || "Bureau Exécutif"}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-[#ba6d14] uppercase tracking-wider">
                    {m.role}
                  </span>
                  <h3 className="text-xl font-bold text-[#083415] leading-snug">
                    {m.nom}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {m.bio}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f5f3ee] flex items-center justify-between text-xs text-[#083415] font-semibold">
                <span>{m.badge || "Bureau Exécutif"}</span>
                <span className="text-[#ba6d14]">LISDA ONG</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
