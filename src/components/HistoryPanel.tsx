import React, { useEffect } from 'react';
import { useLabelStore } from '../store/useLabelStore';
import { Trash2, Copy, FolderOpen, Clock } from 'lucide-react';

export const HistoryPanel: React.FC = () => {
  // On extrait les vraies fonctions typées de ton store (plus besoin de "as any")
  const { 
    savedProjects, 
    loadHistory, 
    loadProject, 
    deleteFromHistory,
    updateLabel,
    saveToHistory
  } = useLabelStore();

  // Charge l'historique de la base de données Dexie au montage du composant
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Petite fonction locale pour gérer la duplication (vu qu'elle n'est pas dans ton store)
  const handleDuplicate = async (project: any) => {
    if (!project) return;
    try {
      // 1. On injecte les données du projet dans l'éditeur
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
      // 2. On déclenche la sauvegarde dans Dexie
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
                {/* Correction ici : project.name au lieu de project.beerName */}
                <h3 className="text-xs font-bold text-zinc-200 truncate">
                  {project.name || 'Sans nom'}
                </h3>
                {/* Correction ici : project.style au lieu de project.beerStyle */}
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                  {project.style || 'Style non défini'}
                </p>
              </div>

              <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => loadProject(project)}
                  title="Ouvrir dans l'éditeur"
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <FolderOpen size={13} />
                </button>
                
                <button
                  onClick={() => handleDuplicate(project)}
                  title="Dupliquer"
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <Copy size={13} />
                </button>
                
                <button
                  {/* Correction ici : deleteFromHistory au lieu de deleteProject */}
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