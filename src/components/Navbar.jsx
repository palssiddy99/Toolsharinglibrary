import React from 'react';
import { Wrench, BookOpen, PlusCircle, Database } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, borrowCount, onResetData }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
            <div className="p-2 bg-amber-500 text-white rounded-xl shadow">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">ToolShare</span>
              <span className="text-xs ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold uppercase">Field Proj</span>
            </div>
          </div>

          <nav className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'catalog'
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab('borrows')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition relative ${
                activeTab === 'borrows'
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Active Loans</span>
              {borrowCount > 0 && (
                <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {borrowCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'list'
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Share a Tool</span>
            </button>
          </nav>

          <button
            onClick={onResetData}
            title="Reset Local Database to defaults"
            className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset DB</span>
          </button>
        </div>
      </div>
    </header>
  );
}
