import React from 'react';
import { useLabelStore } from '../store/useLabelStore';

interface LabelPreviewProps {
  scale?: number;
}

export const LABEL_BACKGROUNDS = [
  { id: 'comic-cream', name: '🟡 Comic Cream', className: 'bg-[#EFEAD8] text-black border-black' },
  { id: 'neon-yellow', name: '⚡ Jaune Électrique', className: 'bg-[#EFFE00] text-black border-black' },
  { id: 'punk-pink', name: '🌸 Rose Pop', className: 'bg-[#FF007F] text-white border-black' },
  { id: 'acid-green', name: '🦠 Vert Acide', className: 'bg-[#39FF14] text-black border-black' },
  { id: 'cyber-orange', name: '🔥 Orange Vapeur', className: 'bg-[#FF5F1F] text-white border-black' },
  { id: 'electric-blue', name: '💎 Cyan Électrique', className: 'bg-[#00F0FF] text-black border-black' },
  { id: 'pure-white', name: '⚪ Blanc Pur', className: 'bg-[#FFFFFF] text-black border-black' },
  { id: 'vintage-kraft', name: '📦 Carton Kraft', className: 'bg-[#D2B48C] text-black border-black' },
  { id: 'grad-toxic', name: '🧪 Dégradé Radiation', className: 'bg-gradient-to-br from-green-400 to-yellow-300 text-black border-black' },
  { id: 'grad-sunset', name: '🌅 Dégradé Sunset', className: 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white border-black' },
  { id: 'pattern-grid', name: '🏁 Grille Technique', className: 'bg-[#F9F6EE] bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:16px_16px] text-black border-black' },
  { id: 'deep-black', name: '🖤 Noir Brutal', className: 'bg-[#111111] text-zinc-100 border-zinc-700' },
];

// ==========================================
// 🛠️ LES TEMPLATES VISUELS ADAPTATIFS
// ==========================================

const PopCartoonTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className={`w-full h-full flex flex-col justify-between items-center font-sans pt-1 ${isDark ? 'text-white' : 'text-black'}`}>
    <div className={`text-[10px] font-black uppercase tracking-widest select-none ${isDark ? 'text-amber-400' : 'text-[#f29900]'}`}>
      {store.brewery || "BRASSERIE DU SOMMET"}
    </div>

    <div className="flex flex-col items-center justify-center flex-grow w-full">
      <h1 
        className="text-3xl font-black uppercase tracking-tight text-white select-none text-center break-words transform -rotate-[2.5deg] px-2 py-1"
        style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 3.5px 3.5px 0 #000' }}
      >
        {store.name || "HOP HORIZON"}
      </h1>
    </div>

    <div className="w-full space-y-1.5 px-3 mb-1">
      <div className={`w-full font-black uppercase text-[10px] py-1 px-2 border-2 rounded-lg text-center tracking-wide truncate ${isDark ? 'bg-zinc-800 text-white border-white shadow-[3px_3px_0px_rgba(255,255,255,1)]' : 'bg-white text-black border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]'}`}>
        {store.subtitle || "DOUBLE IPA ARTISANALE"}
      </div>
      <div className={`w-full font-black uppercase text-[10px] py-1 px-2 border-2 rounded-lg text-center tracking-wide truncate ${isDark ? 'bg-amber-500 text-black border-white shadow-[3px_3px_0px_rgba(255,255,255,1)]' : 'bg-[#f29900] text-black border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]'}`}>
        {store.style || "IMPERIAL IPA"}
      </div>
    </div>
  </div>
);

const BrewdogSlashedTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className={`w-full h-full flex items-center justify-between text-left font-sans relative overflow-hidden ${isDark ? 'text-white' : 'text-black'}`}>
    <div className="max-w-[70%] pl-2 flex flex-col justify-center h-full space-y-1">
      <span className="text-[9px] font-black uppercase tracking-[0.15em] opacity-80 truncate">{store.brewery || "BRASSERIE"}</span>
      <h1 className={`text-3xl font-black uppercase tracking-tighter leading-none border-b-4 pb-1 break-words ${isDark ? 'border-white' : 'border-black'}`}>
        {store.name || "NOM DE BIÈRE"}
      </h1>
      <p className="text-[9px] font-extrabold uppercase opacity-80 pt-0.5 truncate">{store.subtitle || "SOUS-TITRE"}</p>
    </div>
    <div className={`w-[25%] h-[140%] flex items-center justify-center p-1 transform skew-x-6 translate-x-3 border-l-2 ${isDark ? 'bg-zinc-800 border-white' : 'bg-black border-black'}`}>
      <span className="transform -skew-x-6 text-center font-black uppercase text-[9px] tracking-[0.15em] text-white [writing-mode:vertical-lr] rotate-180 select-none">
        {store.style || "STYLE"}
      </span>
    </div>
  </div>
);

const BrewdogBrutalistTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className={`w-full h-full flex flex-col justify-between items-stretch p-1 font-sans ${isDark ? 'text-white' : 'text-black'}`}>
    <div className={`flex justify-between items-center border-b-2 pb-0.5 ${isDark ? 'border-white' : 'border-black'}`}>
      <span className="text-[9px] font-black uppercase tracking-[0.12em] truncate">{store.brewery || "BRASSERIE"}</span>
      <span className="text-[8px] font-mono opacity-50">CRAFT_BEER</span>
    </div>
    <div className="my-auto py-1">
      <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] text-left break-words">
        {store.name || "NOM DE BIÈRE"}
      </h1>
    </div>
    <div className={`flex justify-between items-center pt-1 border-t-2 ${isDark ? 'border-white' : 'border-black'}`}>
      <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
        {store.style || "STYLE"}
      </span>
      <span className="text-[9px] font-black uppercase tracking-tight opacity-70 truncate max-w-[50%]">{store.subtitle || "SOUS-TITRE"}</span>
    </div>
  </div>
);

const ModernJuiceTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className={`w-full h-full flex flex-col justify-between items-center text-center p-1 ${isDark ? 'text-white' : 'text-black'}`}>
    <div className="text-[9px] uppercase tracking-[0.18em] font-bold opacity-80 truncate w-full">{store.brewery || "BRASSERIE"}</div>
    <div className="my-auto px-1">
      <h1 className="text-2xl font-black uppercase tracking-tight leading-none mb-1 break-words">{store.name || "NOM DE BIÈRE"}</h1>
      <div className={`h-[2px] w-8 mx-auto my-1 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-90 truncate">{store.style || "STYLE"}</p>
    </div>
    <div className="text-[9px] font-medium tracking-wide uppercase opacity-70 truncate w-full">{store.subtitle || "SOUS-TITRE"}</div>
  </div>
);

const ClassicEditorialTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className={`w-full h-full flex flex-col justify-between items-start text-left p-1.5 font-serif ${isDark ? 'text-white' : 'text-black'}`}>
    <div className="text-[8px] font-sans tracking-[0.2em] uppercase opacity-70 truncate w-full">{store.brewery || "BRASSERIE"}</div>
    <div className="my-auto">
      <h1 className="text-2xl font-normal tracking-wide leading-tight uppercase break-words">{store.name || "NOM DE BIÈRE"}</h1>
      <p className="text-[10px] font-sans font-bold uppercase tracking-wider opacity-80 italic mt-0.5 truncate">{store.style || "STYLE"}</p>
    </div>
    <div className="text-[8px] font-sans tracking-wide uppercase opacity-60 truncate w-full">{store.subtitle || "SOUS-TITRE"}</div>
  </div>
);

const IndustrialBlockTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className={`w-full h-full flex flex-col justify-between items-stretch text-left p-1.5 font-mono ${isDark ? 'text-white' : 'text-black'}`}>
    <div className={`text-[8px] font-black tracking-widest uppercase border-b-2 pb-0.5 truncate ${isDark ? 'border-white' : 'border-black'}`}>{store.brewery || "BRASSERIE"}</div>
    <div className="my-auto">
      <h1 className="text-2xl font-black uppercase tracking-tighter leading-none block break-words">{store.name || "NOM DE BIÈRE"}</h1>
      <div className={`mt-1 border-2 px-1.5 py-0.5 inline-block text-[9px] uppercase font-bold truncate ${isDark ? 'border-white bg-zinc-800 text-white' : 'border-black bg-black text-white'}`}>
        {store.style || "STYLE"}
      </div>
    </div>
    <div className="text-[9px] font-bold uppercase tracking-tight opacity-70 truncate">{store.subtitle || "SOUS-TITRE"}</div>
  </div>
);

// 🆕 NOUVEAU 7 : APOTHECARY VINTAGE
const ApothecaryVintageTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className={`w-full h-full p-2 flex flex-col justify-between items-center text-center font-serif border-[3px] double relative ${isDark ? 'text-white border-white' : 'text-black border-black'}`}>
    <div className={`absolute inset-0.5 border pointer-events-none ${isDark ? 'border-white/20' : 'border-black/20'}`}></div>
    <div className="text-[8px] uppercase tracking-[0.25em] font-sans font-black opacity-90 mt-1">
      ✦ {store.brewery || "BRASSERIE DE L'APOTHICAIRE"} ✦
    </div>
    <div className="my-auto">
      <p className="text-[7px] uppercase tracking-widest opacity-60 font-sans">- Premium Batch -</p>
      <h2 className="text-2xl font-bold uppercase tracking-wide my-0.5 leading-none px-2 break-words">
        {store.name || "VIEUX REMÈDE"}
      </h2>
      <div className={`w-12 h-[1px] mx-auto my-1 ${isDark ? 'bg-white/40' : 'bg-black/40'}`} />
      <p className="text-[9px] italic opacity-80 inline-block px-4 truncate max-w-full">
        {store.subtitle || "TRADITION BRASSICOLE"}
      </p>
    </div>
    <div className={`w-full flex justify-between items-center text-[8px] font-sans font-bold uppercase border-t pt-1 px-1 z-10 ${isDark ? 'border-white/40' : 'border-black/40'}`}>
      <span className="truncate max-w-[50%]">{store.style || "ALCHEMY ALE"}</span>
      <span className="font-serif italic text-[9px]">Authentic Craft</span>
    </div>
  </div>
);

// 🆕 NOUVEAU 8 : CYBER SYNTHWAVE
const CyberSynthwaveTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className="w-full h-full p-3 flex flex-col justify-between bg-zinc-950 font-mono text-cyan-400 border-2 border-fuchsia-500 shadow-[inset_0_0_12px_rgba(244,63,94,0.3)] relative overflow-hidden rounded-md">
    <div className="absolute bottom-0 inset-x-0 h-10 bg-[linear-gradient(to_bottom,transparent_40%,rgba(244,63,94,0.15)_100%)] pointer-events-none"></div>
    <div className="flex justify-between items-center text-[8px] uppercase tracking-wider border-b border-cyan-500/30 pb-1">
      <span className="text-fuchsia-400 font-bold truncate max-w-[60%]">{store.brewery || "CYBER BREWERY"}</span>
      <span className="text-zinc-500">SYS_V8.26</span>
    </div>
    <div className="my-auto text-left">
      <h2 className="text-2xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 italic filter drop-shadow-[0_2px_4px_rgba(0,255,255,0.4)] break-words leading-none">
        {store.name || "NEON OVERDRIVE"}
      </h2>
      <p className="text-[8px] text-zinc-400 uppercase tracking-widest mt-1 truncate">
        // {store.subtitle || "GRID EDITION"}
      </p>
    </div>
    <div className="flex justify-between items-end text-[9px] font-bold border-t border-cyan-500/30 pt-1 text-fuchsia-400">
      <div className="flex flex-col">
        <span className="text-[7px] text-zinc-500">CORE_STYLE</span>
        <span className="truncate max-w-[140px] uppercase text-cyan-400">{store.style || "SYNTH IPA"}</span>
      </div>
      <span className="text-[7px] text-zinc-600 font-mono">⚡ READY</span>
    </div>
  </div>
);

// 🆕 NOUVEAU 9 : ART NOUVEAU
const ArtNouveauTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className={`w-full h-full p-3 flex flex-col justify-between items-center text-center font-serif relative rounded-sm border ${isDark ? 'text-white border-white/20' : 'text-black border-black/20'}`}>
    <div className={`absolute inset-1 border rounded-[16px_4px_16px_4px] pointer-events-none ${isDark ? 'border-white/40' : 'border-black/40'}`}></div>
    <div className="text-[8px] uppercase tracking-[0.15em] italic font-medium opacity-80 pt-1 truncate w-full">
      {store.brewery || "Maison de Brasserie"}
    </div>
    <div className="my-auto px-2 z-10">
      <h2 className="text-2xl font-light tracking-wide capitalize leading-tight break-words">
        {(store.name || "Nouveau Fleur").toLowerCase()}
      </h2>
      <p className="text-[8px] uppercase tracking-widest opacity-60 font-sans mt-0.5 truncate max-w-full">
        {store.subtitle || "Nectar Spécial"}
      </p>
    </div>
    <div className={`w-[85%] flex justify-center text-[8px] font-sans tracking-wide uppercase border-t pb-0.5 pt-1 opacity-90 z-10 ${isDark ? 'border-white/30' : 'border-black/30'}`}>
      <span className="truncate">{store.style || "Blonde Fine"}</span>
    </div>
  </div>
);

// 🆕 NOUVEAU 10 : MINIMAL LUXURY
const MinimalLuxuryTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className={`w-full h-full p-4 flex flex-col justify-between items-center text-center font-sans rounded-md ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'}`}>
    <div className="text-[8px] font-light tracking-[0.4em] uppercase opacity-50 truncate w-full">
      {store.brewery || "HAUTE BRASSERIE"}
    </div>
    <div className="my-auto py-1">
      <h2 className={`text-xl font-light tracking-[0.2em] uppercase border-b pb-1.5 px-4 inline-block break-words max-w-full ${isDark ? 'border-white/20' : 'border-zinc-950/10'}`}>
        {store.name || "L'ESSENTIEL"}
      </h2>
      <p className="text-[7px] font-medium tracking-[0.3em] uppercase opacity-40 mt-1.5 truncate max-w-full">
        {store.subtitle || "COLLECTION PRIVÉE"}
      </p>
    </div>
    <div className="w-full flex justify-center text-[7px] font-medium tracking-[0.2em] uppercase opacity-60">
      <span className="truncate">{store.style || "BRUT NATURE"}</span>
    </div>
  </div>
);

// 🆕 NOUVEAU 11 : PIXEL ARCADE
const PixelArcadeTemplate: React.FC<{ store: any; isDark: boolean }> = ({ store, isDark }) => (
  <div className="w-full h-full p-2 flex flex-col justify-between bg-black text-lime-400 font-mono border-4 border-dashed border-lime-400 relative rounded-md">
    <div className="text-[8px] tracking-tight uppercase bg-lime-400 text-black px-1 font-bold w-max self-center select-none">
      {store.brewery || "8BIT BREW"}
    </div>
    <div className="my-auto text-center">
      <div className="text-xl font-black uppercase tracking-tight text-yellow-300 filter drop-shadow-[2px_2px_0px_#000] break-words">
        👾 {store.name || "STAGE 1"} 👾
      </div>
      <div className="text-[7px] text-zinc-500 uppercase mt-0.5 truncate">
        [ {store.subtitle || "INSERT COIN"} ]
      </div>
    </div>
    <div className="border-t-2 border-lime-400 pt-0.5 flex justify-between items-center text-[8px] font-bold">
      <span className="truncate max-w-[60%]">{store.style || "PIXEL IPA"}</span>
      <span className="text-yellow-300">▲ PLAY</span>
    </div>
  </div>
);

// ==========================================
// 🚀 COMPOSANT PRINCIPAL EXPORTÉ
// ==========================================

export const LabelPreview: React.FC<LabelPreviewProps> = ({ scale = 1 }) => {
  const store = useLabelStore();
  const currentBg = LABEL_BACKGROUNDS.find((bg) => bg.id === store.backgroundId) || LABEL_BACKGROUNDS[0];

  const isDark = currentBg.className.includes('text-white') || currentBg.className.includes('text-zinc-100');

  const renderTemplate = () => {
    switch (store.templateId) {
      case 'pop-cartoon': return <PopCartoonTemplate store={store} isDark={isDark} />;
      case 'brewdog-slashed': return <BrewdogSlashedTemplate store={store} isDark={isDark} />;
      case 'brewdog-brutalist': return <BrewdogBrutalistTemplate store={store} isDark={isDark} />;
      case 'modern-juice': return <ModernJuiceTemplate store={store} isDark={isDark} />;
      case 'classic-editorial': return <ClassicEditorialTemplate store={store} isDark={isDark} />;
      case 'industrial-block': return <IndustrialBlockTemplate store={store} isDark={isDark} />;
      
      case 'apothecary-vintage': return <ApothecaryVintageTemplate store={store} isDark={isDark} />;
      case 'cyber-synthwave': return <CyberSynthwaveTemplate store={store} isDark={isDark} />;
      case 'art-nouveau': return <ArtNouveauTemplate store={store} isDark={isDark} />;
      case 'minimal-luxury': return <MinimalLuxuryTemplate store={store} isDark={isDark} />;
      case 'pixel-arcade': return <PixelArcadeTemplate store={store} isDark={isDark} />;
      
      default: return <PopCartoonTemplate store={store} isDark={isDark} />;
    }
  };

  return (
    <div 
      className="w-full flex justify-center items-center overflow-visible mx-auto"
      style={{ height: 270 * scale }}
    >
      <div 
        id="label-print-zone"
        className={`w-[400px] h-[270px] border-[5px] rounded-xl flex flex-col justify-between p-3 overflow-hidden box-border select-none flex-shrink-0 ${currentBg.className} ${isDark ? 'border-white' : 'border-black'}`}
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'center center'
        }}
      >
        <div className="flex-1 w-full overflow-hidden relative">
          {renderTemplate()}
        </div>

        <div className="w-full mt-2">
          <div className={`border-t-[3px] my-1 w-full ${isDark ? 'border-white' : 'border-black'}`} />
          <div className="grid grid-cols-3 text-center font-sans w-full pt-1">
            <div className="flex flex-col justify-center items-center">
              <span className={`text-[9px] font-bold tracking-wider uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>Alc.</span>
              <span className="text-sm font-black mt-0.5 whitespace-nowrap">{store.abv || "7.5"}%</span>
            </div>
            <div className={`flex flex-col justify-center items-center border-x-[3px] ${isDark ? 'border-white' : 'border-black'}`}>
              <span className={`text-[9px] font-bold tracking-wider uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>Ibu</span>
              <span className="text-sm font-black mt-0.5 whitespace-nowrap">{store.ibu || "65"}</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className={`text-[9px] font-bold tracking-wider uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>Vol.</span>
              <span className="text-sm font-black mt-0.5 whitespace-nowrap">{store.volume || "33 cl"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};