import React from 'react';
import { Clock, CheckCircle2, RotateCcw, AlertTriangle, Calendar, User, ShieldCheck } from 'lucide-react';

export default function MyBorrows({ borrows, onReturn }) {
  const activeBorrows = borrows.filter(b => b.status === 'Active');
  const returnedBorrows = borrows.filter(b => b.status === 'Returned');

  return (
    <div className="space-y-8">
      {/* Active Borrow Records */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Active Student Checkouts ({activeBorrows.length})
            </h2>
            <p className="text-xs text-slate-500">Track return deadlines and inspect assets before releasing deposit.</p>
          </div>
        </div>

        {activeBorrows.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-200 text-center">
            <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">All tools safely accounted for</p>
            <p className="text-xs text-slate-400 mt-0.5">There are no outstanding checked-out tools at this moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBorrows.map(item => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Due {item.dueDate}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mt-2">{item.toolName}</h3>

                  <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{item.borrower}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Issued: {item.borrowDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Status: <strong className="text-amber-600 font-medium">In Use</strong></span>
                  <button
                    onClick={() => onReturn(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Complete Return
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Return Ledger */}
      {returnedBorrows.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Audit History & Returned Logs
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="p-3.5 pl-5">Asset</th>
                  <th className="p-3.5">Borrower</th>
                  <th className="p-3.5">Return Date</th>
                  <th className="p-3.5 text-right pr-5">Deposit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {returnedBorrows.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 pl-5 font-semibold text-slate-900">{item.toolName}</td>
                    <td className="p-3.5">{item.borrower}</td>
                    <td className="p-3.5 text-slate-500">{item.returnedDate || 'Archived'}</td>
                    <td className="p-3.5 text-right pr-5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Refunded / Cleared
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
