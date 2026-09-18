"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    document.title = "IdeaVault | Explore All Startup Concepts";
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas?search=${search}&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [search, category]);

  return (
    <div className="w-full min-h-screen bg-slate-950 py-16 text-slate-200 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold tracking-wider text-white">
            // EXPLORE_ALL_CONCEPTS
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Search and filter through the centralized startup repository.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by idea title..."
              className="block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white placeholder-slate-600 focus:border-white/50 focus:outline-none transition-all"
            />
          </div>
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all"
            >
              <option value="All">All Categories</option>
              <option value="Tech">Tech</option>
              <option value="Health">Health</option>
              <option value="AI">AI</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-white"></div>
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-500">No startup ideas matched your query parameters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <div 
                key={idea._id} 
                className="relative rounded-2xl p-[1px] overflow-hidden bg-gradient-to-r from-slate-800 via-white/10 to-slate-800 shadow-xl"
              >
                <div className="flex h-full flex-col justify-between rounded-2xl bg-slate-950 p-6">
                  <div>
                    <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white">
                      {idea.category}
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-white tracking-wide truncate">
                      {idea.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                      {idea.shortDescription}
                    </p>
                    <div className="mt-5 border-t border-slate-900 pt-4 space-y-2 text-xs text-slate-400">
                      <p><span className="text-slate-600">&gt; target:</span> {idea.targetAudience}</p>
                      <p><span className="text-slate-600">&gt; budget:</span> {idea.budget || "N/A"}</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-2">
                    <Link
                      href={`/ideas/${idea._id}`}
                      className="block w-full rounded-xl bg-white py-3 text-center text-xs font-bold text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-slate-200 transition-all"
                    >
                      [ VIEW_DETAILS ]
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
