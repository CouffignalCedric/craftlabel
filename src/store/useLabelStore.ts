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
  backgroundId: string; // <-- AJOUTÉ : Pour piloter les 20 fonds clairs/flashy

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

  // Valeurs par défaut (Ajustées sur ton style favori !)
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
  template: 'comic',      // <-- FIX : 'comic' par défaut au lieu de 'dark'
  templateId: 'comic',    // <-- FIX : 'comic' par défaut au lieu de 'dark'
  bgType: 'light-flashy',
  backgroundId: 'comic-cream', // <-- AJOUTÉ : Fond de départ

  primaryColor: '#D97706',    
  textColor: '#000000',       
  backgroundColor: '#EFEAD8', 

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
    template: 'comic',
    templateId: 'comic',
    bgType: 'light-flashy',
    backgroundId: 'comic-cream', // <-- AJOUTÉ
    primaryColor: '#D97706',
    textColor: '#000000',
    backgroundColor: '#EFEAD8',
  }),

  // Enregistrement complet avec la gestion du fond d'écran
  saveToHistory: async () => {
    const state = get();
    
    const newProject: any = { // Utilisation temporaire de any si ton type LabelProject en base n'a pas encore toutes les clés
      name: state.name,
      subtitle: state.subtitle,
      style: state.style,
      brewery: state.brewery,      
      abv: state.abv,
      ibu: state.ibu,
      ebc: state.ebc,
      volume: state.volume,
      description: state.description,
      logoText: state.logoText,
      templateId: state.templateId,   
      bgType: state.bgType,         
      backgroundId: state.backgroundId, // <-- AJOUTÉ : Sauvegarde le fond choisi en BDD
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

  // Restauration complète du projet lors d'un clic dans l'historique
  loadProject: (project: any) => set({
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
    template: project.templateId || 'comic',   
    templateId: project.templateId || 'comic', 
    bgType: project.bgType || 'light-flashy',
    backgroundId: project.backgroundId || 'comic-cream', // <-- AJOUTÉ : Restaure le fond précis
    primaryColor: project.primaryColor || '#D97706',
    textColor: project.textColor || '#000000',
    backgroundColor: project.backgroundColor || '#EFEAD8',
    activeTab: 'edit' 
  })
}));