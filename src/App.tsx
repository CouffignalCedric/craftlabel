import React from 'react';
import { useLabelStore } from './store/useLabelStore';
import { Navbar } from './components/Navbar';
import { EditorPanel } from './components/EditorPanel';
import { LabelPreview } from './components/LabelPreview';
import { HistoryPanel } from './components/HistoryPanel';
import { PrintView } from './components/PrintView';

const App: React.FC = () => {
  const { activeTab, bgType } = useLabelStore();

  // UX Ambiance : La lueur s'adapte à la texture de l'étiquette sélectionnée
  const getDynamicGlow = () => {
    switch (bgType) {
      case 'jungle':
        return 'from-emerald-500/20 to-teal-500/5';
      case 'psychedelic':
        return 'from-purple-600/25 to-cyan-500/15';
      case 'acid-trip':
        return 'from-rose-500/30 to-cyan-400/20';
      case 'vintage-paper':
        return 'from-amber-600/10 to-amber-950/5';
      default:
        return 'from-zinc-700/10 to-zinc-900/10';
    }
  };

  // CIRCUIT COURT : Mode impression direct
  if (activeTab === 'print') {
    return <PrintView />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-stone-200 antialiased relative overflow-hidden">
      
      {/* Lueur d'arrière-plan mobile */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.01)_0%,rgba(106,27,154,0.01)_50%,rgba(0,0,0,0)_100%)] pointer-events-none z-[-1] sm:hidden"></div>
      
      {/* Barre de navigation responsive */}
      <Navbar />

      {/* Layout principal asymétrique */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative">
        
        {/* 📱 ZONE DE PREVIEW (Désormais en haut sur mobile grâce à order-1) */}
        <div className="order-1 lg:order-2 lg:col-span-7 w-full h-auto lg:h-[calc(100vh-140px)] min-h-0 lg:min-h-[400px] flex flex-col items-center justify-center bg-zinc-950/20 rounded-3xl border border-white/[0.03] p-4 lg:p-12 relative overflow-hidden bg-[radial-gradient(#161618_1px,transparent_1px)] [background-size:20px_20px]">
           
           {/* Marques de visée esthétiques */}
           <div className="absolute top-4 left-4 text-[9px] font-mono text-zinc-700 select-none tracking-widest hidden sm:block">_LAB_RENDER_v4.2</div>
           <div className="absolute bottom-4 right-4 text-[9px] font-mono text-zinc-700 select-none tracking-widest hidden sm:block">GRID_ACTIVE</div>

           <div className="relative transform scale-100 md:scale-105 lg:scale-120 transition-transform duration-300 w-full flex justify-center">
              {/* Lueurs floues adaptatives */}
              <div className="absolute -inset-10 bg-black/40 rounded-full blur-3xl pointer-events-none"></div>
              <div className={`absolute -inset-4 bg-gradient-to-br ${getDynamicGlow()} rounded-full blur-2xl opacity-80 transition-all duration-700 pointer-events-none`}></div>
              
              {/* Le cadre de l'étiquette */}
              <div className={`relative p-1.5 rounded-xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] border transition-all duration-500 w-full max-w-xs sm:max-w-none ${
                bgType === 'vintage-paper' 
                  ? 'bg-amber-950/20 border-amber-800/20' 
                  : 'bg-zinc-900/90 border-white/10 ring-1 ring-black/50'
              }`}>
                <LabelPreview />
              </div>
           </div>

           <p className="text-center text-[9px] text-zinc-600 font-bold uppercase tracking-[0.35em] mt-4 lg:mt-12 select-none hidden sm:block">
             Rendu de production haute fidélité
           </p>
        </div>

        {/* ⚙️ PANNEAU DE CONTRÔLE (Placé en dessous sur mobile grâce à order-2, hauteur fluide h-auto) */}
        <div className="order-2 lg:order-1 lg:col-span-5 w-full bg-zinc-900/40 backdrop-blur-3xl border border-white/[0.05] rounded-3xl h-auto lg:h-[calc(100vh-140px)] min-h-0 lg:min-h-[500px] overflow-hidden shadow-2xl shadow-black/80 flex flex-col relative">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_0%,rgba(0,0,0,0)_60%)] pointer-events-none"></div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 relative">
            {activeTab === 'edit' ? <EditorPanel /> : <HistoryPanel />}
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;