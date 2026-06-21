import React, { useState } from 'react';

interface ReportItem {
  id: string;
  content: string;
  reason: string;
  reportedBy: string;
  date: string;
  status: 'Pending' | 'Dismissed' | 'Hidden' | 'Removed';
}

export function AdminReports({ triggerToast }: { triggerToast: (msg: string) => void }) {
  const [reports, setReports] = useState<ReportItem[]>([
    { id: "r-1", content: "Off-topic commercial spam advertisement link...", reason: "Spam", reportedBy: "Omar Mansour", date: "Oct 20, 2023", status: "Pending" },
    { id: "r-2", content: "Inappropriate language in project comment...", reason: "Harassment", reportedBy: "Lina Benyahia", date: "Oct 21, 2023", status: "Pending" },
  ]);

  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const handleAction = (id: string, action: 'Dismissed' | 'Hidden' | 'Removed') => {
    setReports(prev => prev.map(rep => {
      if (rep.id === id) {
        triggerToast(`${action === 'Dismissed' ? 'Report dismissed' : action === 'Hidden' ? 'Content hidden' : 'Content removed'} (preview only).`);
        return { ...rep, status: action };
      }
      return rep;
    }));
    setConfirmRemoveId(null);
  };

  return (
    <div className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 shadow-sm space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-primary font-serif">Community Reports</h3>
        <p className="font-body-md text-on-surface-variant mt-1">Audit flagged content items and enforce community guidelines.</p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant/80 font-label-md">
              <th className="pb-3 pl-2">Reported Content</th>
              <th className="pb-3">Reason</th>
              <th className="pb-3">Reported By</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface">
            {reports.map((rep) => (
              <tr key={rep.id} className="hover:bg-surface-container/10">
                <td className="py-4 pl-2 max-w-[200px] truncate text-[13px] italic text-on-surface-variant">"{rep.content}"</td>
                <td className="py-4 font-bold text-red-700">{rep.reason}</td>
                <td className="py-4 text-on-surface-variant">{rep.reportedBy}</td>
                <td className="py-4 text-on-surface-variant">{rep.date}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    rep.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    rep.status === 'Dismissed' ? 'bg-green-100 text-green-800' :
                    rep.status === 'Hidden' ? 'bg-gray-100 text-gray-700' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {rep.status}
                  </span>
                </td>
                <td className="py-4 text-right pr-2 space-x-1 whitespace-nowrap">
                  <button 
                    onClick={() => triggerToast("Admin action preview only.")}
                    className="px-2 py-1 bg-transparent hover:bg-surface-container border border-outline-variant rounded-lg text-[12px] font-bold text-on-surface-variant transition-colors"
                  >
                    Review
                  </button>
                  <button 
                    onClick={() => handleAction(rep.id, 'Dismissed')}
                    disabled={rep.status !== 'Pending'}
                    className={`px-2 py-1 border rounded-lg text-[12px] font-bold transition-colors ${
                      rep.status !== 'Pending' ? 'opacity-40 cursor-not-allowed border-outline-variant' : 'bg-transparent hover:bg-surface-container border-outline-variant'
                    }`}
                  >
                    Dismiss
                  </button>
                  <button 
                    onClick={() => handleAction(rep.id, 'Hidden')}
                    disabled={rep.status !== 'Pending'}
                    className={`px-2 py-1 rounded-lg text-[12px] font-bold transition-colors ${
                      rep.status !== 'Pending' ? 'opacity-40 cursor-not-allowed bg-gray-100/50 text-gray-400 border-outline-variant' : 'bg-transparent hover:bg-surface-container border border-outline-variant text-on-surface-variant'
                    }`}
                  >
                    Hide
                  </button>
                  <button 
                    onClick={() => setConfirmRemoveId(rep.id)}
                    disabled={rep.status !== 'Pending'}
                    className={`px-2 py-1 rounded-lg text-[12px] font-bold transition-colors ${
                      rep.status !== 'Pending' ? 'opacity-40 cursor-not-allowed bg-red-100/50 text-red-400 border-outline-variant' : 'bg-red-50 hover:bg-red-100 border border-red-200 text-red-700'
                    }`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal for removing reported content */}
      {confirmRemoveId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-[24px] border border-outline-variant/30 shadow-2xl max-w-sm w-full space-y-4">
            <h4 className="font-title-lg text-title-lg text-primary font-serif font-bold">Remove Flagged Content?</h4>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              Are you sure you want to permanently remove this reported content from the platform?
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                onClick={() => setConfirmRemoveId(null)}
                className="px-4 py-2 border border-outline-variant rounded-full text-[12px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleAction(confirmRemoveId, 'Removed')}
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
