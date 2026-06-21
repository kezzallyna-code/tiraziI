import React, { useState } from 'react';

interface VerificationRequestItem {
  id: string;
  applicant: string;
  specialization: string;
  wilaya: string;
  date: string;
  portfolioSnippet: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export function AdminVerificationRequests({ triggerToast }: { triggerToast: (msg: string) => void }) {
  const [requests, setRequests] = useState<VerificationRequestItem[]>([
    { id: "vr-1", applicant: "Fatima Bouhired", specialization: "Silk Weaver", wilaya: "Ghardaia", date: "Oct 18, 2023", portfolioSnippet: "3 active project drafts", status: "Pending" },
    { id: "vr-2", applicant: "Mourad Belkaid", specialization: "Traditional Tailoring", wilaya: "Constantine", date: "Oct 19, 2023", portfolioSnippet: "12 completed works", status: "Pending" },
  ]);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        triggerToast(`Applicant ${req.applicant} verification ${action.toLowerCase()}.`);
        return { ...req, status: action };
      }
      return req;
    }));
  };

  return (
    <div className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 shadow-sm space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-primary font-serif">Artisan Verification Requests</h3>
        <p className="font-body-md text-on-surface-variant mt-1">Verify submitted artisan portfolios and approve verification credentials.</p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant/80 font-label-md">
              <th className="pb-3 pl-2">Applicant</th>
              <th className="pb-3">Specialization</th>
              <th className="pb-3">Wilaya</th>
              <th className="pb-3">Submitted Date</th>
              <th className="pb-3">Portfolio Preview</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-surface-container/10">
                <td className="py-4 pl-2 font-bold">{req.applicant}</td>
                <td className="py-4 text-on-surface-variant">{req.specialization}</td>
                <td className="py-4 text-on-surface-variant">{req.wilaya}</td>
                <td className="py-4 text-on-surface-variant">{req.date}</td>
                <td className="py-4 font-medium text-[13px]">{req.portfolioSnippet}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    req.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="py-4 text-right pr-2 space-x-1">
                  <button 
                    onClick={() => handleAction(req.id, 'Approved')}
                    disabled={req.status !== 'Pending'}
                    className={`px-2 py-1 rounded-lg text-[12px] font-bold transition-colors ${
                      req.status !== 'Pending' ? 'opacity-40 cursor-not-allowed border-outline-variant' : 'bg-primary text-on-primary border-primary hover:bg-primary-dark shadow-sm'
                    }`}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, 'Rejected')}
                    disabled={req.status !== 'Pending'}
                    className={`px-2 py-1 rounded-lg text-[12px] font-bold transition-colors ${
                      req.status !== 'Pending' ? 'opacity-40 cursor-not-allowed border-outline-variant' : 'bg-red-50 hover:bg-red-100 border border-red-200 text-red-700'
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
