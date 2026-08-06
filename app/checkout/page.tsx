"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Logo from '@/components/Logo';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'premium-basic';
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const planName = plan === 'premium-pro' ? 'Premium Pro' : 'Premium Basic';
  const planPrice = plan === 'premium-pro' ? '4,500 DA' : '2,000 DA';

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      router.push(`/checkout/success?session_id=mock_session_${Date.now()}&plan=${plan}`);
    }, 2000);
  };

  return (
    <div className="stitch-screen-wrapper bg-background min-h-screen w-full pt-28 pb-20 px-margin-mobile md:px-margin-desktop relative flex flex-col items-center justify-center">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Logo className="h-10 w-auto object-contain" />
        </Link>
      </div>

      <div className="max-w-4xl w-full flex flex-col lg:flex-row gap-8 z-10">
        
        {/* Left Side: Order Summary */}
        <div className="flex-1 bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30">
          <h2 className="font-headline-sm text-2xl text-primary font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
              <div>
                <p className="font-label-md text-lg text-on-surface font-bold">TIRAZY {planName}</p>
                <p className="text-sm text-on-surface-variant">Billed monthly</p>
              </div>
              <p className="font-title-lg text-xl text-primary font-bold">{planPrice}</p>
            </div>
            
            <div className="space-y-3 py-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                <p className="text-sm text-on-surface-variant">Enhanced professional visibility</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                <p className="text-sm text-on-surface-variant">Unlimited project uploads</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                <p className="text-sm text-on-surface-variant">Direct messaging with artisans</p>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
              <p className="font-label-md text-lg text-on-surface font-bold">Total due today</p>
              <p className="font-title-lg text-2xl text-primary font-bold">{planPrice}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="flex-[1.5] bg-white dark:bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-lg">
          <h2 className="font-headline-sm text-2xl text-primary font-bold mb-6">Payment Details</h2>
          <form onSubmit={handlePayment} className="space-y-6">
            
            <div className="space-y-2">
              <label className="font-label-md text-sm text-on-surface-variant">Name on Card</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary text-body-md" 
                placeholder="Ahmed Benali"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-sm text-on-surface-variant">Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-primary focus:border-primary text-body-md font-mono" 
                  placeholder="0000 0000 0000 0000"
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  credit_card
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-label-md text-sm text-on-surface-variant">Expiration Date</label>
                <input 
                  type="text" 
                  required
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary text-body-md font-mono" 
                  placeholder="MM/YY"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-sm text-on-surface-variant">CVC</label>
                <input 
                  type="text" 
                  required
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={4}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary text-body-md font-mono" 
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-primary text-white font-label-md text-label-md py-4 mt-4 rounded-full shadow-lg shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing Payment...' : `Pay ${planPrice}`}
              {!isProcessing && <span className="material-symbols-outlined text-[18px]">lock</span>}
            </button>
            <p className="text-center text-[12px] text-on-surface-variant pt-2 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              Payments are secure and encrypted
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
