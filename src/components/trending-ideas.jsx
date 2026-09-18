"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const FALLBACK_TRENDING_DATA = [
  { id: "1", title: "EduAI Planner", category: "AI & Education", budget: "$5,000", target: "Teachers" },
  { id: "2", title: "MediTrack Wearable", category: "HealthTech", budget: "$12,000", target: "Elderly Patients" },
  { id: "3", title: "EcoGro Hydroponics", category: "AgriTech", budget: "$3,500", target: "Urban Farmers" },
  { id: "4", title: "FinFlow Micro-Loans", category: "FinTech", budget: "$20,000", target: "Small Businesses" },
  { id: "5", title: "SafeDrive Analytics", category: "IoT & Tech", budget: "$8,500", target: "Logistics Companies" },
  { id: "6", title: "DevConnect Platform", category: "Software Development", budget: "$2,000", target: "Junior Developers" }
];

export default function TrendingIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingIdeas = async () => {
      try {
        setLoading(true);
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${apiBase}/ideas?limit=6`);

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setIdeas(Array.isArray(data) ? data : data.ideas || []);
      } catch (err) {
        console.warn("Trending ideas API not available yet, showing fallback data:", err.message);
        setIdeas(FALLBACK_TRENDING_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingIdeas();
  }, []);

  return (
    <div className="w-full bg-slate-950 py-16 font-mono border-b border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            // Trending Ideas
          </h2>
          <p className="mt-3 text-lg text-slate-400">
            Explore the top validated concepts capturing community attention right now.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-green-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <div
                key={idea.id || idea._id}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-6 shadow-sm hover:border-green-500/30 transition-all duration-300"
              >
                <div>
                  <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                    {idea.category}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {idea.title}
                  </h3>
                  <div className="mt-4 space-y-2 text-sm text-slate-400">
                    <p><strong className="text-slate-300">Target Audience:</strong> {idea.target}</p>
                    <p><strong className="text-slate-300">Estimated Budget:</strong> {idea.budget}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/ideas/${idea.id || idea._id}`}
                    className="block w-full rounded-xl bg-green-500 px-3 py-2.5 text-center text-sm font-semibold text-slate-950 shadow-[0_0_15px_rgba(74,222,128,0.15)] hover:bg-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.35)] transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}