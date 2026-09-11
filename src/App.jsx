import React, { useState, useEffect } from 'react';
import { localDb } from './db/localDb';
import Navbar from './components/Navbar';
import Catalog from './components/Catalog';
import MyBorrows from './components/MyBorrows';
import ListTool from './components/ListTool';

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
    if (window.confirm('Reset database back to initial seed data?')) {
      const { tools: t, borrows: b } = localDb.resetDefaults();
      setTools(t);
      setBorrows(b);
    }
  };

  const activeBorrowCount = borrows.filter(b => b.status === 'Active').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        borrowCount={activeBorrowCount}
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

      {/* Borrow Confirmation Modal */}
      {selectedToolForBorrow && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800">Borrow {selectedToolForBorrow.name}</h3>
            <p className="text-xs text-slate-500 mt-1">Lender: {selectedToolForBorrow.owner}</p>

            <form onSubmit={confirmBorrow} className="mt-4 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name / Student ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Student 2nd Year - S104"
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-lg text-amber-800 text-xs">
                Ref. Deposit: <strong>₹{selectedToolForBorrow.deposit * 50}</strong> (Refundable upon inspection).
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedToolForBorrow(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold"
                >
                  Confirm Borrow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        ToolShare Library • 2nd Year Academic Field Project • Built with React & Local Storage DB
      </footer>
    </div>
  );
}
