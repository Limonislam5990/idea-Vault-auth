"use client";

import React, { useState, useEffect, use } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../../lib/api';
import { authClient } from '../../../lib/auth-client';

const withTime = (list = []) =>
  list.map((c) => ({ ...c, timestamp: c.createdAt ? new Date(c.createdAt).toLocaleString() : '' }));

export default function IdeaDetailsPage({ params }) {
  const { id } = use(params);
  const { data: session } = authClient.useSession();
  const user = session?.user ?? null;
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/ideas/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setIdea(data);
        setComments(withTime(data?.comments));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`${API_URL}/ideas/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newComment,
          userName: user?.name || "Anonymous",
          userEmail: user?.email || "",
          userPhoto: user?.image || "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      setComments((prev) => [...prev, ...withTime([data.comment])]);
      setNewComment('');
      toast.success("Comment added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Could not save the comment.");
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = async (commentId) => {
    try {
      const res = await fetch(`${API_URL}/ideas/${id}/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText, userEmail: user?.email }),
      });
      if (!res.ok) throw new Error("Request failed");

      setComments(comments.map((c) => (c.id === commentId ? { ...c, text: editText } : c)));
      setEditingCommentId(null);
      toast.success("Comment updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Could not update the comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(
        `${API_URL}/ideas/${id}/comments/${commentId}?email=${encodeURIComponent(user?.email || '')}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Request failed");

      setComments(comments.filter((c) => c.id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Could not delete the comment.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-white"></div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 font-mono text-slate-500">
        // CONCEPT_NOT_FOUND
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 py-16 text-slate-200 font-mono">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-8 backdrop-blur-md shadow-xl mb-8">
          <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white">
            {idea.category}
          </span>
          <h1 className="text-2xl font-bold tracking-wider text-white mt-4">// {idea.title}</h1>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed border-b border-slate-800 pb-6">
            {idea.detailedDescription || idea.shortDescription}
          </p>
          
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs text-slate-400">
            <p><span className="text-slate-600">&gt; target_audience:</span> {idea.targetAudience}</p>
            <p><span className="text-slate-600">&gt; estimated_budget:</span> {idea.budget || "N/A"}</p>
            <p><span className="text-slate-600">&gt; problem_statement:</span> {idea.problemStatement || "N/A"}</p>
            <p><span className="text-slate-600">&gt; proposed_solution:</span> {idea.proposedSolution || "N/A"}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-8 backdrop-blur-md">
          <h2 className="text-lg font-bold tracking-wider text-white mb-6">// INTERACTION_SYSTEM (Comments)</h2>
          
          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              required
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Provide constructive feedback or validation observations..."
              className="block w-full rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 text-sm text-white placeholder-slate-600 focus:border-white/50 focus:outline-none transition-all resize-none"
            ></textarea>
            <button
              type="submit"
              className="mt-4 rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-slate-200 transition-all"
            >
              [ POST_COMMENT ]
            </button>
          </form>

          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-xs text-slate-600">No telemetry comments logged for this instance loop.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border border-slate-900 bg-slate-950/40 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xxs">
                    <span className="text-white font-bold">&gt; {comment.userName}</span>
                    <span className="text-slate-600">{comment.timestamp}</span>
                  </div>
                  
                  {editingCommentId === comment.id ? (
                    <div className="space-y-2 mt-1">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="block w-full rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-sm text-white focus:outline-none"
                      />
                      <div className="flex space-x-2">
                        <button onClick={() => handleSaveEdit(comment.id)} className="text-xxs text-green-400 hover:underline">[ SAVE ]</button>
                        <button onClick={() => setEditingCommentId(null)} className="text-xxs text-slate-500 hover:underline">[ CANCEL ]</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-slate-300">{comment.text}</p>
                      {user?.email && comment.userEmail === user.email && (
                        <div className="flex space-x-3 text-xxs pt-1">
                          <button onClick={() => handleStartEdit(comment)} className="text-slate-500 hover:text-white transition-colors">Edit</button>
                          <button onClick={() => handleDeleteComment(comment.id)} className="text-red-400/70 hover:text-red-400 transition-colors">Delete</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
