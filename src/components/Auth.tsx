import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, setCurrentView } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      setUsername('');
      setPassword('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-auth-pattern bg-cover bg-center bg-fixed relative flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-900/80 to-accent-900/90"></div>
      <div className="relative z-10">
        <div className="max-w-md w-full">
          <div className="glass-effect rounded-3xl shadow-2xl p-10 border border-white/20">
            <div className="text-center mb-8">
              <div className="gradient-bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="font-display text-4xl font-bold text-white mb-3">Welcome Back</h2>
              <p className="text-primary-100 font-bold">🔐 Sign in to your QuizMaster account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white mb-3">👤 Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-300" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-medium"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-3">🔒 Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-300" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-medium"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-danger-500/20 border border-danger-400/50 text-danger-200 px-4 py-3 rounded-xl backdrop-blur-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full gradient-bg-secondary text-white py-4 px-6 rounded-xl font-display font-bold text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3"
              >
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-primary-200">
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentView('register')}
                  className="text-accent-300 hover:text-white font-semibold transition-colors"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, setCurrentView } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (register(username, email, password)) {
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setError('Username or email already exists');
    }
  };

  return (
    <div className="min-h-screen bg-auth-pattern bg-cover bg-center bg-fixed relative flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-900/80 to-accent-900/90"></div>
      <div className="relative z-10">
        <div className="max-w-md w-full">
          <div className="glass-effect rounded-3xl shadow-2xl p-10 border border-white/20">
            <div className="text-center mb-8">
              <div className="gradient-bg-secondary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="font-display text-4xl font-bold text-white mb-3">Join QuizMaster</h2>
              <p className="text-primary-100 font-bold">🎉 Create your account to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white mb-3">👤 Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-300" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-medium"
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-3">📧 Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-medium"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-3">🔒 Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-300" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-medium"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-3">🔐 Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-300" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-medium"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-danger-500/20 border border-danger-400/50 text-danger-200 px-4 py-3 rounded-xl backdrop-blur-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full gradient-bg-secondary text-white py-4 px-6 rounded-xl font-display font-bold text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3"
              >
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-primary-200">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentView('login')}
                  className="text-accent-300 hover:text-white font-semibold transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}