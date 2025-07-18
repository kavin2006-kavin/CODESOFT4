import React from 'react';
import { User, Trophy, Calendar, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Profile() {
  const { state, setCurrentView } = useApp();

  if (!state.currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
          <button
            onClick={() => setCurrentView('login')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const userQuizzes = state.quizzes.filter(quiz => quiz.createdBy === state.currentUser!.id);
  const userAttempts = state.quizAttempts.filter(attempt => attempt.userId === state.currentUser!.id);
  const averageScore = userAttempts.length > 0 
    ? Math.round(userAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / userAttempts.length)
    : 0;

  return (
    <div className="min-h-screen bg-profile-pattern bg-cover bg-center bg-fixed relative py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-900/85 to-accent-900/90"></div>
      <div className="relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-3xl shadow-2xl p-10 border border-white/20">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="gradient-bg-primary w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <User className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white mb-4">👤 {state.currentUser.username}</h1>
            <p className="text-white font-bold text-lg">📧 {state.currentUser.email}</p>
            <p className="text-sm text-primary-200 font-bold mt-2">
              🗓️ Member since {new Date(state.currentUser.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="glass-effect p-8 rounded-2xl text-center border border-white/30">
              <div className="gradient-bg-secondary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-black text-accent-400 mb-2">{userQuizzes.length}</div>
              <div className="text-white text-sm font-bold">📝 Quizzes Created</div>
            </div>

            <div className="glass-effect p-8 rounded-2xl text-center border border-white/30">
              <div className="gradient-bg-accent w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-black text-warning-400 mb-2">{userAttempts.length}</div>
              <div className="text-white text-sm font-bold">🎯 Quizzes Taken</div>
            </div>

            <div className="glass-effect p-8 rounded-2xl text-center border border-white/30">
              <div className="bg-gradient-to-r from-success-400 to-success-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-black text-success-400 mb-2">{averageScore}%</div>
              <div className="text-white text-sm font-bold">📊 Average Score</div>
            </div>

            <div className="glass-effect p-8 rounded-2xl text-center border border-white/30">
              <div className="bg-gradient-to-r from-warning-400 to-warning-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-black text-warning-400 mb-2">
                {userQuizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}
              </div>
              <div className="text-white text-sm font-bold">❓ Questions Created</div>
            </div>
          </div>

          {/* My Quizzes */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-white">📚 My Quizzes</h2>
              <button
                onClick={() => setCurrentView('create-quiz')}
                className="gradient-bg-secondary text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                ➕ Create New Quiz
              </button>
            </div>

            {userQuizzes.length === 0 ? (
              <div className="text-center py-10 glass-effect rounded-2xl border border-white/30">
                <p className="text-white font-bold mb-6 text-lg">📝 You haven't created any quizzes yet</p>
                <button
                  onClick={() => setCurrentView('create-quiz')}
                  className="gradient-bg-secondary text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-2xl"
                >
                  🚀 Create Your First Quiz
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {userQuizzes.map((quiz) => (
                  <div key={quiz.id} className="glass-effect p-6 rounded-xl border border-white/30">
                    <h3 className="font-black text-white mb-3 text-lg">{quiz.title}</h3>
                    <p className="text-primary-200 text-sm mb-4 font-bold">{quiz.description}</p>
                    <div className="flex items-center justify-between text-sm text-primary-300 font-bold">
                      <span>❓ {quiz.questions.length} questions</span>
                      <span>📅 {new Date(quiz.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Quiz Attempts */}
          <div>
            <h2 className="text-3xl font-black text-white mb-8">🏆 Recent Quiz Attempts</h2>
            
            {userAttempts.length === 0 ? (
              <div className="text-center py-10 glass-effect rounded-2xl border border-white/30">
                <p className="text-white font-bold mb-6 text-lg">🎯 You haven't taken any quizzes yet</p>
                <button
                  onClick={() => setCurrentView('quiz-list')}
                  className="gradient-bg-accent text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-2xl"
                >
                  🔍 Browse Quizzes
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userAttempts.slice(-5).reverse().map((attempt) => {
                  const quiz = state.quizzes.find(q => q.id === attempt.quizId);
                  return (
                    <div key={attempt.id} className="glass-effect p-6 rounded-xl flex items-center justify-between border border-white/30">
                      <div>
                        <h3 className="font-black text-white text-lg">{quiz?.title || 'Unknown Quiz'}</h3>
                        <p className="text-primary-200 text-sm font-bold">
                          📅 Completed on {new Date(attempt.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`text-2xl font-black ${
                        attempt.score >= 80 ? 'text-success-400' : 
                        attempt.score >= 60 ? 'text-accent-400' : 
                        'text-danger-400'
                      }`}>
                        🎯 {attempt.score}%
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}