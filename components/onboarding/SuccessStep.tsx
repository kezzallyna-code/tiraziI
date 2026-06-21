import React, { useEffect } from 'react';
import Link from 'next/link';
import { OnboardingData } from './types';

interface SuccessStepProps {
  data: OnboardingData;
}

export function SuccessStep({ data }: SuccessStepProps) {
  useEffect(() => {
    // Save the completed onboarding details in localStorage for preview purposes
    localStorage.setItem('tirazy_onboarding', JSON.stringify({
      ...data,
      completedAt: new Date().toISOString(),
      status: 'active',
      plan: data.selectedPlan || 'free'
    }));
    // Save selected plan
    localStorage.setItem('tirazy_selected_plan', data.selectedPlan || 'free');
  }, [data]);

  return (
    <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-500 max-w-md mx-auto">
      
      {/* Decorative success animation container */}
      <div className="relative w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary animate-bounce">
        <span className="material-symbols-outlined text-[48px] animate-pulse">
          verified
        </span>
        <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping"></div>
      </div>

      <div className="space-y-3">
        <h2 className="font-headline-sm text-headline-sm text-primary font-serif">
          Welcome to TIRAZY!
        </h2>
        <p className="font-title-lg text-[18px] text-secondary font-arabic italic" dir="rtl">
          طرازي هو العالم الذي يجمع بين محترفي النسيج والأزياء
        </p>
        <p className="font-body-md text-sm text-on-surface-variant/80 leading-relaxed">
          TIRAZY helps textile professionals showcase their work, find collaborators, and expand their professional network.
        </p>
      </div>

      {/* Profile Summary Card */}
      <div className="glass-card text-left p-6 rounded-2xl border border-outline-variant/30 bg-surface-container-low/40 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 bg-surface">
            <img src={data.avatarUrl} alt={data.fullName} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h4 className="font-title-lg text-sm text-on-surface font-bold truncate">
              {data.fullName}
            </h4>
            <p className="text-[12px] text-on-surface-variant/70 mt-0.5">
              {data.wilaya} &middot; {data.experience} Experience
            </p>
          </div>
        </div>

        {/* Roles */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/10">
          {data.roles.map((role) => (
            <span
              key={role}
              className="px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] rounded-full font-bold"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Bio */}
        <div className="text-[12px] text-on-surface-variant leading-relaxed italic bg-surface-container-lowest/50 p-3 rounded-lg border border-outline-variant/5">
          "{data.bio}"
        </div>
      </div>

      <div className="pt-2">
        <p className="font-label-md text-sm text-primary font-bold">
          Your selected plan: {data.selectedPlan === 'premium-pro' ? 'Premium Pro' : data.selectedPlan === 'premium-basic' ? 'Premium Basic' : 'Free'}
        </p>
      </div>

      {/* Primary Action */}
      <div className="space-y-4 pt-2">
        <Link
          href="/user"
          className="w-full bg-primary text-white font-label-md text-label-md py-4 rounded-full shadow-lg shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          Enter the Platform
          <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
        </Link>
        <p className="text-[11px] text-on-surface-variant/50">
          This redirects you to the User Preview dashboard.
        </p>
      </div>

    </div>
  );
}
