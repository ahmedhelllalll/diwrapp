import React from 'react';
import Link from 'next/link';

export default function FeaturesSection() {
  const cards = [1, 2, 3].map((_, idx) => ({
    id: idx,
    date: '15 Dec. 2024',
    title: 'Upload an Encrypted File to Beyond UI using Next.js',
    description: 'Combine Next.js and Beyond UI for secure, seamless file uploads—robust features meet a sleek interface for optimal file transfer.',
    version: 'Ver 1.0',
  }));

  return (
    <section className="w-full py-20 px-4 bg-white dark:bg-transparent">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-10">
          <div className="inline-block px-3 py-1.5 border border-slate-200 dark:border-zinc-800 rounded-lg text-[11px] font-bold text-slate-600 dark:text-zinc-400 w-max mb-5 shadow-sm bg-white dark:bg-zinc-900/50">
            Features
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-[32px] md:text-[38px] font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Showcasing our latest updates
            </h2>
            <Link 
              href="#" 
              className="flex items-center gap-2 text-[14px] font-bold text-slate-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors pb-1"
            >
              View More <i className="fa-regular fa-circle-right text-[15px]"></i>
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className="flex flex-col bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-zinc-800 rounded-[20px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300"
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 text-[11px] font-bold rounded-full">
                  {card.date}
                </span>
              </div>
              
              <h3 className="text-[22px] font-bold text-slate-900 dark:text-white leading-[1.3] mb-4">
                {card.title}
              </h3>
              
              <p className="text-[14px] text-slate-600 dark:text-zinc-400 leading-relaxed mb-10 flex-1">
                {card.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <Link 
                  href="#" 
                  className="px-6 py-2.5 bg-[#0f172a] dark:bg-zinc-100 text-white dark:text-black text-[13px] font-bold rounded-[10px] hover:bg-black dark:hover:bg-white transition-colors"
                >
                  Learn more
                </Link>
                <span className="text-[12px] font-semibold text-slate-400 dark:text-zinc-500">
                  {card.version}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <button className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-700 transition-colors hover:bg-slate-400"></button>
          <button className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-zinc-300 transition-colors hover:bg-slate-900"></button>
          <button className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-700 transition-colors hover:bg-slate-400"></button>
        </div>

      </div>
    </section>
  );
}
