import React from 'react';
import { useLabelStore } from '../store/useLabelStore';
import { Sparkles, Type, Hash, RotateCcw, Save, Layers } from 'lucide-react';

export const EditorPanel: React.FC = () => {
  // On extrait l'état et la fonction directement
  const store = useLabelStore();
  const { updateLabel, resetLabel, saveToHistory } = store;

  const templates = [
    { id: 'minimal', name: 'Modern Minimal' },
    { id: 'punk', name: 'Punk IPA' },
    { id: 'nordic', name: 'Nordic Brewery' },
    { id: 'industrial', name: 'Industrial Beer' },
    { id: 'retro', name: 'Retro Americana' },
    { id: 'dark', name: 'Black Gold Premium' },
    { id: 'cyberpunk', name: '⚡ Cyber Neon' },
    { id: 'wizard', name: '🔮 Grimoire Secret' },
    { id: 'comic', name: '💥 Pop Cartoon' },
  ];

  const backgrounds = [
    { id: 'dark-matte', name: '⬛ Noir Mat Pur' },
    { id: 'vintage-paper', name: '📜 Papier Craft' },
    { id: 'jungle', name: '🌿 Jungle Sauvage' },
    { id: 'psychedelic', name: '🌀 Hypnotique' },
    { id: 'acid-trip', name: '🌈 Acid Néon' },
    { id: 'cosmic', name: '🌌 Espace Cosmique' },
  ];

  return (
    <div className="space-y-7 pb-10">
      {/* BOUTONS ACTIONS */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={resetLabel}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white font-semibold text-xs border border-white/[0.04] transition-all cursor-pointer"
        >
          <RotateCcw size={13} />
          Réinitialiser
        </button>
        <button
          onClick={saveToHistory}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 font-bold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer"
        >
          <Save size={13} className="stroke-[2.5]" />
          Sauvegarder
        </button>
      </div>

      {/* SECTION : ARRIÈRE-PLAN */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-zinc-400 font-bold text-[10px] uppercase tracking-widest select-none">
          <Layers size={11} className="text-amber-500" />
          <span>1. Arrière-plan de l'étiquette</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => updateLabel({ bgType: bg.id })}
              className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                store.bgType === bg.id
                  ? 'bg-zinc-800 text-white border-amber-500/40 shadow-inner ring-1 ring-amber-500/20'
                  : 'bg-zinc-900/40 text-zinc-400 border-white/[0.02] hover:bg-zinc-900/80 hover:text-zinc-200'
              }`}
            >
              {bg.name}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION : TEMPLATES */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-zinc-400 font-bold text-[10px] uppercase tracking-widest select-none">
          <Sparkles size={11} className="text-amber-500" />
          <span>2. Style Visuel (Template)</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => updateLabel({ template: tpl.id })}
              className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                store.template === tpl.id
                  ? 'bg-zinc-800 text-white border-amber-500/40 shadow-inner'
                  : 'bg-zinc-900/40 text-zinc-400 border-white/[0.02] hover:bg-zinc-900/80 hover:text-zinc-200'
              }`}
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION : TEXTES */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-2 text-zinc-400 font-bold text-[10px] uppercase tracking-widest select-none">
          <Type size={11} className="text-amber-500" />
          <span>3. Textes de l'étiquette</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Nom de la bière</label>
            <input
              type="text"
              value={store.name}
              onChange={(e) => updateLabel({ name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-white/[0.05] text-white text-xs font-medium focus:outline-none focus:border-amber-500/40 transition-all"
            />
          </div>

          <div>
            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Sous-titre / Slogan</label>
            <input
              type="text"
              value={store.subtitle}
              onChange={(e) => updateLabel({ subtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-white/[0.05] text-white text-xs font-medium focus:outline-none focus:border-amber-500/40 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Style de Bière</label>
              <input
                type="text"
                value={store.style}
                onChange={(e) => updateLabel({ style: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-white/[0.05] text-white text-xs font-medium focus:outline-none focus:border-amber-500/40 transition-all"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Nom Brasserie</label>
              <input
                type="text"
                value={store.brewery}
                onChange={(e) => updateLabel({ brewery: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-white/[0.05] text-white text-xs font-medium focus:outline-none focus:border-amber-500/40 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION : DONNÉES TECHNIQUES */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-2 text-zinc-400 font-bold text-[10px] uppercase tracking-widest select-none">
          <Hash size={11} className="text-amber-500" />
          <span>4. Chiffres techniques</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Taux ABV (%)</label>
            <input
              type="text"
              value={store.abv}
              onChange={(e) => updateLabel({ abv: e.target.value })}
              className="w-full px-2 py-2 rounded-xl bg-zinc-900/50 border border-white/[0.05] text-white text-xs font-bold text-center focus:outline-none focus:border-amber-500/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Amertume IBU</label>
            <input
              type="text"
              value={store.ibu}
              onChange={(e) => updateLabel({ ibu: e.target.value })}
              className="w-full px-2 py-2 rounded-xl bg-zinc-900/50 border border-white/[0.05] text-white text-xs font-bold text-center focus:outline-none focus:border-amber-500/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Contenant</label>
            <input
              type="text"
              value={store.volume}
              onChange={(e) => updateLabel({ volume: e.target.value })}
              className="w-full px-2 py-2 rounded-xl bg-zinc-900/50 border border-white/[0.05] text-white text-xs font-bold text-center focus:outline-none focus:border-amber-500/40 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};