import { create } from 'zustand';

export interface LabelState {
  // Onglet actif de l'interface
  activeTab: 'edit' | 'history' | 'print';
  setActiveTab: (tab: 'edit' | 'history' | 'print') => void;

  // Données de l'étiquette (à la racine)
  name: string;
  subtitle: string;
  style: string;
  brewery: string;
  abv: string;
  ibu: string;
  volume: string;
  template: string;
  bgType: string; // Type de fond (dark-matte, jungle, etc.)

  // Fonctions de mise à jour et actions
  updateLabel: (fields: Partial<Omit<LabelState, 'activeTab' | 'setActiveTab' | 'updateLabel' | 'resetLabel' | 'saveToHistory'>>) => void;
  resetLabel: () => void;
  saveToHistory: () => void;
}

export const useLabelStore = create<LabelState>((set) => ({
  activeTab: 'edit',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Valeurs par défaut initiales
  name: 'Hop Horizon',
  subtitle: 'Double IPA Artisanale',
  style: 'Imperial IPA',
  brewery: 'Brasserie du Sommet',
  abv: '7.5',
  ibu: '65',
  volume: '33 cl',
  template: 'dark',
  bgType: 'dark-matte',

  updateLabel: (fields) => set((state) => ({ ...state, ...fields })),

  resetLabel: () => set({
    name: 'Hop Horizon',
    subtitle: 'Double IPA Artisanale',
    style: 'Imperial IPA',
    brewery: 'Brasserie du Sommet',
    abv: '7.5',
    ibu: '65',
    volume: '33 cl',
    template: 'dark',
    bgType: 'dark-matte',
  }),

  saveToHistory: () => {
    console.log('Sauvegardé dans l\'historique !');
  }
}));