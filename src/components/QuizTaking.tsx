import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function QuizTaking() {
  const { state, submitAnswer, completeQuiz, setCurrentView } = useApp();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question

  const currentQuestion = state.currentQuiz?.questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === (state.currentQuiz?.questions.length || 0) - 1;
  const progressPercentage = ((state.currentQuestionIndex + 1) / (state.currentQuiz?.questions.length || 1)) * 100;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-submit when time runs out
      if (selectedAnswer !== null) {
        handleNext();
      } else {
        // Submit with no answer (will be marked incorrect)
        submitAnswer(-1);
        if (isLastQuestion) {
          completeQuiz();
        } else {
          setCurrentView('take-quiz');
          setTimeLeft(30);
        }
      }
    }
  }, [timeLeft, selectedAnswer, isLastQuestion]);

  useEffect(() => {
    setSelectedAnswer(null);
    setTimeLeft(30);
  }, [state.currentQuestionIndex]);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      submitAnswer(selectedAnswer);
    }

    if (isLastQuestion) {
      completeQuiz();
    } else {
      setCurrentView('take-quiz');
    }
  };

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  if (!state.currentQuiz || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz not found</h2>
          <button
            onClick={() => setCurrentView('quiz-list')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Quiz List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-quiz-pattern bg-cover bg-center bg-fixed relative py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-900/85 to-accent-900/90"></div>
      <div className="relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-3xl shadow-2xl p-10 border border-white/20">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-black text-white">🎯 {state.currentQuiz.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-white font-bold">
                  📝 Question {state.currentQuestionIndex + 1} of {state.currentQuiz.questions.length}
                </div>
                <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                  timeLeft > 10 ? 'bg-success-500/30 text-success-200 font-bold' : 
                  timeLeft > 5 ? 'bg-warning-500/30 text-warning-200 font-bold' : 
                  'bg-danger-500/30 text-danger-200 font-bold'
                }`}>
                  ⏰ {timeLeft}s
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white mb-8">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-accent-400 bg-accent-500/20 text-white font-bold'
                      : 'border-white/30 hover:border-white/50 hover:bg-white/10 text-white font-bold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-accent-400 bg-accent-500'
                        : 'border-white/50'
                    }`}>
                      {selectedAnswer === index && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="font-black text-lg">{String.fromCharCode(65 + index)}.</span>
                    <span className="font-bold">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentView('quiz-list')}
              className="flex items-center space-x-2 text-white hover:text-accent-300 transition-colors font-bold"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>🚪 Exit Quiz</span>
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedAnswer !== null
                  ? 'gradient-bg-secondary text-white font-bold transform hover:scale-105 shadow-2xl'
                  : 'bg-gray-500/50 text-gray-300 cursor-not-allowed font-bold'
              }`}
            >
              <span>{isLastQuestion ? '🏁 Complete Quiz' : '➡️ Next Question'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}