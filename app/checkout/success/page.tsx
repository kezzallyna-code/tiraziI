"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get('plan');
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const completeCheckout = async () => {
      if (!plan || !sessionId) {
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // Update user's subscription plan in the database
        const normalizedPlan = plan === 'premium-basic' ? 'premium_basic' : 'premium_pro';
        
        await supabase
          .from('profiles')
          .update({ subscription_plan: normalizedPlan })
          .eq('id', session.user.id);
      }
      
      setLoading(false);
    };

    completeCheckout();
  }, [plan, sessionId]);

  return (
    <div className="stitch-screen-wrapper bg-background min-h-screen w-full pt-28 pb-20 px-margin-mobile md:px-margin-desktop relative flex flex-col items-center justify-center">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Logo className="h-10 w-auto object-contain" />
        </Link>
      </div>

      <div className="max-w-xl w-full text-center space-y-8 z-10 bg-white dark:bg-surface-container-low p-12 rounded-[32px] border border-outline-variant/30 shadow-xl">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-primary text-5xl">
            check_circle
          </span>
        </div>
        
        {loading ? (
          <>
            <h1 className="font-headline-md text-3xl text-primary mb-4">Confirming Payment...</h1>
            <p className="text-on-surface-variant mb-8">Please wait while we set up your premium features.</p>
          </>
        ) : (
          <>
            <h1 className="font-headline-md text-3xl text-primary mb-4">Payment Successful!</h1>
            <p className="text-on-surface-variant mb-8">
              Welcome to the <span className="font-bold text-primary">{plan === 'premium-basic' ? 'Premium Basic' : 'Premium Pro'}</span> plan. Your professional profile has been upgraded.
            </p>
            <Link 
              href="/user" 
              className="inline-flex bg-primary text-white font-label-md px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Go to Dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <React.Suspense fallback={<div>Loading checkout success...</div>}>
      <CheckoutSuccessContent />
    </React.Suspense>
  );
}
