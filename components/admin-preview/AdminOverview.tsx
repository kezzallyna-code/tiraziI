import React from 'react';

export function AdminOverview() {
  const kpis = [
    { title: "Total Users", value: "1,842", trend: "+14% this month", icon: "group", color: "text-primary bg-primary/10" },
    { title: "Active Users", value: "1,802", trend: "98% activity rate", icon: "check_circle", color: "text-green-700 bg-green-500/10" },
    { title: "Banned Users", value: "4", trend: "Permanent bans", icon: "block", color: "text-red-700 bg-red-500/10" },
    { title: "Pending Posts", value: "12", trend: "Needs audit", icon: "hourglass_empty", color: "text-yellow-700 bg-yellow-500/10" },
    { title: "Approved Posts", value: "878", trend: "Live in feed", icon: "fact_check", color: "text-secondary bg-secondary/10" },
    { title: "Reported Content", value: "3", trend: "Action required", icon: "gavel", color: "text-error bg-error/10" },
    { title: "Pending Verifications", value: "8", trend: "Artisan requests", icon: "assignment_ind", color: "text-tertiary bg-tertiary/10" },
    { title: "Active Categories", value: "8", trend: "Project categories", icon: "category", color: "text-accent bg-accent/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="font-headline-md text-headline-md text-primary font-serif mb-2">Platform Overview</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Monitor platform metrics, moderate user activity, and approve verified artisans.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="font-label-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-1.5">{kpi.title}</p>
              <h3 className="font-headline-sm text-primary font-bold">{kpi.value}</h3>
              <p className="text-[11px] text-on-surface-variant/50 mt-1.5 font-medium">{kpi.trend}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.color}`}>
              <span className="material-symbols-outlined text-[24px]">{kpi.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
