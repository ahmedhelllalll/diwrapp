import React from 'react';

export function Pagination() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row items-center justify-between py-3 border-t border-[#e2e8f0] dark:border-zinc-800 mt-4">
      <div className="text-[13px] text-[#64748b] dark:text-zinc-400 font-medium">
        Showing <span className="font-bold text-[#0f172a] dark:text-zinc-100">1</span> to <span className="font-bold text-[#0f172a] dark:text-zinc-100">10</span> of <span className="font-bold text-[#0f172a] dark:text-zinc-100">42</span> results
      </div>
      <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-end">
        <button className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] dark:border-zinc-800 text-[#94a3b8] dark:text-zinc-500 text-[13px] font-semibold cursor-not-allowed">Previous</button>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg bg-[#0f172a] dark:bg-zinc-100 text-white dark:text-black flex items-center justify-center text-[13px] font-bold shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0">1</button>
          <button className="w-8 h-8 rounded-lg text-[#475569] dark:text-zinc-400 hover:bg-[#f1f5f9] dark:hover:bg-zinc-800 flex items-center justify-center text-[13px] font-semibold hidden sm:flex transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0">2</button>
          <button className="w-8 h-8 rounded-lg text-[#475569] dark:text-zinc-400 hover:bg-[#f1f5f9] dark:hover:bg-zinc-800 flex items-center justify-center text-[13px] font-semibold hidden sm:flex transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0">3</button>
          <span className="text-[#94a3b8] dark:text-zinc-500 mx-1 hidden sm:inline-block">...</span>
        </div>
        <button className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] dark:border-zinc-800 text-[#334155] dark:text-zinc-300 text-[13px] font-semibold hover:bg-[#f8fafc] dark:hover:bg-zinc-900/50 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0">Next</button>
      </div>
    </div>
  );
}

export function DataTable() {
  const data = [
    { id: '1', name: 'Downtown Digital Display', type: 'Billboard', status: 'Active', impressions: '14.2k' },
    { id: '2', name: 'Metro Station B', type: 'Transit', status: 'Pending', impressions: '-' },
    { id: '3', name: 'Highway Monopole', type: 'Billboard', status: 'Suspended', impressions: '8.4k' },
  ];

  const renderStatus = (status: string) => {
    if (status === 'Active') return <span className="bg-[#f0fdf4] dark:bg-green-900/30 text-[#15803d] dark:text-green-400 border border-[#bbf7d0] dark:border-green-800/50 rounded-full px-2.5 py-0.5 text-[11px] font-bold">Active</span>;
    if (status === 'Pending') return <span className="bg-[#fffbeb] dark:bg-yellow-900/30 text-[#b45309] dark:text-yellow-400 border border-[#fde68a] dark:border-yellow-800/50 rounded-full px-2.5 py-0.5 text-[11px] font-bold">Pending</span>;
    return <span className="bg-[#fef2f2] dark:bg-red-900/30 text-[#b91c1c] dark:text-red-400 border border-[#fecaca] dark:border-red-800/50 rounded-full px-2.5 py-0.5 text-[11px] font-bold">Suspended</span>;
  };

  return (
    <>
      {/* Desktop View */}
      <div 
        className="hidden md:block w-full overflow-x-auto md:overflow-x-visible touch-pan-y rounded-xl border border-[#e2e8f0] dark:border-zinc-800" 
        style={{ touchAction: 'pan-y' }}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8fafc] dark:bg-zinc-900/50 border-b border-[#e2e8f0] dark:border-zinc-800 text-[11px] font-bold text-[#64748b] dark:text-zinc-500 uppercase tracking-wider">
              <th className="px-6 py-4">Asset Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Impressions</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#0a0a0a] divide-y divide-[#f1f5f9] dark:divide-zinc-800/50">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-[#f8fafc] dark:hover:bg-zinc-900/60 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-[13.5px] font-bold text-[#0f172a] dark:text-zinc-100">{row.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[13.5px] text-[#64748b] dark:text-zinc-400 font-medium">{row.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatus(row.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[13.5px] font-semibold text-[#334155] dark:text-zinc-300">{row.impressions}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-[13.5px] font-medium">
                  <button className="text-[#94a3b8] dark:text-zinc-500 hover:text-[#1665ff] transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 mr-4"><i className="fa-solid fa-pen"></i></button>
                  <button className="text-[#94a3b8] dark:text-zinc-500 hover:text-red-600 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"><i className="fa-solid fa-trash-can"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3" style={{ isolate: 'isolate' }}>
        {data.map((row) => (
          <div key={row.id} className="bg-white dark:bg-black p-4 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-[14px] font-bold text-[#0f172a] dark:text-zinc-100 mb-1.5">{row.name}</h4>
                {renderStatus(row.status)}
              </div>
              <button className="w-8 h-8 flex items-center justify-center text-[#94a3b8] dark:text-zinc-500 hover:text-[#475569] dark:hover:text-zinc-300 hover:bg-[#f1f5f9] dark:hover:bg-zinc-800 rounded-lg transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 -mt-1 -mr-1">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm pt-3 border-t border-[#e2e8f0] dark:border-zinc-800">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#64748b] dark:text-zinc-500 uppercase tracking-wider mb-0.5">Type</span>
                <span className="text-[13px] font-bold text-[#334155] dark:text-zinc-300">{row.type}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#64748b] dark:text-zinc-500 uppercase tracking-wider mb-0.5">Impressions</span>
                <span className="text-[13px] font-bold text-[#334155] dark:text-zinc-300">{row.impressions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
