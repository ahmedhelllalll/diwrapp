'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Modal } from '@/components/ui/Modal';
import { Tooltip } from '@/components/ui/Tooltip';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { MobileTabDropdown } from '@/components/ui/MobileTabDropdown';
import { DataTable, Pagination } from '@/components/ui/DataTable';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
}

export default function DesignSystem() {
  const [activeCategoryTab, setActiveCategoryTab] = useState('Foundations & UI Tokens');
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Advertiser');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [toast, setToast] = useState<Toast | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showStandardModal, setShowStandardModal] = useState(false);
  const [showDangerModal, setShowDangerModal] = useState(false);

  const addToast = (type: ToastType, title: string, message: string) => {
    setToast({ id: Date.now(), type, title, message });
  };

  const removeToast = (id: number) => {
    setToast((prev) => (prev?.id === id ? null : prev));
  };

  const categoryTabs = [
    'Foundations & UI Tokens',
    'Forms & Inputs',
    'Navigation & Layout',
    'Feedback & Overlays',
    'Data & Loaders'
  ];

  const tabs = ['Advertiser', 'Vendor', 'Get Di-Wrapped', 'E-Branding', 'Wrapp-AI'];
  
  const faqs = [
    { question: 'What is Di-wrapp SD?', answer: 'Di-wrapp SD is an advanced platform bridging advertisers with vendors for high-impact branding.' },
    { question: 'How do I become a supplier?', answer: 'You can easily sign up through our vendor portal and list your assets within minutes.' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fa] dark:bg-black font-sans text-[#0f172a] dark:text-zinc-100 max-w-full overflow-x-hidden">
      
      {/* Static Top Header & Tabs */}
      <div className="relative bg-white dark:bg-[#0a0a0a] border-b border-[#e2e8f0] dark:border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="min-h-[56px] flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 py-2 md:py-0">
            
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Di-wrapp Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex items-center mr-1">
                <span className="text-[14px] font-extrabold tracking-tight text-[#0f172a] dark:text-zinc-100 leading-none whitespace-nowrap">
                  Di-wrapp
                </span>
                <span className="text-[8px] font-extrabold text-[#64748b] dark:text-zinc-400 ml-0.5 uppercase tracking-wider relative -top-1.5">
                  SD
                </span>
              </div>
              <span className="text-[#e2e8f0] font-light hidden sm:inline-block">|</span>
              <span className="text-[13px] font-bold text-[#64748b] dark:text-zinc-400 hidden sm:inline-block">Design System</span>
            </div>
            
            {/* Desktop Tabs & Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-slate-100/70 dark:bg-zinc-900/70 p-1 rounded-xl flex items-center gap-0.5 border border-slate-200/40 dark:border-zinc-800/40">
                {categoryTabs.map((tab) => {
                  const isActive = activeCategoryTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveCategoryTab(tab)}
                      className={`px-3 py-1.5 text-[12px] rounded-lg transition-all whitespace-nowrap ${
                        isActive 
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200/60 dark:border-slate-600/60 font-bold' 
                          : 'text-slate-500 dark:text-zinc-400 font-medium hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 border border-transparent'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile Dropdown & Theme Toggle */}
            <div className="flex md:hidden items-center gap-3 w-full">
              <MobileTabDropdown 
                activeTab={activeCategoryTab} 
                tabs={categoryTabs} 
                onChange={setActiveCategoryTab} 
              />
              <div className="mt-5">
                <ThemeToggle />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 pb-32 px-4 sm:px-6 md:px-8">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Foundations & UI Tokens */}
          {activeCategoryTab === 'Foundations & UI Tokens' && (
            <motion.div 
              key="tab1"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}
              className="space-y-16"
            >
              <section className="space-y-8">
                <SectionHeading title="1. Color System & Tokens" />
                <div className="space-y-6">
                  <h3 className="text-[15px] font-bold text-[#111827] dark:text-zinc-100">Primary Brand Palette</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <ColorCard name="Primary Blue" hex="#1665FF" className="bg-[#1665ff] text-white shadow-[0_4px_14px_rgba(22,101,255,0.3)]" />
                    <ColorCard name="Dark Zinc" hex="#18181b" className="bg-[#18181b] text-white" />
                    <ColorCard name="Black" hex="#000000" className="bg-[#000000] text-white" />
                    <ColorCard name="Zinc 500" hex="#71717A" className="bg-[#71717a] text-white" />
                    <ColorCard name="Zinc 50" hex="#FAFAFA" className="bg-[#fafafa] dark:bg-zinc-900/50 text-[#18181b] dark:text-zinc-100 border border-[#e4e4e7] dark:border-zinc-800/80" />
                  </div>
                  <h3 className="text-[15px] font-bold text-[#111827] dark:text-zinc-100 pt-4">Accent & Status Palette</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <ColorCard name="Accent Orange" hex="#F86100" className="bg-[#f86100] text-white shadow-[0_4px_14px_rgba(248,97,0,0.3)]" />
                    <ColorCard name="Hero Purple" hex="#8B5CF6" className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white" />
                    <ColorCard name="Danger / Action" hex="#EF4444" className="bg-[#fef2f2] text-[#ef4444] border border-[#fee2e2]" />
                    <ColorCard name="Info / Notice" hex="#3B82F6" className="bg-[#eff6ff] text-[#3b82f6] border border-[#dbeafe]" />
                    <ColorCard name="Success" hex="#22C55E" className="bg-[#f0fdf4] text-[#22c55e] border border-[#dcfce7]" />
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <SectionHeading title="2. Buttons & Actions" />
                <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm space-y-8">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">Primary Buttons</h3>
                    <div className="flex flex-wrap gap-4">
                      <button className="group px-6 py-3 rounded-[10px] bg-[#1665ff] text-white font-bold text-[13.5px] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] active:scale-[0.98] active:translate-y-0 flex items-center gap-2">
                        Primary Action
                      </button>
                      <button className="group px-6 py-3 rounded-[10px] bg-[#1665ff] text-white font-bold text-[13.5px] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] active:scale-[0.98] active:translate-y-0 flex items-center gap-2">
                        Continue <i className="fa-solid fa-arrow-right text-[12px] group-hover:translate-x-1 transition-transform duration-200"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">Dark & Outline Buttons</h3>
                    <div className="flex flex-wrap gap-4">
                      <button className="group px-6 py-3 rounded-[10px] bg-[#0f172a] dark:bg-zinc-100 text-white dark:text-black font-bold text-[13.5px] transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0">
                        Dark Action
                      </button>
                      <button className="group px-6 py-3 rounded-[10px] bg-white dark:bg-[#0a0a0a] border-2 border-[#e2e8f0] dark:border-zinc-800/80 text-[#0f172a] dark:text-zinc-100 font-bold text-[13.5px] transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80 hover:border-[#cbd5e1] active:scale-[0.98] active:translate-y-0 flex items-center gap-2">
                        <i className="fa-solid fa-cloud-arrow-up text-[#64748b] dark:text-zinc-400 group-hover:text-[#1665ff] transition-colors duration-200"></i>
                        Outline Action
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">Icon & Subtle Buttons</h3>
                    <div className="flex flex-wrap gap-4">
                      <button className="group w-11 h-11 rounded-[10px] bg-[#f8fafc] dark:bg-zinc-900/50 border border-[#e2e8f0] dark:border-zinc-800/80 text-[#64748b] dark:text-zinc-400 transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80 hover:text-[#1665ff] hover:border-[#cbd5e1] active:scale-[0.98] active:translate-y-0 flex items-center justify-center">
                        <i className="fa-regular fa-bookmark text-[15px]"></i>
                      </button>
                      <button className="group px-5 py-2.5 rounded-[10px] text-[#64748b] dark:text-zinc-400 font-semibold text-[13px] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f1f5f9] dark:hover:bg-zinc-800/80 hover:text-[#0f172a] dark:text-zinc-100 active:scale-[0.98] active:translate-y-0">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 2: Forms & Inputs */}
          {activeCategoryTab === 'Forms & Inputs' && (
            <motion.div 
              key="tab2"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}
              className="space-y-16"
            >
              <section className="space-y-6 md:space-y-8">
                <SectionHeading title="3. Advanced Form Elements" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-6 bg-white dark:bg-[#0a0a0a] p-6 md:p-8 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm">
                    <h3 className="text-[15px] font-bold text-[#111827] dark:text-zinc-100 mb-4">Standard Inputs</h3>
                    <div>
                      <label className="block text-[12px] font-bold text-[#111827] dark:text-zinc-100 mb-2">Email Address</label>
                      <div className="relative flex items-center group">
                        <i className="fa-regular fa-envelope absolute left-[14px] text-[#9ca3af] text-[14px] transition-colors group-focus-within:text-[#1665ff]"></i>
                        <input type="email" placeholder="Enter your email" className="w-full pl-[40px] pr-[14px] py-[12px] bg-white dark:bg-[#0a0a0a] border border-[#e5e7eb] rounded-[10px] text-[13.5px] text-[#111827] dark:text-zinc-100 placeholder:text-[#9ca3af] outline-none focus:border-[#1665ff] focus:ring-4 focus:ring-[#1665ff]/10 transition-all"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[#111827] dark:text-zinc-100 mb-2">Password</label>
                      <div className="relative flex items-center group">
                        <i className="fa-solid fa-lock absolute left-[14px] text-[#9ca3af] text-[14px] transition-colors group-focus-within:text-[#1665ff]"></i>
                        <input type={passwordVisible ? "text" : "password"} placeholder="Enter your password" className="w-full pl-[40px] pr-[40px] py-[12px] bg-white dark:bg-[#0a0a0a] border border-[#e5e7eb] rounded-[10px] text-[13.5px] text-[#111827] dark:text-zinc-100 placeholder:text-[#9ca3af] outline-none focus:border-[#1665ff] focus:ring-4 focus:ring-[#1665ff]/10 transition-all"/>
                        <button onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-[14px] text-[#64748b] dark:text-zinc-400 hover:text-[#1665ff] transition-colors">
                          <i className={`fa-regular ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'} text-[13px]`}></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[#111827] dark:text-zinc-100 mb-2">Category</label>
                      <CustomDropdown options={['Digital Billboard', 'Vehicle Wrap', 'In-Store Display']} placeholder="Select category" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm flex flex-col h-full">
                      <label className="block text-[12px] font-bold text-[#111827] dark:text-zinc-100 mb-2">Campaign Description</label>
                      <div className="flex-1 flex flex-col border border-[#e5e7eb] rounded-[10px] overflow-hidden focus-within:border-[#1665ff] focus-within:ring-4 focus-within:ring-[#1665ff]/10 transition-all">
                        <textarea placeholder="Describe your campaign..." className="w-full flex-1 p-[14px] text-[13.5px] text-[#111827] dark:text-zinc-100 placeholder:text-[#9ca3af] outline-none resize-none min-h-[120px]"></textarea>
                        <div className="bg-[#f8fafc] dark:bg-zinc-900/50 border-t border-[#e5e7eb] px-3 py-2 flex items-center gap-1 overflow-x-auto">
                          <ToolbarBtn icon="fa-paperclip" />
                          <ToolbarBtn icon="fa-link" />
                          <div className="w-[1px] h-4 bg-[#e2e8f0] mx-1"></div>
                          <ToolbarBtn icon="fa-bold" />
                          <ToolbarBtn icon="fa-italic" />
                          <ToolbarBtn icon="fa-underline" />
                          <ToolbarBtn icon="fa-list-ul" />
                          <div className="w-[1px] h-4 bg-[#e2e8f0] mx-1"></div>
                          <ToolbarBtn icon="fa-rotate-left" />
                          <ToolbarBtn icon="fa-rotate-right" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0a0a0a] p-6 md:p-8 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm max-w-2xl">
                  <h3 className="text-[15px] font-bold text-[#111827] dark:text-zinc-100 mb-4">File Upload & Attachment</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-[#e2e8f0] dark:border-zinc-800/80 rounded-xl bg-[#f8fafc] dark:bg-zinc-900/50">
                    <div className="flex items-center gap-4 flex-1 w-full">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#1665ff]/20 to-[#8B5CF6]/20 rounded-lg flex items-center justify-center shrink-0 border border-[#1665ff]/10">
                        <i className="fa-regular fa-image text-[#1665ff] text-xl"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold text-[#0f172a] dark:text-zinc-100 truncate">campaign-banner-final.png</h4>
                        <p className="text-[12px] font-medium text-[#64748b] dark:text-zinc-400">2.4 MB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                      <button className="text-[12.5px] font-semibold text-[#1665ff] bg-white dark:bg-[#0a0a0a] border border-[#e2e8f0] dark:border-zinc-800/80 rounded-lg px-3 py-1.5 transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80 hover:bg-[#eff6ff] hover:border-[#bfdbfe] active:scale-[0.98] active:translate-y-0">
                        Change Image
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center bg-white dark:bg-[#0a0a0a] border border-[#e2e8f0] dark:border-zinc-800/80 rounded-lg text-[#ef4444] transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80 hover:bg-[#fef2f2] hover:border-[#fecaca] active:scale-[0.98] active:translate-y-0">
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 3: Navigation & Layout */}
          {activeCategoryTab === 'Navigation & Layout' && (
            <motion.div 
              key="tab3"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}
              className="space-y-16"
            >
              <section className="space-y-8">
                <SectionHeading title="4. Navigation Controls" />
                <div className="space-y-10 bg-white dark:bg-[#0a0a0a] p-8 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">Search Component</h3>
                    <div className="relative max-w-xl">
                      <input type="text" placeholder="Search campaigns, vendors, or keywords..." className="w-full pl-5 pr-14 py-4 bg-[#f8fafc] dark:bg-zinc-900/50 border border-[#e2e8f0] dark:border-zinc-800/80 rounded-full text-[14px] text-[#0f172a] dark:text-zinc-100 placeholder:text-[#94a3b8] outline-none focus:border-[#1665ff] focus:bg-white dark:bg-[#0a0a0a] transition-all shadow-inner" />
                      <button className="absolute right-2 top-2 bottom-2 w-10 bg-[#111827] dark:bg-zinc-100 text-white dark:text-black rounded-full flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0">
                        <i className="fa-solid fa-magnifying-glass text-[13px]"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">Tab Navigation</h3>
                    <div className="flex items-center gap-8 border-b border-[#e2e8f0] dark:border-zinc-800/80 overflow-x-auto hide-scrollbar">
                      {tabs.map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`relative pb-4 text-[13.5px] font-bold whitespace-nowrap transition-colors ${activeTab === tab ? 'text-[#1665ff]' : 'text-[#64748b] dark:text-zinc-400 hover:text-[#0f172a] dark:text-zinc-100'}`}>
                          {tab}
                          {activeTab === tab && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1665ff] rounded-t-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">FAQ Accordion</h3>
                    <div className="max-w-2xl space-y-3">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-[#e2e8f0] dark:border-zinc-800/80 rounded-xl overflow-hidden bg-white dark:bg-[#0a0a0a]">
                          <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#f8fafc] dark:bg-zinc-900/50 transition-colors">
                            <span className="text-[14px] font-bold text-[#0f172a] dark:text-zinc-100">{faq.question}</span>
                            <motion.div animate={{ rotate: openFaq === idx ? 45 : 0 }} className="w-6 h-6 flex items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b] dark:text-zinc-400">
                              <i className="fa-solid fa-plus text-[12px]"></i>
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {openFaq === idx && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
                                <div className="px-5 pb-5 text-[13.5px] font-medium text-[#64748b] dark:text-zinc-400 leading-relaxed border-t border-[#f1f5f9] pt-3">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <SectionHeading title="5. Breadcrumbs & Routing" />
                <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm space-y-8">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">Standard Breadcrumb</h3>
                    <div className="p-4 bg-[#f8fafc] dark:bg-zinc-900/50 border border-[#e2e8f0] dark:border-zinc-800/80 rounded-xl">
                      <Breadcrumb items={[{ label: 'Dashboard', href: '#' }, { label: 'Campaigns', href: '#' }, { label: 'Create New Campaign' }]} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">With Leading Icons</h3>
                    <div className="p-4 bg-[#f8fafc] dark:bg-zinc-900/50 border border-[#e2e8f0] dark:border-zinc-800/80 rounded-xl flex items-center">
                      <Breadcrumb items={[
                        { label: 'Di-Wrapp', href: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155] dark:text-zinc-400"><path d="M3 10.5L12 4l9 6.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8.5z" /><line x1="9" y1="17" x2="15" y2="17" /></svg> },
                        { label: 'Help Center' }
                      ]} />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <SectionHeading title="6. Structural Layout Components" />
                <div className="space-y-12">
                  <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm overflow-hidden flex flex-col h-[500px]">
                    <div className="px-6 py-4 border-b border-[#e2e8f0] dark:border-zinc-800/80 bg-[#f8fafc] dark:bg-zinc-900/50">
                      <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100">Interactive Header Preview</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto bg-[#f1f5f9] relative">
                      <div className="relative min-h-[800px]">
                        <Header />
                        <div className="p-10 space-y-6 opacity-30">
                          <div className="h-40 bg-white dark:bg-[#0a0a0a] rounded-xl border border-slate-200 w-full shadow-sm"></div>
                          <div className="h-40 bg-white dark:bg-[#0a0a0a] rounded-xl border border-slate-200 w-full shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-[#e2e8f0] dark:border-zinc-800/80 bg-[#f8fafc] dark:bg-zinc-900/50">
                      <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100">Interactive Footer Preview</h3>
                    </div>
                    <div className="bg-[#f7f8fa] dark:bg-black">
                      <Footer />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <SectionHeading title="8. Context Menus & Dropdowns" />
                <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm flex flex-col md:flex-row gap-8">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">Action Menu</h3>
                    <DropdownMenu 
                      align="left"
                      trigger={<button className="w-9 h-9 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors"><i className="fa-solid fa-ellipsis-vertical"></i></button>}
                      items={[
                        { label: 'Edit Campaign', icon: 'fa-pen' },
                        { label: 'Duplicate', icon: 'fa-copy' },
                        { label: 'Pause Campaign', icon: 'fa-pause' },
                        { divider: true, label: '' },
                        { label: 'Delete Campaign', icon: 'fa-trash-can', danger: true }
                      ]}
                    />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">User Profile Menu</h3>
                    <DropdownMenu 
                      trigger={<button className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"><div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden"><img src="https://ui-avatars.com/api/?name=John+Doe&background=1665ff&color=fff" alt="User" /></div><span className="text-[13px] font-bold text-slate-700">John Doe</span><i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i></button>}
                      items={[
                        { label: 'Account Settings', icon: 'fa-gear' },
                        { label: 'Billing & Plans', icon: 'fa-credit-card' },
                        { label: 'Workspace Team', icon: 'fa-users' },
                        { divider: true, label: '' },
                        { label: 'Sign Out', icon: 'fa-arrow-right-from-bracket' }
                      ]}
                    />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 4: Feedback & Overlays */}
          {activeCategoryTab === 'Feedback & Overlays' && (
            <motion.div 
              key="tab4"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}
              className="space-y-16"
            >
              <section className="space-y-6 md:space-y-8">
                <SectionHeading title="7. Notification & Action Cards" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-[#0a0a0a] border border-[#fee2e2] rounded-[16px] p-5 md:p-6 shadow-[0_4px_15px_rgba(239,68,68,0.05)] cursor-pointer flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-[#fef2f2] text-[#ef4444] flex items-center justify-center text-[16px] mb-4 md:mb-5 border border-[#fecaca]">
                      <i className="fa-solid fa-shield-halved"></i>
                    </div>
                    <h3 className="text-[15px] md:text-[16px] font-bold text-[#0f172a] dark:text-zinc-100 mb-2">Action Required</h3>
                    <p className="text-[#64748b] dark:text-zinc-400 text-[13px] font-medium leading-[1.6] mb-4 md:mb-5 flex-1">Your account is currently unverified. Please verify your identity to start listing assets.</p>
                    <button className="w-full min-h-[44px] py-2.5 rounded-[10px] border border-[#ef4444] text-[#ef4444] font-semibold text-[13px] transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80 active:scale-[0.98] active:translate-y-0">Verify My Account</button>
                  </motion.div>
                  <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-[#0a0a0a] border border-[#dbeafe] rounded-[16px] p-5 md:p-6 shadow-[0_4px_15px_rgba(59,130,246,0.05)] cursor-pointer flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#3b82f6] flex items-center justify-center text-[16px] mb-4 md:mb-5 border border-[#bfdbfe]">
                      <i className="fa-solid fa-store"></i>
                    </div>
                    <h3 className="text-[15px] md:text-[16px] font-bold text-[#0f172a] dark:text-zinc-100 mb-2">Join as Supplier</h3>
                    <p className="text-[#64748b] dark:text-zinc-400 text-[13px] font-medium leading-[1.6] mb-4 md:mb-5 flex-1">Turn your assets into revenue. Reach thousands of advertisers looking for spaces.</p>
                    <button className="w-full min-h-[44px] py-2.5 rounded-[10px] bg-[#1665ff] text-white font-semibold text-[13px] shadow-[0_4px_12px_rgba(22,101,255,0.25)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] active:scale-[0.98] active:translate-y-0">Become a Supplier</button>
                  </motion.div>
                  <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-[#0a0a0a] border border-[#e2e8f0] dark:border-zinc-800/80 rounded-[16px] p-5 md:p-6 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.04)] cursor-pointer transition-shadow flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-[#f8fafc] dark:bg-zinc-900/50 text-[#64748b] dark:text-zinc-400 flex items-center justify-center text-[16px] mb-4 md:mb-5 border border-[#e2e8f0] dark:border-zinc-800/80">
                      <i className="fa-solid fa-bullhorn"></i>
                    </div>
                    <h3 className="text-[15px] md:text-[16px] font-bold text-[#0f172a] dark:text-zinc-100 mb-2">Create Campaign</h3>
                    <p className="text-[#64748b] dark:text-zinc-400 text-[13px] font-medium leading-[1.6] mb-4 md:mb-5 flex-1">Launch your next advertising campaign across our digital network.</p>
                    <button className="w-full min-h-[44px] py-2.5 rounded-[10px] bg-[#0f172a] text-white font-semibold text-[13px] shadow-[0_4px_12px_rgba(15,23,42,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0">New Campaign</button>
                  </motion.div>
                </div>
              </section>

              <section className="space-y-6 md:space-y-8">
                <SectionHeading title="8. Content Cards & Badges" />
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div whileHover={{ y: -6 }} className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all">
                    <div className="h-44 bg-gradient-to-r from-[#e2e8f0] to-[#f1f5f9] relative">
                      <div className="absolute top-4 left-4 bg-white dark:bg-[#0a0a0a]/90 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-sm">
                        <div className="text-[10px] font-bold text-[#64748b] dark:text-zinc-400 uppercase tracking-wider">Aug</div>
                        <div className="text-[16px] font-extrabold text-[#0f172a] dark:text-zinc-100 leading-none mt-0.5">24</div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex gap-2 mb-3">
                        <span className="text-[10px] font-bold text-[#1665ff] bg-[#eff6ff] px-2 py-1 rounded-md uppercase tracking-wider">Update</span>
                      </div>
                      <h3 className="text-[18px] font-bold text-[#0f172a] dark:text-zinc-100 mb-2.5 leading-snug">New Platform Features Released for Vendors</h3>
                      <p className="text-[#64748b] dark:text-zinc-400 text-[13px] font-medium leading-[1.6] mb-5 flex-1">We've rolled out a suite of new tools to help you manage your listings, track impressions, and optimize your revenue streams.</p>
                      <div className="text-[#1665ff] text-[13px] font-bold flex items-center gap-1.5 group">
                        Learn more <i className="fa-solid fa-arrow-right text-[11px] group-hover:translate-x-1 transition-transform"></i>
                      </div>
                    </div>
                  </motion.div>

                  <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm space-y-8">
                    <div>
                      <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">Status Pills</h3>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] rounded-full px-3 py-1 text-[11.5px] font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span> Active</div>
                        <div className="bg-[#fffbeb] text-[#b45309] border border-[#fde68a] rounded-full px-3 py-1 text-[11.5px] font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span> Pending</div>
                        <div className="bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca] rounded-full px-3 py-1 text-[11.5px] font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span> Rejected</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">Tag Badges</h3>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-[#f1f5f9] text-[#475569] rounded-md px-[12px] py-[4px] text-[10.5px] font-bold uppercase tracking-wider">USER GUIDE</span>
                        <span className="bg-white dark:bg-[#0a0a0a] text-[#334155] dark:text-zinc-400 border border-[#e2e8f0] dark:border-zinc-800/80 rounded-full px-[14px] py-[5px] text-[12px] font-semibold shadow-sm">Subtle Badge</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-4">Notification Pill</h3>
                      <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-[#0a0a0a] rounded-xl p-2.5 flex items-center gap-3 shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-[#e2e8f0] dark:border-zinc-800/80 w-max cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0">
                          <i className="fa-solid fa-bullhorn text-[#1665ff] text-[13px]"></i>
                        </div>
                        <div className="flex flex-col pr-4">
                          <h5 className="text-[#0f172a] dark:text-zinc-100 text-[11.5px] font-bold">Publish New Listing</h5>
                          <span className="text-[#64748b] dark:text-zinc-400 text-[10px] font-medium">Reach more advertisers today</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <SectionHeading title="9. Toast & Alert Notifications" />
                <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm">
                  <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">Interactive Toast Triggers</h3>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => addToast('success', 'Changes Saved', 'Your campaign settings have been updated successfully.')} className="group px-5 py-2.5 rounded-[10px] bg-[#22c55e] text-white text-[13px] font-bold shadow-[0_4px_14px_rgba(34,197,94,0.3)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(34,197,94,0.25)] active:scale-[0.98] active:translate-y-0">Show Success Toast</button>
                    <button onClick={() => addToast('error', 'Update Failed', 'There was a problem processing your request. Please try again.')} className="group px-5 py-2.5 rounded-[10px] bg-[#ef4444] text-white text-[13px] font-bold shadow-[0_4px_14px_rgba(239,68,68,0.3)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(239,68,68,0.25)] active:scale-[0.98] active:translate-y-0">Show Error Toast</button>
                    <button onClick={() => addToast('warning', 'Session Expiring', 'Your session will expire in 5 minutes due to inactivity.')} className="group px-5 py-2.5 rounded-[10px] bg-[#f59e0b] text-white text-[13px] font-bold shadow-[0_4px_14px_rgba(245,158,11,0.3)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(245,158,11,0.25)] active:scale-[0.98] active:translate-y-0">Show Warning Toast</button>
                    <button onClick={() => addToast('info', 'New Feature', 'We just launched a new analytics dashboard for you.')} className="group px-5 py-2.5 rounded-[10px] bg-[#3b82f6] text-white text-[13px] font-bold shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] active:scale-[0.98] active:translate-y-0">Show Info Toast</button>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <SectionHeading title="10. Modal & Dialog Overlays" />
                <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm">
                  <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">Interactive Modals</h3>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setShowStandardModal(true)} 
                      className="px-5 py-2.5 rounded-[10px] bg-slate-900 text-white text-[13px] font-bold transition-all hover:bg-slate-800"
                    >
                      Open Standard Modal
                    </button>
                    <button 
                      onClick={() => setShowDangerModal(true)} 
                      className="px-5 py-2.5 rounded-[10px] bg-white dark:bg-[#0a0a0a] border border-[#ef4444] text-[#ef4444] text-[13px] font-bold transition-all hover:bg-[#fef2f2]"
                    >
                      Open Danger Modal
                    </button>
                  </div>
                </div>
              </section>
              <section className="space-y-8">
                <SectionHeading title="11. Tooltips" />
                <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm">
                  <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">Hover Tooltips</h3>
                  <div className="flex flex-wrap items-center gap-8 pl-8 pt-4 pb-4">
                    <Tooltip content="Settings & Preferences" position="top">
                      <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors">
                        <i className="fa-solid fa-gear"></i>
                      </button>
                    </Tooltip>
                    
                    <Tooltip content="More information" position="bottom">
                      <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#1665ff] hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <i className="fa-solid fa-circle-info"></i>
                      </button>
                    </Tooltip>

                    <Tooltip content="Delete permanently" position="right">
                      <button className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 5: Data & Loaders */}
          {activeCategoryTab === 'Data & Loaders' && (
            <motion.div 
              key="tab5"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}
              className="space-y-16"
            >
              <section className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <SectionHeading title="10. Skeleton Loaders & States" />
                  <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
                    <span className={`text-[13.5px] font-bold ${!showSkeleton ? 'text-[#0f172a] dark:text-zinc-100' : 'text-[#94a3b8]'}`}>Live Data</span>
                    <button 
                      onClick={() => setShowSkeleton(!showSkeleton)}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-300 shrink-0 ${showSkeleton ? 'bg-[#1665ff]' : 'bg-[#cbd5e1]'}`}
                    >
                      <motion.div 
                        animate={{ x: showSkeleton ? 24 : 2 }} 
                        className="w-5 h-5 bg-white dark:bg-[#0a0a0a] rounded-full absolute top-0.5 shadow-sm"
                      />
                    </button>
                    <span className={`text-[13.5px] font-bold ${showSkeleton ? 'text-[#0f172a] dark:text-zinc-100' : 'text-[#94a3b8]'}`}>Skeleton View</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Card Skeleton Demo */}
                  <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm">
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">Card Skeleton</h3>
                    {showSkeleton ? (
                      <div className="w-full flex flex-col gap-4 animate-pulse">
                        <div className="w-full h-40 bg-slate-200 rounded-xl"></div>
                        <div className="h-5 bg-slate-200 rounded-md w-3/4 mt-2"></div>
                        <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                        <div className="h-4 bg-slate-200 rounded-md w-5/6"></div>
                        <div className="h-10 bg-slate-200 rounded-[10px] w-full mt-4"></div>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col gap-4">
                        <div className="w-full h-40 bg-[#f1f5f9] rounded-xl flex items-center justify-center text-[#94a3b8]"><i className="fa-regular fa-image text-3xl"></i></div>
                        <h4 className="text-[16px] font-bold text-[#0f172a] dark:text-zinc-100 mt-2 leading-tight">Downtown Billboard Campaign</h4>
                        <p className="text-[13px] text-[#64748b] dark:text-zinc-400 leading-relaxed">This campaign will run for 30 days across our premium downtown digital screens targeting evening commuters.</p>
                        <button className="w-full h-10 bg-[#1665ff] text-white rounded-[10px] font-bold text-[13.5px] mt-4">View Details</button>
                      </div>
                    )}
                  </div>

                  {/* List / Table Row Skeleton Demo */}
                  <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm flex flex-col">
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">List Item Skeleton</h3>
                    <div className="space-y-6 flex-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          {showSkeleton ? (
                            <>
                              <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 animate-pulse"></div>
                              <div className="flex-1 space-y-2.5 animate-pulse">
                                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                              </div>
                              <div className="w-16 h-6 rounded-full bg-slate-200 shrink-0 animate-pulse"></div>
                            </>
                          ) : (
                            <>
                              <div className="w-12 h-12 rounded-full bg-[#eff6ff] text-[#1665ff] flex items-center justify-center shrink-0"><i className="fa-regular fa-user"></i></div>
                              <div className="flex-1">
                                <h5 className="text-[14px] font-bold text-[#0f172a] dark:text-zinc-100">Vendor User {i}</h5>
                                <p className="text-[12px] text-[#64748b] dark:text-zinc-400">Joined recently</p>
                              </div>
                              <div className="px-3 py-1 bg-[#f0fdf4] text-[#15803d] rounded-full text-[11px] font-bold shrink-0">Active</div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Form Skeleton Demo */}
                  <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm">
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">Form Skeleton</h3>
                    <div className="space-y-5">
                      {[1, 2].map((i) => (
                        <div key={i} className="space-y-2">
                          {showSkeleton ? (
                            <>
                              <div className="h-3 bg-slate-200 rounded w-24 animate-pulse"></div>
                              <div className="w-full h-[46px] rounded-[10px] bg-slate-200 animate-pulse"></div>
                            </>
                          ) : (
                            <>
                              <label className="block text-[12px] font-bold text-[#111827] dark:text-zinc-100">Label {i}</label>
                              <input type="text" className="w-full py-[12px] px-4 bg-[#f8fafc] dark:bg-zinc-900/50 border border-[#e5e7eb] rounded-[10px]" disabled />
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button Loading State Demo */}
                  <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm">
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">Button Loading States</h3>
                    <div className="flex flex-col gap-4 items-start">
                      <button className="px-6 py-3 rounded-[10px] bg-[#1665ff] text-white font-bold text-[13.5px] flex items-center gap-2 cursor-not-allowed opacity-90">
                        <svg className="animate-spin -ml-1 mr-1.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="opacity-90">Processing...</span>
                      </button>

                      <button className="px-6 py-3 rounded-[10px] bg-white dark:bg-[#0a0a0a] border-2 border-[#e2e8f0] dark:border-zinc-800/80 text-[#0f172a] dark:text-zinc-100 font-bold text-[13.5px] flex items-center gap-2 cursor-not-allowed">
                        <svg className="animate-spin -ml-1 mr-1.5 h-4 w-4 text-[#64748b] dark:text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="opacity-80 text-[#64748b] dark:text-zinc-400">Uploading</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-8 will-change-transform transform-gpu">
                <SectionHeading title="11. Data Display & Tables" />
                <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm min-h-[450px]">
                  <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">Data Table</h3>
                  <DataTable />
                  <Pagination />
                </div>
              </section>

              <section className="space-y-8">
                <SectionHeading title="12. Empty States" />
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm">
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">Search Results Empty State</h3>
                    <EmptyState 
                      icon="fa-magnifying-glass" 
                      title="No assets found" 
                      description="We couldn't find any assets matching your search criteria. Try adjusting your filters or keywords." 
                      action="Clear Filters"
                    />
                  </div>
                  <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-[#e2e8f0] dark:border-zinc-800/80 shadow-sm">
                    <h3 className="text-[14px] font-bold text-[#111827] dark:text-zinc-100 mb-6">Initial Empty State</h3>
                    <EmptyState 
                      icon="fa-folder-open" 
                      title="Create your first campaign" 
                      description="You don't have any active campaigns yet. Start creating one to reach thousands of potential customers." 
                      action="Create Campaign"
                    />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Fixed Toast Container */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence mode="wait">
          {toast && (
            <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={showStandardModal} 
        onClose={() => setShowStandardModal(false)}
        title="Invite Team Member"
        footer={
          <>
            <button onClick={() => setShowStandardModal(false)} className="px-4 py-2 text-slate-600 font-semibold text-[13px] hover:bg-slate-200/50 rounded-lg transition-colors">Cancel</button>
            <button onClick={() => setShowStandardModal(false)} className="px-5 py-2 bg-[#1665ff] text-white font-bold text-[13px] rounded-lg shadow-sm hover:bg-blue-600 transition-colors">Send Invitation</button>
          </>
        }
      >
        <p className="mb-4">Enter the email address of the team member you'd like to invite to this workspace. They will receive an email with instructions to join.</p>
        <div className="relative">
          <input type="email" placeholder="colleague@company.com" className="w-full px-4 py-2.5 bg-white dark:bg-[#0a0a0a] border border-[#e5e7eb] rounded-lg text-[13.5px] outline-none focus:border-[#1665ff] focus:ring-4 focus:ring-[#1665ff]/10" />
        </div>
      </Modal>

      <Modal 
        isOpen={showDangerModal} 
        onClose={() => setShowDangerModal(false)}
        title="Delete Campaign"
        type="danger"
        footer={
          <>
            <button onClick={() => setShowDangerModal(false)} className="px-4 py-2 text-slate-600 font-semibold text-[13px] hover:bg-slate-200/50 rounded-lg transition-colors">Cancel</button>
            <button onClick={() => setShowDangerModal(false)} className="px-5 py-2 bg-[#ef4444] text-white font-bold text-[13px] rounded-lg shadow-sm hover:bg-red-600 transition-colors">Delete Campaign</button>
          </>
        }
      >
        <p>Are you absolutely sure you want to delete this campaign? This action cannot be undone and will permanently remove all associated data and analytics.</p>
      </Modal>
    </div>
  );
}

/* Helper Components */

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-4 sm:mb-8 w-full">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-[-0.02em] text-[#0f172a] dark:text-zinc-100 whitespace-nowrap shrink-0">{title}</h2>
      <div className="h-[1px] bg-[#e2e8f0] w-full mt-1 min-w-[20px]"></div>
    </div>
  );
}

function ColorCard({ name, hex, className }: { name: string, hex: string, className?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      className={`rounded-2xl p-4 h-28 flex flex-col justify-end cursor-pointer ${className}`}
    >
      <div className="font-bold text-[13px] tracking-tight">{name}</div>
      <div className="opacity-80 text-[10px] uppercase tracking-wider font-semibold mt-0.5">{hex}</div>
    </motion.div>
  );
}

function ToolbarBtn({ icon }: { icon: string }) {
  return (
    <button className="w-8 h-8 rounded-md flex items-center justify-center text-[#64748b] dark:text-zinc-400 transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] dark:hover:bg-zinc-800/80 hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-zinc-100 shrink-0 active:scale-[0.98] active:translate-y-0">
      <i className={`fa-solid ${icon} text-[13px]`}></i>
    </button>
  );
}

function CustomDropdown({ options, placeholder }: { options: string[], placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [menuDirection, setMenuDirection] = useState<'down' | 'up'>('down');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceNeeded = 200; // Approx height of the menu
      if (spaceBelow < spaceNeeded && rect.top > spaceNeeded) {
        setMenuDirection('up');
      } else {
        setMenuDirection('down');
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`w-full flex items-center justify-between px-[14px] py-[12px] bg-white dark:bg-[#0a0a0a] border ${isOpen ? 'border-[#1665ff] ring-4 ring-[#1665ff]/10' : 'border-[#e5e7eb]'} rounded-[10px] text-[13.5px] transition-all cursor-pointer outline-none focus:border-[#1665ff] focus:ring-4 focus:ring-[#1665ff]/10`}
      >
        <span className={selected ? 'text-[#111827] dark:text-zinc-100' : 'text-[#9ca3af]'}>
          {selected || placeholder}
        </span>
        <motion.i 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          className={`fa-solid fa-chevron-down text-[11px] ${isOpen ? 'text-[#1665ff]' : 'text-[#9ca3af]'}`}
        ></motion.i>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: menuDirection === 'down' ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: menuDirection === 'down' ? -10 : 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute z-50 w-full bg-white dark:bg-[#0a0a0a] border border-[#e2e8f0] dark:border-zinc-800/80 rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-1.5 overflow-hidden ${menuDirection === 'down' ? 'top-full mt-2' : 'bottom-full mb-2'}`}
          >
            {options.map((option, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={`px-[14px] py-[10px] text-[13.5px] cursor-pointer transition-colors ${selected === option ? 'bg-[#eff6ff] text-[#1665ff] font-bold' : 'text-[#0f172a] dark:text-zinc-100 hover:bg-[#f8fafc] dark:bg-zinc-900/50'}`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast, onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const config = {
    success: { icon: 'fa-circle-check', color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0' },
    error: { icon: 'fa-circle-xmark', color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
    warning: { icon: 'fa-triangle-exclamation', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
    info: { icon: 'fa-circle-info', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
  }[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      layout
      className="pointer-events-auto relative w-[340px] bg-white dark:bg-[#0a0a0a]/95 backdrop-blur-md border border-[#e2e8f0] dark:border-zinc-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden flex"
    >
      <div className="w-1.5 shrink-0" style={{ backgroundColor: config.color }}></div>
      <div className="p-4 flex gap-3 flex-1 relative">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" 
          style={{ backgroundColor: config.bg, color: config.color, border: `1px solid ${config.border}` }}
        >
          <i className={`fa-solid ${config.icon} text-[14px]`}></i>
        </div>
        <div className="flex-1 pr-6">
          <h4 className="text-[14px] font-bold text-[#0f172a] dark:text-zinc-100 leading-tight">{toast.title}</h4>
          <p className="text-[#64748b] dark:text-zinc-400 text-[12.5px] mt-1 leading-snug">{toast.message}</p>
        </div>
        <button 
          onClick={onRemove}
          className="absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#0f172a] dark:text-zinc-100 transition-colors"
        >
          <i className="fa-solid fa-xmark text-[13px]"></i>
        </button>
      </div>
      {/* Auto-dismiss progress bar */}
      <motion.div 
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ duration: 4, ease: "linear" }}
        className="absolute bottom-0 left-1.5 right-0 h-[3px]"
        style={{ backgroundColor: config.color, opacity: 0.2 }}
      />
    </motion.div>
  );
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="flex items-center text-[15px] font-medium text-[#334155] dark:text-zinc-400">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          
          return (
            <li key={idx} className="flex items-center">
              {idx > 0 && (
                <i className="fa-solid fa-angle-right text-[12px] text-[#334155] dark:text-zinc-400 mx-3.5"></i>
              )}
              {isLast || !item.href ? (
                <span className={`flex items-center gap-2 ${isLast ? 'text-[#0f172a] dark:text-zinc-100 font-bold' : 'text-[#334155] dark:text-zinc-400'}`}>
                  {item.icon && <span className="flex items-center shrink-0">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="flex items-center gap-2 text-[#334155] dark:text-zinc-400 hover:text-[#0f172a] dark:text-zinc-100 transition-colors"
                >
                  {item.icon && <span className="flex items-center shrink-0">{item.icon}</span>}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}



function EmptyState({ icon, title, description, action }: { icon: string, title: string, description: string, action: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-[#e2e8f0] dark:border-zinc-800 rounded-2xl bg-[#f8fafc] dark:bg-zinc-900/40">
      <div className="w-16 h-16 bg-white dark:bg-black shadow-sm border border-[#e2e8f0] dark:border-zinc-800 rounded-full flex items-center justify-center text-[#94a3b8] dark:text-zinc-500 mb-5">
        <i className={`fa-solid ${icon} text-[22px]`}></i>
      </div>
      <h3 className="text-[16px] font-bold text-[#0f172a] dark:text-zinc-100 mb-2">{title}</h3>
      <p className="text-[13.5px] text-[#64748b] dark:text-zinc-400 text-center max-w-sm mb-6 leading-relaxed font-medium">
        {description}
      </p>
      <button className="px-5 py-2.5 rounded-[10px] bg-[#0f172a] dark:bg-zinc-100 text-white dark:text-black font-bold text-[13px] hover:bg-[#1e293b] dark:hover:bg-white transition-colors shadow-sm">
        {action}
      </button>
    </div>
  );
}


