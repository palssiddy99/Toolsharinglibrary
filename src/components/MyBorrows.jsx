import React from 'react';
import { Clock, CheckCircle2, RotateCcw } from 'lucide-react';

export default function MyBorrows({ borrows, onReturn }) {
  const activeBorrows = borrows.filter(b => b.status === 'Active');
  const pastBorrows = borrows.filter(b => b.status === 'Returned');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          Active Borrowed Items ({activeBorrows.length})
        </h2>

        {activeBorrows.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
            <p className="text-slate-500 text-sm">You have no actively borrowed tools from the library.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBorrows.map(item => (
              <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase font-medium text-amber-600">{item.category}</span>
                  <h3 className="font-semibold text-slate-800 text-base">{item.toolName}</h3>
                  <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                    <p>Borrower: <span className="text-slate-700 font-medium">{item.borrower}</span></p>
                    <p>Issued: <span className="text-slate-700">{item.borrowDate}</span> | Due: <span className="text-amber-700 font-semibold">{item.dueDate}</span></p>
                  </div>
                </div>

                <button
                  onClick={() => onReturn(item.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Mark Return
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {pastBorrows.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-slate-700 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Loan Return History
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {pastBorrows.map(item => (
                <div key={item.id} className="p-4 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-medium text-slate-800">{item.toolName}</span>
                    <span className="text-slate-400 ml-2">({item.category})</span>
                  </div>
                  <div className="text-slate-500">
                    Returned on {item.returnedDate || 'Completed'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
