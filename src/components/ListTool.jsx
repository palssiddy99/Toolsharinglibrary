import React, { useState } from 'react';
import { PlusCircle, Sparkles, UploadCloud, ShieldCheck } from 'lucide-react';

export default function ListTool({ onAddTool, onComplete }) {
  const [form, setForm] = useState({
    name: '',
    category: 'Power Tools',
    deposit: 10,
    condition: 'Like New',
    owner: '',
    contact: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.owner) return;

    onAddTool({
      ...form,
      image: form.image || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80'
    });

    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/40">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Publish Equipment to ToolShare</h2>
            <p className="text-xs text-slate-500">Make your equipment accessible to peers and reduce wasteful duplicative buys.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Equipment Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. DeWalt 20V Max Brushless Circular Saw"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Department / Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-white"
              >
                <option>Power Tools</option>
                <option>Hand Tools</option>
                <option>Gardening</option>
                <option>Measurement</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Working Condition</label>
              <select
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-white"
              >
                <option>Brand New</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Fair / Functional</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Owner / Department Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mechanical Lab A / Prof. K. Patel"
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Deposit Amount (₹)</label>
              <input
                type="number"
                min="0"
                value={form.deposit * 50}
                onChange={(e) => setForm({ ...form, deposit: Math.floor(e.target.value / 50) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Description & Accessories Included</label>
            <textarea
              rows="3"
              placeholder="Include accessories, blade sizes, safety instructions, or pickup instructions..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Direct Image URL (Optional)</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-mono text-[11px]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 flex items-center justify-center gap-2 text-xs"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Register Asset to Public Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
