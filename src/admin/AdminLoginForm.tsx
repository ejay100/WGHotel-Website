import React, { useState } from 'react';
import Link from 'next/link';
import { AkanPatternBackground } from '@/lib/svgAssets';

interface AdminLoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await onSubmit(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mountain-900 via-mountain-800 to-mountain-900 flex items-center justify-center px-4 relative">
      <AkanPatternBackground opacity={0.08} color="#94a3b8" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-gradient-to-br from-sunrise-400 to-sunrise-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">🏔️</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Winners Gold Hotel</h1>
            <p className="text-mountain-400">Staff Portal</p>
          </Link>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-mountain-900 mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-mountain-500 text-center mb-6">Sign in to your account</p>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="staff@winnersgold.com"
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
                disabled={isLoading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              8+ chars, uppercase, number, special char (!@#$%^&*)
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg">
              <p className="text-sm text-red-700">⚠️ {error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 rounded-xl font-bold text-white transition-all
              ${isLoading
                ? 'bg-mountain-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 cursor-pointer shadow-lg'
              }
            `}
          >
            {isLoading ? '🔄 Signing in...' : 'Sign In'}
          </button>

          {/* Signup Link */}
          <p className="text-center text-mountain-600 mt-6">
            New staff member?{' '}
            <Link href="/admin/signup" className="text-forest-600 hover:text-forest-700 font-medium">
              Create account
            </Link>
          </p>

          {/* Footer Info */}
          <div className="mt-6 pt-6 border-t border-mountain-200">
            <p className="text-xs text-mountain-500 text-center">
              🔒 All logins are logged and monitored for security
            </p>
          </div>
        </form>

        {/* Back to Hotel */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-mountain-400 hover:text-white transition text-sm">
            ← Back to Hotel Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
