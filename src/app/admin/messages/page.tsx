'use client';

import { useState, useEffect } from 'react';
import { MessageContactItem, initialMessages, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageContactItem[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<MessageContactItem | null>(null);

  useEffect(() => {
    setMessages(getStoredData<MessageContactItem[]>('lisda_messages', initialMessages));
    const handleChange = () => setMessages(getStoredData<MessageContactItem[]>('lisda_messages', initialMessages));
    window.addEventListener('lisda_data_changed', handleChange);
    return () => window.removeEventListener('lisda_data_changed', handleChange);
  }, []);

  const toggleLu = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, lu: !m.lu } : m);
    setStoredData('lisda_messages', updated);
    setMessages(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ba6d14] uppercase tracking-wider mb-1">
            <span>Formulaire de contact</span>
            <span>•</span>
            <span>Courrier</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#083415]">Messages de Contact</h1>
          <p className="text-xs text-gray-500 mt-1">
            Messages reçus des partenaires, bénévoles et citoyens via la page /contact.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-4 space-y-2 overflow-y-auto max-h-[600px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => {
                setSelectedMsg(msg);
                if (!msg.lu) toggleLu(msg.id);
              }}
              className={`p-4 rounded-2xl cursor-pointer border transition-all ${selectedMsg?.id === msg.id ? 'bg-[#083415] text-white border-[#083415]' : msg.lu ? 'bg-[#fbf9f4] border-gray-100 hover:border-gray-300' : 'bg-[#feb323]/10 border-[#feb323]/50'}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${selectedMsg?.id === msg.id ? 'text-white' : 'text-[#083415]'}`}>{msg.nom}</span>
                <span className={`text-[10px] ${selectedMsg?.id === msg.id ? 'text-gray-300' : 'text-gray-400'}`}>{msg.date}</span>
              </div>
              <p className={`text-xs font-semibold truncate mt-1 ${selectedMsg?.id === msg.id ? 'text-[#feb323]' : 'text-[#805600]'}`}>{msg.sujet}</p>
            </div>
          ))}
        </div>

        {/* Message Detail View */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
          {selectedMsg ? (
            <div className="space-y-6">
              <div className="pb-4 border-b border-gray-100 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-[#083415]">{selectedMsg.sujet}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span className="font-bold text-[#083415]">{selectedMsg.nom}</span>
                    <span>•</span>
                    <a href={`mailto:${selectedMsg.email}`} className="text-[#805600] font-semibold hover:underline">
                      {selectedMsg.email}
                    </a>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{selectedMsg.date}</span>
              </div>

              <div className="bg-[#fbf9f4] p-6 rounded-2xl border border-gray-100 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedMsg.message}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.sujet)}`}
                  className="px-6 py-2.5 rounded-full bg-[#083415] text-[#feb323] font-bold text-xs hover:bg-[#001d07] shadow-md transition-all flex items-center gap-2"
                >
                  <span>✉️</span>
                  <span>Répondre par Email</span>
                </a>
                <button
                  onClick={() => toggleLu(selectedMsg.id)}
                  className="px-4 py-2.5 rounded-full bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200"
                >
                  Marquer comme {selectedMsg.lu ? 'non lu' : 'lu'}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-2">
              <span className="text-4xl">✉️</span>
              <span className="text-xs">Sélectionnez un message pour en afficher les détails.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
