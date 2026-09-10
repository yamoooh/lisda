import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
  nom: string;
  role: 'Super-Administrateur' | 'Administrateur' | 'Éditeur';
  actif: boolean;
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
  telechargements: number;
}

export interface EquipeItem {
  id: string;
  nom: string;
  role: string;
  bio: string;
  photo: string;
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

export const initialActualites: ActualiteItem[] = [
  {
    id: 'act-1',
    titre: "Atelier de formation en agroforesterie à Dombe",
    date: "Mars 2026 • Kribi",
    categorie: "Agroécologie",
    description: "Plus de 40 agriculteurs de la commune de Kribi ont appris les techniques de semis d'arbres fertilisants pour régénérer les sols dégradés sans intrants chimiques.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzYllvG22lMKHQvWROKgpUCyTF8Iy_aH63VOzXTHrPBbO7Gb6lK6RtKKzr3ZJjK8UJ7nDQq_6Eo7rbPwd1gASzVfEhd0PXtOMMgMaY7KS-Wt5F55LHkcDu1qiPNgxuj7wOtEQZPIu9Mklkn5QsCzJjIzz8TKUWM2vPWE8EN5U8GzFx2pEUtUOLlboV0RRQj7h8EC0IyVtkb3AjSNbVBd1kDS-2FC1t4qL_eTxI4j3oh7uvCJSA2i16IA",
    statut: 'publie'
  },
  {
    id: 'act-2',
    titre: "Appui scolaire pour les enfants autochtones Bagyeli",
    date: "Février 2026 • Bipindi",
    categorie: "Éducation & Droits",
    description: "Remise solennelle de 150 trousseaux scolaires et couverture des frais d'inscription pour encourager la scolarisation des jeunes filles et garçons autochtones.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYqfiULPt37uT6NIzHYrsjAfV31CNvfWCNiT0vx1bWEddu-w9Ijaa422NlguLPAhbgkgpEzf_ktaJT9LpYFYrmdeAvFJbKPrrk2jf26uygSwUVx0JUOVKe6qJfxGHiU2LogU0soUFQp52wZA-uUZDePR0OHLkNxQihBbL5iaDtxyfeOdponG9bJ9bRXY9Bh4pOa1BjoIA-zr_fyPynns5Z8petjVo7ynXYVmxnjozkhzzcvduqhO_pDg",
    statut: 'publie'
  },
  {
    id: 'act-3',
    titre: "Comité local de veille climatique et des cours d'eau",
    date: "Janvier 2026 • Bassin de la Kienké",
    categorie: "Environnement",
    description: "Création d'un réseau de sentinelles citoyennes chargées de signaler les pollutions industrielles et les risques d'inondation soudaine pour les pêcheurs locaux.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABLsyXf98GZN8z2lmhkc9hU_WpnLYLcoGGY5RV4aDn0h5Z5_ViScAKogr1bQnT7AJBbWdyMZx_X1tf_Oy7FzbQM9NZWCzdz6Ue4RmJ0TAQRPWlDaAwGFkxuVEFGL68Ka0_TzIm3D_np4efhEosmZweinGbH870o5QcVp-Go19YjuaudlfWHNH0bUISc6HYMSWy_53o1GxRBJCPwu2mfce3EQg3aC3GsrCXPb-bDRxIq1QtFmlIhC3wVA",
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
    url: "/images/phototheque-1.webp",
    type: 'image',
    taille: '1.2 Mo'
  },
  {
    id: 'photo-2',
    titre: "Formation agroforestière des femmes rurales",
    categorie: "Autonomisation",
    date: "Février 2026",
    description: "Session pratique sur la multiplication des semences vivrières et l'arboriculture fruitière durable.",
    url: "/images/phototheque-2.webp",
    type: 'image',
    taille: '980 Ko'
  },
  {
    id: 'photo-3',
    titre: "Restauration de la ceinture côtière de Kribi",
    categorie: "Environnement",
    date: "Janvier 2026",
    description: "Plantation citoyenne de palétuviers pour freiner l'érosion marine et restaurer l'habitat des poissons côtiers.",
    url: "/images/phototheque-3.webp",
    type: 'image',
    taille: '1.5 Mo'
  },
  {
    id: 'photo-4',
    titre: "Concertation sous l'arbre à palabres avec les peuples Bagyeli",
    categorie: "Plaidoyer & Droits",
    date: "Décembre 2025",
    description: "Dialogue communautaire sur la sécurisation foncière coutumière et la protection de la forêt équatoriale.",
    url: "/images/phototheque-4.webp",
    type: 'image',
    taille: '1.8 Mo'
  },
  {
    id: 'photo-5',
    titre: "Séance de travail du Bureau Exécutif LISDA",
    categorie: "Gouvernance",
    date: "Février 2026",
    description: "Coordination stratégique des projets et validation des rapports d'étape trimestriels au siège à Dombe.",
    url: "/images/phototheque-5.webp",
    type: 'image',
    taille: '1.1 Mo'
  },
  {
    id: 'photo-6',
    titre: "Inspection des mangroves littorales",
    categorie: "Climat & Littoral",
    date: "Janvier 2026",
    description: "Mission de suivi écologique le long de l'embouchure du fleuve Kienké et surveillance de la biodiversité.",
    url: "/images/phototheque-6.webp",
    type: 'image',
    taille: '1.4 Mo'
  },
  {
    id: 'photo-7',
    titre: "Distribution d'actes d'état-civil aux familles Bagyeli",
    categorie: "Droits Autochtones",
    date: "Novembre 2025",
    description: "Remise officielle de jugements supplétifs et d'actes de naissance pour garantir la citoyenneté des enfants autochtones.",
    url: "/images/phototheque-7.webp",
    type: 'image',
    taille: '1.3 Mo'
  },
  {
    id: 'photo-8',
    titre: "Pépinière d'arbres autochtones du Sud Cameroun",
    categorie: "Agroécologie",
    date: "Octobre 2025",
    description: "Production de milliers de jeunes plants d'essences forestières nobles pour les programmes de reboisement participatif.",
    url: "/images/phototheque-8.webp",
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
    telechargements: 142
  },
  {
    id: 'doc-2',
    titre: "Plan d'Action Stratégique 2026-2030",
    categorie: "Gouvernance",
    annee: "2026",
    url: "#",
    taille: "2.1 Mo",
    telechargements: 89
  },
  {
    id: 'doc-3',
    titre: "Statuts et Règlement Intérieur LISDA ONG",
    categorie: "Statuts Officiels",
    annee: "2025",
    url: "#",
    taille: "1.8 Mo",
    telechargements: 310
  },
  {
    id: 'doc-4',
    titre: "Étude d'Impact : Préservation des Peuples Autochtones Bagyeli",
    categorie: "Études & Recherches",
    annee: "2025",
    url: "#",
    taille: "5.2 Mo",
    telechargements: 76
  }
];

export const initialEquipe: EquipeItem[] = [
  {
    id: 'eq-1',
    nom: "NSEGBE Patrice",
    role: "Président Coordonnateur Exécutif",
    bio: "Spécialiste du développement durable et de la gestion communautaire des forêts du Bassin du Congo depuis plus de 15 ans.",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9y3E63eL_g6FvD6K9NlYd6F5v4n7Xp_9r-M",
    email: "Patrice_segbe@yahoo.fr",
    telephone: "+237 677 593 239",
    ordre: 1
  },
  {
    id: 'eq-2',
    nom: "INIKWA Victoire",
    role: "Secrétaire Générale & Administration",
    bio: "Coordonne la gestion administrative, le suivi des partenariats institutionnels et l'encadrement des comités villageois.",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9y3E63eL_g6FvD6K9NlYd6F5v4n7Xp_9r-M",
    email: "secretariat@lisda-ong.org",
    ordre: 2
  },
  {
    id: 'eq-3',
    nom: "ELIMBI Jean Gustave",
    role: "Trésorier & Gestion Financière",
    bio: "Expert en audit et finance solidaire, garant de la transparence et de la traçabilité des subventions et dons.",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9y3E63eL_g6FvD6K9NlYd6F5v4n7Xp_9r-M",
    ordre: 3
  },
  {
    id: 'eq-4',
    nom: "AMBANI OKOUNOU Guy Denis",
    role: "Directeur des Projets de Terrain",
    bio: "Ingénieur agronome de terrain, supervise les reboisements côtiers, les pépinières et les missions en forêt profonde.",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9y3E63eL_g6FvD6K9NlYd6F5v4n7Xp_9r-M",
    ordre: 4
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

export function getStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
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
