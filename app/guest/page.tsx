import React from 'react';
import Link from 'next/link';
import { GuestArtisanPreview } from '@/components/guest/GuestArtisanPreview';
import { GuestProjectPreview } from '@/components/guest/GuestProjectPreview';
import { GuestCommunityPreview } from '@/components/guest/GuestCommunityPreview';
import { initialMockArtisans, initialMockPosts } from '@/components/explore/mockExploreData';

// Local mock projects to avoid modifying any existing files
const mockProjects = [
  {
    id: "proj-1",
    title: "Looking for Modéliste",
    category: "Pattern Making",
    artisanName: "Maison de Couture",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOUy3fCNkF_b4p3zgvCKu4yBLJKTRJh9GBTvwJMHFYjALFuGq4J856vdp-s2Bo49TcIg0Yw-quv8UahWhZb4vqKuXDNQH5Fvucv3huBay-RP32toSmiD4ROeOVsWbPQ3nkrpqrCe8rVkyviCeuuBrsx1WHg3BHZ16O3IkLXgtRuotJ7kzVEymCCbKVPZ1RbNhd_HaIjnYzrgQ7juvlgh0nrjOj41LmR-G1Cx2KaNVKVEWciyScaJhwKhm-0-hog5yzAwtWLtYZT2k",
  },
  {
    id: "proj-2",
    title: "Authentic Ghardaia Weaver",
    category: "Silk Weaving",
    artisanName: "Studio M'zab",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqmR38wKUArH1jCI6hvkULy8Krkd9kcXLt7w89-lyhohqe3Yj5cgDpVY_xsxcJSnsKMwGbrsNZNQ7ORsMRlAj-jfdIswL3diyPgJLOv8AXUHHGkY1I-9Ee6qEnxUOZaIUZ_RBgjSDtbVkRZyhX2gPsHvbyUjfoHYbGtrLrbPIASoE1qI2eWqthbNViYeVluUhBMCWVVCAhlmlb2oM4gsHpTsw7-IrZtgsICGoqq50kHm1cj8fBn0t-i3VaOut4BdR_9P1n_pQPmVs",
  },
  {
    id: "proj-3",
    title: "Fetla Embroidery Expert",
    category: "Embroidery",
    artisanName: "Couture Palace",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnYNso6SqGYN9mbFQ3LMgtCorWbBUGboPNULEnpCBLVkFDFkO7BmmDWW58BVD6zW4YLDNWqsoDvDZR80mSFuvEleH2qC607ABF_pNEwpSwOa8W7Is_jOB6t3jkPaUabR-UuUsykXxC0cUWq62GVxwwUGpC6AdPHateWXuldMINlurJXr33u_Odj658W0C0Fh8OnU9wFMA-Qs_OOvvKbN7oXeWeU7cX8evBXVViYA8fTOQv-ph1rFo8Y2ZXA-hhX_spA8mklB2U2pg",
  }
];

export default function GuestPreviewPage() {
  // Taking first 3 mock artisans
  const displayArtisans = initialMockArtisans.slice(0, 3);
  
  // Taking first 2 mock posts
  const displayPosts = initialMockPosts.slice(0, 2);

  return (
    <div className="bg-background min-h-screen w-full pt-24 pb-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto space-y-12">
        
        {/* Guest Preview Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-surface-container-low rounded-[24px] border border-outline-variant/30 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-label-lg text-secondary font-bold uppercase tracking-wider">
              Guest Preview Mode
            </span>
          </div>
          <span className="text-[12px] text-on-surface-variant/70 italic">
            You are browsing TIRAZY as an unauthenticated visitor.
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto py-6">
          <h1 className="font-display-lg text-display-lg text-primary font-serif">
            Discover Algerian Textile Excellence
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Browse exceptional artisans, heritage craftsmanship, and contemporary fashion projects.
          </p>
        </div>

        {/* Section A: Browse Artisans */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
            <h2 className="font-headline-sm text-headline-sm text-primary font-serif">A. Featured Artisans</h2>
            <Link 
              href="/artisans" 
              className="px-6 py-2 bg-transparent border border-primary text-primary hover:bg-primary/5 rounded-full font-label-md text-label-md transition-all active:scale-95 flex items-center gap-2"
            >
              View Artisans
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArtisans.map((artisan) => (
              <GuestArtisanPreview key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </div>

        {/* Section B: Discover Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
            <h2 className="font-headline-sm text-headline-sm text-primary font-serif">B. Collaboration Projects</h2>
            <Link 
              href="/projects" 
              className="px-6 py-2 bg-transparent border border-primary text-primary hover:bg-primary/5 rounded-full font-label-md text-label-md transition-all active:scale-95 flex items-center gap-2"
            >
              Explore Projects
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project) => (
              <GuestProjectPreview key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Section C: Community Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          
          {/* Feed Preview */}
          <div className="space-y-6">
            <div className="border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-sm text-headline-sm text-primary font-serif">C. Community Feed Preview</h2>
            </div>
            <div className="space-y-6">
              {displayPosts.map((post) => (
                <GuestCommunityPreview key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Join Sidebar Panel */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-white dark:bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/30 shadow-md text-center space-y-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-primary font-serif">Join the Atelier</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Join TIRAZY to publish, interact, save inspirations, and connect with artisans.
              </p>
              <Link 
                href="/" 
                className="w-full bg-primary text-on-primary py-3 px-6 rounded-full font-label-md text-label-md hover:bg-primary-dark hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Create an Account
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
