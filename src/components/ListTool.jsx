import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function ListTool({ onAddTool, onComplete }) {
  const [form, setForm] = useState({
    name: '',
    category: 'Power Tools',
    deposit: 10,
    condition: 'Good',
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
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="w-5 h-5 text-amber-600" />
        <h2 className="text-lg font-bold text-slate-800">Add a Tool to the Share Network</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Tool Name *</label>
          <input
            type="text"
            required
            placeholder="e.g., Angle Grinder 850W"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
            >
              <option>Power Tools</option>
              <option>Hand Tools</option>
              <option>Gardening</option>
              <option>Measurement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Condition</label>
            <select
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
            >
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Lender/Owner Name *</label>
            <input
              type="text"
              required
              placeholder="Your name"
              value={form.owner}
              onChange={(e) => setForm({ ...form, owner: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Security Deposit (₹)</label>
            <input
              type="number"
              min="0"
              value={form.deposit * 50}
              onChange={(e) => setForm({ ...form, deposit: Math.floor(e.target.value / 50) || 0 })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Description & Included Parts</label>
          <textarea
            rows="3"
            placeholder="Specify cable length, accessories, drill bit sizes, safety precautions..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Photo URL (Optional)</label>
          <input
            type="url"
            placeholder="https://..."
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition"
        >
          Publish to Community Catalog
        </button>
      </form>
    </div>
  );
}
