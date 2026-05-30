import React from 'react';
import { useLabelStore } from '../store/useLabelStore';

// ==========================================
// CONFIGURATION DES FONDS CLAIRS & FLASHY
// ==========================================
export const LABEL_BACKGROUNDS = [
  { id: 'comic-cream', name: '🟡 Comic Cream (Doux - Par défaut)', className: 'bg-[#EFEAD8] text-black border-black' },
  { id: 'neon-yellow', name: '⚡ Jaune Électrique (Flashy)', className: 'bg-[#EFFE00] text-black border-black' },
  { id: 'punk-pink', name: '🌸 Rose Pop (Fluo)', className: 'bg-[#FF007F] text-white border-black' },
  { id: 'acid-green', name: '🦠 Vert Acide (Toxic)', className: 'bg-[#39FF14] text-black border-black' },
  { id: 'cyber-orange', name: '🔥 Orange Vapeur (Vivid)', className: 'bg-[#FF5F1F] text-white border-black' },
  { id: 'electric-blue', name: '💎 Cyan Électrique', className: 'bg-[#00F0FF] text-black border-black' },
  { id: 'pure-white', name: '⚪ Blanc Pur (Éco-Encre)', className: 'bg-[#FFFFFF] text-black border-black' },
  { id: 'vintage-kraft', name: '📦 Carton Kraft (Authentique)', className: 'bg-[#D2B48C] text-black border-black' },
  
  // Dégradés & Motifs Modernes
  { id: 'grad-toxic', name: '🧪 Dégradé Radiation', className: 'bg-gradient-to-br from-green-400 to-yellow-300 text-black border-black' },
  { id: 'grad-sunset', name: '🌅 Dégradé Sunset Pop', className: 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white border-black' },
  { id: 'pattern-grid', name: '🏁 Grille Technique', className: 'bg-[#F9F6EE] bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:16px_16px] text-black border-black' },
  { id: 'deep-black', name: '🖤 Noir Brutal (Matte)', className: 'bg-[#111111] text-zinc-100 border-zinc-700' },
];

// ==========================================
// STYLES TYPOGRAPHIQUES DISPONIBLES
// ==========================================

const PopCartoonTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex flex-col justify-between items-center font-sans text-black">
    <div className="text-[11px] font-black uppercase tracking-widest text-[#FF9F00] mt-1 select-none">
      {store.brewery || "BRASSERIE DU SOMMET"}
    </div>
    <div className="my-1 transform -rotate-1">
      <h1 
        className="text-4xl font-black uppercase tracking-tight text-white select-none whitespace-nowrap"
        style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 4px 4px 0 #000' }}
      >
        {store.name || "HOP HORIZON"}
      </h1>
    </div>
    <div className="w-full space-y-2 px-4 mb-2">
      <div className="w-full bg-white text-black font-black uppercase text-[11px] py-1 px-3 border-[2.5px] border-black rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] text-center tracking-wide">
        {store.subtitle || "DOUBLE IPA ARTISANALE"}
      </div>
      <div className="w-full bg-[#FF9F00] text-black font-black uppercase text-[11px] py-1 px-3 border-[2.5px] border-black rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] text-center tracking-wide">
        {store.style || "IMPERIAL IPA"}
      </div>
    </div>
  </div>
);

const BrewdogSlashedTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex items-center justify-between text-left font-sans relative overflow-hidden pr-0">
    <div className="max-w-[70%] pl-2 flex flex-col justify-center h-full space-y-1 text-black">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{store.brewery}</span>
      <h1 className="text-4xl font-black uppercase tracking-tighter leading-none border-b-4 border-black pb-1">
        {store.name}
      </h1>
      <p className="text-[10px] font-extrabold uppercase opacity-80 pt-1">{store.subtitle}</p>
    </div>
    <div className="w-[28%] h-[120%] bg-zinc-950 flex items-center justify-center p-2 transform skew-x-6 translate-x-3 border-l-2 border-black">
      <span className="transform -skew-x-6 text-center font-black uppercase text-[10px] tracking-[0.2em] text-white [writing-mode:vertical-lr] rotate-180 select-none">
        {store.style}
      </span>
    </div>
  </div>
);

const BrewdogBrutalistTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex flex-col justify-between items-stretch p-1 font-sans text-black">
    <div className="flex justify-between items-center border-b-2 border-black pb-1">
      <span className="text-[10px] font-black uppercase tracking-[0.15em]">{store.brewery}</span>
      <span className="text-[9px] font-mono opacity-50">CRAFT_BEER</span>
    </div>
    <div className="my-auto py-1">
      <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.85] text-left break-words">
        {store.name}
      </h1>
    </div>
    <div className="flex justify-between items-end pt-1 border-t-2 border-black">
      <span className="text-[10px] font-black uppercase tracking-wider bg-zinc-950 text-white px-2 py-1 rounded-sm shadow-sm">
        {store.style}
      </span>
      <span className="text-[9px] font-black uppercase tracking-tight opacity-70 mb-0.5">{store.subtitle}</span>
    </div>
  </div>
);

const ModernJuiceTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex flex-col justify-between items-center text-center p-2">
    <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">{store.brewery}</div>
    <div className="my-auto">
      <h1 className="text-3xl font-black uppercase tracking-tight leading-none mb-1">{store.name}</h1>
      <div className="h-[3px] w-10 bg-current mx-auto my-1.5 rounded-full" />
      <p className="text-[11px] font-bold uppercase tracking-wider opacity-90">{store.style}</p>
    </div>
    <div className="text-[9px] font-medium tracking-wide uppercase opacity-70 mb-1">{store.subtitle}</div>
  </div>
);

const ClassicEditorialTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex flex-col justify-between items-start text-left p-2 font-serif">
    <div className="text-[9px] font-sans tracking-[0.25em] uppercase opacity-70">{store.brewery}</div>
    <div className="my-auto">
      <h1 className="text-3xl font-normal tracking-wide leading-tight uppercase">{store.name}</h1>
      <p className="text-[11px] font-sans font-bold uppercase tracking-wider opacity-80 italic mt-0.5">{store.style}</p>
    </div>
    <div className="text-[9px] font-sans tracking-wide uppercase opacity-60 mb-1">{store.subtitle}</div>
  </div>
);

const IndustrialBlockTemplate: React.FC<{ store: any }> = ({ store }) => (
  <div className="w-full h-full flex flex-col justify-between items-stretch text-left p-2 font-sans">
    <div className="text-[9px] font-black tracking-widest uppercase border-b-2 border-current pb-0.5">{store.brewery}</div>
    <div className="my-auto">
      <h1 className="text-3xl font-black uppercase tracking-tighter leading-none block break-words">{store.name}</h1>
      <div className="mt-1 border-2 border-current px-2 py-0.5 inline-block text-[10px] font-mono uppercase font-bold">{store.style}</div>
    </div>
    <div className="text-[10px] font-bold uppercase tracking-tight opacity-70 mb-1">{store.subtitle}</div>
  </div>
);

// ==========================================
// COMPOSANT PRINCIPAL DE L'APERÇU
// ==========================================
export const LabelPreview: React.FC = () => {
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
    /* 📱 FIX IPHONE : Ajout de "sticky top-0", un z-index élevé et un fond flouté pour rester au-dessus lors du scroll */
    <div className="sticky top-0 z-40 md:relative md:top-auto w-full max-w-xl flex flex-col items-center justify-center space-y-1 sm:space-y-4 p-2 sm:p-4 bg-zinc-950/95 backdrop-blur-md md:bg-zinc-950 rounded-2xl border-b border-zinc-800 md:border md:shadow-2xl">
      
      <style>{`
        @media print {
          #label-print-zone, 
          #label-print-zone *, 
          .bg-white,
          .bg-zinc-950 {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <span className="text-[10px] sm:text-xs font-black text-zinc-500 uppercase tracking-widest">Rendu de Production Haute Fidélité</span>

      {/* CONTAINER RE-SCALER : Évite que la boîte de 440px ne casse l'affichage sur les petits écrans d'iPhone */}
      <div className="w-full flex items-center justify-center overflow-hidden h-[250px] sm:h-auto">
        <div className="transform scale-[0.72] xs:scale-[0.85] sm:scale-100 origin-center transition-transform duration-300 flex-shrink-0">
          
          {/* CADRE EXTÉRIEUR ET ENVELOPPE DE TAILLE D'ORIGINE */}
          <div className="bg-[#140d0a] p-4 rounded-[24px] shadow-2xl flex items-center justify-center">
            
            {/* LE CORPS DE L'ÉTIQUETTE - FORMAT PAYSAGE INDÉFORMABLE */}
            <div 
              id="label-print-zone"
              className={`w-[440px] h-[300px] border-[3px] rounded-[14px] flex flex-col justify-between p-3 overflow-hidden ${currentBg.className}`}
            >
              {/* Contenu Dynamique Supérieur */}
              <div className="flex-1 w-full overflow-hidden">
                {renderTemplate()}
              </div>

              {/* FICHE TECHNIQUE COMPACTE */}
              <div className="w-full text-black">
                <div className="border-t-[2px] border-black opacity-90 my-1 w-full" />
                <div className="grid grid-cols-3 text-center font-mono py-1">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold tracking-widest opacity-50 uppercase">Alc.</span>
                    <span className="text-sm font-black mt-0.5">{store.abv || "7.5"}%</span>
                  </div>
                  <div className="flex flex-col border-x border-black/20">
                    <span className="text-[9px] font-bold tracking-widest opacity-50 uppercase">Ibu</span>
                    <span className="text-sm font-black mt-0.5">{store.ibu || "65"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold tracking-widest opacity-50 uppercase">Volume</span>
                    <span className="text-sm font-black mt-0.5">{store.volume || "33 cl"}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {store.description && (
        <p className="hidden sm:block text-xs text-zinc-400 text-center max-w-sm italic px-4">
          "{store.description}"
        </p>
      )}
    </div>
  );
};