import React from 'react';
import Link from 'next/link';

interface AccessPreviewCardProps {
  title: string;
  description: string;
  linkText: string;
  href: string;
  badge: string;
  icon: string;
  color: string;
}

export function AccessPreviewCard({
  title,
  description,
  linkText,
  href,
  badge,
  icon,
  color,
}: AccessPreviewCardProps) {
  return (
    <div className="bg-white dark:bg-surface-container-low rounded-[32px] p-8 border border-outline-variant/20 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider ${color}`}>
            {badge}
          </span>
          <span className="material-symbols-outlined text-[32px] text-primary/70">{icon}</span>
        </div>
        <h3 className="font-display-md text-headline-sm text-primary mb-3 leading-tight font-serif">{title}</h3>
        <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">{description}</p>
      </div>
      <Link
        href={href}
        className="w-full bg-primary text-on-primary py-3 px-6 rounded-full font-label-md text-label-md hover:bg-primary-dark hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        {linkText}
        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </Link>
    </div>
  );
}
