import React from 'react';
import Link from 'next/link';

export function UpgradePromptCard() {
  return (
    <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-md transition-shadow">
      <div className="space-y-2 max-w-xl">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">trending_up</span>
          <h3 className="font-title-lg text-sm text-primary font-bold">Grow your visibility</h3>
        </div>
        <p className="text-[12px] text-on-surface-variant leading-relaxed">
          You are currently on the <span className="font-bold text-primary">Free plan</span>. Upgrade to Premium Basic or Premium Pro to unlock more portfolio space, enhanced search visibility, visitor insights, and advanced analytics.
        </p>
      </div>

      <Link
        href="/subscriptions"
        className="px-6 py-3 bg-primary hover:bg-primary-dark text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap text-center"
      >
        View Plans
      </Link>
    </div>
  );
}
