"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { authClient } from '../../lib/auth-client';

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "IdeaVault | Profile Management";
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setImage(user.image || '');
    }
  }, [user?.name, user?.image]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await authClient.updateUser({ name, image });
      if (error) throw new Error(error.message);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-white"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 font-mono text-slate-500">
        // PLEASE_LOGIN_FIRST
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 py-16 text-slate-200 font-mono">
      <div className="mx-auto max-w-xl px-4">
        <div className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold tracking-wider text-white">// PROFILE_MANAGEMENT</h1>
          <p className="mt-2 text-sm text-slate-500">Update your public display details.</p>
        </div>

        <div className="mb-6 flex items-center space-x-4">
          {image ? (
            <img src={image} alt="Profile" className="h-16 w-16 rounded-full object-cover border border-slate-800" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-2xl font-semibold text-green-400">
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          <div>
            <p className="text-white font-semibold">{user.name}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Name</label>
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Photo URL</label>
            <input
              type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..."
              className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-sm text-white focus:border-white/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Email</label>
            <input
              type="email" value={user.email} disabled
              className="mt-2 block w-full rounded-xl border border-slate-800 bg-slate-900/30 p-3.5 text-sm text-slate-500"
            />
          </div>
          <button
            type="submit" disabled={saving}
            className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-slate-950 hover:bg-slate-200 transition-all disabled:opacity-60"
          >
            {saving ? '[ SAVING... ]' : '[ SAVE_PROFILE ]'}
          </button>
        </form>
      </div>
    </div>
  );
}
