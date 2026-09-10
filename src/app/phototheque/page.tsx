'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PhotothequeItem, initialPhototheque, getStoredData } from '@/lib/adminData';

export default function PhotothequePage() {
  const [photos, setPhotos] = useState<PhotothequeItem[]>(initialPhototheque);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    setPhotos(getStoredData<PhotothequeItem[]>('lisda_phototheque', initialPhototheque));
    const handleDataChange = () => {
      setPhotos(getStoredData<PhotothequeItem[]>('lisda_phototheque', initialPhototheque));
    };
    window.addEventListener('lisda_data_changed', handleDataChange);
    return () => window.removeEventListener('lisda_data_changed', handleDataChange);
  }, []);


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

