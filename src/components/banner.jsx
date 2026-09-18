"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    tag: "INNOVATE",
    title: "Empower Your Startup Vision",
    description: "Share your innovative business concepts with a global community of creators, founders, and experts to validate and scale your ideas.",
  },
  {
    tag: "COLLABORATE",
    title: "Collaborate and Refine Concepts",
    description: "Get real-time feedback, constructive comments, and market validation from fellow developers looking for the next big thing.",
  },
  {
    tag: "DISCOVER",
    title: "Discover Trending Innovation",
    description: "Explore thousands of cutting-edge ideas across AI, tech, health, and education. Find inspiration for your next successful build.",
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-24 border-b border-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          
          <div className="inline-flex items-center space-x-2 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 font-mono text-xs text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.05)]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping"></span>
            <span>SYSTEM_STATUS // {slides[currentSlide].tag}</span>
          </div>

          <div className="mt-8 min-h-[180px] transition-all duration-500 ease-in-out">
            <h1 className="text-4xl font-extrabold tracking-tight text-white font-mono sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 md:text-lg">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/ideas"
              className="group relative inline-flex items-center justify-center rounded-xl bg-green-500 px-8 py-3.5 text-sm font-semibold font-mono text-slate-950 shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:bg-green-400 hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] transition-all duration-300"
            >
              Explore Ideas
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="mt-12 flex justify-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 border-none outline-none ${
                  currentSlide === index 
                    ? "bg-green-400 w-8 shadow-[0_0_10px_#4ade80]" 
                    : "bg-slate-800 w-2 hover:bg-slate-700"
                }`}
                aria-label={`Select frame ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
