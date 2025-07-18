import React from 'react';
import { Brain, User, LogOut, Home, Plus, List } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Header() {
  const { state, logout, setCurrentView } = useApp();

  return (
    <header className="glass-effect shadow-2xl border-b border-white/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentView('home')}
          >
            <div className="gradient-bg-primary p-3 rounded-xl shadow-lg">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-black gradient-text">
                🧠 QuizMaster 🎯
              </h1>
              <p className="text-sm text-primary-200 font-bold">🚀 Challenge Your Mind 💡</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2 text-primary-200 hover:text-white transition-colors font-medium"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentView('quiz-list')}
              className="flex items-center space-x-2 text-primary-200 hover:text-white transition-colors font-medium"
            >
              <List className="h-4 w-4" />
              <span>Browse Quizzes</span>
            </button>
            {state.currentUser && (
              <button
                onClick={() => setCurrentView('create-quiz')}
                className="flex items-center space-x-2 text-primary-200 hover:text-white transition-colors font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Create Quiz</span>
              </button>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {state.currentUser ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center space-x-2 glass-effect hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
                >
                  <User className="h-4 w-4 text-white" />
                  <span className="text-white font-medium">{state.currentUser.username}</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-primary-200 hover:text-danger-400 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentView('login')}
                  className="text-white hover:text-primary-200 font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  className="gradient-bg-secondary text-white px-6 py-2 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}