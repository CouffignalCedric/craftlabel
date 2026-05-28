import { create } from 'zustand';
import { db, type LabelProject } from '../db'; // Ajuste le chemin si nécessaire

export interface LabelState {
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

  // Historique
  savedProjects: LabelProject[];
  loadHistory: () => Promise<void>;
  deleteFromHistory: (id: number) => Promise<void>;

  updateLabel: (fields: Partial<Omit<LabelState, 'activeTab' | 'setActiveTab' | 'updateLabel' | 'resetLabel' | 'saveToHistory' | 'loadHistory' | 'deleteFromHistory' | 'savedProjects'>>) => void;
  resetLabel: () => void;
  saveToHistory: () => Promise<void>;
  loadProject: (project: LabelProject) => void;
}

export const useLabelStore = create<LabelState>((set, get) => ({
  activeTab: 'edit',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Valeurs par défaut
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

  savedProjects: [],

  loadHistory: async () => {
    try {
      const projects = await db.projects.toArray();
      set({ savedProjects: projects });
    } catch (error) {
      console.error("Impossible de charger l'historique :", error);
    }
  },

  deleteFromHistory: async (id: number) => {
    if (id === undefined || id === null) return;
    try {
      await db.projects.delete(id);
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

  // CORRECTION ICI : Enregistrement rigoureux de tous les champs
  saveToHistory: async () => {
    const state = get();
    
    const newProject: LabelProject = {
      name: state.name,
      subtitle: state.subtitle,
      style: state.style,
      brewery: state.brewery,       // Ajouté (manquait à l'appel)
      abv: state.abv,
      ibu: state.ibu,
      ebc: state.ebc,
      volume: state.volume,
      description: state.description,
      logoText: state.logoText,
      templateId: state.template,   // FIX : On prend directement le template sélectionné à l'écran
      bgType: state.bgType,         // Ajouté (manquait à l'appel)
      primaryColor: state.primaryColor,
      textColor: state.textColor,
      backgroundColor: state.backgroundColor,
      updatedAt: Date.now(),
    };

    try {
      await db.projects.add(newProject);
      await state.loadHistory(); 
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans Dexie :', error);
    }
  },

  // CORRECTION ICI : Restauration complète du projet cliqué
  loadProject: (project) => set({
    name: project.name,
    subtitle: project.subtitle,
    style: project.style,
    brewery: project.brewery || '',
    abv: project.abv,
    ibu: project.ibu,
    ebc: project.ebc || '',
    volume: project.volume,
    description: project.description || '',
    logoText: project.logoText || '',
    template: project.templateId,   // Synchronise le template visuel
    templateId: project.templateId, // Synchronise l'ID interne
    bgType: project.bgType || 'dark-matte',
    primaryColor: project.primaryColor || '#D97706',
    textColor: project.textColor || '#F5F5F0',
    backgroundColor: project.backgroundColor || '#0B0B0B',
    activeTab: 'edit' 
  })
}));