'use client';

import { useState, useEffect } from 'react';
import { DocumentItem, initialDocuments, getStoredData, fetchSupabaseDocuments, syncSupabaseDocuments, setStoredData } from '@/lib/adminData';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Tous');

  const loadData = async () => {
    const local = getStoredData<DocumentItem[]>('lisda_documents', initialDocuments);
    setDocuments(local);
    try {
      const remote = await fetchSupabaseDocuments();
      if (remote && remote.length > 0) {
        setDocuments(remote);
      }
    } catch (e) {
      console.warn('Erreur chargement public documents:', e);
    }
  };

  useEffect(() => {
    loadData();
    const handleDataChange = () => {
      setDocuments(getStoredData<DocumentItem[]>('lisda_documents', initialDocuments));
    };
    window.addEventListener('lisda_data_changed', handleDataChange);
    return () => window.removeEventListener('lisda_data_changed', handleDataChange);
  }, []);

  const getDocIcon = (name?: string, type?: string) => {
    const ext = (name?.split('.').pop() || '').toLowerCase();
    if (ext === 'pdf' || type?.includes('pdf')) return '📕';
    if (ext === 'doc' || ext === 'docx' || type?.includes('word')) return '📘';
    if (ext === 'xls' || ext === 'xlsx' || type?.includes('sheet') || type?.includes('excel')) return '📗';
    if (ext === 'ppt' || ext === 'pptx' || type?.includes('presentation')) return '📙';
    if (ext === 'zip' || ext === 'rar' || ext === '7z' || type?.includes('zip')) return '🗂️';
    if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(ext) || type?.includes('image')) return '🖼️';
    return '📄';
  };

  const getDocFormatLabel = (name?: string, type?: string) => {
    const ext = (name?.split('.').pop() || '').toUpperCase();
    if (ext) return ext;
    if (type?.includes('pdf')) return 'PDF';
    if (type?.includes('word')) return 'DOCX';
    if (type?.includes('excel') || type?.includes('sheet')) return 'XLSX';
    return 'DOCUMENT';
  };

  const handleDownload = (doc: DocumentItem) => {
    // Increment download counter
    const updated = documents.map(d => d.id === doc.id ? { ...d, telechargements: (d.telechargements || 0) + 1 } : d);
    setDocuments(updated);
    setStoredData('lisda_documents', updated);
    syncSupabaseDocuments(updated).catch(() => {});
  };

  const categories = ['Tous', ...Array.from(new Set(documents.map(d => d.categorie)))];
  const filteredDocs = activeCategory === 'Tous' 
    ? documents 
    : documents.filter(d => d.categorie === activeCategory);

  return (
    <div className="w-full bg-[#fbf9f4] text-[#1b1c19] min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[#083415] font-bold text-xs uppercase tracking-widest bg-[#083415]/10 px-3.5 py-1 rounded-full">
          Publications Officielles & Rapports
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#083415]">
          Documents Téléchargeables
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Consultez et téléchargez librement les rapports d'activités, plans stratégiques, statuts et études techniques de LISDA ONG.
        </p>
      </div>

      {/* Category filters */}
      {categories.length > 2 && (
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#083415] text-[#feb323] shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#083415]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Documents List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#083415]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <span className="text-2xl mt-0.5">{getDocIcon(doc.file_name, doc.file_type)}</span>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#083415]/10 text-[#083415] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {doc.categorie}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">{doc.annee}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 font-mono font-medium">{doc.taille}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-[10px] font-bold uppercase text-[#ba6d14] bg-[#feb323]/20 px-2 py-0.5 rounded">
                    {getDocFormatLabel(doc.file_name, doc.file_type)}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-[#083415] leading-snug">
                  {doc.titre}
                </h3>
                {doc.file_name && (
                  <p className="text-[11px] text-gray-400 font-mono">
                    {doc.file_name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              {doc.url && doc.url !== '#' ? (
                <a
                  href={doc.url}
                  download={doc.file_name || `${doc.titre}.pdf`}
                  onClick={() => handleDownload(doc)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#083415] text-[#feb323] font-extrabold text-xs hover:bg-[#001d07] shadow-md hover:shadow-lg transition-all shrink-0"
                >
                  <span>📥</span>
                  <span>Télécharger ({getDocFormatLabel(doc.file_name, doc.file_type)})</span>
                </a>
              ) : (
                <a
                  href={`mailto:Patrice_segbe@yahoo.fr?subject=Demande%20du%20document%20:${encodeURIComponent(doc.titre)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#083415]/10 text-[#083415] font-bold text-xs hover:bg-[#083415] hover:text-[#feb323] transition-colors shrink-0"
                >
                  <span>✉️</span>
                  <span>Demander par email</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
