import React, { useState, useEffect } from 'react';
import { localDb } from './db/localDb';
import Navbar from './components/Navbar';
import Catalog from './components/Catalog';
import MyBorrows from './components/MyBorrows';
import ListTool from './components/ListTool';
import { Calendar, ShieldAlert, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [tools, setTools] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [selectedToolForBorrow, setSelectedToolForBorrow] = useState(null);
  const [borrowerName, setBorrowerName] = useState('');
  const [durationDays, setDurationDays] = useState(3);

  useEffect(() => {
    setTools(localDb.getTools());
    setBorrows(localDb.getBorrows());
  }, []);

  const handleBorrowRequest = (tool) => {
    setSelectedToolForBorrow(tool);
  };

  const confirmBorrow = (e) => {
    e.preventDefault();
    if (!selectedToolForBorrow) return;

    const res = localDb.borrowTool(selectedToolForBorrow.id, borrowerName, durationDays);
    if (res) {
      setTools([...res.updatedTools]);
      setBorrows([...res.updatedBorrows]);
      setSelectedToolForBorrow(null);
      setBorrowerName('');
      setActiveTab('borrows');
    }
  };

  const handleReturn = (borrowId) => {
    const res = localDb.returnTool(borrowId);
    if (res) {
      setTools([...res.updatedTools]);
      setBorrows([...res.updatedBorrows]);
    }
  };

  const handleAddTool = (tool) => {
    const updated = localDb.saveTool(tool);
    setTools([...updated]);
  };

  const handleResetData = () => {
    if (window.confirm('Reset local database back to default seed records?')) {
      const { tools: t, borrows: b } = localDb.resetDefaults();
      setTools(t);
      setBorrows(b);
    }
  };

  const activeBorrowCount = borrows.filter(b => b.status === 'Active').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        borrowCount={activeBorrowCount}
        totalTools={tools.length}
        onResetData={handleResetData}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'catalog' && (
          <Catalog tools={tools} onBorrow={handleBorrowRequest} />
        )}

        {activeTab === 'borrows' && (
          <MyBorrows borrows={borrows} onReturn={handleReturn} />
        )}

        {activeTab === 'list' && (
          <ListTool onAddTool={handleAddTool} onComplete={() => setActiveTab('catalog')} />
        )}
      </main>

      {/* Modal Dialog */}
      {selectedToolForBorrow && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedToolForBorrow(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold">Lending Authorization</span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">{selectedToolForBorrow.name}</h3>
            <p className="text-xs text-slate-500">Asset custodian: <strong>{selectedToolForBorrow.owner}</strong></p>

            <form onSubmit={confirmBorrow} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Name & ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Alex Carter (SE-2026-081)"
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Requested Loan Period (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Required Caution Deposit: <strong className="text-slate-900">₹{selectedToolForBorrow.deposit * 50}</strong>. Fully released upon checking in without structural defects.
                </p>
              </div>

              <div className="flex gap-2.5 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedToolForBorrow(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-xl transition-all duration-200 shadow-md"
                >
                  Authorize Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-400">
        ToolShare Enterprise Portal • Field Project Demonstration • Local Engine v2.0
      </footer>
    </div>
  );
}
