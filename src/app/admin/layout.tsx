'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { AdminUser, getStoredData, setStoredData } from '@/lib/adminData';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load admins and current session
  useEffect(() => {
    const loadedAdmins = getStoredData<AdminUser[]>('lisda_admin_users', []);
    const activeAdmin = getStoredData<AdminUser | null>('lisda_active_admin', null);
    setAdmins(loadedAdmins);
    setCurrentAdmin(activeAdmin);
    setIsLoaded(true);

    const handleDataChange = () => {
      setAdmins(getStoredData<AdminUser[]>('lisda_admin_users', []));
      setCurrentAdmin(getStoredData<AdminUser | null>('lisda_active_admin', null));
    };

    window.addEventListener('lisda_data_changed', handleDataChange);
    return () => window.removeEventListener('lisda_data_changed', handleDataChange);
  }, []);

  const handleLogout = () => {
    setStoredData('lisda_active_admin', null);
    setCurrentAdmin(null);
    router.push('/admin');
  };

  const navCategories = [
    {
      name: "Vue Générale",
      items: [
        { name: "Tableau de bord", href: "/admin", icon: "📊" },
      ]
    },
    {
      name: "Publications & Contenu",
      items: [
        { name: "Actualités & Événements", href: "/admin/actualites", icon: "📰" },
        { name: "Photothèque & Médias", href: "/admin/phototheque", icon: "🖼️" },
        { name: "Documents Officiels", href: "/admin/documents", icon: "📄" },
        { name: "Équipe & Gouvernance", href: "/admin/equipe", icon: "👥" },
      ]
    },
    {
      name: "Communauté & Collecte",
      items: [
        { name: "Membres & Newsletter", href: "/admin/membres", icon: "📋" },
        { name: "Dons & Donateurs", href: "/admin/dons", icon: "💳" },
        { name: "Messages de Contact", href: "/admin/messages", icon: "✉️" },
      ]
    },
    {
      name: "Sécurité & Système",
      items: [
        { name: "Gestion Administrateurs", href: "/admin/utilisateurs", icon: "🛡️" },
      ]
    }
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#fbf9f4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#083415] border-t-[#feb323] rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-[#083415]">Chargement de la console LISDA...</span>
        </div>
      </div>
    );
  }

  // If not logged in and not at root /admin, redirect will happen inside children or render login
  if (!currentAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full bg-[#fbf9f4] overflow-hidden text-[#1b1c19]">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)} 
          className="fixed inset-0 z-40 bg-[#001d07]/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Fixed Sticky Left Sidebar */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#001d07] text-white flex flex-col justify-between border-r border-[#083415] shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 border-b border-[#083415] flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-11 h-11 flex-shrink-0 bg-white rounded-xl p-1 shadow-md">
                <Image src="/logo-officiel.png" alt="Logo LISDA" width={44} height={44} className="object-contain" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white">LISDA</span>
                  <span className="bg-[#feb323] text-[#6b4800] text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">Admin</span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">Console de Gestion</span>
              </div>
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Navigation Items with Categories */}
          <nav className="p-3.5 space-y-6 flex-1">
            {navCategories.map((category) => (
              <div key={category.name} className="space-y-1">
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#feb323]/80">
                  {category.name}
                </span>
                <div className="space-y-0.5 pt-1">
                  {category.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#feb323] text-[#083415] shadow-md font-bold'
                            : 'text-gray-300 hover:bg-[#083415] hover:text-white'
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* User Info & Actions Bottom */}
        <div className="p-4 border-t border-[#083415] bg-[#001405]/80 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#feb323] text-[#083415] font-black flex items-center justify-center text-xs shadow-inner">
              {currentAdmin.nom ? currentAdmin.nom.substring(0, 2).toUpperCase() : 'AD'}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-white truncate">{currentAdmin.nom}</span>
              <span className="text-[10px] text-[#feb323] truncate">{currentAdmin.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-colors"
            >
              <span>🌐</span>
              <span>Voir le site public</span>
            </Link>
            <button
              onClick={handleLogout}
              title="Se déconnecter"
              className="p-1.5 rounded-lg bg-red-900/40 hover:bg-red-900/70 text-red-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area (Scrolls independently) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-4 lg:px-8 flex items-center justify-between gap-4 flex-shrink-0 shadow-sm z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Ouvrir le menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-[#083415]">Console LISDA en direct</span>
              <span className="hidden sm:inline text-xs text-gray-400">• Kribi, Cameroun</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0eee9] hover:bg-gray-200 text-[#083415] text-xs font-semibold transition-colors"
            >
              <span>↗️</span>
              <span>Site en ligne</span>
            </Link>
            
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <span className="text-xs font-bold text-[#083415] hidden sm:block">{currentAdmin.nom}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-all"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto bg-[#fbf9f4] p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
