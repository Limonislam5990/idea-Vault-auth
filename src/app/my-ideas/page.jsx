"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function MyIdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`)
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const openUpdateModal = (idea) => {
    setSelectedIdea(idea);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (idea) => {
    setSelectedIdea(idea);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${selectedIdea._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedIdea)
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Startup concept records updated successfully!");
        setIsUpdateModalOpen(false);
        fetchIdeas();
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteConfirm = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${selectedIdea._id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Concept successfully terminated from data cluster.");
        setIsDeleteModalOpen(false);
        fetchIdeas();
      })
      .catch((err) => console.error(err));
  };

  const handleModalInputChange = (e) => {
    setSelectedIdea({ ...selectedIdea, [e.target.name]: e.target.value });
  };

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
          <h1 className="text-2xl font-bold tracking-wider text-white">// OWNED_CONCEPTS_DASHBOARD</h1>
          <p className="mt-2 text-sm text-slate-500">Manage, mutate, or purge your registered startup allocations.</p>
        </div>

        {ideas.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-500">No active instance allocations found under your registry profile.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <div key={idea._id} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-green-400">// {idea.category}</span>
                  <h3 className="mt-3 text-lg font-bold text-white truncate">{idea.title}</h3>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2">{idea.shortDescription}</p>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => openUpdateModal(idea)}
                    className="rounded-xl border border-slate-700 bg-slate-900 py-2.5 text-xs font-bold text-white hover:border-white/40 transition-all"
                  >
                    [ UPDATE ]
                  </button>
                  <button
                    onClick={() => openDeleteModal(idea)}
                    className="rounded-xl bg-red-950/40 border border-red-900/50 py-2.5 text-xs font-bold text-red-400 hover:bg-red-900/30 transition-all"
                  >
                    [ PURGE ]
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isUpdateModalOpen && selectedIdea && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-8 max-h-[90vh] overflow-y-auto">
              <h2 className="text-lg font-bold text-white mb-6">// MUTATE_RECORD_FIELDS</h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase">Title</label>
                  <input type="text" name="title" required value={selectedIdea.title} onChange={handleModalInputChange} className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase">Short Description</label>
                  <input type="text" name="shortDescription" required value={selectedIdea.shortDescription} onChange={handleModalInputChange} className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase">Detailed Description</label>
                  <textarea name="detailedDescription" required rows="3" value={selectedIdea.detailedDescription || selectedIdea.shortDescription} onChange={handleModalInputChange} className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-white focus:outline-none resize-none" />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="rounded-xl border border-slate-800 px-5 py-2.5 text-xs font-bold text-slate-400">[ CANCEL ]</button>
                  <button type="submit" className="rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-950">[ PUSH_MUTATIONS ]</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isDeleteModalOpen && selectedIdea && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-red-900/40 bg-slate-950 p-6 text-center">
              <h2 className="text-lg font-bold text-red-400 mb-2">!! DESTRUCTIVE_ACTION_WARNING !!</h2>
              <p className="text-xs text-slate-400 mt-3">Are you absolutely sure you want to terminate the record allocation for <span className="text-white font-bold">"{selectedIdea.title}"</span>? This allocation cycle cannot be undone.</p>
              <div className="mt-6 flex justify-center space-x-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="rounded-xl border border-slate-800 px-5 py-2.5 text-xs font-bold text-slate-400">[ CANCEL ]</button>
                <button onClick={handleDeleteConfirm} className="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:bg-red-500">[ CONFIRM_TERMINATION ]</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


