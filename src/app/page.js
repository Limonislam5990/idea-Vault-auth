"use client";

import React from 'react';
import Banner from '../components/banner';
import TrendingIdeas from '../components/trending-ideas';
import ExtraPage from '../components/extrapage';
import HowItWorkPage from '../components/howitworkpage';

export default function Home() {
  return (
    <div className="w-full bg-slate-950 font-mono text-slate-200">
      
      <Banner />

      <TrendingIdeas />

      <ExtraPage />

      <HowItWorkPage />

    </div>
  );
}
