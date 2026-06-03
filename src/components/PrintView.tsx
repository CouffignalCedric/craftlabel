import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LabelPreview } from './LabelPreview';

interface PrintViewProps {
  onClose: () => void; // Fonction indispensable appelée pour fermer la vue
}

export const PrintView: React.FC<PrintViewProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 1000); // Laisse 1 seconde complète aux images et polices pour s'installer
    return () => clearTimeout(timer);
  }, []);

  const handleBack = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const printContent = (
    <div className="fixed inset-0 z-[999999] bg-zinc-950 overflow-y-auto print:absolute print:inset-auto print:top-0 print:left-0 print:w-[210mm] print:h-[297mm] print:p-[12mm_10mm] print:bg-white print:overflow-visible">
      
      <style>{`
        @page { 
          size: A4 portrait; 
          margin: 0mm !important; 
        }
        
        @media print {
          #root, [data-v-app], .app-layout-container, .no-print {
            display: none !important;
          }

          html, body {
            background: white !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          * { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
        }
      `}</style>

      {/* 🛠️ BARRE DE NAVIGATION ÉCRAN (Sécurisée à 100% pour le clic et le tactile iPhone) */}
      <div className="no-print sticky top-0 z-[1000000] bg-zinc-900/95 backdrop-blur border-b border-zinc-800 px-4 py-3 flex justify-between items-center w-full shadow-lg select-none">
        <button 
          onClick={handleBack}
          onTouchEnd={handleBack}
          className="flex items-center gap-2 text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors tap-highlight-transparent"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          ← Retour à l'éditeur
        </button>
        
        <button 
          onClick={() => window.print()} 
          onTouchEnd={(e) => { e.preventDefault(); window.print(); }}
          className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-500 text-white px-5 py-2 rounded-xl text-sm font-black cursor-pointer shadow-md transition-colors tap-highlight-transparent"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          Imprimer
        </button>
      </div>

      {/* 🏁 LA GRILLE A4 IMMUNISÉE */}
      <div className="mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-transparent max-w-[190mm] p-4 print:p-0 print:mt-0 print:max-w-none print:grid print:grid-cols-2 print:gap-[6mm_4mm]">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="w-full aspect-[95/70] max-w-[95mm] h-[70mm] bg-zinc-900/20 rounded-xl flex items-center justify-center overflow-hidden mx-auto print:bg-transparent print:rounded-none print:w-[95mm] print:h-[70mm] print:break-inside-avoid"
          >
            <div className="transform scale-100 print:scale-[0.90] origin-center">
              <LabelPreview />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return createPortal(printContent, document.body);
};