import React from 'react';
import { useLabelStore } from '../store/useLabelStore';

export const LabelPreview: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  // Récupération directe des variables depuis la racine du store
  const { name, subtitle, style, brewery, abv, ibu, volume, bgType } = useLabelStore();

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
          background: 'linear-gradient(135deg, #141416 0%, #09090b 100%)' 
        };
    }
  };

  const isLight = bgType === 'vintage-paper';
  const textColor = isLight ? 'text-stone-900' : 'text-zinc-100';
  const subColor = isLight ? 'text-stone-600' : 'text-zinc-400';
  const borderColor = isLight ? 'border-stone-800' : 'border-amber-600';
  const dividerColor = isLight ? 'bg-stone-800/20' : 'bg-white/10';

  return (
    <div 
      className={`w-[280px] h-[190px] p-4 flex flex-col justify-between border-4 relative overflow-hidden rounded-sm transition-all duration-300 ${borderColor}`}
      style={{ 
        transform: `scale(${scale})`, 
        transformOrigin: 'center',
        ...getBackgroundStyle()
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}} />

      <div className="text-center mt-1 z-10 select-none">
        <p className={`text-[7px] tracking-[0.4em] font-bold uppercase opacity-70 ${textColor}`}>
          ✦ {brewery || 'Brasserie du Sommet'} ✦
        </p>
        <h2 className={`text-2xl font-black tracking-tighter uppercase mt-2.5 leading-none ${textColor}`}>
          {name || 'Hop Horizon'}
        </h2>
        <div className={`w-8 h-[1px] mx-auto my-2 ${dividerColor}`}></div>
        <p className={`text-[9px] font-medium italic tracking-wide ${subColor}`}>
          {subtitle || 'Double IPA Artisanale'}
        </p>
        <p className="text-[7px] font-black tracking-[0.2em] uppercase mt-1 text-amber-500 opacity-90">
          {style || 'Imperial IPA'}
        </p>
      </div>

      <div className={`grid grid-cols-3 text-center border-t pt-2 z-10 ${textColor}`} style={{ borderColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}>
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