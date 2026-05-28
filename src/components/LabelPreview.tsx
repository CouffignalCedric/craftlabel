import React from 'react';
import { useLabelStore } from '../store/useLabelStore';

export const LabelPreview: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  // Extraction de TOUTES les variables nécessaires, y compris template
  const { 
    name, 
    subtitle, 
    style, 
    brewery, 
    abv, 
    ibu, 
    volume, 
    bgType,
    template, // <-- On récupère le template sélectionné !
    primaryColor, 
    textColor: storeTextColor, 
    backgroundColor: storeBackgroundColor 
  } = useLabelStore();

  // Configuration CSS des textures d'arrière-plans
  const getBackgroundStyle = () => {
    switch (bgType) {
      case 'jungle':
        return {
          backgroundColor: '#05160e',
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0c-5 10-15 15-30 15 15 0 25 5 30 15 5-10 15-15 30-15-15 0-25-5-30-15z' fill='%2310b981' fill-opacity='0.08'/%3E%3C/svg%3E"),
            linear-gradient(135deg, #04120c 0%, #0c2417 100%)`
        };
      case 'psychedelic':
        return {
          background: 'repeating-radial-gradient(circle at 0% 0%, #000000, #000000 10px, #4c1d95 10px, #4c1d95 20px, #000000 20px, #000000 30px, #06b6d4 30px, #06b6d4 40px)',
          backgroundSize: '100% 100%'
        };
      case 'acid-trip':
        return {
          background: 'linear-gradient(135deg, #f43f5e 0%, #a855f7 40%, #06b6d4 100%)',
        };
      case 'vintage-paper':
        return {
          backgroundColor: '#f2e6d0',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%2378350f' fill-opacity='0.06'/%3E%3C/svg%3E")`
        };
      case 'dark-matte':
      default:
        return { 
          background: `linear-gradient(135deg, ${storeBackgroundColor || '#141416'} 0%, #09090b 100%)` 
        };
    }
  };

  // Moteur de design : Configuration dynamique de la typographie selon le template
  const getTemplateStyles = () => {
    switch (template) {
      case 'minimal':
        return {
          breweryClass: "font-sans tracking-[0.5em] text-[6px] font-light uppercase opacity-60",
          nameClass: "font-sans font-extralight tracking-[0.15em] text-xl uppercase mt-3 leading-none",
          subtitleClass: "font-sans tracking-widest text-[7px] font-light uppercase opacity-50 mt-1",
          styleClass: "font-sans text-[6px] font-normal tracking-[0.3em] uppercase mt-2 opacity-80",
          fontFamilyClass: "font-sans"
        };
      case 'punk':
        return {
          breweryClass: "font-mono tracking-tight bg-amber-500 text-zinc-950 px-1.5 py-0.5 font-black text-[7px] uppercase inline-block mx-auto rounded-sm",
          nameClass: "font-sans font-black tracking-tighter text-3xl uppercase transform -rotate-2 skew-x-3 mt-2 leading-none",
          subtitleClass: "font-mono tracking-tighter text-[9px] font-bold uppercase mt-1 bg-zinc-100/10 px-1 inline-block",
          styleClass: "font-mono text-[8px] font-extrabold tracking-normal uppercase mt-2 underline decoration-2 decoration-wavy",
          fontFamilyClass: "font-mono"
        };
      case 'nordic':
        return {
          breweryClass: "font-serif tracking-[0.25em] text-[7px] italic opacity-80",
          nameClass: "font-serif font-normal tracking-wide text-2xl mt-2 leading-tight capitalize",
          subtitleClass: "font-serif text-[9px] italic opacity-75 mt-0.5",
          styleClass: "font-sans text-[6px] font-bold tracking-[0.25em] uppercase mt-2 border-b border-white/20 pb-1 max-w-[80px] mx-auto",
          fontFamilyClass: "font-serif"
        };
      case 'industrial':
        return {
          breweryClass: "font-mono tracking-widest text-[6px] font-bold uppercase opacity-40",
          nameClass: "font-mono font-bold tracking-normal text-xl uppercase mt-2.5 border-x border-white/20 px-2 inline-block",
          subtitleClass: "font-mono tracking-normal text-[8px] font-medium opacity-60 mt-1.5",
          styleClass: "font-mono text-[7px] font-black tracking-[0.1em] uppercase mt-1",
          fontFamilyClass: "font-mono"
        };
      case 'retro':
        return {
          breweryClass: "font-serif tracking-[0.3em] text-[7px] font-bold uppercase text-amber-500",
          nameClass: "font-serif font-black tracking-tight text-2xl italic mt-1.5 leading-none",
          subtitleClass: "font-sans tracking-widest text-[8px] font-black uppercase opacity-75 mt-1",
          styleClass: "font-serif text-[7px] font-bold tracking-[0.15em] uppercase mt-1.5",
          fontFamilyClass: "font-serif"
        };
      case 'dark':
      default:
        return {
          breweryClass: "font-sans tracking-[0.4em] text-[7px] font-bold uppercase opacity-70",
          nameClass: "font-sans font-black tracking-tighter text-2xl uppercase mt-2.5 leading-none",
          subtitleClass: "font-sans text-[9px] font-medium italic tracking-wide opacity-80",
          styleClass: "font-sans text-[7px] font-black tracking-[0.2em] uppercase mt-1",
          fontFamilyClass: "font-sans"
        };
    }
  };

  const isLight = bgType === 'vintage-paper';
  const activeTextColor = storeTextColor || (isLight ? '#1c1917' : '#f4f4f5');
  const activePrimaryColor = primaryColor || '#d97706';
  const activeBorderColor = primaryColor || (isLight ? '#1c1917' : '#d97706');

  // Récupération des classes spécifiques au thème actif
  const tplStyle = getTemplateStyles();

  return (
    <div 
      className={`w-[280px] h-[190px] p-4 flex flex-col justify-between border-4 relative overflow-hidden rounded-sm transition-all duration-300 ${tplStyle.fontFamilyClass}`}
      style={{ 
        transform: `scale(${scale})`, 
        transformOrigin: 'center',
        borderColor: activeBorderColor,
        ...getBackgroundStyle()
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}} />

      <div className="text-center mt-1 z-10 select-none flex flex-col justify-center">
        {/* Nom de la brasserie */}
        <p className={tplStyle.breweryClass} style={{ color: activeTextColor }}>
          {template === 'punk' ? '' : '✦ '}
          {brewery || 'Brasserie du Sommet'}
          {template === 'punk' ? '' : ' ✦'}
        </p>
        
        {/* Nom de la bière */}
        <h2 className={tplStyle.nameClass} style={{ color: activeTextColor }}>
          {name || 'Hop Horizon'}
        </h2>
        
        {/* Ligne séparatrice (masquée sur le design Minimal et Punk pour épurer) */}
        {template !== 'minimal' && template !== 'punk' && (
          <div 
            className="w-8 h-[1px] mx-auto my-2"
            style={{ backgroundColor: activeTextColor, opacity: 0.2 }}
          ></div>
        )}
        
        {/* Sous-titre */}
        <p className={tplStyle.subtitleClass} style={{ color: activeTextColor }}>
          {subtitle || 'Double IPA Artisanale'}
        </p>
        
        {/* Style de bière (ex: Imperial IPA) */}
        <p className={tplStyle.styleClass} style={{ color: activePrimaryColor }}>
          {style || 'Imperial IPA'}
        </p>
      </div>

      {/* Grille des caractéristiques techniques du bas */}
      <div 
        className="grid grid-cols-3 text-center border-t pt-2 z-10" 
        style={{ 
          borderColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
          color: activeTextColor 
        }}
      >
        <div>
          <span className="block text-[6px] font-bold uppercase tracking-wider opacity-50">Alc.</span>
          <span className="text-[11px] font-black">{abv || '7.5'}%</span>
        </div>
        <div>
          <span className="block text-[6px] font-bold uppercase tracking-wider opacity-50">IBU</span>
          <span className="text-[11px] font-black">{ibu || '65'}</span>
        </div>
        <div>
          <span className="block text-[6px] font-bold uppercase tracking-wider opacity-50">Volume</span>
          <span className="text-[11px] font-black">{volume || '33 cl'}</span>
        </div>
      </div>
    </div>
  );
};