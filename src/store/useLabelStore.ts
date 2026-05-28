import { create } from 'zustand';
import { db, type LabelProject } from '../db'; // Ajuste le chemin vers ton fichier db si nécessaire

export interface LabelState {
  // Onglet actif de l'interface
  activeTab: 'edit' | 'history' | 'print';
  setActiveTab: (tab: 'edit' | 'history' | 'print') => void;

  // Données de l'étiquette
  name: string;
  subtitle: string;
  style: string;
  brewery: string;
  abv: string;
  ibu: string;
  ebc: string;
  volume: string;
  description: string;
  logoText: string;
  template: string;   
  templateId: string; 
  bgType: string;

  // Styles visuels & Couleurs
  primaryColor: string;
  textColor: string;
  backgroundColor: string;

  // Historique des projets
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

  // Valeurs par défaut initiales
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

  // Liste locale des projets pour l'historique
  savedProjects: [],

  // ACTION : Charger l'historique depuis Dexie
  loadHistory: async () => {
    try {
      const projects = await db.projects.toArray();
      set({ savedProjects: projects });
    } catch (error) {
      console.error("Impossible de charger l'historique :", error);
    }
  },

  // ACTION : Supprimer un projet de l'historique (Sécurisée et synchronisée)
  deleteFromHistory: async (id: number) => {
    if (id === undefined || id === null) {
      console.warn("L'ID du projet est manquant.");
      return;
    }
    try {
      await db.projects.delete(id);
      // Rafraîchir instantanément la liste du store après suppression
      const projects = await db.projects.toArray();
      set({ savedProjects: projects });
    } catch (error) {
      console.error("Erreur lors de la suppression dans le Store :", error);
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

  // ACTION : Enregistrement dans Dexie DB
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
      await state.loadHistory(); // Met à jour l'UI instantanément
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans Dexie :', error);
    }
  },

  // ACTION : Charger un projet dans l'éditeur
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
    activeTab: 'edit' 
  })
}));