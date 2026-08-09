"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useSearchParams } from "next/navigation";

type Dict = any;

export default function AdvertiserDashboardClient({ dict, lang }: { dict: Dict; lang: string }) {
  const [userName, setUserName] = useState("Advertiser");
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const [toastMessage, setToastMessage] = useState<{title?: string, desc?: string, icon?: string} | null>(null);

  const showToast = (desc: string, title?: string, icon?: string) => {
    setToastMessage({ desc, title, icon });
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const handleGlobalToast = (e: any) => {
      showToast(e.detail.desc, e.detail.title, e.detail.icon);
    };
    document.addEventListener('showGlobalToast', handleGlobalToast);
    return () => document.removeEventListener('showGlobalToast', handleGlobalToast);
  }, []);

  useEffect(() => {
    const userStr = localStorage.getItem("diwrapp_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const campaigns = [
    {
      id: "c-1",
      title: "Downtown Digital Billboard",
      image: "/images/campaigns/downtown-billboard.jpg",
      budget: "$800",
      budgetPercent: 80,
      status: "Active",
      reach: "28.5k"
    },
    {
      id: "c-2",
      title: "Metro Station Display",
      image: "/images/campaigns/metro-display.jpg",
      budget: "$400",
      budgetPercent: 40,
      status: "Pending Approval",
      reach: "16.7k"
    },
    {
      id: "c-3",
      title: "Highway Mega Billboard",
      image: "/images/campaigns/highway-billboard.jpg",
      budget: "$0",
      budgetPercent: 0,
      status: "Draft",
      reach: "0"
    }
  ];

  const renderStatus = (status: string) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50">
          {dict.dashboard.advertiser.statusActive || "Active"}
        </span>
      );
    }
    if (status === 'Pending Approval') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50">
          {dict.dashboard.advertiser.statusPendingApproval || "Pending Approval"}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/50 dark:bg-zinc-800/80 dark:text-slate-300 dark:border-zinc-700">
        {dict.dashboard.advertiser.statusDraftRejected || "Draft / Rejected"}
      </span>
    );
  };

  const areaChartData = [
    { name: 'Mon', reach: 2400 },
    { name: 'Tue', reach: 3100 },
    { name: 'Wed', reach: 2800 },
    { name: 'Thu', reach: 4200 },
    { name: 'Fri', reach: 3900 },
    { name: 'Sat', reach: 4500 },
    { name: 'Sun', reach: 4800 },
  ];
  
  const generateAreaChartPaths = () => {
    const width = 600;
    const height = 160;
    const maxVal = Math.max(...areaChartData.map(d => d.reach));
    const padding = 15;
    
    const points = areaChartData.map((d, i) => ({
      x: (i / (areaChartData.length - 1)) * width,
      y: height - (d.reach / maxVal) * (height - padding * 2) - padding
    }));

    let linePath = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const cx = (p1.x + p2.x) / 2;
      linePath += ` C ${cx},${p1.y} ${cx},${p2.y} ${p2.x},${p2.y}`;
    }

    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;
    return { linePath, areaPath, points };
  };

  const { linePath, areaPath, points } = generateAreaChartPaths();

  return (
    <main className={`max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full ${lang === 'ar' ? 'leading-relaxed' : ''}`}>
      
      {/* Minimal Design System Info Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 end-6 z-[9999] bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-white px-4 py-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3.5 min-w-[280px] max-w-[360px] transform-gpu will-change-transform"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full shrink-0">
              <i className={`fa-solid ${toastMessage.icon || 'fa-circle-info'} text-[#1E6BFF] text-[15px]`}></i>
            </div>
            <div className="flex flex-col pt-0.5">
              {toastMessage.title && <span className="text-[13px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{toastMessage.title}</span>}
              <span className={`text-[12px] font-medium leading-snug ${toastMessage.title ? 'text-slate-500 dark:text-zinc-400 mt-0.5' : 'text-slate-700 dark:text-slate-200'}`}>{toastMessage.desc}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section with Breadcrumb & Action Bar */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-2 z-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 px-3 py-1 text-xs font-medium rounded-full border border-transparent dark:border-zinc-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                2 {dict.dashboard.advertiser.activeCampaignsCount || "Active Campaigns"}
              </span>
              <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 text-xs font-bold rounded-full border border-blue-200/50 dark:border-blue-800/50 flex items-center gap-1.5">
                💳 {dict.dashboard.advertiser.credit || "Credit:"} $3,500
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              {dict.dashboard.advertiser.welcome || "Welcome back,"} {userName}
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 mt-1 lg:mt-0">
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 sm:px-3 sm:py-2 shadow-sm text-[13px] font-medium text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
              <div className="flex items-center">
                <i className="fa-regular fa-calendar me-2 text-slate-400"></i>
                {dict.dashboard.advertiser.last30Days || "Last 30 Days"}
              </div>
              <i className="fa-solid fa-chevron-down ms-3 text-[10px] text-slate-400"></i>
            </div>
            <button 
              onClick={() => showToast('Opening Campaign Builder...', dict?.dashboard?.toasts?.campaignCreatedTitle || 'New Campaign', 'fa-rocket')} 
              className="w-full sm:w-auto justify-center bg-[#0F172A] text-white hover:bg-black dark:bg-[#1E6BFF] dark:hover:bg-blue-600 rounded-xl px-5 py-2.5 sm:py-2 flex items-center gap-2 shadow-sm text-[13px] font-bold transition-all duration-200 active:scale-95"
            >
              <i className="fa-solid fa-plus text-[12px]"></i>
              {dict.dashboard.advertiser.createCampaign || "Create Campaign"}
            </button>
          </div>
        </motion.div>

        {/* KPI Metrics Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* KPI 1 */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between transform-gpu will-change-transform"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-900 flex items-center justify-center text-slate-700 dark:text-zinc-400">
                <i className="fa-solid fa-bullhorn text-[16px]"></i>
              </div>
              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 text-[11px] font-bold px-2.5 py-1 rounded-full">{dict.dashboard.advertiser.activeNow || "Active Now"}</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1">{dict.dashboard.advertiser.activeCampaigns || "Active Campaigns"}</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">2</h3>
            </div>
          </motion.div>

          {/* KPI 2 */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between transform-gpu will-change-transform"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-900 flex items-center justify-center text-slate-700 dark:text-zinc-400">
                <i className="fa-solid fa-wallet text-[16px]"></i>
              </div>
              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 text-[11px] font-bold px-2.5 py-1 rounded-full">{dict.dashboard.advertiser.vsLastMonth || "+18% vs last month"}</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1">{dict.dashboard.advertiser.totalBudgetSpent || "Total Budget Spent"}</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">$1,200</h3>
            </div>
          </motion.div>

          {/* KPI 3 */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between transform-gpu will-change-transform"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-900 flex items-center justify-center text-slate-700 dark:text-zinc-400">
                <i className="fa-solid fa-users-viewfinder text-[16px]"></i>
              </div>
              <span className="bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50 text-[11px] font-bold px-2.5 py-1 rounded-full">{dict.dashboard.advertiser.highImpact || "High Impact"}</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1">{dict.dashboard.advertiser.estimatedReach || "Estimated Reach"}</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">45.2k</h3>
            </div>
          </motion.div>
        </motion.div>

        {/* Performance Trends Area Chart */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col transform-gpu will-change-transform">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{dict.dashboard.advertiser.performanceTrends || "Performance Trends"}</h2>
              <p className="text-[13px] text-slate-500 dark:text-zinc-400">{dict.dashboard.advertiser.peakReach || "Peak daily reach:"} <span className="font-bold text-slate-900 dark:text-white">4.8k {dict.dashboard.advertiser.impressionsSuffix || "impressions"}</span></p>
            </div>
            <div className="flex bg-slate-100 dark:bg-zinc-900 p-1 rounded-lg">
              <button className="px-3 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-[#0D0D0D] text-slate-900 dark:text-white shadow-sm transition-colors">{dict.dashboard.advertiser.sevenDays || "7 Days"}</button>
              <button className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors">{dict.dashboard.advertiser.thirtyDays || "30 Days"}</button>
              <button className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors">{dict.dashboard.advertiser.twelveMonths || "12 Months"}</button>
            </div>
          </div>
          
          <div className="w-full h-[180px] relative">
            <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E6BFF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#1E6BFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#areaGradient)" />
              <path d={linePath} fill="none" stroke="#1E6BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="4" fill="#1E6BFF" stroke="#fff" strokeWidth="2" className="dark:stroke-[#0D0D0D]" />
              ))}
            </svg>
            <div className="absolute -bottom-2 start-0 end-0 flex justify-between px-2">
              {areaChartData.map((d, i) => (
                <span key={i} className="text-[10px] font-medium text-slate-400 dark:text-zinc-500">{d.name}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Section Title */}
        <motion.div variants={itemVariants} className="pt-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{dict.dashboard.advertiser.activeCampaigns || "Active Campaigns"}</h2>
        </motion.div>

        {/* Campaign Cards Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
          
          {campaigns.map((campaign) => (
            <motion.div 
              key={campaign.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col transform-gpu will-change-transform group"
            >
              {/* Card Image */}
              <div className="relative w-full h-44 overflow-hidden rounded-t-2xl bg-zinc-800 shrink-0">
                <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 start-3 z-10">
                  {renderStatus(campaign.status)}
                </div>
              </div>
              
              {/* Card Body */}
              <div className="flex flex-col justify-between p-5 flex-1">
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight mb-4 line-clamp-1">{campaign.title}</h3>
                
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{dict.dashboard.advertiser.budget || "Budget"}</span>
                    <span className="text-[14px] font-bold text-slate-900 dark:text-white">{campaign.budget}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{dict.dashboard.advertiser.reach || "Reach"}</span>
                    <span className="text-[14px] font-bold text-slate-900 dark:text-white">{campaign.reach}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <span>{dict.dashboard.advertiser.spendProgress || "Spend Progress"}</span>
                    <span>{campaign.budgetPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${campaign.budgetPercent > 0 ? 'bg-[#1E6BFF]' : 'bg-transparent'}`} 
                      style={{ width: `${campaign.budgetPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex items-center gap-2">
                  <button 
                    onClick={() => showToast('Campaign details loading...', 'View Details')}
                    className="flex-1 bg-slate-50 dark:bg-zinc-900/50 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200 text-[13px] font-bold py-2.5 rounded-xl transition-colors"
                  >
                    {dict.dashboard.advertiser.viewDetails || "View Details"}
                  </button>
                  <button 
                    onClick={() => showToast(campaign.status === 'Active' ? 'Campaign paused successfully.' : 'Report downloading...', campaign.status === 'Active' ? 'Paused' : 'Download')}
                    className="w-10 h-[40px] flex items-center justify-center bg-slate-50 dark:bg-zinc-900/50 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors shrink-0"
                  >
                    <i className={`fa-solid ${campaign.status === 'Active' ? 'fa-pause' : 'fa-file-arrow-down'}`}></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recommended Ad Spots */}
        <motion.div variants={itemVariants} className="pt-2 pb-12">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-5">{dict.dashboard.advertiser.topRecommended || "Top Recommended Spots"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Spot 1 */}
            <div className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 group cursor-pointer transform-gpu will-change-transform">
              <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-zinc-900 overflow-hidden shrink-0 relative">
                <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80" alt="Airport Road Billboard" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="flex flex-col flex-1">
                <h4 className="text-[14px] font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">Airport Road Billboard</h4>
                <p className="text-[12px] font-medium text-slate-500 dark:text-zinc-400 mb-2">{dict.dashboard.advertiser.highTraffic || "High traffic zone"} &bull; {dict.dashboard.advertiser.estReach?.replace("{{count}}", "85") || "Est. 85k Reach"}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-900 dark:text-white">$1,200/mo</span>
                  <button onClick={(e) => { e.stopPropagation(); showToast(dict?.dashboard?.toasts?.bookingInitiatedDesc || 'Navigating to spot reservation flow...', dict?.dashboard?.toasts?.bookingInitiatedTitle || 'Booking Initiated'); }} className="text-[11px] font-bold text-[#1E6BFF] hover:text-blue-700 dark:hover:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-[#1E6BFF]/10 dark:hover:bg-[#1E6BFF]/20 px-3 py-1.5 rounded-lg transition-colors">
                    {dict.dashboard.advertiser.quickBook || "Quick Book"}
                  </button>
                </div>
              </div>
            </div>

            {/* Spot 2 */}
            <div className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 group cursor-pointer transform-gpu will-change-transform">
              <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-zinc-900 overflow-hidden shrink-0 relative">
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80" alt="Mall of Arabia Digital Screen" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="flex flex-col flex-1">
                <h4 className="text-[14px] font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">Mall of Arabia Digital Screen</h4>
                <p className="text-[12px] font-medium text-slate-500 dark:text-zinc-400 mb-2">{dict.dashboard.advertiser.premiumIndoor || "Premium indoor"} &bull; {dict.dashboard.advertiser.estReach?.replace("{{count}}", "120") || "Est. 120k Reach"}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-900 dark:text-white">$950/mo</span>
                  <button onClick={(e) => { e.stopPropagation(); showToast(dict?.dashboard?.toasts?.bookingInitiatedDesc || 'Navigating to spot reservation flow...', dict?.dashboard?.toasts?.bookingInitiatedTitle || 'Booking Initiated'); }} className="text-[11px] font-bold text-[#1E6BFF] hover:text-blue-700 dark:hover:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-[#1E6BFF]/10 dark:hover:bg-[#1E6BFF]/20 px-3 py-1.5 rounded-lg transition-colors">
                    {dict.dashboard.advertiser.quickBook || "Quick Book"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
