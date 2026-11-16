import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, Phone, User as UserIcon, MapPin, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Pune');
  const [password, setPassword] = useState('pass123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setMode(authModalMode);
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (!name.trim()) throw new Error('Please enter your full name');
        if (!email.trim() || !email.includes('@')) throw new Error('Please enter a valid email address');
        if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
          throw new Error('Please enter a valid 10-digit mobile number for SMS confirmation');
        }

        await register(name, email, phone, city);
      } else {
        if (!email.trim()) throw new Error('Please enter your email or phone number');
        await login(email, password);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Authentication failed. Please check details.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoFill = (type: 'default' | 'vaishnavi') => {
    if (type === 'vaishnavi') {
      setName('Vaishnavi Kawale');
      setEmail('kawalevaishnavi759@gmail.com');
      setPhone('+91 98220 54321');
      setCity('Pune / Maharashtra');
    } else {
      setName('Sanjay Kulkarni');
      setEmail('sanjay.kulkarni@eventpro.in');
      setPhone('+91 98900 11223');
      setCity('Mumbai');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0f041d] border border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(147,51,234,0.35)] overflow-hidden">
        {/* Top glow accent */}
        <div className="h-1.5 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600"></div>

        {/* Header */}
        <div className="p-6 pb-4 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3 h-3 text-purple-300" />
              <span>Chintamani Sound Member Portal</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {mode === 'register' ? 'Create Customer Account' : 'Welcome Back to LoudLee'}
            </h2>
            <p className="text-xs text-purple-300/80 mt-1">
              {mode === 'register'
                ? 'Register your mobile & email to receive instant booking receipts and SMS updates.'
                : 'Login to access your event packages, booking tax invoices, and Dolby gear reservations.'}
            </p>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-purple-400 hover:text-white rounded-lg hover:bg-purple-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick autofill helper */}
        <div className="px-6 pb-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-purple-950/60 border border-purple-500/20 text-xs">
            <span className="text-purple-300 font-medium">Quick Demo Autofill:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoFill('vaishnavi')}
                className="px-2 py-0.5 rounded bg-purple-600/40 hover:bg-purple-600/60 text-purple-200 border border-purple-400/30 text-[11px] transition-colors"
              >
                Owner / User
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('default')}
                className="px-2 py-0.5 rounded bg-purple-600/40 hover:bg-purple-600/60 text-purple-200 border border-purple-400/30 text-[11px] transition-colors"
              >
                Event Planner
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-3.5">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-950/70 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Full Name / Event Organizer <span className="text-fuchsia-400">*</span>
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Vaishnavi Kawale"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#16052b] border border-purple-500/30 rounded-xl text-white text-sm placeholder-purple-400/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">
              Email Address (For Tax Receipt & Confirmation) <span className="text-fuchsia-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="e.g. kawalevaishnavi759@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#16052b] border border-purple-500/30 rounded-xl text-white text-sm placeholder-purple-400/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">
              Mobile Number (For Instant SMS Updates) <span className="text-fuchsia-400">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="+91 98220 54321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#16052b] border border-purple-500/30 rounded-xl text-white text-sm placeholder-purple-400/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">City / Region</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Pune, Mumbai, Nashik, Kolhapur"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#16052b] border border-purple-500/30 rounded-xl text-white text-sm placeholder-purple-400/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#16052b] border border-purple-500/30 rounded-xl text-white text-sm placeholder-purple-400/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-600/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <span>{mode === 'register' ? 'Register & Continue to Booking' : 'Login & Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center pt-2 border-t border-purple-500/20">
            {mode === 'register' ? (
              <p className="text-xs text-purple-300/80">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setMode('login');
                  }}
                  className="text-purple-300 font-bold hover:underline"
                >
                  Log in here
                </button>
              </p>
            ) : (
              <p className="text-xs text-purple-300/80">
                New customer?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setMode('register');
                  }}
                  className="text-purple-300 font-bold hover:underline"
                >
                  Register here (Quick 10 sec)
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
