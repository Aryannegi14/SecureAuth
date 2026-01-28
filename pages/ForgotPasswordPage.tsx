
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { backendApi } from '../services/mockBackend';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await backendApi.forgotPassword(email);
    if (res.success) {
      setSent(true);
    } else {
      setError(res.message || "Something went wrong");
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Check your email</h1>
          <p className="text-slate-500 mt-4 leading-relaxed">
            We've sent a secure password reset link to <strong className="text-slate-700">{email}</strong>. The link expires in 60 minutes.
          </p>
          <div className="mt-8 flex flex-col gap-3">
             <Link to="/login" className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700">Return to Login</Link>
             <button onClick={() => setSent(false)} className="text-sm text-blue-600 hover:underline">Didn't get the email? Try again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="mb-8">
           <Link to="/login" className="text-sm text-blue-600 flex items-center gap-1 hover:underline mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back to login
           </Link>
          <h1 className="text-2xl font-bold text-slate-800">Forgot Password?</h1>
          <p className="text-slate-500 mt-2">Enter your email and we'll send you a secure reset link.</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? 'Processing...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
