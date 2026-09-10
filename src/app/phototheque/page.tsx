'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PhotothequePage() {
  const photos = [
    {
      id: '1',
      titre: 'Rassemblement communautaire à Dombe',
      categorie: 'Vie Associative',
      url: '/images/rassemblement-dombe.webp'
    },
    {
      id: '2',
      titre: 'Formation agroforestière des femmes rurales',
      categorie: 'Autonomisation',
      url: '/images/formation-femmes.webp'
    },
    {
      id: '3',
      titre: 'Restauration de la ceinture côtière de Kribi',
      categorie: 'Environnement',
      url: '/images/restauration-mangroves.webp'
    },
    {
      id: '4',
      titre: 'Concertation sous l\'arbre à palabres avec les peuples Bagyeli',
      categorie: 'Plaidoyer & Droits',
      url: '/images/arbre-palabres.webp'
    },
    {
      id: '5',
      titre: 'Séance de travail du Bureau Exécutif LISDA',
      categorie: 'Gouvernance',
      url: 'https://lh3.googleusercontent.com/aida/AEtjO1XxknWRwNUC7LKKM_x4Wlpb1WIbQSeRfkAVfY6MQbNkZA_ksAifuaVjLQPadw3xnlbp6pyVRi4N4v598C95z2w4MaAW5t0Kuop14PYz2zPUk2PaXjMSeBiL9z-1FF_wmV28-6ZoAK5VNiLtYyWnXijVFOC_Q0LB6OMm6YvWxJkndZMWUNCmTF1sRtnLjjroyjGUCw5n9oAIS4gollvJjK516KrpZWWJDlyHklMmBOdRVu_e4oAaMSQbC_HH'
    },
    {
      id: '6',
      titre: 'Inspection des mangroves littorales atlantiques',
      categorie: 'Climat & Littoral',
      url: 'https://lh3.googleusercontent.com/aida/AEtjO1WsyIzKPZ683w0klF6bC9fo1n72LRD-JobZ0xMkktIVDEm5elWDlj6QYG3RgoXX6oxlZ_130dN5dPeXSnY61_bgXsmlt1tDQlD_iQyfMgZC-XFbqATcJNiEBxWgfjMmNzBbc938O-kInRC4ooGJgtO0zqa613TsOnEyqxSZ5KB7x6IWbEphBMJPswrq8yHiYy2tFs2hxld-x_t8-KXfJPZ8OZtu8glRhvqeZuCUMCl-O8EGXl2ItQUQB9ge'
    },
    {
      id: '7',
      titre: 'Distribution d\'actes d\'état-civil aux familles Bagyeli',
      categorie: 'Droits Autochtones',
      url: 'https://lh3.googleusercontent.com/aida/AEtjO1Upk9p7p4sPpCDuXHZAWWa8T_nxiY9RrxRuzc9lK-C3CBf_fH8JocH7DZVFwuTJ6A874Vex13q1IPrhjPrYseL-HmRdHxYq1mlsWbsCd8_paNgg9hxkLsD7bJ2aAMkJ8kVrbvLyDq1Sy7ht8GE9OeLUQ3z9T6yYMuoxAZyQU7TEgH1fVz5jhg-FIQHtKW2TAuJVBRqDLcGb-2JeZ5UMxIogckUgvJUSZfd21xO0FnzupegibHAHcY6tzaeT'
    },
    {
      id: '8',
      titre: 'Pépinière d\'arbres autochtones du Sud Cameroun',
      categorie: 'Agroécologie',
      url: 'https://lh3.googleusercontent.com/aida/AEtjO1USdvAjMpwTyYKCaafQ4AM_0htx06M07r5wPyXIshWOCCE1IO3L4ZBYrhCk6jB45FUtqTa_dWK4DWT7KhYVHfFvDPcagpTwl2BjYkae3P_7axhf8pEJo37ma_UkkOnw8T8W1O3LXcREEP1Pt9E4slDdpLIb1bhwFDKF7gh0pEnYnXTj94gjoBeLIAtLyljcfvE7GL-tsS03-hNaSaS4Io_84vLeqEq93eKyiOsENxG7_YI0QV3tEKapcm0'
    }
  ];

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="w-full bg-[#fbf9f4] text-[#1b1c19] min-h-screen py-12 px-6 lg:px-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest bg-[#083415]/10 px-3.5 py-1 rounded-full">
          Archives Visuelles Officielles
        </span>
        <h1 className="text-4xl font-extrabold text-[#083415]">
          Photothèque des Actions de Terrain LISDA
        </h1>
        <p className="text-gray-600 text-lg">
          Découvrez nos activités à Kribi et dans le Bassin du Congo à travers les images authentiques générées par notre plateforme.
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {photos.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPhoto(p.url)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#083415]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="h-64 overflow-hidden relative bg-[#f0eee9]">
              <Image
                src={p.url}
                alt={p.titre}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute top-3 left-3 bg-[#083415]/80 text-[#bfefc0] px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm shadow-md">
                {p.categorie}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm text-[#083415] group-hover:text-[#ba6d14] transition-colors leading-snug">
                {p.titre}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-md"
        >
          <div className="relative max-w-5xl w-full h-[80vh]">
            <Image
              src={selectedPhoto}
              alt="Agrandissement photo"
              fill
              className="object-contain rounded-2xl"
              sizes="100vw"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white text-xs font-bold bg-[#083415] border border-[#feb323] px-4 py-2 rounded-full shadow-lg"
            >
              Fermer ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

