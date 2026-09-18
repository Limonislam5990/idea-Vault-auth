"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authClient } from '../../lib/auth-client';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "IdeaVault | Create Decentralized Identity";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoUrl,
      });

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google"
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-white/5 rounded-full blur-[110px] pointer-events-none animate-pulse"></div>
      <div className="w-full max-w-md px-4 relative z-10">
        <div className="relative rounded-2xl p-[1px] overflow-hidden bg-gradient-to-r from-slate-800 via-white/40 to-slate-800 shadow-2xl before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,#1e293b,transparent,#ffffff,#1e293b)] before:animate-[spin_7s_linear_infinite]">
          <div className="relative rounded-2xl bg-slate-950/90 p-8 backdrop-blur-xl">
            
            <div className="mb-6 text-center border-b border-slate-800/80 pb-6">
              <h1 className="text-xl font-bold tracking-wider text-white">// CREATE_IDENTITY</h1>
              <p className="mt-1 text-xs text-slate-500">Register a new user account profile in the central repository.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Full Name *</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="mt-1.5 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address *</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="mt-1.5 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Photo URL *</label>
                <input type="url" required value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://example.com" className="mt-1.5 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Password *</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1.5 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:outline-none transition-all" />
              </div>
              
              <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full rounded-xl bg-white py-3.5 text-center text-sm font-semibold text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-slate-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "PROCESSING..." : "[ INITIALIZE_REGISTRATION ]"}
                </button>
              </div>
            </form>

            <div className="mt-5 flex items-center justify-between border-t border-slate-900 pt-5">
              <span className="w-1/5 border-b border-slate-800"></span>
              <span className="text-xxs text-slate-600 uppercase tracking-widest">or provider</span>
              <span className="w-1/5 border-b border-slate-800"></span>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/40 py-3 text-sm font-medium text-white hover:bg-slate-900 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-900 pt-4">
              Already verified instance? <Link href="/login" className="text-white hover:underline">Sign in here</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}