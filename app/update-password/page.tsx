"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { createClient } from '@/utils/supabase/client';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const supabase = createClient();

  // Check if we have a session (user must be authenticated via the recovery link)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Invalid or expired password reset link.");
      }
    };
    checkSession();
  }, [supabase.auth]);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      setError(updateError.message);
      setIsLoading(false);
      return;
    }

    triggerToast('Password updated successfully.');

    // Redirect to login after 1.5 seconds
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  return (
    <div className="stitch-screen-wrapper bg-background min-h-screen flex items-center justify-center py-20 px-margin-mobile md:px-margin-desktop relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-label-md animate-in fade-in slide-in-from-bottom-4 duration-300">
          <span className="material-symbols-outlined text-[20px] text-primary">verified_user</span>
          {toastMessage}
        </div>
      )}

      {/* Top Left Logo Link */}
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Logo className="h-10 w-auto object-contain" />
        </Link>
      </div>

      <main className="w-full max-w-[1000px] flex gap-12 items-center justify-center">
        
        {/* Reset Password Form Panel */}
        <div className="flex-1 w-full max-w-md">
          <div className="glass-card rounded-[32px] p-8 border border-surface-container-high bg-white/75 backdrop-blur-md shadow-xl">
            
            <div className="mb-8">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                Update Password
              </h2>
              <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                Enter your new password below to regain access to your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                
                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">
                    New Password
                  </label>
                  <input
                    className="w-full rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-lowest py-3 px-4 font-body-md text-on-surface placeholder:text-outline/50 transition-all"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setError(null);
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="confirm_password">
                    Confirm Password
                  </label>
                  <input
                    className="w-full rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-lowest py-3 px-4 font-body-md text-on-surface placeholder:text-outline/50 transition-all"
                    id="confirm_password"
                    placeholder="••••••••"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setError(null);
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              {error && (
                <span className="text-xs text-error font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {error}
                </span>
              )}

              {/* Update Password Button */}
              <button
                className="w-full bg-primary text-white font-label-md text-label-md py-4 rounded-full shadow-lg shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>

          </div>
        </div>

      </main>

      {/* Background Amazigh Pattern */}
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
