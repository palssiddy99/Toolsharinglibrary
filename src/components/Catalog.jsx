import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, CheckCircle, Clock } from 'lucide-react';

export default function Catalog({ tools, onBorrow }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Power Tools', 'Hand Tools', 'Gardening', 'Measurement'];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || tool.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search drill, saw, wrenches, gardening..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                categoryFilter === cat
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 text-sm">No tools found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    tool.status === 'Available'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {tool.status === 'Available' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {tool.status}
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-amber-600 font-mono">
                    {tool.category}
                  </span>
                  <h3 className="font-semibold text-slate-800 mt-1 text-base line-clamp-1">{tool.name}</h3>
                  <p className="text-slate-500 text-xs mt-2 line-clamp-2">{tool.description}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                    <div>Condition: <span className="text-slate-700 font-medium">{tool.condition}</span></div>
                    <div>Deposit: <span className="text-slate-700 font-bold">₹{tool.deposit * 50}</span></div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  disabled={tool.status !== 'Available'}
                  onClick={() => onBorrow(tool)}
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    tool.status === 'Available'
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {tool.status === 'Available' ? 'Borrow Tool' : 'Currently Checked Out'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
