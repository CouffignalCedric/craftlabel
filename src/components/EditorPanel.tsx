import React from 'react';
import { useLabelStore } from '../store/useLabelStore';
import { LABEL_BACKGROUNDS } from './LabelPreview';

export const EditorPanel: React.FC = () => {
  const store = useLabelStore();

  return (
    <div className="w-full max-w-md bg-zinc-900 text-white p-6 rounded-2xl space-y-6 shadow-xl border border-zinc-800 max-h-[85vh] overflow-y-auto custom-scrollbar">
      
      <div>
        <h2 className="text-xl font-black tracking-wide text-amber-500 uppercase">Configuration de l'étiquette</h2>
        <p className="text-xs text-zinc-400 mt-1">Modifie les valeurs de ton style Pop Cartoon.</p>
      </div>

      {/* --- SECTION 1 : STYLE PAR DÉFAUT & ARRIÈRE-PLAN --- */}
      <div className="space-y-4 border-t border-zinc-800 pt-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">1. Identité Visuelle</h3>
        
        {/* Style Graphique - Pop Cartoon configuré en tête */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-bold text-zinc-300 uppercase">Modèle Graphique</label>
          <select
            value={store.templateId || 'pop-cartoon'}
            onChange={(e) => store.updateLabel({ templateId: e.target.value, template: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
          >
            <option value="pop-cartoon">💥 Pop Cartoon (Style BD Original - Recommandé)</option>
            <option value="modern-juice">Modern Juice (Style Popihn / Vertical)</option>
            <option value="classic-editorial">Classic Editorial (Style Épuré)</option>
            <option value="industrial-block">Industrial Block (Style Typo Block)</option>
          </select>
        </div>

        {/* Sélection des Couleurs d'impression */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-bold text-zinc-300 uppercase">Couleur de Fond Fond</label>
          <select
            value={store.backgroundId || 'comic-cream'}
            onChange={(e) => store.updateLabel({ backgroundId: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
          >
            {LABEL_BACKGROUNDS.map((bg) => (
              <option key={bg.id} value={bg.id}>
                {bg.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- SECTION 2 : CONFIGURATION DES TEXTES --- */}
      <div className="space-y-4 border-t border-zinc-800 pt-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">2. Textes Courants</h3>

        {/* Nom de la brasserie */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-bold text-zinc-300 uppercase">Brasserie (Haut)</label>
          <input
            type="text"
            value={store.brewery}
            onChange={(e) => store.updateLabel({ brewery: e.target.value })}
            placeholder="Ex: BRASSERIE DU SOMMET"
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition uppercase"
          />
        </div>

        {/* Nom de la bière */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-bold text-zinc-300 uppercase">Nom de la Bière (Centre)</label>
          <input
            type="text"
            value={store.name}
            onChange={(e) => store.updateLabel({ name: e.target.value })}
            placeholder="Ex: HOP HORIZON"
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition uppercase"
          />
        </div>

        {/* Badge Blanc */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-bold text-zinc-300 uppercase">Slogan / Mention (Badge Blanc)</label>
          <input
            type="text"
            value={store.subtitle}
            onChange={(e) => store.updateLabel({ subtitle: e.target.value })}
            placeholder="Ex: DOUBLE IPA ARTISANALE"
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition uppercase"
          />
        </div>

        {/* Badge Orange */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-bold text-zinc-300 uppercase">Style Spécifique (Badge Orange)</label>
          <input
            type="text"
            value={store.style}
            onChange={(e) => store.updateLabel({ style: e.target.value })}
            placeholder="Ex: IMPERIAL IPA"
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition uppercase"
          />
        </div>
      </div>

      {/* --- SECTION 3 : DONNÉES TECHNIQUES COMPACTES --- */}
      <div className="space-y-4 border-t border-zinc-800 pt-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">3. Fiche de Spécifications (Bas)</h3>
        
        <div className="grid grid-cols-3 gap-2">
          {/* Alcool */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">Alc. (%)</label>
            <input
              type="text"
              value={store.abv}
              onChange={(e) => store.updateLabel({ abv: e.target.value })}
              placeholder="7.5"
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500 transition text-center"
            />
          </div>

          {/* IBU */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">IBU</label>
            <input
              type="text"
              value={store.ibu}
              onChange={(e) => store.updateLabel({ ibu: e.target.value })}
              placeholder="65"
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500 transition text-center"
            />
          </div>

          {/* Volume */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">Contenance</label>
            <input
              type="text"
              value={store.volume}
              onChange={(e) => store.updateLabel({ volume: e.target.value })}
              placeholder="33 cl"
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500 transition text-center"
            />
          </div>
        </div>
      </div>

      {/* --- DESCRIPTION CRUCIALES POUR LE PRINT --- */}
      <div className="space-y-4 border-t border-zinc-800 pt-4">
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-bold text-zinc-300 uppercase">Notes de Brasseur (Sous l'étiquette)</label>
          <textarea
            value={store.description}
            onChange={(e) => store.updateLabel({ description: e.target.value })}
            rows={2}
            placeholder="Une bière explosive houblonnée à cru..."
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition resize-none text-xs"
          />
        </div>
      </div>

      {/* --- ACTIONS DE SAUVEGARDE --- */}
      <div className="pt-4 border-t border-zinc-800 flex space-x-3">
        <button
          onClick={() => store.resetLabel()}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-2.5 px-4 rounded-xl text-xs transition"
        >
          Reset
        </button>
        <button
          onClick={() => store.saveToHistory()}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-black py-2.5 px-4 rounded-xl text-xs transition shadow-lg shadow-amber-500/10"
        >
          Enregistrer le modèle
        </button>
      </div>

    </div>
  );
};