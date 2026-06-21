"use client";

import React from 'react';
import Link from 'next/link';
import { useExplore } from '@/components/explore/ExploreContext';
import { PostCard } from '@/components/explore/PostCard';

export default function FollowingPage() {
  const { posts, following, isInitialized } = useExplore();

  // Filter posts where authorId is in following
  const followingPosts = posts.filter((post) => following.includes(post.artisan.id));

  if (!isInitialized) {
    return (
      <div className="flex justify-center py-12">
        <span className="material-symbols-outlined text-primary text-[36px] animate-spin">
          progress_activity
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/30 shadow-sm">
        <h2 className="font-headline-md text-headline-md text-primary mb-1">Following</h2>
        <p className="font-body-md text-on-surface-variant">Posts from artisans and designers whose work you follow.</p>
      </div>

      {/* Feed list */}
      {followingPosts.length > 0 ? (
        <div className="space-y-6">
          {followingPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-surface-container-low p-12 rounded-[24px] border border-outline-variant/20 shadow-sm text-center">
          <span className="material-symbols-outlined text-on-surface-variant/30 text-[48px] mb-4">
            group
          </span>
          <h3 className="font-headline-sm text-[20px] text-on-surface mb-2">Your following feed is waiting for inspiration.</h3>
          <p className="font-body-md text-on-surface-variant max-w-sm mx-auto leading-relaxed mb-6">
            Follow textile professionals to see their work and updates here.
          </p>
          <Link
            href="/artisans"
            className="px-6 py-3 bg-primary text-on-primary rounded-full font-label-md shadow-sm hover:shadow-md hover:bg-primary-dark transition-all inline-block active:scale-95"
          >
            Discover Artisans
          </Link>
        </div>
      )}

    </div>
  );
}
