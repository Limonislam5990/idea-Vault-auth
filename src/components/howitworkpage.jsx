"use client";

import React from 'react';
import { MessageSquare, Search, TrendingUp, Bookmark } from 'lucide-react';

const capabilities = [
  {
    icon: MessageSquare,
    title: "Comment & Discuss",
    description: "Engage directly on any idea — add feedback, edit or delete your own comments, and help founders refine their concepts.",
  },
  {
    icon: Search,
    title: "Search & Filter",
    description: "Instantly find ideas by title, or filter by category and date range to zero in on exactly what interests you.",
  },
  {
    icon: TrendingUp,
    title: "Trending Algorithm",
    description: "Ideas are ranked by real engagement — likes and recent activity — so the best concepts naturally rise to the top.",
  },
  {
    icon: Bookmark,
    title: "Bookmark Ideas",
    description: "Save concepts you want to revisit later and build your own curated shortlist of promising startups.",
  },
];

export default function HowItWorkPage() {
  return (
    <div className="w-full bg-slate-950 py-16 border-b border-slate-900 font-mono text-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-wider text-white">// CORE_CAPABILITIES</h2>
          <p className="mt-2 text-xs text-slate-500">Everything you need to validate and grow an idea, in one place.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-6 border border-slate-900 bg-slate-900/10 rounded-2xl hover:border-green-500/30 transition-all duration-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-green-500/20 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white tracking-wide">{title}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}