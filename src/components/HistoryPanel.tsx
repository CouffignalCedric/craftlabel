import React, { useEffect } from 'react';
import { useLabelStore } from '../store/useLabelStore';
import { FolderOpen, Trash2, Copy, Calendar } from 'lucide-react';

export const HistoryPanel: React.FC = () => {
  const { savedProjects, fetchProjects, loadProject, deleteProject, duplicateProject } = useLabelStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4 overflow-y-auto pr-2">
      <div className="bg-craft-matte p-4 rounded-xl border border-white/5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-craft-copper flex items-center gap-2 mb-1">
          <FolderOpen size={14} /> Vos Créations Enregistrées
        </h3>
        <p className="text-zinc-500 text-[11px]">
          Retrouvez et gérez vos recettes d'étiquettes stockées localement dans votre navigateur.
        </p>
      </div>

      <div className="space-y-2.5">
        {savedProjects.length === 0 ? (
          <div className="text-center py-12 bg-craft-matte/30 rounded-xl border border-dashed border-white/10 text-zinc-500 text-xs">
            Aucune étiquette sauvegardée pour le moment.
          </div>
        ) : (
          savedProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-craft-matte/60 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4 hover:border-white/10 transition group"
            >
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate group-hover:text-craft-copper transition">
                  {project.name || "Sans nom"}
                </h4>
                <p className="text-xs text-zinc-400 truncate mt-0.5">{project.style} • {project.volume}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 mt-2">
                  <Calendar size={10} />
                  <span>Modifié le {formatDate(project.updatedAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => loadProject(project)}
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-craft-copper hover:text-white transition shadow-sm"
                  title="Ouvrir dans l'éditeur"
                >
                  <FolderOpen size={14} />
                </button>
                <button
                  onClick={() => duplicateProject(project)}
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition"
                  title="Dupliquer"
                >
                  <Copy size={14} />
                </button>
                <button
                  onClick={() => project.id && deleteProject(project.id)}
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-red-950 hover:text-red-400 transition"
                  title="Supprimer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};