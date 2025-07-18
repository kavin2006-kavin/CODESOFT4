import React from 'react';
import { Trophy, RotateCcw, Home, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function QuizResults() {
  const { state, resetQuiz, setCurrentView } = useApp();

  if (!state.currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No quiz results to show</h2>
          <button
            onClick={() => setCurrentView('home')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const correctAnswers = state.userAnswers.reduce((count, answer, index) => {
    return answer === state.currentQuiz!.questions[index].correctAnswer ? count + 1 : count;
  }, 0);

  const totalQuestions = state.currentQuiz.questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! 🎉", color: "text-green-600" };
    if (percentage >= 80) return { message: "Excellent work! 👏", color: "text-blue-600" };
    if (percentage >= 70) return { message: "Good job! 👍", color: "text-purple-600" };
    if (percentage >= 60) return { message: "Not bad! Keep learning! 📚", color: "text-yellow-600" };
    return { message: "Keep practicing! You'll improve! 💪", color: "text-red-600" };
  };

  const performance = getPerformanceMessage();

  const handleRetakeQuiz = () => {
    resetQuiz();
    startQuiz(state.currentQuiz!);
  };

  const { startQuiz } = useApp();

  return (
    <div className="min-h-screen bg-results-pattern bg-cover bg-center bg-fixed relative py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-900/85 to-accent-900/90"></div>
      <div className="relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-3xl shadow-2xl p-10 text-center border border-white/20">
          {/* Trophy Icon */}
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${
              percentage >= 80 ? 'bg-warning-500/30' : 
              percentage >= 60 ? 'bg-accent-500/30' : 
              'bg-gray-500/30'
            }`}>
              <Trophy className={`h-16 w-16 ${
                percentage >= 80 ? 'text-warning-400' : 
                percentage >= 60 ? 'text-accent-400' : 
                'text-gray-400'
              }`} />
            </div>
          </div>

          {/* Results */}
          <h1 className="text-4xl font-black text-white mb-4">🎉 Quiz Complete! 🎊</h1>
          <h2 className="text-2xl text-white font-bold mb-8">{state.currentQuiz.title}</h2>

          <div className="glass-effect rounded-2xl p-8 mb-10 border border-white/30">
            <div className="text-7xl font-black text-accent-400 mb-4">{percentage}%</div>
            <div className="text-2xl text-white font-bold mb-4">
              🎯 {correctAnswers} out of {totalQuestions} correct
            </div>
            <div className={`text-xl font-black ${performance.color}`}>
              {performance.message}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="text-left mb-8">
            <h3 className="text-2xl font-black text-white mb-6">📊 Question Review</h3>
            <div className="space-y-4">
              {state.currentQuiz.questions.map((question, index) => {
                const userAnswer = state.userAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className={`p-6 rounded-xl border-2 ${
                    isCorrect ? 'border-success-400/50 bg-success-500/20' : 'border-danger-400/50 bg-danger-500/20'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black ${
                        isCorrect ? 'bg-success-500' : 'bg-danger-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white mb-3 text-lg">{question.question}</p>
                        <div className="space-y-2 text-sm">
                          <p className={`font-bold ${isCorrect ? 'text-success-300' : 'text-danger-300'}`}>
                            🎯 Your answer: {userAnswer >= 0 ? question.options[userAnswer] : 'No answer'}
                          </p>
                          {!isCorrect && (
                            <p className="text-success-300 font-bold">
                              ✅ Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={handleRetakeQuiz}
              className="flex items-center space-x-3 gradient-bg-secondary text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-2xl"
            >
              <RotateCcw className="h-4 w-4" />
              <span>🔄 Retake Quiz</span>
            </button>
            
            <button
              onClick={() => setCurrentView('quiz-list')}
              className="flex items-center space-x-3 gradient-bg-accent text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-2xl"
            >
              <Share2 className="h-4 w-4" />
              <span>🔍 Browse More Quizzes</span>
            </button>
            
            <button
              onClick={() => {
                resetQuiz();
                setCurrentView('home');
              }}
              className="flex items-center space-x-3 glass-effect border border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>🏠 Go Home</span>
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}