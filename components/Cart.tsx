'use client';

import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, CreditCard } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!stripePromise) {
      alert('Stripe is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.images[0],
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Checkout failed');

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl font-serif mb-6">Your cart is empty</h2>
        <p className="opacity-60 mb-8">お買い物をお楽しみください。</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-brand-ink text-brand-cream px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-olive transition-colors">
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-serif mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cart.map(item => (
            <div key={item.id} className="flex gap-6 pb-8 border-b border-brand-ink/10">
              <div className="w-24 sm:w-32 aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-serif">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-brand-ink/40 hover:text-red-500 transition-colors" type="button">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-sm opacity-60 mt-1">{item.category}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-brand-ink/10 rounded-full px-2 py-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-brand-olive" type="button">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-brand-olive" type="button">
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-medium">¥{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl sticky top-32">
            <h2 className="text-xl font-serif mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between opacity-60">
                <span>Subtotal</span>
                <span>¥{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between opacity-60">
                <span>Shipping</span>
                <span>¥1,200</span>
              </div>
              <div className="pt-4 border-t border-brand-ink/10 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>¥{(total + 1200).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full mt-8 bg-brand-ink text-brand-cream py-5 rounded-full flex items-center justify-center gap-3 uppercase tracking-widest text-xs font-bold hover:bg-brand-olive transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : (
                <>
                  <CreditCard size={18} />
                  Checkout with Stripe
                </>
              )}
            </button>

            <p className="text-[10px] text-center opacity-40 mt-6 uppercase tracking-widest">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
