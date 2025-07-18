import React, { useState } from 'react';
import { Play, User, Calendar, Hash, Trash2, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function QuizList() {
  const { state, startQuiz, deleteQuiz, setCurrentView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(state.quizzes.map(quiz => quiz.category))];

  const filteredQuizzes = state.quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const canDeleteQuiz = (quiz: any) => {
    return state.currentUser && quiz.createdBy === state.currentUser.id;
  };

  const handleDeleteQuiz = (quizId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(quizId);
    }
  };

  return (
    <div className="min-h-screen bg-quiz-pattern bg-cover bg-center bg-fixed relative py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-secondary-900/75 to-accent-900/85"></div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-5xl font-bold text-white mb-4">Browse Quizzes</h1>
          <p className="text-xl text-primary-200">Choose a quiz to test your knowledge</p>
        </div>

        {/* Filters */}
        <div className="glass-effect rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-300" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-medium"
                  placeholder="Search quizzes..."
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white font-medium"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quiz Grid */}
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-12">
            <div className="glass-effect rounded-3xl shadow-2xl p-12 border border-white/20">
              <Hash className="h-16 w-16 text-primary-300 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-white mb-4">No quizzes found</h3>
              <p className="text-primary-200 mb-6">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Be the first to create a quiz!'
                }
              </p>
              {state.currentUser && (
                <button
                  onClick={() => setCurrentView('create-quiz')}
                  className="gradient-bg-secondary text-white px-8 py-4 rounded-xl font-display font-bold transition-all transform hover:scale-105 shadow-2xl"
                >
                  Create First Quiz
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="glass-effect rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-white/20 group"
                onClick={() => startQuiz(quiz)}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-accent-300 transition-colors">
                        {quiz.title}
                      </h3>
                      <p className="text-primary-200 line-clamp-3 mb-4 leading-relaxed">
                        {quiz.description}
                      </p>
                    </div>
                    {canDeleteQuiz(quiz) && (
                      <button
                        onClick={(e) => handleDeleteQuiz(quiz.id, e)}
                        className="text-danger-400 hover:text-danger-300 transition-colors ml-3 p-2 rounded-lg hover:bg-danger-500/20"
                        title="Delete quiz"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-primary-300 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Hash className="h-5 w-5" />
                        <span>{quiz.questions.length} questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-5 w-5" />
                        <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="bg-gradient-to-r from-accent-400 to-accent-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                        {quiz.category}
                      </span>
                    </div>
                    <button className="flex items-center space-x-3 gradient-bg-secondary text-white px-6 py-3 rounded-xl font-display font-bold transition-all transform hover:scale-105 shadow-lg">
                      <Play className="h-5 w-5" />
                      <span>Start Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}