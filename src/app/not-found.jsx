"use client";

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-slate-950 py-20 text-slate-200 font-mono relative overflow-hidden flex items-center justify-center">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-md px-4 relative z-10 text-center">
        
        <div className="relative rounded-2xl p-[1px] overflow-hidden bg-gradient-to-r from-slate-800 via-red-500/40 to-slate-800 shadow-2xl">
          
          <div className="relative rounded-2xl bg-slate-950/90 p-10 backdrop-blur-xl">
            
            <div className="text-6xl font-extrabold tracking-widest text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-bounce">
              404
            </div>

            <h1 className="mt-6 text-lg font-bold tracking-wider text-white uppercase">
              !! ROUTE_NOT_ALLOCATED !!
            </h1>
            
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              The application layer terminated the execution sequence because the targeted virtual path does not exist in the database router.
            </p>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-block rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3 text-xs font-bold text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
              >
                [ RETURN_TO_BASE_ROOT ]
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
