import React from 'react';

export function AdminPlatformActivity() {
  const activities = [
    { text: "New artisan registered (Mourad Belkaid - Constantine).", time: "10 mins ago", icon: "person_add", color: "text-primary bg-primary/10" },
    { text: "A post was approved: “Fetla Embroidery Expert” by Couture Palace.", time: "1 hour ago", icon: "fact_check", color: "text-green-700 bg-green-500/10" },
    { text: "A post was reported for spam by Omar Mansour.", time: "2 hours ago", icon: "gavel", color: "text-error bg-error/10" },
    { text: "Artisan verification approved: Yasmine Oualid.", time: "1 day ago", icon: "verified", color: "text-secondary bg-secondary/10" },
    { text: "User Yanis Dris was suspended due to duplicate postings.", time: "1 day ago", icon: "block", color: "text-red-700 bg-red-500/10" },
    { text: "New category added: Bridal Couture.", time: "2 days ago", icon: "category", color: "text-accent bg-accent/10" },
  ];

  return (
    <div className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 shadow-sm space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-primary font-serif">Platform Activity Logs</h3>
        <p className="font-body-md text-on-surface-variant mt-1">Audit trail of administrator acts, member registrations, bans, approvals, and category updates.</p>
      </div>

      <div className="space-y-6 relative pl-4 border-l border-outline-variant/20 ml-2">
        {activities.map((act, index) => (
          <div key={index} className="relative flex gap-4 items-start">
            <span className="absolute -left-[27px] w-5 h-5 rounded-full bg-white dark:bg-surface-dim border border-outline-variant/30 flex items-center justify-center text-[12px] shadow-sm">
              <span className="material-symbols-outlined text-[12px]">{act.icon}</span>
            </span>
            <div className="min-w-0">
              <p className="text-sm text-on-surface leading-normal font-medium">{act.text}</p>
              <span className="text-[11px] text-on-surface-variant/40 mt-1 block">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
