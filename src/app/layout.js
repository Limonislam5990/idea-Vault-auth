"use client";

import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { authClient } from '../lib/auth-client';
import './globals.css';

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('dark');

  // Real session from Better Auth — this replaces the local `user` state
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.className = nextTheme;
    localStorage.setItem('theme', nextTheme);
  };

  const logoutUser = async () => {
    await authClient.signOut();
    window.location.href = '/login';
  };

  return (
    <html lang="en" className={theme}>
      <body className="flex min-h-screen flex-col bg-slate-950 text-slate-100 font-mono transition-colors duration-300">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
          isSessionLoading={isPending}
          logoutUser={logoutUser}
        />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} theme={theme} />
      </body>
    </html>
  );
}