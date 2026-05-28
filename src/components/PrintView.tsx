import React from 'react';
import { useLabelStore } from '../store/useLabelStore';
import { LabelPreview } from './LabelPreview';
import { ArrowLeft, Printer } from 'lucide-react';

export const PrintView: React.FC = () => {
  const { setActiveTab } = useLabelStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-900 text-white flex flex-col print:absolute print:inset-auto print:bg-white print:text-black">
      
      {/* BARRE D'OUTILS (Toujours visible à l'écran, masquée sur le papier grâce à print:hidden) */}
      <div className="p-4 bg-zinc-950 border-b border-white/[0.05] flex items-center justify-between shadow-lg print:hidden relative z-10">
        <button
          onClick={() => setActiveTab('edit')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft size={14} />
          Retour à l'éditeur
        </button>
        
        <div className="text-center">
          <h1 className="text-sm font-bold tracking-wide">Planche de Production</h1>
          <p className="text-[10px] text-zinc-500 font-medium">Grille de 6 étiquettes (2x3)</p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer"
        >
          <Printer size={14} className="stroke-[2.5]" />
          Lancer l'impression
        </button>
      </div>

      {/* ZONE DE VISUALISATION : Montre la feuille blanche A4 dans l'application */}
      <div className="flex-1 overflow-y-auto bg-zinc-800/30 p-8 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible">
        
        {/* Le rectangle A4 blanc visible à l'écran */}
        <div className="bg-white text-black p-[20mm] shadow-2xl rounded-sm w-[210mm] min-h-[297mm] grid grid-cols-2 gap-x-[15mm] gap-y-[20mm] justify-items-center content-start print:shadow-none print:p-0 print:m-0 print:w-full print:min-h-0">
          <LabelPreview scale={1} />
          <LabelPreview scale={1} />
          <LabelPreview scale={1} />
          <LabelPreview scale={1} />
          <LabelPreview scale={1} />
          <LabelPreview scale={1} />
        </div>
      </div>
    </div>
  );
};
