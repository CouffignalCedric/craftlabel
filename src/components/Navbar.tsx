import React from 'react';
import { useLabelStore } from '../store/useLabelStore';
import { PenTool, History, Printer, Beer } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab } = useLabelStore();

  return (
    <nav className="sticky top-0 z-50 w-full bg-craft-dark/80 backdrop-blur-md border-b border-white/[0.06] px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* LOGO BRANDING */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-gradient-to-br from-craft-amber to-craft-copper rounded-xl shadow-lg shadow-craft-copper/20 shrink-0">
          <Beer className="text-zinc-950 stroke-[2.5]" size={16} />
        </div>
        <div>
          <h1 className="text-sm font-black tracking-widest text-white uppercase leading-none">
            CRAFT<span className="text-craft-amber">LABEL</span>
          </h1>
          <p className="text-[9px] text-zinc-500 font-medium tracking-wider uppercase mt-0.5">Studio Édition</p>
        </div>
      </div>

      {/* NAVIGATION SEGMENTÉE */}
      <div className="flex bg-zinc-900/90 p-1 rounded-xl border border-white/[0.04] w-full sm:w-auto max-w-sm justify-between gap-1">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
            activeTab === 'edit'
              ? 'bg-zinc-800 text-white shadow-md shadow-black/40 ring-1 ring-white/[0.05]'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <PenTool size={13} />
          <span>Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
            activeTab === 'history'
              ? 'bg-zinc-800 text-white shadow-md shadow-black/40 ring-1 ring-white/[0.05]'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <History size={13} />
          <span>Projets</span>
        </button>

        <button
          onClick={() => setActiveTab('print')}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide text-emerald-400 hover:text-emerald-300 transition-all bg-emerald-500/[0.06] border border-emerald-500/10"
        >
          <Printer size={13} />
          <span>Imprimer</span>
        </button>
      </div>
    </nav>
  );
};