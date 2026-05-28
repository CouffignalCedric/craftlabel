import { create } from 'zustand';
import { db, type LabelProject } from '../db'; // Ajuste le chemin vers ton fichier db si nécessaire

export interface LabelState {
  // Onglet actif de l'interface
  activeTab: 'edit' | 'history' | 'print';
  setActiveTab: (tab: 'edit' | 'history' | 'print') => void;

  // Données de l'étiquette (parfaitement alignées avec Dexie DB)
  name: string;
  subtitle: string;
  style: string; // Style de la bière (ex: Imperial IPA)
  brewery: string;
  abv: string;
  ibu: string;
  ebc: string;
  volume: string;
  description: string;
  logoText: string;
  template: string;   // Pour la rétrocompatibilité
  templateId: string; // Aligné avec le champ de la BDD
  bgType: string;

  // Styles visuels & Couleurs (Pour faire fonctionner tes boutons Style)
  primaryColor: string;
  textColor: string;
  backgroundColor: string;

  // Historique des projets (Répare l'erreur TS sur Vercel & gère l'affichage)
  savedProjects: LabelProject[];
  loadHistory: () => Promise<void>;
  deleteFromHistory: (id: number) => Promise<void>;

  // Fonctions de mise à jour et actions
  updateLabel: (fields: Partial<Omit<LabelState, 'activeTab' | 'setActiveTab' | 'updateLabel' | 'resetLabel' | 'saveToHistory' | 'loadHistory' | 'deleteFromHistory' | 'savedProjects'>>) => void;
  resetLabel: () => void;
  saveToHistory: () => Promise<void>;
  loadProject: (project: LabelProject) => void;
}

export const useLabelStore = create<LabelState>((set, get) => ({
  activeTab: 'edit',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Valeurs par défaut initiales complètes
  name: 'Hop Horizon',
  subtitle: 'Double IPA Artisanale',
  style: 'Imperial IPA',
  brewery: 'Brasserie du Sommet',
  abv: '7.5',
  ibu: '65',
  ebc: '15',
  volume: '33 cl',
  description: 'Une bière artisanale explosive en saveurs et en amertume.',
  logoText: 'H',
  template: 'dark',
  templateId: 'dark',
  bgType: 'dark-matte',
  
  // Couleurs de style par défaut
  primaryColor: '#D97706',    // Cuivre / Ambre (craft-copper)
  textColor: '#F5F5F0',       // Crème (craft-cream)
  backgroundColor: '#0B0B0B', // Noir mat (craft-dark)

  // Liste locale des projets pour l'historique
  savedProjects: [],

  // ACTION : Charger l'historique depuis Dexie au démarrage du composant historique
  loadHistory: async () => {
    try {
      const projects = await db.projects.toArray();
      set({ savedProjects: projects });
    } catch (error) {
      console.error("Impossible de charger l'historique :", error);
    }
  },

  // ACTION : Supprimer un projet de l'historique
  deleteFromHistory: async (id) => {
    if (!id) return;
    try {
      await db.projects.delete(id);
      // Rafraîchir instantanément la liste du store
      const projects = await db.projects.toArray();
      set({ savedProjects: projects });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  },

  updateLabel: (fields) => set((state) => ({ ...state, ...fields })),

  resetLabel: () => set({
    name: 'Hop Horizon',
    subtitle: 'Double IPA Artisanale',
    style: 'Imperial IPA',
    brewery: 'Brasserie du Sommet',
    abv: '7.5',
    ibu: '65',
    ebc: '15',
    volume: '33 cl',
    description: 'Une bière artisanale explosive en saveurs et en amertume.',
    logoText: 'H',
    template: 'dark',
    templateId: 'dark',
    bgType: 'dark-matte',
    primaryColor: '#D97706',
    textColor: '#F5F5F0',
    backgroundColor: '#0B0B0B',
  }),

  // ACTION : ENREGISTREMENT RÉEL DANS LA BASE DE DONNÉES LOCALHOST (DEXIE)
  saveToHistory: async () => {
    const state = get();
    
    const newProject: LabelProject = {
      name: state.name,
      subtitle: state.subtitle,
      style: state.style,
      abv: state.abv,
      ibu: state.ibu,
      ebc: state.ebc,
      volume: state.volume,
      description: state.description,
      logoText: state.logoText,
      templateId: state.templateId || state.template,
      primaryColor: state.primaryColor,
      textColor: state.textColor,
      backgroundColor: state.backgroundColor,
      updatedAt: Date.now(),
    };

    try {
      await db.projects.add(newProject);
      console.log('Sauvegardé avec succès dans Dexie !');
      
      // Rafraîchir la liste de l'historique pour l'interface utilisateur
      await state.loadHistory();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans Dexie :', error);
    }
  },

  // ACTION : Charger un ancien projet depuis l'historique directement dans l'éditeur
  loadProject: (project) => set({
    name: project.name,
    subtitle: project.subtitle,
    style: project.style,
    abv: project.abv,
    ibu: project.ibu,
    ebc: project.ebc || '',
    volume: project.volume,
    description: project.description || '',
    logoText: project.logoText || '',
    template: project.templateId,
    templateId: project.templateId,
    primaryColor: project.primaryColor || '#D97706',
    textColor: project.textColor || '#F5F5F0',
    backgroundColor: project.backgroundColor || '#0B0B0B',
    activeTab: 'edit' // Redirige automatiquement vers l'éditeur
  })
}));