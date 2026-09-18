"use client";

import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function AddIdeaPage() {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    category: 'Tech',
    tags: '',
    imageUrl: '',
    budget: '',
    targetAudience: '',
    problemStatement: '',
    proposedSolution: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Startup idea saved successfully!");
          setFormData({
            title: '', shortDescription: '', detailedDescription: '',
            category: 'Tech', tags: '', imageUrl: '', budget: '',
            targetAudience: '', problemStatement: '', proposedSolution: ''
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to save to database.");
      });
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 py-16 text-slate-200 font-mono relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-2xl p-[1px] overflow-hidden bg-gradient-to-r from-slate-800 via-white/40 to-slate-800 shadow-2xl before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,#1e293b,transparent,#ffffff,#1e293b)] before:animate-[spin_8s_linear_infinite]">
          <div className="relative rounded-2xl bg-slate-950/90 p-8 backdrop-blur-xl">
            <div className="mb-8 border-b border-slate-800/80 pb-6">
              <h1 className="text-xl font-bold tracking-wider text-white flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-ping"></span>
                <span>// SUBMIT_NEW_CONCEPT</span>
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Idea Title *</label>
                  <input
                    type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. EduAI Planner"
                    className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Category *</label>
                  <select
                    name="category" value={formData.category} onChange={handleChange}
                    className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all"
                  >
                    <option value="Tech">Tech</option>
                    <option value="Health">Health</option>
                    <option value="AI">AI</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Short Description *</label>
                <input
                  type="text" name="shortDescription" required value={formData.shortDescription} onChange={handleChange} placeholder="Brief headline of your concept"
                  className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Detailed Description *</label>
                <textarea
                  name="detailedDescription" required rows="4" value={formData.detailedDescription} onChange={handleChange} placeholder="Explain how this startup operates..."
                  className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Tags (Optional)</label>
                  <input
                    type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="saas, cloud"
                    className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Estimated Budget (Optional)</label>
                  <input
                    type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. $5,000"
                    className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Image URL *</label>
                  <input
                    type="url" name="imageUrl" required value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com"
                    className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Target Audience *</label>
                  <input
                    type="text" name="targetAudience" required value={formData.targetAudience} onChange={handleChange} placeholder="e.g. Students, Teachers"
                    className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Problem Statement *</label>
                <textarea
                  name="problemStatement" required rows="3" value={formData.problemStatement} onChange={handleChange} placeholder="What limitation does this product target?"
                  className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Proposed Solution *</label>
                <textarea
                  name="proposedSolution" required rows="3" value={formData.proposedSolution} onChange={handleChange} placeholder="How exactly does your application resolve the problem?"
                  className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-white py-4 text-center text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-slate-200 transition-all duration-300"
                >
                  [ SAVE_CONCEPT_TO_DATABASE ]
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}





