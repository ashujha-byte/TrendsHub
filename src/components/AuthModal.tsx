import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Phone, User, ArrowRight, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { Logo } from '@/components/Logo';

export function AuthModal() {
  const { authOpen, setAuthOpen } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authOpen) {
      setError('');
      setOtpSent(false);
      setOtpVerified(false);
      setOtp('');
    }
  }, [authOpen, mode, authMethod]);

  const handleEmailAuth = async () => {
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { data, error: err } = await supabase.auth.signUp({ email, password });
        if (err) throw err;
        if (data.user) {
          await supabase.from('profiles').upsert({ id: data.user.id, name });
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }
      setAuthOpen(false);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = () => {
    if (phone.length < 10) {
      setError('Enter a valid phone number');
      return;
    }
    setError('');
    setOtpSent(true);
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setOtpVerified(true);
      setError('');
    } else {
      setError('Enter the 6-digit OTP');
    }
  };

  const handlePhoneAuth = async () => {
    if (!otpVerified) {
      setError('Please verify OTP first');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const fakeEmail = `user_${phone}@trendshub.in`;
      if (mode === 'signup') {
        const { data, error: err } = await supabase.auth.signUp({ email: fakeEmail, password: `TH${phone}!` });
        if (err) throw err;
        if (data.user) {
          await supabase.from('profiles').upsert({ id: data.user.id, name: name || phone, phone });
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email: fakeEmail, password: `TH${phone}!` });
        if (err) throw err;
      }
      setAuthOpen(false);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {authOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setAuthOpen(false)}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#15181d] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-white/5">
              <button onClick={() => setAuthOpen(false)} className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <Logo className="h-12 w-auto mx-auto" />
              <h2 className="text-xl font-bold text-white text-center mt-4">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-sm text-gray-400 text-center mt-1">
                {mode === 'login' ? 'Sign in to continue shopping' : 'Join Trends Hub Sitamarhi'}
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Method toggle */}
              <div className="flex gap-2 mb-5 p-1 bg-white/5 rounded-xl">
                <button
                  onClick={() => setAuthMethod('email')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    authMethod === 'email' ? 'bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white' : 'text-gray-400'
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setAuthMethod('phone')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    authMethod === 'phone' ? 'bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white' : 'text-gray-400'
                  }`}
                >
                  Phone (OTP)
                </button>
              </div>

              {authMethod === 'email' ? (
                <div className="space-y-4">
                  {mode === 'signup' && (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50 transition-colors"
                      />
                    </div>
                  )}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50 transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleEmailAuth}
                    disabled={loading || !email || !password}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#FF9900]/30 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {mode === 'signup' && (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50 transition-colors"
                      />
                    </div>
                  )}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                      disabled={otpSent}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50 transition-colors disabled:opacity-50"
                    />
                  </div>

                  {!otpSent ? (
                    <button
                      onClick={handleSendOTP}
                      className="w-full py-3.5 rounded-xl bg-white/10 border border-white/10 text-white font-medium text-sm hover:bg-white/15 transition-colors"
                    >
                      Send OTP
                    </button>
                  ) : (
                    <>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          disabled={otpVerified}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50 transition-colors tracking-widest disabled:opacity-50"
                        />
                      </div>
                      {!otpVerified ? (
                        <button
                          onClick={handleVerifyOTP}
                          className="w-full py-3.5 rounded-xl bg-white/10 border border-white/10 text-white font-medium text-sm hover:bg-white/15 transition-colors"
                        >
                          Verify OTP
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-2 text-[#FF9900]">
                          <Check className="w-5 h-5" />
                          <span className="text-sm font-medium">OTP Verified (Demo)</span>
                        </div>
                      )}
                      <button
                        onClick={handlePhoneAuth}
                        disabled={loading || !otpVerified}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#FF9900]/30 transition-all disabled:opacity-50"
                      >
                        {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                        {!loading && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </>
                  )}
                  <p className="text-xs text-gray-600 text-center">Demo OTP: enter any 6 digits</p>
                </div>
              )}

              {error && <p className="text-sm text-[#FF3E00] mt-4 text-center">{error}</p>}

              {/* Mode switch */}
              <p className="text-center text-sm text-gray-400 mt-6">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-[#FF9900] font-medium hover:text-[#FF3E00] transition-colors"
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
