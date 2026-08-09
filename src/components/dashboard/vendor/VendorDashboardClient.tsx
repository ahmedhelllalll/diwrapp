"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Dict = any;

export default function VendorDashboardClient({ dict, lang }: { dict: Dict; lang: string }) {
  const [userName, setUserName] = useState(dict.dashboard.vendor.fallbackName);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // Interactive States
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Pending'>('All');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{title?: string, desc?: string, icon?: string} | null>(null);
  const [bookingRequests, setBookingRequests] = useState([
    { id: 'br-1', brand: 'Red Bull', location: 'Downtown Screen', price: '$1,800/mo', date: '2 hrs ago' },
    { id: 'br-2', brand: 'Nike', location: 'Highway Monopole', price: '$3,200/mo', date: '5 hrs ago' }
  ]);

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

  const toggleDropdown = (id: string) => {
    if (openDropdownId === id) setOpenDropdownId(null);
    else setOpenDropdownId(id);
  };

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
  }, [dict.dashboard.vendor.fallbackName]);

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

  const areaChartData = [
    { name: 'Jan', revenue: 4000, occupancy: 2400 },
    { name: 'Feb', revenue: 3000, occupancy: 1398 },
    { name: 'Mar', revenue: 2000, occupancy: 9800 },
    { name: 'Apr', revenue: 2780, occupancy: 3908 },
    { name: 'May', revenue: 1890, occupancy: 4800 },
    { name: 'Jun', revenue: 2390, occupancy: 3800 },
    { name: 'Jul', revenue: 3490, occupancy: 4300 },
  ];

  const barChartData = [
    { name: 'Downtown', impressions: 125000 },
    { name: 'Highway', impressions: 210000 },
    { name: 'Metro B', impressions: 85000 },
    { name: 'Square', impressions: 150000 },
  ];

  const tableData = [
    { id: '1', name: 'Downtown Digital Display', type: 'LED Screen', status: 'Active', impressions: 125000 },
    { id: '2', name: 'Metro Station B', type: 'Static Billboard', status: 'Pending', impressions: 85000 },
    { id: '3', name: 'Highway Monopole', type: 'Digital Billboard', status: 'Active', impressions: 210000 },
  ];

  const renderStatus = (status: string) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50">
          {dict.dashboard.vendor.statusActive || 'Active'}
        </span>
      );
    }
    if (status === 'Pending') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50">
          {dict.dashboard.vendor.statusPending || 'Pending'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200/50 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/50">
        {dict.dashboard.vendor.statusSuspended || 'Suspended'}
      </span>
    );
  };

  // Generate smooth curve paths for Area Chart
  const generateAreaChartPaths = () => {
    const width = 600;
    const height = 200;
    const maxRev = Math.max(...areaChartData.map(d => d.revenue));
    const padding = 20;
    
    const points = areaChartData.map((d, i) => ({
      x: (i / (areaChartData.length - 1)) * width,
      y: height - (d.revenue / maxRev) * (height - padding * 2) - padding
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
        {/* Minimal Alert Banner */}
        <motion.div variants={itemVariants} className="w-full rounded-lg border border-blue-600/20 bg-blue-600/[0.04] p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-bell text-blue-600 text-[11px]"></i>
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
              <span className="font-bold text-blue-600 dark:text-blue-500 me-2">{dict.dashboard.vendor.actionRequired}:</span>
              {dict.dashboard.vendor.actionDesc}
            </span>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
            {dict.dashboard.vendor.reviewRequests}
            <i className="fa-solid fa-arrow-right text-[10px] mt-[1px] rtl:rotate-180"></i>
          </button>
        </motion.div>

        {/* Hero Section with Breadcrumb & Action Bar */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-2 z-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 px-3 py-1 text-xs font-medium rounded-full border border-transparent dark:border-zinc-800">
                Di-wrapp <i className="fa-solid fa-chevron-right text-[8px] mx-1 rtl:rotate-180"></i> Dashboard
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              {dict.dashboard.vendor.welcome} {userName}
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 mt-1 lg:mt-0">
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 sm:px-3 sm:py-2 shadow-sm text-[13px] font-medium text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
              <div className="flex items-center">
                <i className="fa-regular fa-calendar me-2 text-slate-400"></i>
                {dict.dashboard.vendor.last30Days || "Last 30 Days"}
              </div>
              <i className="fa-solid fa-chevron-down ms-3 text-[10px] text-slate-400"></i>
            </div>
            <button onClick={() => showToast(dict?.dashboard?.toasts?.reportExportedDesc || 'Report generated successfully!', dict?.dashboard?.toasts?.reportExportedTitle || 'Report Exported')} className="w-full sm:w-auto justify-center bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-white text-[13px] font-bold px-4 py-2.5 sm:py-2 rounded-xl flex items-center gap-2 shadow-sm transition-colors active:scale-95">
              <i className="fa-solid fa-download text-[12px]"></i>
              {dict.dashboard.vendor.exportReport || "Export Report"}
            </button>
            <button onClick={() => showToast('Opening Listing Editor...')} className="w-full sm:w-auto justify-center bg-[#0F172A] text-white hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 rounded-xl px-4 py-2.5 sm:py-2 flex items-center gap-2 shadow-sm text-[13px] font-bold transition-all duration-200 active:scale-95">
              <i className="fa-solid fa-plus text-[12px]"></i>
              {dict.dashboard.vendor.addListing}
            </button>
          </div>
        </motion.div>

        {/* KPI Metrics Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* KPI 1 */}
          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-700 dark:text-zinc-400">
                <i className="fa-solid fa-layer-group text-[16px]"></i>
              </div>
              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 text-[11px] font-bold px-2.5 py-1 rounded-full">{dict.dashboard.vendor.thisMonth || "This Month"}</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1">{dict.dashboard.vendor.totalListings}</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">3</h3>
            </div>
          </motion.div>

          {/* KPI 2 */}
          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-700 dark:text-zinc-400">
                <i className="fa-solid fa-clock text-[16px]"></i>
              </div>
              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 text-[11px] font-bold px-2.5 py-1 rounded-full">{dict.dashboard.vendor.requiresApproval || "Action Needed"}</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1">{dict.dashboard.vendor.pendingBookings}</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">2</h3>
            </div>
          </motion.div>

          {/* KPI 3 */}
          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-700 dark:text-zinc-400">
                <i className="fa-solid fa-arrow-trend-up text-[16px]"></i>
              </div>
              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 text-[11px] font-bold px-2.5 py-1 rounded-full">+12%</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1">{dict.dashboard.vendor.estimatedRevenue}</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">$4,250</h3>
            </div>
          </motion.div>
        </motion.div>

        {/* Custom Animated Charts Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
          
          {/* Custom SVG Area Chart */}
          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="lg:col-span-2 bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{dict.dashboard.vendor.revenueAnalytics || "Revenue & Occupancy Analytics"}</h3>
              <div className="flex bg-slate-100 dark:bg-zinc-900 rounded-lg p-1">
                <button className="px-3 py-1.5 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors">{dict.dashboard.vendor.sevenDays || "7 Days"}</button>
                <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm transition-colors">{dict.dashboard.vendor.thirtyDays || "30 Days"}</button>
                <button className="px-3 py-1.5 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors">{dict.dashboard.vendor.twelveMonths || "12 Months"}</button>
              </div>
            </div>
            
            <div className="h-[260px] w-full relative mt-2 group">
              <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="customAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E6BFF" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1E6BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                
                {/* Horizontal Grid Lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line key={i} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-zinc-800" vectorEffect="non-scaling-stroke" />
                ))}

                {/* Animated Area Fill */}
                <motion.path
                  d={areaPath}
                  fill="url(#customAreaGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />

                {/* Animated Stroke Line */}
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="#1E6BFF"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>

              {/* Interactive Hover Tooltips */}
              <div className="absolute inset-0 flex justify-between items-end pb-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-3">
                {areaChartData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center justify-end h-full w-[14.28%] relative group/point cursor-crosshair">
                    {/* Vertical Tracker Line */}
                    <div className="w-px h-[200px] bg-slate-200/50 dark:bg-zinc-700/50 opacity-0 group-hover/point:opacity-100 transition-opacity absolute bottom-0 z-0 pointer-events-none"></div>
                    
                    {/* Tooltip Card */}
                    <div className="hidden group-hover/point:flex flex-col items-center justify-center absolute top-2 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-md rounded-xl p-2.5 z-20 w-[90px] -translate-x-1/2 start-1/2 pointer-events-none">
                      <span className="text-[10px] text-slate-500 font-medium mb-0.5">{d.name} Revenue</span>
                      <span className="text-[13px] text-slate-900 dark:text-white font-bold tracking-tight" suppressHydrationWarning>${d.revenue.toLocaleString('en-US')}</span>
                    </div>
                    
                    {/* Glowing Point Indicator */}
                    <div 
                      className="w-3.5 h-3.5 rounded-full bg-white dark:bg-[#0D0D0D] border-[2.5px] border-[#1E6BFF] shadow-[0_0_10px_rgba(30,107,255,0.6)] opacity-0 group-hover/point:opacity-100 transition-opacity z-10 absolute pointer-events-none"
                      style={{ bottom: `${200 - points[i].y}px`, transform: 'translateY(50%)' }}
                    ></div>
                    
                    {/* X-Axis Label */}
                    <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500 absolute -bottom-6 pointer-events-none">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Custom Animated Bar Chart */}
          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="lg:col-span-1 bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{dict.dashboard.vendor.topAssets || "Top Assets"}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{dict.dashboard.vendor.highestImpressions || "Highest performing by impressions"}</p>
            </div>
            
            <div className="flex-1 flex flex-col justify-end gap-5">
              {barChartData.map((d, i) => {
                const maxImp = Math.max(...barChartData.map(b => b.impressions));
                const widthPercent = (d.impressions / maxImp) * 100;
                return (
                  <div key={i} className="flex flex-col gap-2 group cursor-pointer">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-600 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{d.name}</span>
                      <span className="font-bold tracking-tight text-slate-900 dark:text-white" suppressHydrationWarning>{d.impressions.toLocaleString('en-US')}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden flex relative">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        style={{ width: `${widthPercent}%`, originX: 0 }}
                        className="h-full bg-slate-900 dark:bg-white rounded-full group-hover:bg-[#1E6BFF] dark:group-hover:bg-[#1E6BFF] transition-colors"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </motion.div>

        {/* Table & Feed Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
          
          {/* Active Inventory Table (Col Span 2) */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 dark:border-zinc-800 overflow-visible bg-white dark:bg-[#0D0D0D] shadow-sm flex flex-col">
            
            {/* Table Header Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 dark:border-zinc-800">
              <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">{dict.dashboard.vendor.assetInventory || "Asset Inventory"}</h3>
              <div className="flex bg-slate-100 dark:bg-zinc-900 p-1 rounded-lg">
                {['All', 'Active', 'Pending'].map((filter) => {
                  const filterLabels: any = {
                    'All': dict.dashboard.vendor.all || 'All',
                    'Active': dict.dashboard.vendor.active || 'Active',
                    'Pending': dict.dashboard.vendor.pending || 'Pending'
                  };
                  const count = filter === 'All' ? tableData.length : tableData.filter(d => d.status === filter).length;
                  return (
                    <button 
                      key={filter}
                      onClick={() => setActiveFilter(filter as any)}
                      className={`px-3 py-1.5 text-[11px] font-bold rounded-md transition-colors ${activeFilter === filter ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white'}`}
                    >
                      {filterLabels[filter]} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden md:block">
              {/* Table Columns */}
              <div className="grid grid-cols-12 gap-4 bg-slate-50/80 dark:bg-zinc-900/50 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold py-3.5 px-6 border-b border-slate-200/60 dark:border-zinc-800">
                <div className="col-span-4">{dict.dashboard.vendor.assetName}</div>
                <div className="col-span-3">{dict.dashboard.vendor.type}</div>
                <div className="col-span-2">{dict.dashboard.vendor.status}</div>
                <div className="col-span-2 text-end">{dict.dashboard.vendor.impressions}</div>
                <div className="col-span-1 text-end"></div>
              </div>

              {/* Table Body */}
              <div className="flex flex-col">
                {tableData.filter(d => activeFilter === 'All' || d.status === activeFilter).map((row, idx, arr) => (
                  <div 
                    key={row.id} 
                    className={`grid grid-cols-12 gap-4 items-center h-[56px] px-6 text-[13px] transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 group relative ${
                      idx !== arr.length - 1 ? 'border-b border-slate-100 dark:border-zinc-800/60' : ''
                    }`}
                  >
                    <div className={`col-span-4 ${lang === 'ar' ? 'font-medium' : 'font-bold'} text-slate-900 dark:text-white truncate`}>{row.name}</div>
                    <div className="col-span-3 text-slate-500 dark:text-slate-400 truncate flex items-center gap-2 font-medium">
                      <i className={`fa-solid text-[11px] ${row.type.includes('Digital') || row.type.includes('LED') ? 'fa-bolt text-blue-600' : 'fa-image text-slate-400'}`}></i>
                      {row.type}
                    </div>
                    <div className="col-span-2">
                      {renderStatus(row.status)}
                    </div>
                    <div className={`col-span-2 text-end ${lang === 'ar' ? 'font-medium' : 'font-semibold'} text-slate-700 dark:text-slate-300`} suppressHydrationWarning>
                      {row.impressions.toLocaleString('en-US')}
                    </div>
                    <div className="col-span-1 text-end relative">
                      <button 
                        onClick={() => toggleDropdown(row.id)}
                        className="text-slate-400 hover:text-[#0F172A] dark:hover:text-white p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                      
                      {/* Action Dropdown Menu */}
                      {openDropdownId === row.id && (
                        <div className="absolute end-0 top-[80%] mt-2 w-48 bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-zinc-800 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-1.5 z-30 overflow-hidden text-start">
                          <button onClick={() => { showToast('Analytics view loaded'); setOpenDropdownId(null); }} className="w-full text-start px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2.5">
                            <i className="fa-solid fa-chart-line text-slate-400 w-3"></i> {dict.dashboard.vendor.viewAnalytics || "View Analytics"}
                          </button>
                          <button onClick={() => { showToast(dict?.dashboard?.toasts?.reportExportedDesc || 'Performance PDF downloading...', dict?.dashboard?.toasts?.reportExportedTitle || 'Report Exported'); setOpenDropdownId(null); }} className="w-full text-start px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2.5">
                            <i className="fa-solid fa-file-pdf text-slate-400 w-3"></i> {dict.dashboard.vendor.downloadPdf || "Download PDF"}
                          </button>
                          <div className="h-px w-full bg-slate-100 dark:bg-zinc-800/80 my-1"></div>
                          <button onClick={() => { showToast('Listing paused successfully'); setOpenDropdownId(null); }} className="w-full text-start px-4 py-2.5 text-xs font-semibold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors flex items-center gap-2.5">
                            <i className="fa-solid fa-pause w-3"></i> {dict.dashboard.vendor.pauseListing || "Pause Listing"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {tableData.filter(d => activeFilter === 'All' || d.status === activeFilter).length === 0 && (
                  <div className="p-10 text-center text-slate-500 text-sm font-medium">{dict.dashboard.vendor.noAssetsFound || "No assets found for this filter."}</div>
                )}
              </div>
            </div>

            {/* Mobile Cards Layout */}
            <div className="flex flex-col gap-4 md:hidden p-4 pt-2">
              {tableData.filter(d => activeFilter === 'All' || d.status === activeFilter).map((row) => (
                <div key={row.id} className="bg-white dark:bg-zinc-900/50 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl p-4 shadow-sm flex flex-col relative">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[14px] ${lang === 'ar' ? 'font-medium' : 'font-bold'} text-slate-900 dark:text-white pe-6`}>{row.name}</span>
                    <button 
                      onClick={() => toggleDropdown(`mobile-${row.id}`)}
                      className="text-slate-400 hover:text-[#0F172A] dark:hover:text-white p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors absolute end-2 top-2"
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                  </div>
                  
                  {openDropdownId === `mobile-${row.id}` && (
                    <div className="absolute end-4 top-10 w-48 bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-zinc-800 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-1.5 z-30 overflow-hidden text-start">
                      <button onClick={() => { showToast('Analytics view loaded'); setOpenDropdownId(null); }} className="w-full text-start px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2.5">
                        <i className="fa-solid fa-chart-line text-slate-400 w-3"></i> View Analytics
                      </button>
                      <button onClick={() => { showToast(dict?.dashboard?.toasts?.reportExportedDesc || 'Performance PDF downloading...', dict?.dashboard?.toasts?.reportExportedTitle || 'Report Exported'); setOpenDropdownId(null); }} className="w-full text-start px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2.5">
                        <i className="fa-solid fa-file-pdf text-slate-400 w-3"></i> Download PDF
                      </button>
                      <div className="h-px w-full bg-slate-100 dark:bg-zinc-800/80 my-1"></div>
                      <button onClick={() => { showToast('Listing paused successfully'); setOpenDropdownId(null); }} className="w-full text-start px-4 py-2.5 text-xs font-semibold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors flex items-center gap-2.5">
                        <i className="fa-solid fa-pause w-3"></i> Pause Listing
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-1 mb-4">
                    <div className="text-[12px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                      <i className={`fa-solid text-[10px] ${row.type.includes('Digital') || row.type.includes('LED') ? 'fa-bolt text-blue-600' : 'fa-image text-slate-400'}`}></i>
                      {row.type}
                    </div>
                    {renderStatus(row.status)}
                  </div>
                  
                  <div className="mt-2 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[13px]">
                    <span className="text-slate-500 font-medium">{dict.dashboard.vendor.impressions}</span>
                    <span className={`${lang === 'ar' ? 'font-medium' : 'font-bold'} text-slate-700 dark:text-slate-300`} suppressHydrationWarning>{row.impressions.toLocaleString('en-US')}</span>
                  </div>
                </div>
              ))}
              {tableData.filter(d => activeFilter === 'All' || d.status === activeFilter).length === 0 && (
                <div className="p-8 text-center text-slate-500 text-sm font-medium">No assets found for this filter.</div>
              )}
            </div>
          </div>

          {/* Recent Booking Requests Activity Feed (Col Span 1) */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h3 className="text-[15px] font-bold text-slate-900 dark:text-white px-1">{dict.dashboard.vendor.recentRequests || "Recent Booking Requests"}</h3>
            
            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {bookingRequests.map((req) => (
                  <motion.div 
                    key={req.id} 
                    layout
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{req.date}</span>
                      <span className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        {dict.dashboard.vendor.newRequest || "New Request"}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">{dict.dashboard.vendor.brand || "Brand"}: {req.brand}</h4>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-5">{req.location} &bull; <span className="font-bold text-slate-700 dark:text-slate-300">{req.price}</span></p>
                    
                    <div className="flex items-center gap-2.5">
                      <button 
                        onClick={() => {
                          setBookingRequests(prev => prev.filter(r => r.id !== req.id));
                          showToast(dict?.notifications?.items?.redBullApproved || `Campaign request from ${req.brand} approved!`);
                        }}
                        className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold py-2.5 rounded-xl hover:bg-black dark:hover:bg-slate-100 transition-colors active:scale-95"
                      >
                        {dict.dashboard.vendor.approve || "Approve"}
                      </button>
                      <button 
                        onClick={() => {
                          setBookingRequests(prev => prev.filter(r => r.id !== req.id));
                          showToast(`Request from ${req.brand} declined.`);
                        }}
                        className="flex-1 bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors active:scale-95"
                      >
                        {dict.dashboard.vendor.decline || "Decline"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Empty State */}
              {bookingRequests.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-50/50 dark:bg-zinc-900/30 border border-slate-200/50 dark:border-zinc-800/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center mt-2"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-check text-emerald-600 dark:text-emerald-400 text-lg"></i>
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-900 dark:text-white mb-1">{dict.dashboard.vendor.allCaughtUp || "All caught up!"}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{dict.dashboard.vendor.noPendingRequests || "No pending campaign requests."}</p>
                </motion.div>
              )}
            </div>
          </div>
          
        </motion.div>

      </motion.div>
    </main>
  );
}
