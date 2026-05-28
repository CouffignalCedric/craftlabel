import React, { useEffect } from 'react';
import { useLabelStore } from '../store/useLabelStore';
import { Trash2, Clock } from 'lucide-react';

export const HistoryPanel: React.FC = () => {
  // On ne récupère plus que le strict nécessaire (plus besoin de dupliquer)
  const { 
    savedProjects, 
    loadHistory, 
    loadProject, 
    deleteFromHistory 
  } = useLabelStore();

  // Chargement de l'historique au montage du panneau
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

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
              // Rend toute la carte cliquable pour charger le projet
              onClick={() => loadProject(project)}
              className="group relative flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-white/[0.03] hover:border-amber-500/30 hover:bg-zinc-900/90 transition-all shadow-md cursor-pointer select-none"
            >
              <div className="flex-1 min-w-0 pr-4">
                {/* Le nom passe en ambre au survol de la carte pour indiquer l'action */}
                <h3 className="text-xs font-bold text-zinc-200 group-hover:text-amber-500 transition-colors truncate">
                  {project.name || 'Sans nom'}
                </h3>
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                  {project.style || 'Style non défini'}
                </p>
              </div>

              {/* Bloc bouton de droite */}
              <div className="flex items-center gap-1.5 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ⚠️ TRÈS IMPORTANT : Empêche l'ouverture du projet lors de la suppression
                    if (project.id) {
                      deleteFromHistory(project.id);
                    }
                  }}
                  title="Supprimer la création"
                  className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-all cursor-pointer"
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