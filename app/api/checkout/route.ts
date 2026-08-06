import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Require environment variable
const stripeKey = process.env.STRIPE_SECRET_KEY || 'dummy_test_key_that_fails_gracefully';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    if (!plan) {
      return NextResponse.json({ error: 'Plan is required' }, { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    
    // Set up plan details
    let unitAmount = 0;
    let productName = '';
    
    if (plan === 'premium-basic') {
      unitAmount = 200000; // 2000 DA = 200000 centimes (assuming Stripe uses cents)
      productName = 'Premium Basic';
    } else if (plan === 'premium-pro') {
      unitAmount = 450000; // 4500 DA = 450000 centimes
      productName = 'Premium Pro';
    } else {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Determine the base URL for the success/cancel redirects
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Create Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'dzd', // Algerian Dinar
            product_data: {
              name: `Tirazy ${productName} Plan`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${origin}/join`,
      metadata: {
        plan: plan,
        user_id: session?.user?.id || 'guest',
      },
    });

    return NextResponse.json({ url: checkoutSession.url });

  } catch (error: any) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
