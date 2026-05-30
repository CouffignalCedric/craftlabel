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
// 🛠️ LES TEMPLATES VISUELS
// ==========================================

const PopCartoonTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex flex-col justify-between items-center font-sans text-black">
    <div className="text-[10px] font-black uppercase tracking-widest text-[#FF9F00] mt-1 select-none">
      {store.brewery || "BRASSERIE DU SOMMET"}
    </div>

    {/* Titre penché */}
    <div className="my-1 transform -rotate-10 max-w-full px-2 overflow-hidden">
      <h1 className="text-3xl font-black uppercase tracking-tight text-white select-none text-center break-words"
        style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 3px 3px 0 #000' }}>
        {store.name || "HOP HORIZON"}
      </h1>
    </div>

    <div className="w-full space-y-1.5 px-3 mb-1">
      {/* Badge 1 penché à gauche */}
      <div className="transform -rotate-1 w-full bg-white text-black font-black uppercase text-[10px] py-1 px-2 border-2 border-black rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] text-center tracking-wide truncate">
        {store.subtitle || "DOUBLE IPA ARTISANALE"}
      </div>
      {/* Badge 2 penché à droite */}
      <div className="transform rotate-1 w-full bg-[#FF9F00] text-black font-black uppercase text-[10px] py-1 px-2 border-2 border-black rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] text-center tracking-wide truncate">
        {store.style || "IMPERIAL IPA"}
      </div>
    </div>
  </div>
);
const BrewdogSlashedTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex items-center justify-between text-left font-sans relative overflow-hidden text-black">
    <div className="max-w-[70%] pl-2 flex flex-col justify-center h-full space-y-1">
      <span className="text-[9px] font-black uppercase tracking-[0.15em] opacity-80 truncate">{store.brewery}</span>
      <h1 className="text-3xl font-black uppercase tracking-tighter leading-none border-b-4 border-black pb-1 break-words">
        {store.name}
      </h1>
      <p className="text-[9px] font-extrabold uppercase opacity-80 pt-0.5 truncate">{store.subtitle}</p>
    </div>
    <div className="w-[25%] h-[140%] bg-black flex items-center justify-center p-1 transform skew-x-6 translate-x-3 border-l-2 border-black">
      <span className="transform -skew-x-6 text-center font-black uppercase text-[9px] tracking-[0.15em] text-white [writing-mode:vertical-lr] rotate-180 select-none">
        {store.style}
      </span>
    </div>
  </div>
);

const BrewdogBrutalistTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex flex-col justify-between items-stretch p-1 font-sans text-black">
    <div className="flex justify-between items-center border-b-2 border-black pb-0.5">
      <span className="text-[9px] font-black uppercase tracking-[0.12em] truncate">{store.brewery}</span>
      <span className="text-[8px] font-mono opacity-50">CRAFT_BEER</span>
    </div>
    <div className="my-auto py-1">
      <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] text-left break-words">
        {store.name}
      </h1>
    </div>
    <div className="flex justify-between items-end pt-0.5 border-t-2 border-black">
      <span className="text-[9px] font-black uppercase tracking-wider bg-black text-white px-1.5 py-0.5 rounded-sm">
        {store.style}
      </span>
      <span className="text-[9px] font-black uppercase tracking-tight opacity-70 truncate max-w-[50%]">{store.subtitle}</span>
    </div>
  </div>
);

const ModernJuiceTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex flex-col justify-between items-center text-center p-1 text-black">
    <div className="text-[9px] uppercase tracking-[0.18em] font-bold opacity-80 truncate w-full">{store.brewery}</div>
    <div className="my-auto px-1">
      <h1 className="text-2xl font-black uppercase tracking-tight leading-none mb-1 break-words">{store.name}</h1>
      <div className="h-[2px] w-8 bg-current mx-auto my-1 rounded-full" />
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-90 truncate">{store.style}</p>
    </div>
    <div className="text-[9px] font-medium tracking-wide uppercase opacity-70 truncate w-full">{store.subtitle}</div>
  </div>
);

const ClassicEditorialTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex flex-col justify-between items-start text-left p-1.5 font-serif text-black">
    <div className="text-[8px] font-sans tracking-[0.2em] uppercase opacity-70 truncate w-full">{store.brewery}</div>
    <div className="my-auto">
      <h1 className="text-2xl font-normal tracking-wide leading-tight uppercase break-words">{store.name}</h1>
      <p className="text-[10px] font-sans font-bold uppercase tracking-wider opacity-80 italic mt-0.5 truncate">{store.style}</p>
    </div>
    <div className="text-[8px] font-sans tracking-wide uppercase opacity-60 truncate w-full">{store.subtitle}</div>
  </div>
);

const IndustrialBlockTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex flex-col justify-between items-stretch text-left p-1.5 font-sans text-black">
    <div className="text-[8px] font-black tracking-widest uppercase border-b-2 border-current pb-0.5 truncate">{store.brewery}</div>
    <div className="my-auto">
      <h1 className="text-2xl font-black uppercase tracking-tighter leading-none block break-words">{store.name}</h1>
      <div className="mt-1 border-2 border-current px-1.5 py-0.5 inline-block text-[9px] font-mono uppercase font-bold truncate">{store.style}</div>
    </div>
    <div className="text-[9px] font-bold uppercase tracking-tight opacity-70 truncate">{store.subtitle}</div>
  </div>
);

// ==========================================
// 🚀 COMPOSANT PRINCIPAL EXPORTÉ
// ==========================================

export const LabelPreview: React.FC<LabelPreviewProps> = ({ scale = 1 }) => {
  const store = useLabelStore();
  const currentBg = LABEL_BACKGROUNDS.find((bg) => bg.id === store.backgroundId) || LABEL_BACKGROUNDS[0];

  const renderTemplate = () => {
    switch (store.templateId) {
      case 'pop-cartoon': return <PopCartoonTemplate store={store} />;
      case 'brewdog-slashed': return <BrewdogSlashedTemplate store={store} />;
      case 'brewdog-brutalist': return <BrewdogBrutalistTemplate store={store} />;
      case 'modern-juice': return <ModernJuiceTemplate store={store} />;
      case 'classic-editorial': return <ClassicEditorialTemplate store={store} />;
      case 'industrial-block': return <IndustrialBlockTemplate store={store} />;
      default: return <PopCartoonTemplate store={store} />;
    }
  };

  return (
    <div 
      id="label-print-zone"
      /* FIX : "bg-white" a été retiré ici pour laisser s'exprimer la classe dynamique du store */
      className={`w-[400px] h-[270px] border-[3.5px] border-black rounded-xl flex flex-col justify-between p-3 overflow-hidden box-border select-none ${currentBg.className}`}
      style={{ transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'center' }}
    >
      {/* Zone de contenu principale */}
      <div className="flex-1 w-full overflow-hidden relative">
        {renderTemplate()}
      </div>

      {/* Fiche technique compacte */}
      <div className="w-full mt-1">
        <div className="border-t-2 border-black opacity-30 my-1 w-full" />
        <div className="grid grid-cols-3 text-center font-mono w-full">
          <div className="flex flex-col justify-center items-center">
            <span className="text-[8px] font-bold tracking-wider opacity-60 uppercase">Alc.</span>
            <span className="text-xs font-black mt-0.5 whitespace-nowrap">{store.abv || "7.5"}%</span>
          </div>
          <div className="flex flex-col justify-center items-center border-x border-black/20">
            <span className="text-[8px] font-bold tracking-wider opacity-60 uppercase">Ibu</span>
            <span className="text-xs font-black mt-0.5 whitespace-nowrap">{store.ibu || "65"}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-[8px] font-bold tracking-wider opacity-60 uppercase">Vol.</span>
            <span className="text-xs font-black mt-0.5 whitespace-nowrap">{store.volume || "33 cl"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};