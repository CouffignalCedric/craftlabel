import React, { useEffect } from 'react';
import { useLabelStore } from '../store/useLabelStore';
import { Trash2, Copy, FolderOpen, Clock } from 'lucide-react';

export const HistoryPanel: React.FC = () => {
  // Extraction propre des fonctions du store
  const { 
    savedProjects, 
    loadHistory, 
    loadProject, 
    deleteFromHistory,
    updateLabel,
    saveToHistory
  } = useLabelStore();

  // Chargement de l'historique au montage du panneau
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Fonction locale pour cloner / dupliquer un projet
  const handleDuplicate = async (project: any) => {
    if (!project) return;
    try {
      updateLabel({
        name: `${project.name} (Copie)`,
        subtitle: project.subtitle,
        style: project.style,
        brewery: project.brewery,
        abv: project.abv,
        ibu: project.ibu,
        ebc: project.ebc,
        volume: project.volume,
        description: project.description,
        logoText: project.logoText,
        templateId: project.templateId,
        bgType: project.bgType,
        primaryColor: project.primaryColor,
        textColor: project.textColor,
        backgroundColor: project.backgroundColor
      });
      await saveToHistory();
    } catch (error) {
      console.error("Échec de la duplication :", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-white/[0.05]">
        <Clock size={16} className="text-zinc-500" />
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Historique des créations
        </h2>
      </div>

      {savedProjects.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20">
          <p className="text-xs text-zinc-500 font-medium">Aucun projet sauvegardé pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {savedProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-white/[0.03] hover:border-white/[0.08] hover:bg-zinc-900/90 transition-all shadow-md"
            >
              <div className="flex-1 min-w-0 pr-4">
                {/* Affiche correctement le nom de la bière stocké dans la DB */}
                <h3 className="text-xs font-bold text-zinc-200 truncate">
                  {project.name || 'Sans nom'}
                </h3>
                {/* Affiche correctement le style de la bière stocké dans la DB */}
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                  {project.style || 'Style non défini'}
                </p>
              </div>

              <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                {/* Ouvrir */}
                <button
                  onClick={() => loadProject(project)}
                  title="Ouvrir dans l'éditeur"
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <FolderOpen size={13} />
                </button>
                
                {/* Dupliquer */}
                <button
                  onClick={() => handleDuplicate(project)}
                  title="Dupliquer"
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <Copy size={13} />
                </button>
                
                {/* Supprimer (Lié à la bonne action) */}
                <button
                  onClick={() => project.id && deleteFromHistory(project.id)}
                  title="Supprimer"
                  className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};