"use client";

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function JoinPage() {
  const router = useRouter();

  const handlePlanClick = async (plan: string, e: React.MouseEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Save intent and redirect to register
      localStorage.setItem('tirazy_selected_plan', plan);
      router.push(`/register?plan=${plan}`);
      return;
    }
    
    if (plan === 'free') {
      router.push('/user');
      return;
    }

    // Redirect to the internal mock checkout page
    router.push(`/checkout?plan=${plan}`);
  };

  const benefits = [
    {
      title: 'Build Your Professional Profile',
      desc: 'Showcase your roles, experience, wilaya, biography, and portfolio.',
      icon: 'badge',
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'Share Your Work',
      desc: 'Publish textile projects, photos, videos, ideas, and professional updates.',
      icon: 'auto_awesome_motion',
      color: 'bg-secondary/10 text-secondary',
    },
    {
      title: 'Find the Right People',
      desc: 'Discover designers, artisans, ateliers, tailors, and collaborators across Algeria.',
      icon: 'groups',
      color: 'bg-tertiary/10 text-tertiary',
    },
    {
      title: 'Grow Your Visibility',
      desc: 'Appear in professional search results and build meaningful connections.',
      icon: 'trending_up',
      color: 'bg-primary/10 text-primary',
    },
  ];

  return (
    <div className="stitch-screen-wrapper bg-background min-h-screen w-full pt-28 pb-20 px-margin-mobile md:px-margin-desktop relative flex flex-col items-center justify-center">
      
      {/* Top Left Logo */}
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Logo className="h-10 w-auto object-contain" />
        </Link>
      </div>

      <div className="max-w-4xl w-full text-center space-y-12 z-10">
        {/* Hero Area */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-label-sm font-label-sm uppercase tracking-wider font-bold">
            Mediterranean Textile Hub
          </span>
          <h1 className="font-display-lg text-display-lg text-primary font-serif">
            Join TIRAZY
          </h1>
          <p className="font-title-lg text-lg text-secondary font-arabic italic" dir="rtl">
            طرازي هو العالم الذي يجمع بين محترفي النسيج والأزياء
          </p>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            The professional network for Algeria’s textile and fashion ecosystem. Create your profile, showcase your work, discover collaborators, and grow your professional network.
          </p>
        </div>

        {/* Benefits Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${benefit.color}`}>
                <span className="material-symbols-outlined text-[26px]">{benefit.icon}</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-title-lg text-sm text-primary font-bold">{benefit.title}</h3>
                <p className="text-[13px] text-on-surface-variant leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Plan Selection Section */}
        <div className="pt-8 space-y-8">
          <div className="space-y-2">
            <h2 className="font-headline-sm text-2xl text-primary font-bold">Choose how you want to grow on TIRAZY</h2>
            <p className="text-on-surface-variant text-sm max-w-lg mx-auto">
              Start free or choose the visibility that matches your ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {/* Free Plan */}
            <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:border-primary/50 transition-colors">
              <div className="space-y-2 mb-6">
                <h3 className="font-title-lg text-lg text-primary font-bold">Free</h3>
                <p className="text-[13px] text-on-surface-variant">Build Your Presence</p>
                <p className="text-2xl font-bold text-on-surface pt-2">0 DA <span className="text-xs text-on-surface-variant font-normal">/ month</span></p>
              </div>
              <button
                onClick={(e) => handlePlanClick('free', e)}
                className="w-full bg-surface-container-high text-on-surface font-label-md text-label-md py-3 rounded-full hover:bg-surface-container-highest active:scale-95 transition-all text-center border border-outline-variant/50"
              >
                Choose Free
              </button>
            </div>

            {/* Premium Basic Plan */}
            <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:border-primary/50 transition-colors relative">
              <div className="space-y-2 mb-6">
                <h3 className="font-title-lg text-lg text-primary font-bold">Premium Basic</h3>
                <p className="text-[13px] text-on-surface-variant">Get Discovered</p>
                <p className="text-2xl font-bold text-on-surface pt-2">2,000 DA <span className="text-xs text-on-surface-variant font-normal">/ month</span></p>
                <p className="text-[10px] text-secondary italic mt-2 leading-tight">Secure credit card payment via Stripe Checkout.</p>
              </div>
              <button
                onClick={(e) => handlePlanClick('premium-basic', e)}
                className="w-full bg-primary/10 text-primary border border-primary/20 font-label-md text-label-md py-3 rounded-full hover:bg-primary hover:text-white active:scale-95 transition-all text-center"
              >
                Choose Basic
              </button>
            </div>

            {/* Premium Pro Plan */}
            <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl border-2 border-primary shadow-md flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                Most Popular
              </div>
              <div className="space-y-2 mb-6 mt-2">
                <h3 className="font-title-lg text-lg text-primary font-bold">Premium Pro</h3>
                <p className="text-[13px] text-on-surface-variant">Lead With Credibility</p>
                <p className="text-2xl font-bold text-on-surface pt-2">4,500 DA <span className="text-xs text-on-surface-variant font-normal">/ month</span></p>
                <p className="text-[10px] text-secondary italic mt-2 leading-tight">Secure credit card payment via Stripe Checkout.</p>
              </div>
              <button
                onClick={(e) => handlePlanClick('premium-pro', e)}
                className="w-full bg-primary text-white font-label-md text-label-md py-3 rounded-full shadow-lg hover:bg-primary-dark active:scale-95 transition-all text-center"
              >
                Choose Pro
              </button>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <Link
              href="/login"
              className="text-[14px] text-on-surface-variant hover:text-primary transition-colors flex justify-center items-center gap-1"
            >
              Already have an account? <span className="font-bold underline">Log In</span>
            </Link>
            <Link 
              href="/subscriptions" 
              className="text-[12px] text-on-surface-variant hover:text-primary underline font-medium transition-colors inline-block"
            >
              Compare all features
            </Link>
          </div>
        </div>

      </div>

      {/* Decorative Amazigh Pattern Background */}
      <div className="fixed bottom-0 right-0 p-12 opacity-5 hidden xl:block pointer-events-none">
        <svg fill="none" height="200" viewBox="0 0 100 100" width="200" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#076760" strokeWidth="2"></path>
          <path d="M50 15L85 50L50 85L15 50L50 15Z" stroke="#076760" strokeWidth="1"></path>
          <circle cx="50" cy="50" fill="#076760" r="5"></circle>
        </svg>
      </div>

    </div>
  );
}
