
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { backendApi } from '../services/mockBackend';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await backendApi.getUserLogs();
      if (res.success) setLogs(res.data);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100 opacity-90">Secure session established. Role: <span className="px-2 py-0.5 bg-blue-400 bg-opacity-30 rounded-md font-mono">{user?.role}</span></p>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0a11.92 11.92 0 012.382 6.47c0 1.332-.216 2.614-.618 3.816m-16.618-10.274A11.92 11.92 0 002 12.416c0 1.332.216 2.614.618 3.816m16.618 0a11.955 11.955 0 01-8.618 3.04 11.955 11.955 0 01-8.618-3.04m17.236 0c.39 1.192.618 2.484.618 3.816 0 1.25-.213 2.45-.602 3.56m-16.634-7.376a11.95 11.95 0 010 7.376m16.634-7.376c-.39 1.192-.618 2.484-.618 3.816 0 1.25-.213 2.45-.602 3.56M2 12.416c0 1.25.213 2.45.602 3.56"></path></svg>
          </div>
          <h3 className="text-slate-500 font-medium text-sm">Auth Method</h3>
          <p className="text-2xl font-bold text-slate-800">JWT + Cookie</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h3 className="text-slate-500 font-medium text-sm">Security Level</h3>
          <p className="text-2xl font-bold text-slate-800">Bcrypt v12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 className="text-slate-500 font-medium text-sm">Last Rotation</h3>
          <p className="text-2xl font-bold text-slate-800">15m ago</p>
        </div>
      </div>

      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-lg text-slate-800">Security Access Logs</h2>
          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500 uppercase tracking-wider font-bold">Activity Tracking</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Device</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">Accessing encrypted logs...</td></tr>
              ) : logs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm font-semibold text-slate-700">{log.event}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono">{log.ip}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{log.device}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 italic">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
