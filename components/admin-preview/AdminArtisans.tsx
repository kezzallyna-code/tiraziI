import React, { useState } from 'react';

interface ArtisanItem {
  id: string;
  name: string;
  specialization: string;
  wilaya: string;
  verified: boolean;
  portfolioCount: number;
}

export function AdminArtisans({ triggerToast }: { triggerToast: (msg: string) => void }) {
  const [artisans, setArtisans] = useState<ArtisanItem[]>([
    { id: "art-1", name: "Yasmine Oualid", specialization: "Embroidery Artist", wilaya: "Tlemcen", verified: true, portfolioCount: 8 },
    { id: "art-2", name: "Rachid Meziane", specialization: "Leather Craft Master", wilaya: "Oran", verified: true, portfolioCount: 5 },
    { id: "art-3", name: "Fatima Bouhired", specialization: "Silk Weaver", wilaya: "Ghardaia", verified: false, portfolioCount: 3 },
    { id: "art-4", name: "Mourad Belkaid", specialization: "Traditional Tailoring", wilaya: "Constantine", verified: false, portfolioCount: 12 },
  ]);

  const handleVerify = (id: string) => {
    setArtisans(prev => prev.map(art => {
      if (art.id === id) {
        const nextState = !art.verified;
        triggerToast(nextState ? `${art.name} verified successfully.` : `${art.name} verification status revoked.`);
        return { ...art, verified: nextState };
      }
      return art;
    }));
  };

  return (
    <div className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 shadow-sm space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-primary font-serif">Artisans Review</h3>
        <p className="font-body-md text-on-surface-variant mt-1">Verify artisan credentials and explore active portfolio setups.</p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant/80 font-label-md">
              <th className="pb-3 pl-2">Artisan</th>
              <th className="pb-3">Specialization</th>
              <th className="pb-3">Wilaya</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-center">Portfolio Count</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface">
            {artisans.map((art) => (
              <tr key={art.id} className="hover:bg-surface-container/10">
                <td className="py-4 pl-2 font-bold">{art.name}</td>
                <td className="py-4 text-on-surface-variant">{art.specialization}</td>
                <td className="py-4 text-on-surface-variant">{art.wilaya}</td>
                <td className="py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    art.verified ? 'bg-primary/10 text-primary' : 'bg-outline-variant/30 text-on-surface-variant/70'
                  }`}>
                    {art.verified && <span className="material-symbols-outlined text-[12px]" data-weight="fill">verified</span>}
                    {art.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="py-4 text-center font-mono font-medium">{art.portfolioCount} items</td>
                <td className="py-4 text-right pr-2 space-x-2">
                  <button 
                    onClick={() => handleVerify(art.id)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-bold border transition-colors ${
                      art.verified 
                        ? 'bg-transparent text-on-surface-variant border-outline-variant hover:bg-surface-container'
                        : 'bg-primary text-on-primary border-primary hover:bg-primary-dark shadow-sm'
                    }`}
                  >
                    {art.verified ? 'Revoke Verify' : 'Verify'}
                  </button>
                  <button 
                    onClick={() => triggerToast("Admin action preview only.")}
                    className="px-3 py-1.5 bg-transparent hover:bg-surface-container border border-outline-variant rounded-lg text-[12px] font-bold text-on-surface-variant transition-colors"
                  >
                    View Profile
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
