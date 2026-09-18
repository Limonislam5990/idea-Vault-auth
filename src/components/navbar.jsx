"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sun, Moon, Menu, X, Lightbulb } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Navbar({ theme, toggleTheme, user, isSessionLoading, logoutUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    setIsDropdownOpen(false);
    toast.success("Successfully logged out!");
    router.push("/");
  };

  const getLinkClass = (path) =>
    pathname === path
      ? "relative text-green-400 font-semibold text-sm px-3 py-1.5 transition-all duration-300 before:absolute before:bottom-0 before:left-3 before:right-3 before:h-0.5 before:bg-green-400 before:shadow-[0_0_8px_#4ade80]"
      : "text-gray-400 hover:text-green-400 text-sm font-medium px-3 py-1.5 transition-all duration-300";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800/80 bg-slate-950/70 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold tracking-wider text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                <Lightbulb className="h-5 w-5 text-green-400 animate-pulse" />
              </div>
              <span className="font-mono">Idea<span className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]">Vault</span></span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-2 rounded-full border border-slate-800/60 bg-slate-900/40 p-1 backdrop-blur-sm">
            <Link href="/" className={getLinkClass("/")}>Home</Link>
            <Link href="/ideas" className={getLinkClass("/ideas")}>Ideas</Link>
            
            {user && (
              <>
                <Link href="/add-idea" className={getLinkClass("/add-idea")}>Add Idea</Link>
                <Link href="/my-ideas" className={getLinkClass("/my-ideas")}>My Ideas</Link>
                <Link href="/my-interactions" className={getLinkClass("/my-interactions")}>My Interactions</Link>
              </>
            )}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-gray-400 hover:text-green-400 hover:border-green-500/30 transition-all"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {isSessionLoading ? (
              <div className="h-8 w-8 rounded-full bg-slate-800 animate-pulse"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none p-0.5 rounded-full border border-green-500/40 shadow-[0_0_8px_rgba(74,222,128,0.3)]"
                >
                  {user.image ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.image}
                      alt="User"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-mono font-semibold text-green-400">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-slate-800 bg-slate-950 p-1.5 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="border-b border-slate-900 px-4 py-2.5">
                      <p className="truncate text-xs font-mono text-gray-500">USER PROFILE</p>
                      <p className="truncate text-sm font-semibold text-white mt-0.5">{user.name}</p>
                    </div>
                    
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block rounded-lg px-4 py-2 text-sm text-gray-400 hover:bg-slate-900 hover:text-white transition-all mt-1"
                    >
                      Profile Management
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="block w-full rounded-lg px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-all mt-0.5"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-400 hover:text-white font-mono transition-colors"
                >
                  _login
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium font-mono text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:bg-green-500 hover:text-slate-950 hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all duration-300"
                >
                  [ register ]
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-gray-400"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-gray-400"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-1.5 md:hidden backdrop-blur-lg">
          <Link href="/" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-900 hover:text-green-400">Home</Link>
          <Link href="/ideas" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-900 hover:text-green-400">Ideas</Link>
          
          {user && (
            <>
              <Link href="/add-idea" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-900 hover:text-green-400">Add Idea</Link>
              <Link href="/my-ideas" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-900 hover:text-green-400">My Ideas</Link>
              <Link href="/my-interactions" onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-900 hover:text-green-400">My Interactions</Link>
              <div className="border-t border-slate-900 pt-2 mt-2">
                <Link href="/profile" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-base font-medium text-gray-400 hover:bg-slate-900 hover:text-white">Profile Management</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-red-400 hover:bg-red-500/10">Logout</button>
              </div>
            </>
          )}

          {!user && (
            <div className="pt-2 space-y-2 border-t border-slate-900 mt-2">
              <Link href="/login" onClick={() => setIsOpen(false)} className="block text-center rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-900">_login</Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="block text-center rounded-xl border border-green-500/30 bg-green-500/10 py-2 text-base font-medium text-green-400">[ register ]</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}