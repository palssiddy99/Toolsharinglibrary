import React, { useState } from 'react';
import { Search, SlidersHorizontal, CheckCircle2, Clock, Sparkles, UserCheck, ShieldAlert, ArrowUpRight, Zap } from 'lucide-react';

export default function Catalog({ tools, onBorrow }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [availabilityOnly, setAvailabilityOnly] = useState(false);

  const categories = ['All', 'Power Tools', 'Hand Tools', 'Gardening', 'Measurement'];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || tool.category === categoryFilter;
    const matchesAvailability = !availabilityOnly || tool.status === 'Available';
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const availableCount = tools.filter(t => t.status === 'Available').length;
  const borrowedCount = tools.filter(t => t.status === 'Borrowed').length;

  return (
    <div className="space-y-8">
      {/* Top Hero / Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 rounded-2xl border border-slate-800 text-white relative overflow-hidden shadow-lg">
          <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
            <Zap className="w-36 h-36 text-amber-400" />
          </div>
          <span className="text-[11px] font-bold tracking-widest text-amber-400 uppercase">System Inventory</span>
          <h2 className="text-3xl font-extrabold mt-1">{tools.length} <span className="text-sm font-normal text-slate-400">Total Assets</span></h2>
          <p className="text-xs text-slate-400 mt-2">Zero idle tools. Share gear safely within campus departments.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ready for Dispatch</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">{availableCount}</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">Available for instant borrow</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">In Circulation</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">{borrowedCount}</div>
            <p className="text-xs text-amber-600 font-medium mt-1">Currently assigned to students</p>
          </div>
        </div>
      </div>

      {/* Modern Filter Toolbar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search equipment, specs, or lender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                categoryFilter === cat
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

          <button
            onClick={() => setAvailabilityOnly(!availabilityOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition ${
              availabilityOnly
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${availabilityOnly ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            Only Available
          </button>
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-800">No matching equipment found</h3>
          <p className="text-slate-500 text-xs mt-1">Try relaxing filters or adjusting your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo & Overlays */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  <span className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-sm ${
                    tool.status === 'Available'
                      ? 'bg-emerald-500/90 text-white'
                      : 'bg-slate-900/80 text-amber-300 border border-amber-500/30'
                  }`}>
                    {tool.status === 'Available' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {tool.status}
                  </span>

                  <span className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-slate-950/70 text-slate-200 backdrop-blur-md">
                    {tool.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-600 transition line-clamp-1">
                    {tool.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-700">
                        {tool.owner[0]}
                      </div>
                      <span className="truncate max-w-[90px]">{tool.owner}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Security Fee</span>
                      <span className="font-bold text-slate-900 font-mono text-xs">₹{tool.deposit * 50}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 pt-0">
                <button
                  disabled={tool.status !== 'Available'}
                  onClick={() => onBorrow(tool)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    tool.status === 'Available'
                      ? 'bg-slate-950 text-white hover:bg-amber-500 hover:text-slate-950 shadow-md shadow-slate-950/10'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{tool.status === 'Available' ? 'Request Loan' : 'Reserved'}</span>
                  {tool.status === 'Available' && <ArrowUpRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
