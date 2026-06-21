import React from 'react';
import { AccessPreviewCard } from '@/components/access/AccessPreviewCard';

export default function AccessDemoPage() {
  return (
    <div className="bg-background min-h-screen w-full flex items-center justify-center py-20 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-5xl w-full text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-label-sm font-label-sm uppercase tracking-wider font-bold">
            Prototype Preview Mode
          </span>
          <h1 className="font-display-lg text-display-lg text-primary font-serif">
            TIRAZY Access Preview
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Choose a platform experience to preview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <AccessPreviewCard
            title="Guest Experience"
            description="Browse artisans, projects, and public community content in a read-only environment."
            linkText="Preview Guest"
            href="/guest"
            badge="Guest"
            icon="public"
            color="bg-outline-variant/30 text-on-surface-variant"
          />
          <AccessPreviewCard
            title="User Experience"
            description="Manage your profile, portfolio, saved posts, and interactive workspace."
            linkText="Preview User"
            href="/user"
            badge="Registered User"
            icon="person"
            color="bg-primary/15 text-primary"
          />
          <AccessPreviewCard
            title="Admin Experience"
            description="Moderate platform content, manage community verifications, and monitor platform logs."
            linkText="Preview Admin"
            href="/admin"
            badge="Administrator"
            icon="shield_person"
            color="bg-tertiary bg-primary/20 text-tertiary"
          />
        </div>

        <div className="pt-8 border-t border-outline-variant/20 max-w-lg mx-auto text-[13px] text-on-surface-variant/60 leading-normal">
          This demo showcases the frontend layout design for different user roles. Direct URL paths are left open for prototyping purposes without active database authentication restrictions.
        </div>
      </div>
    </div>
  );
}
