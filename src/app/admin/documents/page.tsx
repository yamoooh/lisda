'use client';

import { useState, useEffect } from 'react';
import { DocumentItem, initialDocuments, getStoredData, setStoredData, fetchSupabaseDocuments, syncSupabaseDocuments } from '@/lib/adminData';

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DocumentItem | null>(null);

  // Form fields
  const [titre, setTitre] = useState('');
  const [categorie, setCategorie] = useState('Rapports Annuels');
  const [annee, setAnnee] = useState('2026');
  const [taille, setTaille] = useState('2.5 Mo');
  const [fileUrl, setFileUrl] = useState('#');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    const local = getStoredData<DocumentItem[]>('lisda_documents', initialDocuments);
    setDocs(local);
    try {
      const remote = await fetchSupabaseDocuments();
      if (remote && remote.length > 0) {
        setDocs(remote);
        setStoredData('lisda_documents', remote);
      }
    } catch (e) {
      console.warn('Erreur chargement documents:', e);
    }
  };

  useEffect(() => {
    loadData();
    const handleChange = () => setDocs(getStoredData<DocumentItem[]>('lisda_documents', initialDocuments));
    window.addEventListener('lisda_data_changed', handleChange);
    return () => window.removeEventListener('lisda_data_changed', handleChange);
  }, []);

  const openNewModal = () => {
    setEditingItem(null);
    setTitre('');
    setCategorie('Rapports Annuels');
    setAnnee(new Date().getFullYear().toString());
    setTaille('2.5 Mo');
    setFileUrl('#');
    setFileName('');
    setFileType('');
    setModalOpen(true);
  };

  const openEditModal = (d: DocumentItem) => {
    setEditingItem(d);
    setTitre(d.titre);
    setCategorie(d.categorie);
    setAnnee(d.annee);
    setTaille(d.taille);
    setFileUrl(d.url);
    setFileName(d.file_name || '');
    setFileType(d.file_type || '');
    setModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Format size
    const sizeInMB = file.size / (1024 * 1024);
    const formattedSize = sizeInMB >= 1 
      ? `${sizeInMB.toFixed(1)} Mo` 
      : `${Math.round(file.size / 1024)} Ko`;

    setFileName(file.name);
    setFileType(file.type || 'application/octet-stream');
    setTaille(formattedSize);

    // Default title if empty
    if (!titre.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setTitre(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFileUrl(reader.result);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert("Erreur lors de la lecture du fichier.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) return;

    let updated: DocumentItem[] = [];

    if (editingItem) {
      updated = docs.map(d => d.id === editingItem.id ? {
        ...d,
        titre,
        categorie,
        annee,
        taille,
        url: fileUrl !== '#' ? fileUrl : d.url,
        file_name: fileName || d.file_name,
        file_type: fileType || d.file_type
      } : d);
    } else {
      const newItem: DocumentItem = {
        id: 'doc-' + Date.now(),
        titre,
        categorie,
        annee,
        url: fileUrl,
        taille,
        file_name: fileName || `${titre.replace(/\s+/g, '_')}.pdf`,
        file_type: fileType || 'application/pdf',
        telechargements: 0
      };
      updated = [newItem, ...docs];
    }

    setStoredData('lisda_documents', updated);
    setDocs(updated);
    setModalOpen(false);

    // Auto deploy / sync to Supabase database
    await syncSupabaseDocuments(updated);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous supprimer ce document officiel ?')) {
      const updated = docs.filter(d => d.id !== id);
      setStoredData('lisda_documents', updated);
      setDocs(updated);
      await syncSupabaseDocuments(updated);
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Publications & Rapports</span>
            <span>•</span>
            <span>Tous formats acceptés (PDF, Word, Excel, ZIP...)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#083415]">Documents & Rapports</h1>
          <p className="text-xs text-gray-500 mt-1">
            Gérez les documents téléchargeables en direct sur /documents avec déploiement automatique.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-5 py-3 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
        >
          <span>📁</span>
          <span>Importer un Document (Tous types)</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fbf9f4] border-b border-gray-100 text-[#083415] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Titre du document & Fichier</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Année</th>
                <th className="p-4">Taille</th>
                <th className="p-4">Téléchargements</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {docs.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-bold text-[#083415]">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{getDocIcon(d.file_name, d.file_type)}</span>
                      <div>
                        <div className="font-bold text-sm text-[#083415]">{d.titre}</div>
                        {d.file_name && (
                          <div className="text-[10px] text-gray-400 font-mono">{d.file_name}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#083415]/10 text-[#083415] font-semibold text-[10px]">
                      {d.categorie}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-gray-600">{d.annee}</td>
                  <td className="p-4 text-gray-500 font-mono">{d.taille}</td>
                  <td className="p-4 font-bold text-[#ba6d14]">{d.telechargements || 0}</td>
                  <td className="p-4 text-right space-x-2">
                    {d.url && d.url !== '#' && (
                      <a
                        href={d.url}
                        download={d.file_name || `${d.titre}.pdf`}
                        className="text-xs text-[#083415] hover:underline font-bold mr-2"
                        title="Télécharger pour tester"
                      >
                        📥 Télécharger
                      </a>
                    )}
                    <button
                      onClick={() => openEditModal(d)}
                      className="text-xs text-gray-600 hover:text-[#083415] font-bold"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="text-xs text-red-600 hover:text-red-800 font-bold"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ajout / Modification Document */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-[#083415]">
                {editingItem ? 'Modifier le document' : 'Importer un nouveau document'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* File Upload Zone */}
              <div>
                <label className="block font-bold text-[#083415] mb-1">
                  Fichier à importer (Tous formats : PDF, Word, Excel, PowerPoint, ZIP, Images, etc.)
                </label>
                <div className="border-2 border-dashed border-gray-300 hover:border-[#083415] rounded-2xl p-4 text-center cursor-pointer bg-[#fbf9f4] transition-colors relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="space-y-1">
                    <span className="text-3xl">{getDocIcon(fileName, fileType)}</span>
                    <p className="font-bold text-gray-800">
                      {fileName || (editingItem?.file_name ? editingItem.file_name : 'Cliquez ou glissez n\'importe quel fichier')}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      PDF, DOCX, XLSX, PPTX, ZIP, etc. • Taille détectée : {taille}
                    </p>
                  </div>
                </div>
                {isUploading && (
                  <p className="text-[11px] text-[#ba6d14] font-bold mt-1 animate-pulse">
                    Chargement et encodage du document en cours...
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Titre officiel du document</label>
                <input
                  type="text"
                  required
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Ex: Rapport d'Activité Annuel 2026..."
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#083415] mb-1">Catégorie</label>
                <select
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                >
                  <option value="Rapports Annuels">Rapports Annuels</option>
                  <option value="Gouvernance">Gouvernance</option>
                  <option value="Statuts Officiels">Statuts Officiels</option>
                  <option value="Études & Recherches">Études & Recherches</option>
                  <option value="Plans d'Action">Plans d'Action</option>
                  <option value="Plaidoyer">Plaidoyer</option>
                  <option value="Fiches Techniques">Fiches Techniques</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Année</label>
                  <input
                    type="text"
                    required
                    value={annee}
                    onChange={(e) => setAnnee(e.target.value)}
                    placeholder="2026"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#083415] mb-1">Taille du fichier</label>
                  <input
                    type="text"
                    required
                    value={taille}
                    onChange={(e) => setTaille(e.target.value)}
                    placeholder="Ex: 2.5 Mo"
                    className="w-full h-11 px-4 rounded-full bg-[#f5f3ee] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#083415]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 h-11 rounded-full bg-[#083415] hover:bg-[#001d07] text-[#feb323] font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>💾</span>
                  <span>{editingItem ? 'Enregistrer et Déployer' : 'Publier et Déployer'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 h-11 rounded-full bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
