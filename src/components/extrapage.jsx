"use client";

import React from 'react';

export default function ExtraPage() {
  return (
    <div className="w-full bg-slate-950 font-mono text-slate-200">
      
      <div className="w-full py-16 border-b border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-wider text-white">// PLATFORM_METRICS</h2>
            <p className="mt-2 text-xs text-slate-500">Real-time telemetry of validated startup clusters.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 text-center backdrop-blur-sm">
              <p className="text-3xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]">1,200+</p>
              <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Ideas</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 text-center backdrop-blur-sm">
              <p className="text-3xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]">450+</p>
              <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Validated</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 text-center backdrop-blur-sm">
              <p className="text-3xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]">8,900+</p>
              <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Innovators</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 text-center backdrop-blur-sm">
              <p className="text-3xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]">$1.5M+</p>
              <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Budgets Tracked</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-16 border-b border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-wider text-white">// EXECUTION_PIPELINE</h2>
            <p className="mt-2 text-xs text-slate-500">Structured workflow for core architectural expansion.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 border border-slate-900 bg-slate-900/10 rounded-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-green-500/20 text-sm font-bold text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                01
              </div>
              <h3 className="mt-4 text-base font-bold text-white tracking-wide">Submit Concept</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Initialize parameters, define target audiences, problem scopes, and solutions via secure console nodes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-slate-900 bg-slate-900/10 rounded-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-green-500/20 text-sm font-bold text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                02
              </div>
              <h3 className="mt-4 text-base font-bold text-white tracking-wide">Community Telemetry</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Receive real-time iterative validation data packets and qualitative code observations from global founders.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-slate-900 bg-slate-900/10 rounded-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-green-500/20 text-sm font-bold text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                03
              </div>
              <h3 className="mt-4 text-base font-bold text-white tracking-wide">Refine Allocation</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Mutate configuration metrics over dynamic iterations to establish robust architecture scaling readiness.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
