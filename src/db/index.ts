import Dexie, { type Table } from 'dexie';

export interface LabelProject {
  id?: number;
  name: string;
  subtitle: string;
  style: string;
  brewery?: string;
  abv: string;
  ibu: string;
  ebc: string;
  volume: string;
  description: string;
  logoText: string;
  templateId: string;
  bgType?: string;
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
  updatedAt: number;
}

export class CraftLabelDB extends Dexie {
  projects!: Table<LabelProject>;
  constructor() {
    super('CraftLabelDB');
    this.version(1).stores({ projects: '++id, name, updatedAt' });
  }
}

export const db = new CraftLabelDB();