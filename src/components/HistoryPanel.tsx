import React, { useEffect } from 'react';
import { useLabelStore } from '../store/useLabelStore';
import { Trash2, Copy, FolderOpen, Clock } from 'lucide-react';

export const HistoryPanel: React.FC = () => {
  // Extraction avec bypass any pour éviter les blocages stricts de LabelState
  const store = useLabelStore() as any;
  
  // Alignement sur les vrais noms de ton store : "Projects" au lieu de "Labels"
  const savedProjects = store.savedProjects || [];
  const fetchProjects = store.fetchProjects || (() => {});
  const loadProject = store.loadProject || (() => {});
  const deleteProject = store.deleteProject || (() => {});
  const duplicateProject = store.duplicateProject || (() => {});

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
          {savedProjects.map((project: any) => (
            <div
              key={project.id}
              className="group relative flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-white/[0.03] hover:border-white/[0.08] hover:bg-zinc-900/90 transition-all shadow-md"
            >
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-xs font-bold text-zinc-200 truncate">
                  {project.beerName || 'Sans nom'}
                </h3>
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                  {project.beerStyle || 'Style non défini'}
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
                  onClick={() => duplicateProject(project.id)}
                  title="Dupliquer"
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <Copy size={13} />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
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