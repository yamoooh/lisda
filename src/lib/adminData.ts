import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
  nom: string;
  role: 'Super-Administrateur' | 'Administrateur' | 'Éditeur';
  actif: boolean;
  photo?: string;
  password?: string;
  reset_code?: string;
  reset_code_expires?: string;
  date_creation: string;
}

export interface ActualiteItem {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  date: string;
  image: string;
  video_url?: string;
  type_media?: 'image' | 'video';
  statut: 'publie' | 'brouillon';
}

export interface PhotothequeItem {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  url: string;
  type: 'image' | 'video';
  date: string;
  taille?: string;
}

export interface DocumentItem {
  id: string;
  titre: string;
  categorie: string;
  annee: string;
  url: string;
  taille: string;
  file_name?: string;
  file_type?: string;
  file_data?: string;
  telechargements: number;
}

export interface EquipeItem {
  id: string;
  nom: string;
  role: string;
  roleShort?: string;
  bio: string;
  photo?: string;
  initials?: string;
  badge?: string;
  email?: string;
  telephone?: string;
  ordre: number;
}

export interface MembreInscritItem {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motivation: string;
  newsletter: boolean;
  date_inscription: string;
  statut: 'actif' | 'en_attente' | 'valide';
}

export interface DonateurItem {
  id: string;
  nom: string;
  prenom: string;
  montant: number;
  type_don: string;
  anonyme: boolean;
  accord_affichage: boolean;
  date_don: string;
  statut: 'valide' | 'masque' | 'en_attente';
  reference?: string;
}

export interface MessageContactItem {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  date: string;
  lu: boolean;
}

export interface NewsletterItem {
  id: string;
  email: string;
  date_inscription: string;
  actif: boolean;
}

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'admin-root',
    email: 'patrice_segbe@yahoo.fr',
    nom: 'NSEGBE Patrice',
    role: 'Super-Administrateur',
    photo: 'https://lh3.googleusercontent.com/aida/AEtjO1XxknWRwNUC7LKKM_x4Wlpb1WIbQSeRfkAVfY6MQbNkZA_ksAifuaVjLQPadw3xnlbp6pyVRi4N4v598C95z2w4MaAW5t0Kuop14PYz2zPUk2PaXjMSeBiL9z-1FF_wmV28-6ZoAK5VNiLtYyWnXijVFOC_Q0LB6OMm6YvWxJkndZMWUNCmTF1sRtnLjjroyjGUCw5n9oAIS4gollvJjK516KrpZWWJDlyHklMmBOdRVu_e4oAaMSQbC_HH',
    actif: true,
    password: 'AdminLISDA2026!',
    date_creation: '2026-03-01T00:00:00.000Z'
  }
];

export const initialDonationAmounts: number[] = [5000, 10000, 25000, 50000];

export const initialActualites: ActualiteItem[] = [
  {
    id: 'act-1',
    titre: "Atelier de formation en agroforesterie à Dombe",
    date: "Mars 2026 • Kribi",
    categorie: "Agroécologie",
    description: "Plus de 40 agriculteurs de la commune de Kribi ont appris les techniques de semis d'arbres fertilisants pour régénérer les sols dégradés sans intrants chimiques.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzYllvG22lMKHQvWROKgpUCyTF8Iy_aH63VOzXTHrPBbO7Gb6lK6RtKKzr3ZJjK8UJ7nDQq_6Eo7rbPwd1gASzVfEhd0PXtOMMgMaY7KS-Wt5F55LHkcDu1qiPNgxuj7wOtEQZPIu9Mklkn5QsCzJjIzz8TKUWM2vPWE8EN5U8GzFx2pEUtUOLlboV0RRQj7h8EC0IyVtkb3AjSNbVBd1kDS-2FC1t4qL_eTxI4j3oh7uvCJSA2i16IA",
    type_media: 'image',
    statut: 'publie'
  },
  {
    id: 'act-2',
    titre: "Appui scolaire pour les enfants autochtones Bagyeli",
    date: "Février 2026 • Bipindi",
    categorie: "Éducation & Droits",
    description: "Remise solennelle de 150 trousseaux scolaires et couverture des frais d'inscription pour encourager la scolarisation des jeunes filles et garçons autochtones.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYqfiULPt37uT6NIzHYrsjAfV31CNvfWCNiT0vx1bWEddu-w9Ijaa422NlguLPAhbgkgpEzf_ktaJT9LpYFYrmdeAvFJbKPrrk2jf26uygSwUVx0JUOVKe6qJfxGHiU2LogU0soUFQp52wZA-uUZDePR0OHLkNxQihBbL5iaDtxyfeOdponG9bJ9bRXY9Bh4pOa1BjoIA-zr_fyPynns5Z8petjVo7ynXYVmxnjozkhzzcvduqhO_pDg",
    type_media: 'image',
    statut: 'publie'
  },
  {
    id: 'act-3',
    titre: "Comité local de veille climatique et des cours d'eau",
    date: "Janvier 2026 • Bassin de la Kienké",
    categorie: "Environnement",
    description: "Création d'un réseau de sentinelles citoyennes chargées de signaler les pollutions industrielles et les risques d'inondation soudaine pour les pêcheurs locaux.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABLsyXf98GZN8z2lmhkc9hU_WpnLYLcoGGY5RV4aDn0h5Z5_ViScAKogr1bQnT7AJBbWdyMZx_X1tf_Oy7FzbQM9NZWCzdz6Ue4RmJ0TAQRPWlDaAwGFkxuVEFGL68Ka0_TzIm3D_np4efhEosmZweinGbH870o5QcVp-Go19YjuaudlfWHNH0bUISc6HYMSWy_53o1GxRBJCPwu2mfce3EQg3aC3GsrCXPb-bDRxIq1QtFmlIhC3wVA",
    type_media: 'image',
    statut: 'publie'
  }
];

export const initialPhototheque: PhotothequeItem[] = [
  {
    id: 'photo-1',
    titre: "Rassemblement communautaire à Dombe",
    categorie: "Vie Associative",
    date: "Mars 2026",
    description: "Assemblée générale des membres et sympathisants de LISDA à Kribi pour définir les priorités agroforestières de l'année.",
    url: "/images/rassemblement-dombe.webp",
    type: 'image',
    taille: '1.2 Mo'
  },
  {
    id: 'photo-2',
    titre: "Formation agroforestière des femmes rurales",
    categorie: "Autonomisation",
    date: "Février 2026",
    description: "Session pratique sur la multiplication des semences vivrières et l'arboriculture fruitière durable.",
    url: "/images/formation-femmes.webp",
    type: 'image',
    taille: '980 Ko'
  },
  {
    id: 'photo-3',
    titre: "Restauration de la ceinture côtière de Kribi",
    categorie: "Environnement",
    date: "Janvier 2026",
    description: "Plantation citoyenne de palétuviers pour freiner l'érosion marine et restaurer l'habitat des poissons côtiers.",
    url: "/images/restauration-mangroves.webp",
    type: 'image',
    taille: '1.5 Mo'
  },
  {
    id: 'photo-4',
    titre: "Concertation sous l'arbre à palabres avec les peuples Bagyeli",
    categorie: "Plaidoyer & Droits",
    date: "Décembre 2025",
    description: "Dialogue communautaire sur la sécurisation foncière coutumière et la protection de la forêt équatoriale.",
    url: "/images/arbre-palabres.webp",
    type: 'image',
    taille: '1.8 Mo'
  },
  {
    id: 'photo-5',
    titre: "Séance de travail du Bureau Exécutif LISDA",
    categorie: "Gouvernance",
    date: "Février 2026",
    description: "Coordination stratégique des projets et validation des rapports d'étape trimestriels au siège à Dombe.",
    url: "/images/bureau-executif.webp",
    type: 'image',
    taille: '1.1 Mo'
  },
  {
    id: 'photo-6',
    titre: "Inspection des mangroves littorales",
    categorie: "Climat & Littoral",
    date: "Janvier 2026",
    description: "Mission de suivi écologique le long de l'embouchure du fleuve Kienké et surveillance de la biodiversité.",
    url: "/images/inspection-mangroves.webp",
    type: 'image',
    taille: '1.4 Mo'
  },
  {
    id: 'photo-7',
    titre: "Distribution d'actes d'état-civil aux familles Bagyeli",
    categorie: "Droits Autochtones",
    date: "Novembre 2025",
    description: "Remise officielle de jugements supplétifs et d'actes de naissance pour garantir la citoyenneté des enfants autochtones.",
    url: "/images/distribution-etat-civil.webp",
    type: 'image',
    taille: '1.3 Mo'
  },
  {
    id: 'photo-8',
    titre: "Pépinière d'arbres autochtones du Sud Cameroun",
    categorie: "Agroécologie",
    date: "Octobre 2025",
    description: "Production de milliers de jeunes plants d'essences forestières nobles pour les programmes de reboisement participatif.",
    url: "/images/pepiniere-arbres.webp",
    type: 'image',
    taille: '1.6 Mo'
  }
];

export const initialDocuments: DocumentItem[] = [
  {
    id: 'doc-1',
    titre: "Rapport d'Activité Annuel 2025-2026",
    categorie: "Rapports Annuels",
    annee: "2026",
    url: "#",
    taille: "3.4 Mo",
    file_name: "Rapport_Activite_LISDA_2025-2026.pdf",
    file_type: "application/pdf",
    telechargements: 142
  },
  {
    id: 'doc-2',
    titre: "Plan d'Action Stratégique 2026-2030",
    categorie: "Gouvernance",
    annee: "2026",
    url: "#",
    taille: "2.1 Mo",
    file_name: "Plan_Action_Strategique_LISDA_2026-2030.pdf",
    file_type: "application/pdf",
    telechargements: 89
  },
  {
    id: 'doc-3',
    titre: "Statuts et Règlement Intérieur LISDA ONG",
    categorie: "Statuts Officiels",
    annee: "2025",
    url: "#",
    taille: "1.8 Mo",
    file_name: "Statuts_Reglement_Interieur_LISDA.pdf",
    file_type: "application/pdf",
    telechargements: 310
  },
  {
    id: 'doc-4',
    titre: "Étude d'Impact : Préservation des Peuples Autochtones Bagyeli",
    categorie: "Études & Recherches",
    annee: "2025",
    url: "#",
    taille: "5.2 Mo",
    file_name: "Etude_Impact_Peuples_Bagyeli.pdf",
    file_type: "application/pdf",
    telechargements: 76
  }
];

export const initialEquipe: EquipeItem[] = [
  {
    id: 'eq-1',
    nom: "NSEGBE Patrice",
    role: "Président Coordonnateur & Fondateur",
    roleShort: "Coordination Générale",
    bio: "Supervise la gouvernance stratégique, les partenariats institutionnels et le plaidoyer pour les droits coutumiers et la préservation de la forêt littorale.",
    photo: "https://lh3.googleusercontent.com/aida/AEtjO1XxknWRwNUC7LKKM_x4Wlpb1WIbQSeRfkAVfY6MQbNkZA_ksAifuaVjLQPadw3xnlbp6pyVRi4N4v598C95z2w4MaAW5t0Kuop14PYz2zPUk2PaXjMSeBiL9z-1FF_wmV28-6ZoAK5VNiLtYyWnXijVFOC_Q0LB6OMm6YvWxJkndZMWUNCmTF1sRtnLjjroyjGUCw5n9oAIS4gollvJjK516KrpZWWJDlyHklMmBOdRVu_e4oAaMSQbC_HH",
    badge: "Coordination & Stratégie",
    email: "Patrice_segbe@yahoo.fr",
    telephone: "+237 677 593 239",
    ordre: 1
  },
  {
    id: 'eq-2',
    nom: "INIKWA épse NSEGBE Victoire",
    role: "Secrétaire Générale",
    roleShort: "Bureau Exécutif",
    bio: "Supervise l'administration centrale, la tenue des registres légaux et mène activement les programmes d'autonomisation des femmes rurales de l'Océan.",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYrikBM-zkZvEBV-roTc6Wc2qjciqs4mB4KQOZiXQjZU3QBhCTsc9aC8Sz8-U_QvEB8UBSp90V0C1gWgDjmd3yGr73nrYiRf-1V9A7-ImQ5LNcan-EnXFc7h6dzvp3Hnej5g4-iPRwNcmBYmdl8Nv4HjouPngrAqp7pXbU3vB9QbDZjlkiZWwWLjUM-4n9LWpGhoQKkKwDm0IsXxuMeS0uN355imbNuRcYXcdeKdV9s-c3lpqAJ9EHag",
    badge: "Coordination & Genre",
    email: "secretariat@lisda-ong.org",
    ordre: 2
  },
  {
    id: 'eq-3',
    nom: "AMBANI OKOUNOU Guy Dénis",
    role: "Secrétaire Général Adjoint chargé des projets",
    roleShort: "Gestion de Projets",
    bio: "Dirige l'ingénierie et le déploiement des opérations agroforestières sur le terrain et coordonne la cartographie participative avec les chefferies.",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0UT0cWfbmyhDL-Tw-TSlI4DyxMWdPqcdSix7e0klhOPqLOLO4qwU2p2fXAy_h-20pRrjuu6aI2ghuPmzMR8dxHqFi7gIrWw5mPdQPAXdxXEuaMKct6Rq2qIc-L5u4dmlvzgNZcZ-UoCgINnT09grbcoeLiq9FRBJB46FKJl_KOY1-17D8trWDngNtvSCLDLy94wPPCaaw20wzT-t5vwU-ymq9ukU92Cz9M5naRT6el9jWF71pMS21_Q",
    badge: "Opérations & Agroécologie",
    ordre: 3
  },
  {
    id: 'eq-4',
    nom: "ELIMBI Jean Gustave",
    role: "Trésorier Comptable",
    roleShort: "Finance & Audit",
    bio: "Garantit la traçabilité financière intégrale des dotations, la tenue des états financiers certifiés et la conformité administrative fiscale.",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuArVKRPzmRVw6VKAB-zf82CvVaLkGO6VKl2X_82JA7hy0vJcGYHSE5_tWYiE5-wdvOcrVmIP3KkKUMt949pNl-8kVS-kipGTmO6FSV1-T5yWZmALnezwQ1ffNnQFZY3xmOkRDFXDQ0En4_Xp1jq98pIOJz3yuXqN25_6vjrE1mYx4bHTO67BPfocMMlyKdb9Eqf9s-KZ0IAkmZwCbnw8cTPmCeA9m4PsL9-5QvQAt_TXHuFsu8thZdBXg",
    badge: "Traçabilité & Conformité",
    ordre: 4
  },
  {
    id: 'eq-5',
    nom: "MPOUED Idrice",
    role: "Commissaire aux Comptes",
    roleShort: "Contrôle & Transparence",
    bio: "Assure l'audit interne permanent et indépendant des opérations comptables et certifie l'utilisation transparente des fonds de l'association.",
    initials: "MI",
    badge: "Audit Externe & Quitus",
    ordre: 5
  },
  {
    id: 'eq-6',
    nom: "NNA BIWOLE MINDJOM Pierre Magloire",
    role: "Resp. Communication et Relations Publiques",
    roleShort: "Plaidoyer & Médias",
    bio: "Porte la parole publique de LISDA auprès des médias nationaux et internationaux et anime les campagnes de sensibilisation environnementale.",
    initials: "NM",
    badge: "Influence & Médias",
    ordre: 6
  },
  {
    id: 'eq-7',
    nom: "NOUCK NSEGBE Thomas",
    role: "Censeur de l'Association",
    roleShort: "Éthique & Statuts",
    bio: "Garant du strict respect des textes statutaires, du règlement intérieur, et médiateur déontologique pour les actions de bienfaisance.",
    initials: "NT",
    badge: "Médiation & Discipline",
    ordre: 7
  }
];

export const initialMembres: MembreInscritItem[] = [
  {
    id: 'mem-1',
    nom: "Minko",
    prenom: "Samuel",
    email: "s.minko@gmail.com",
    telephone: "+237 699 12 34 56",
    motivation: "Je souhaite participer aux actions de reboisement des mangroves à Kribi.",
    newsletter: true,
    date_inscription: "2026-03-08",
    statut: 'valide'
  },
  {
    id: 'mem-2',
    nom: "Ngo",
    prenom: "Therese",
    email: "t.ngo@yahoo.fr",
    telephone: "+237 675 88 99 00",
    motivation: "Sensibilisation et soutien éducatif aux communautés Bagyeli.",
    newsletter: true,
    date_inscription: "2026-03-05",
    statut: 'valide'
  },
  {
    id: 'mem-3',
    nom: "Belibi",
    prenom: "Arthur",
    email: "arthur.belibi@outlook.com",
    telephone: "+237 651 44 22 11",
    motivation: "Mise à disposition de compétences juridiques et plaidoyer.",
    newsletter: false,
    date_inscription: "2026-02-28",
    statut: 'en_attente'
  }
];

export const initialDonateurs: DonateurItem[] = [
  {
    id: 'don-1',
    nom: "Fondation Cameroun Vert",
    prenom: "",
    montant: 250000,
    type_don: "Virement bancaire",
    anonyme: false,
    accord_affichage: true,
    date_don: "2026-03-07",
    statut: 'valide',
    reference: "LEEK-89423"
  },
  {
    id: 'don-2',
    nom: "Mballa",
    prenom: "Christian",
    montant: 50000,
    type_don: "Mobile Money (LeekPay)",
    anonyme: false,
    accord_affichage: true,
    date_don: "2026-03-04",
    statut: 'valide',
    reference: "LEEK-89210"
  },
  {
    id: 'don-3',
    nom: "Anonyme",
    prenom: "",
    montant: 100000,
    type_don: "Carte Bancaire",
    anonyme: true,
    accord_affichage: false,
    date_don: "2026-02-27",
    statut: 'masque',
    reference: "LEEK-88902"
  }
];

export const initialMessages: MessageContactItem[] = [
  {
    id: 'msg-1',
    nom: "Dr. Henri Dupont",
    email: "h.dupont@cirad.fr",
    sujet: "Proposition de partenariat de recherche agroforestière",
    message: "Bonjour M. le Coordonnateur, nous avons pris connaissance de vos projets de restauration de mangrove à Kribi et souhaiterions explorer un partenariat scientifique.",
    date: "2026-03-09 14:22",
    lu: false
  },
  {
    id: 'msg-2',
    nom: "Jeanne Essomba",
    email: "j.essomba@gmail.com",
    sujet: "Demande de stage bénévole en communication",
    message: "Bonjour l'équipe LISDA, étudiante en communication à Douala, je souhaite effectuer un stage bénévole de 2 mois pour documenter vos actions de terrain.",
    date: "2026-03-06 09:15",
    lu: true
  }
];

export const initialNewsletters: NewsletterItem[] = [
  { id: 'nl-1', email: 's.minko@gmail.com', date_inscription: '2026-03-08', actif: true },
  { id: 'nl-2', email: 't.ngo@yahoo.fr', date_inscription: '2026-03-05', actif: true },
  { id: 'nl-3', email: 'info@ong-partenaire.org', date_inscription: '2026-02-20', actif: true },
  { id: 'nl-4', email: 'contact@bassin-congo.org', date_inscription: '2026-02-15', actif: true }
];

// Fallback mapping for legacy or broken URLs in user's localStorage
const legacyPhotothequeFixes: Record<string, string> = {
  '/images/phototheque-1.webp': '/images/rassemblement-dombe.webp',
  '/images/phototheque-2.webp': '/images/formation-femmes.webp',
  '/images/phototheque-3.webp': '/images/restauration-mangroves.webp',
  '/images/phototheque-4.webp': '/images/arbre-palabres.webp',
  '/images/phototheque-5.webp': '/images/bureau-executif.webp',
  '/images/phototheque-6.webp': '/images/inspection-mangroves.webp',
  '/images/phototheque-7.webp': '/images/distribution-etat-civil.webp',
  '/images/phototheque-8.webp': '/images/pepiniere-arbres.webp',
};

export function getStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    const parsed = JSON.parse(item);

    // Auto-migrate legacy broken phototheque URLs
    if (key === 'lisda_phototheque' && Array.isArray(parsed)) {
      let changed = false;
      const fixed = parsed.map((p: any) => {
        if (p.url && legacyPhotothequeFixes[p.url]) {
          changed = true;
          return { ...p, url: legacyPhotothequeFixes[p.url] };
        }
        return p;
      });
      if (changed) {
        localStorage.setItem(key, JSON.stringify(fixed));
        return fixed as unknown as T;
      }
    }

    // Auto-migrate equipe if only 4 members were stored
    if (key === 'lisda_equipe' && Array.isArray(parsed) && parsed.length < 7) {
      localStorage.setItem(key, JSON.stringify(initialEquipe));
      return initialEquipe as unknown as T;
    }

    return parsed;
  } catch {
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('lisda_data_changed'));
  } catch (err) {
    console.error('Error saving storage key ' + key + ':', err);
  }
}

// Supabase sync helpers
export async function fetchSupabaseAdminUsers(): Promise<AdminUser[]> {
  try {
    const { data, error } = await supabase.from('admin_users').select('*').order('created_at', { ascending: true });
    if (error || !data || data.length === 0) {
      return getStoredData<AdminUser[]>('lisda_admin_users', initialAdminUsers);
    }
    return data as AdminUser[];
  } catch {
    return getStoredData<AdminUser[]>('lisda_admin_users', initialAdminUsers);
  }
}

export async function syncSupabaseAdminUser(admin: AdminUser): Promise<void> {
  try {
    await supabase.from('admin_users').upsert({
      id: admin.id,
      email: admin.email.toLowerCase().trim(),
      nom: admin.nom,
      password: admin.password || 'AdminLISDA2026!',
      role: admin.role,
      actif: admin.actif,
      photo: admin.photo || null,
      updated_at: new Date().toISOString()
    });
  } catch (e) {
    console.warn('Sync admin to Supabase error:', e);
  }
}

export async function fetchSupabasePhototheque(): Promise<PhotothequeItem[]> {
  try {
    const { data, error } = await supabase.from('phototheque').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) {
      return getStoredData<PhotothequeItem[]>('lisda_phototheque', initialPhototheque);
    }
    return data as PhotothequeItem[];
  } catch {
    return getStoredData<PhotothequeItem[]>('lisda_phototheque', initialPhototheque);
  }
}

export async function syncSupabasePhototheque(items: PhotothequeItem[]): Promise<void> {
  try {
    for (const item of items) {
      await supabase.from('phototheque').upsert({
        id: item.id,
        titre: item.titre,
        description: item.description,
        categorie: item.categorie,
        url: item.url,
        type: item.type,
        date: item.date,
        taille: item.taille
      });
    }
  } catch (e) {
    console.warn('Sync phototheque to Supabase error:', e);
  }
}

export async function fetchSupabaseDocuments(): Promise<DocumentItem[]> {
  try {
    const { data, error } = await supabase.from('documents').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) {
      return getStoredData<DocumentItem[]>('lisda_documents', initialDocuments);
    }
    return data as DocumentItem[];
  } catch {
    return getStoredData<DocumentItem[]>('lisda_documents', initialDocuments);
  }
}

export async function syncSupabaseDocuments(items: DocumentItem[]): Promise<void> {
  try {
    for (const doc of items) {
      await supabase.from('documents').upsert({
        id: doc.id,
        titre: doc.titre,
        categorie: doc.categorie,
        annee: doc.annee,
        url: doc.url,
        taille: doc.taille,
        file_name: doc.file_name,
        file_type: doc.file_type,
        telechargements: doc.telechargements || 0
      });
    }
  } catch (e) {
    console.warn('Sync documents to Supabase error:', e);
  }
}

export async function fetchSupabaseDonateurs(): Promise<DonateurItem[]> {
  try {
    const { data, error } = await supabase.from('donateurs').select('*').order('date_don', { ascending: false });
    if (error || !data || data.length === 0) {
      return getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs);
    }
    return data.map((d: any) => ({
      id: d.id || 'don-' + Math.random(),
      nom: d.nom || 'Anonyme',
      prenom: d.prenom || '',
      montant: Number(d.montant) || 0,
      type_don: d.type_don || 'Paiement en ligne',
      anonyme: d.anonyme ?? false,
      accord_affichage: d.accord_affichage ?? true,
      date_don: d.date_don ? new Date(d.date_don).toLocaleDateString('fr-FR') : 'Mars 2026',
      statut: d.statut || 'valide',
      reference: d.reference
    }));
  } catch {
    return getStoredData<DonateurItem[]>('lisda_dons', initialDonateurs);
  }
}

export async function syncSupabaseDonateur(don: DonateurItem): Promise<void> {
  try {
    await supabase.from('donateurs').upsert({
      id: don.id,
      nom: don.nom,
      prenom: don.prenom,
      montant: don.montant,
      type_don: don.type_don,
      anonyme: don.anonyme,
      accord_affichage: don.accord_affichage,
      statut: don.statut,
      reference: don.reference
    });
  } catch (e) {
    console.warn('Sync donateur to Supabase error:', e);
  }
}
