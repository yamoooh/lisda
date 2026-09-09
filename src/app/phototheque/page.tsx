'use client';

import { useState } from 'react';

export default function PhotothequePage() {
  const photos = [
    { id: '1', titre: 'Atelier communautaire à Dombe', categorie: 'Vie Associative', url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80' },
    { id: '2', titre: 'Reboisement sur le littoral de Kribi', categorie: 'Environnement', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80' },
    { id: '3', titre: 'Rencontre avec les chefferies Bagyeli', categorie: 'Autochtones', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    { id: '4', titre: 'Récolte et séchage du Njansang', categorie: 'Autonomie Femmes', url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80' },
    { id: '5', titre: 'Distribution de kits scolaires', categorie: 'Education', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
    { id: '6', titre: 'Consultation de santé communautaire', categorie: 'Santé', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest">Galerie Photo</span>
        <h1 className="text-4xl font-extrabold text-[#083415]">Photothèque des Activités LISDA</h1>
        <p className="text-gray-600 text-lg">
          Découvrez nos actions sur le terrain à Kribi et dans le Bassin du Congo à travers nos archives photographiques.
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPhoto(p.url)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="h-60 overflow-hidden relative">
              <img
                src={p.url}
                alt={p.titre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-[#083415]/80 text-[#feb323] px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                {p.categorie}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm text-[#083415] group-hover:text-[#ba6d14] transition-colors">{p.titre}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedPhoto} alt="Agrandissement photo" className="max-w-full max-h-[85vh] rounded-xl object-contain" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white text-sm font-bold bg-white/20 px-3 py-1 rounded-full"
            >
              Fermer ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
