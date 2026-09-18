"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyInteractionsPage() {
  const [commentedIdeas, setCommentedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "IdeaVault | User Interactions Log";
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`)
      .then((res) => res.json())
      .then((data) => {
        setCommentedIdeas(data.slice(0, 1));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 py-16 text-slate-200 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold tracking-wider text-white">// USER_INTERACTIONS_LOG</h1>
          <p className="mt-2 text-sm text-slate-500">Historical ledger of startup concepts you have engaged and commented on.</p>
        </div>

        {commentedIdeas.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-500">No interaction telemetry logs recorded for this instance identity.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {commentedIdeas.map((idea) => (
              <div key={idea._id} className="relative rounded-xl p-[1px] overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl bg-slate-950 p-6 gap-4">
                  <div>
                    <span className="text-xxs font-bold text-green-400 uppercase tracking-widest">// {idea.category}</span>
                    <h3 className="text-base font-bold text-white mt-1">{idea.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{idea.shortDescription}</p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Link
                      href={`/ideas/${idea._id}`}
                      className="inline-block rounded-xl border border-slate-800 bg-slate-900/50 px-5 py-2.5 text-center text-xs font-bold text-white hover:border-white/30 transition-all"
                    >
                      [ OPEN_CONVERSATION ]
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
