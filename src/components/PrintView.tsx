import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LabelPreview } from './LabelPreview';

export const PrintView: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 1000); // Laisse 1 seconde complète aux images et polices pour s'installer
    return () => clearTimeout(timer);
  }, []);

  const printContent = (
    <div className="fixed inset-0 z-[999999] bg-zinc-950 overflow-y-auto p-4 print:absolute print:inset-auto print:top-0 print:left-0 print:w-[210mm] print:h-[297mm] print:p-[12mm_10mm] print:bg-white print:overflow-visible">
      
      <style>{`
        @page { 
          size: A4 portrait; 
          margin: 0mm !important; /* Pilotage des marges millimètre par millimètre en CSS */
        }
        
        @media print {
          /* 1. ON DISSOUT LE RESTE DU SITE (Zéro conflit de hauteur, zéro page blanche) */
          #root, [data-v-app], .app-layout-container {
            display: none !important;
          }

          /* 2. NETTOYAGE DU DOCUMENT PARENT */
          html, body {
            background: white !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* 3. FORÇAGE DES COULEURS D'ARRIÈRE-PLAN (Garantit les blocs orange/cyan) */
          * { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
        }
      `}</style>

      {/* Interface Écran (Masquée automatiquement sur le papier grâce à 'no-print') */}
      <div className="no-print mb-6 p-4 bg-zinc-900 text-white flex justify-between items-center rounded-2xl max-w-2xl mx-auto shadow-xl mt-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold">🖨️ Mode Impression Isolé (Technique du Portail)</span>
          <span className="text-xs text-zinc-400">Parfaitement protégé contre les effets de bords et les contraintes du site web.</span>
        </div>
        <button 
          onClick={() => window.print()} 
          className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-colors"
        >
          Relancer l'impression
        </button>
      </div>

      {/* 🏁 LA GRILLE A4 IMMUNISÉE */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 bg-transparent max-w-[190mm] print:max-w-none print:grid print:grid-cols-2 print:gap-[6mm_4mm]">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="w-full aspect-[95/70] max-w-[95mm] h-[70mm] bg-zinc-900/20 rounded-xl flex items-center justify-center overflow-hidden print:bg-transparent print:rounded-none print:w-[95mm] print:h-[70mm] print:break-inside-avoid"
          >
            {/* L'échelle à 0.90 est appliquée via une DIV parente en CSS pur. 
                Cela évite le crash de compilation TypeScript sur la prop "scale" vu sur l'image_583768.png */}
            <div className="transform scale-100 print:scale-[0.90] origin-center">
              <LabelPreview />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Au lieu de retourner le HTML dans le flux normal, on le parachute directement sur le document.body
  return createPortal(printContent, document.body);
};