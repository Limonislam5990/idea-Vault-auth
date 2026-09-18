"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 font-mono text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          <div>
            <h3 className="text-xs font-bold tracking-widest text-green-400 uppercase">
              // platform_links
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/ideas" className="text-sm hover:text-white transition-colors">
                  &gt; Ideas
                </Link>
              </li>
              <li>
                <Link href="/ideas?category=Tech" className="text-sm hover:text-white transition-colors">
                  &gt; Tech Category
                </Link>
              </li>
              <li>
                <Link href="/ideas?category=AI" className="text-sm hover:text-white transition-colors">
                  &gt; AI Category
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-widest text-green-400 uppercase">
              // contact_info
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>email: support@ideavault.com</li>
              <li>loc: Dhaka, Bangladesh</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-widest text-green-400 uppercase">
              // social_networks
            </h3>
            <div className="mt-4 flex space-x-5">
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 hover:text-white hover:border-green-500/30 hover:shadow-[0_0_10px_rgba(74,222,128,0.2)] transition-all"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 hover:text-white hover:border-green-500/30 hover:shadow-[0_0_10px_rgba(74,222,128,0.2)] transition-all"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-8 border-t border-slate-900 pt-8 text-center text-xs text-slate-600">
          <p>
            &copy; {new Date().getFullYear()} IdeaVault. root@system_auth: ~ successfully_built.
          </p>
        </div>
      </div>
    </footer>
  );
}
