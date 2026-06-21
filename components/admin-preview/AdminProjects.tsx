import React, { useState } from 'react';

interface ProjectItem {
  id: string;
  title: string;
  author: string;
  category: string;
  wilaya: string;
  date: string;
  status: 'Visible' | 'Hidden';
}

export function AdminProjects({ triggerToast }: { triggerToast: (msg: string) => void }) {
  const [projects, setProjects] = useState<ProjectItem[]>([
    { id: "p-1", title: "Looking for Modéliste", author: "Maison de Couture", category: "Pattern Making", wilaya: "Algiers", date: "Oct 18, 2023", status: "Visible" },
    { id: "p-2", title: "Authentic Ghardaia Weaver", author: "Studio M'zab", category: "Silk Weaving", wilaya: "Ghardaia", date: "Oct 19, 2023", status: "Visible" },
    { id: "p-3", title: "Fetla Embroidery Expert", author: "Couture Palace", category: "Embroidery", wilaya: "Constantine", date: "Oct 20, 2023", status: "Visible" },
    { id: "p-4", title: "Bulk Linen Sourcing", author: "LinenCraft", category: "Leather Work", wilaya: "Oran", date: "Oct 21, 2023", status: "Hidden" },
  ]);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const toggleHide = (id: string) => {
    setProjects(prev => prev.map(proj => {
      if (proj.id === id) {
        const nextStatus = proj.status === 'Visible' ? 'Hidden' : 'Visible';
        triggerToast(`Project status set to ${nextStatus}.`);
        return { ...proj, status: nextStatus };
      }
      return proj;
    }));
  };

  const handleRemove = (id: string) => {
    const proj = projects.find(p => p.id === id);
    if (proj) {
      setProjects(prev => prev.filter(p => p.id !== id));
      triggerToast(`Project "${proj.title}" has been removed.`);
    }
    setConfirmDeleteId(null);
  };

  return (
    <div className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 shadow-sm space-y-6 animate-in fade-in duration-300 relative">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-primary font-serif">Project Moderation</h3>
        <p className="font-body-md text-on-surface-variant mt-1">Review active project requests and hide/remove inappropriate requests.</p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant/80 font-label-md">
              <th className="pb-3 pl-2">Project</th>
              <th className="pb-3">Author</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Wilaya</th>
              <th className="pb-3">Published</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-surface-container/10">
                <td className="py-4 pl-2 font-bold max-w-[200px] truncate">{proj.title}</td>
                <td className="py-4 text-on-surface-variant">{proj.author}</td>
                <td className="py-4 text-on-surface-variant">{proj.category}</td>
                <td className="py-4 text-on-surface-variant">{proj.wilaya}</td>
                <td className="py-4 text-on-surface-variant">{proj.date}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    proj.status === 'Visible' ? 'bg-green-100 text-green-800' : 'bg-outline-variant/40 text-on-surface-variant/70'
                  }`}>
                    {proj.status}
                  </span>
                </td>
                <td className="py-4 text-right pr-2 space-x-1">
                  <button 
                    onClick={() => triggerToast("Admin action preview only.")}
                    className="px-2 py-1 bg-transparent hover:bg-surface-container border border-outline-variant rounded-lg text-[12px] font-bold text-on-surface-variant transition-colors"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => toggleHide(proj.id)}
                    className="px-2 py-1 bg-transparent hover:bg-surface-container border border-outline-variant rounded-lg text-[12px] font-bold text-on-surface-variant transition-colors"
                  >
                    {proj.status === 'Visible' ? 'Hide' : 'Show'}
                  </button>
                  <button 
                    onClick={() => setConfirmDeleteId(proj.id)}
                    className="px-2 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-[12px] font-bold text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-[24px] border border-outline-variant/30 shadow-2xl max-w-sm w-full space-y-4">
            <h4 className="font-title-lg text-title-lg text-primary font-serif">Remove Project?</h4>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              Are you sure you want to permanently remove this project? This action cannot be undone in this session.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border border-outline-variant rounded-full text-[12px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleRemove(confirmDeleteId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-[12px] font-bold shadow-md transition-colors"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
