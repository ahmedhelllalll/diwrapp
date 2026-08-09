import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      image: '/assets/news-2.png', // Using the lit face image
      title: 'Mastering UI Elements: A Practical Guide for Designers',
      date: 'Posted 2 days ago',
      readTime: '5 min read'
    },
    {
      id: 2,
      image: '/assets/news-1.jpg', // Using the M logo image
      title: 'Mastering UI Elements: A Practical Guide for Designers',
      date: 'Posted 2 days ago',
      readTime: '5 min read'
    },
    {
      id: 3,
      image: '/assets/news-1.jpg', // Using the M logo image again to match screenshot
      title: 'Mastering UI Elements: A Practical Guide for Designers',
      date: 'Posted 2 days ago',
      readTime: '5 min read'
    }
  ];

  return (
    <section className="w-full py-16 px-4 bg-white dark:bg-transparent">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="inline-block px-3 py-1.5 border border-slate-200 dark:border-zinc-800 rounded-lg text-[11px] font-bold text-slate-600 dark:text-zinc-400 w-max mb-5 shadow-sm bg-white dark:bg-zinc-900/50">
            Socials
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-[32px] md:text-[38px] font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Showcasing our latest News
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col group cursor-pointer">
              {/* Image Container */}
              <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 relative bg-slate-100 dark:bg-zinc-900">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              {/* Text Content */}
              <h3 className="text-[22px] font-bold text-slate-900 dark:text-white leading-[1.3] mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500 dark:text-zinc-400">
                <span>{item.date}</span>
                <span className="w-[3px] h-[3px] rounded-full bg-slate-400 dark:bg-zinc-500"></span>
                <span>{item.readTime}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Dots */}
        <div className="flex items-center justify-center gap-2 mt-16">
          <button className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-700 transition-colors hover:bg-slate-400"></button>
          <button className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-zinc-300 transition-colors hover:bg-slate-900"></button>
          <button className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-700 transition-colors hover:bg-slate-400"></button>
        </div>

      </div>
    </section>
  );
}
