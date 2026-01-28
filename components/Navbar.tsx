
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">SecureAuth Pro</span>
        </Link>
        
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
              {user.role === Role.ADMIN && (
                <Link to="/admin" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Admin Panel</Link>
              )}
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 hidden md:inline">Logged in as <strong className="text-slate-700">{user.name}</strong></span>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors shadow-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
              <Link to="/signup" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all shadow-md shadow-blue-100">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
