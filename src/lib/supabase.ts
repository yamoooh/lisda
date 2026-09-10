import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://neqnbrhmacperiinpstp.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lcW5icmhtYWNwZXJpaW5wc3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjMzOTgsImV4cCI6MjEwNDQzOTM5OH0.V1ZasmSAJOpMyofZsuK9pYY_kdzUlOrvct_NYKEjP0Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Membre {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motivation: string;
  newsletter: boolean;
  date_inscription?: string;
}

export interface Donateur {
  id?: string;
  nom: string;
  prenom: string;
  montant: number;
  type_don: string;
  anonyme: boolean;
  accord_affichage: boolean;
  date_don?: string;
}

export interface DocumentOfficiel {
  id: string;
  titre: string;
  categorie: string;
  annee: string;
  url: string;
}

export interface PhotoPhototheque {
  id: string;
  titre: string;
  categorie: string;
  url: string;
  date: string;
}
