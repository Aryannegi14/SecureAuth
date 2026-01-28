
import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Control Center</h1>
          <p className="text-slate-500">System-wide monitoring and security management</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold">Export Security Logs</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold">Lock System</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', val: '1,284', color: 'text-blue-600' },
          { label: 'Active Sessions', val: '42', color: 'text-green-600' },
          { label: 'Failed Logins (24h)', val: '12', color: 'text-red-600' },
          { label: 'API Latency', val: '24ms', color: 'text-purple-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Brute-Force Prevention Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="font-bold text-slate-700">Rate Limiting</p>
              <p className="text-sm text-slate-500">Global API limit set to 100 req/min per IP</p>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="font-bold text-slate-700">Account Lockout</p>
              <p className="text-sm text-slate-500">3 failed attempts within 5 minutes triggers 15m lock</p>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200">
         <div className="flex gap-4">
            <div className="bg-amber-100 p-3 rounded-xl">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <div>
                <h4 className="font-bold text-amber-800">Admin Security Note</h4>
                <p className="text-amber-700 text-sm">As an administrator, your actions are logged and audited. Ensure you rotate your personal access keys every 30 days to maintain system integrity.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminPage;
