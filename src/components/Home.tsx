import React from 'react';
import { Brain, Plus, Search, Trophy, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Home() {
  const { state, setCurrentView } = useApp();

  return (
    <div className="min-h-screen bg-hero-pattern bg-cover bg-center bg-fixed relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-secondary-900/80 to-accent-900/85"></div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="gradient-bg-primary p-6 rounded-full shadow-2xl animate-float">
              <Brain className="h-20 w-20 text-white" />
            </div>
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-bold text-white mb-6 animate-pulse-slow">
            🧠 Welcome to QuizMaster 🎯
          </h1>
          <p className="text-2xl text-gray-100 mb-12 max-w-3xl mx-auto font-bold leading-relaxed">
            🚀 Create engaging quizzes, challenge your knowledge, and compete with others! 
            The ultimate platform for interactive learning and fun. 📚✨
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {state.currentUser ? (
              <>
                <button
                  onClick={() => setCurrentView('create-quiz')}
                  className="flex items-center space-x-3 gradient-bg-secondary text-white px-10 py-5 rounded-2xl font-display font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-secondary-500/50"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create New Quiz</span>
                </button>
                <button
                  onClick={() => setCurrentView('quiz-list')}
                  className="flex items-center space-x-3 glass-effect text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-display font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl hover:bg-white/20"
                >
                  <Search className="h-5 w-5" />
                  <span>Browse Quizzes</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentView('register')}
                  className="flex items-center space-x-3 gradient-bg-secondary text-white px-10 py-5 rounded-2xl font-display font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-secondary-500/50"
                >
                  <Plus className="h-5 w-5" />
                  <span>Get Started</span>
                </button>
                <button
                  onClick={() => setCurrentView('quiz-list')}
                  className="flex items-center space-x-3 glass-effect text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-display font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl hover:bg-white/20"
                >
                  <Search className="h-5 w-5" />
                  <span>Browse Quizzes</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-effect p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2">
            <div className="gradient-bg-secondary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 animate-bounce-slow">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Create Quizzes</h3>
            <p className="text-gray-200 leading-relaxed">
              Build custom quizzes with multiple-choice questions. Perfect for education, training, or just for fun.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2">
            <div className="gradient-bg-accent w-16 h-16 rounded-2xl flex items-center justify-center mb-6 animate-bounce-slow">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Track Progress</h3>
            <p className="text-gray-200 leading-relaxed">
              Get instant feedback on your performance and track your learning progress over time.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2">
            <div className="bg-gradient-to-r from-success-400 to-success-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 animate-bounce-slow">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Share & Compete</h3>
            <p className="text-gray-200 leading-relaxed">
              Share your quizzes with others and compete to see who can achieve the highest scores.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="glass-effect rounded-3xl shadow-2xl p-10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-5xl font-bold gradient-text mb-3">{state.quizzes.length}</div>
              <div className="text-gray-200 font-medium text-lg">Total Quizzes</div>
            </div>
            <div>
              <div className="font-display text-5xl font-bold text-accent-400 mb-3">
                {state.quizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}
              </div>
              <div className="text-gray-200 font-medium text-lg">Questions Available</div>
            </div>
            <div>
              <div className="font-display text-5xl font-bold text-success-400 mb-3">
                {state.quizAttempts.length}
              </div>
              <div className="text-gray-200 font-medium text-lg">Quizzes Completed</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}