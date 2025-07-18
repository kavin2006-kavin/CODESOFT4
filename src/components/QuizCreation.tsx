import React, { useState } from 'react';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Question } from '../types';

export function QuizCreation() {
  const { createQuiz, setCurrentView } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [questions, setQuestions] = useState<Omit<Question, 'id'>[]>([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: keyof Omit<Question, 'id'>, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in title and description');
      return;
    }

    const validQuestions = questions.filter(q => 
      q.question.trim() && q.options.every(opt => opt.trim())
    );

    if (validQuestions.length === 0) {
      alert('Please add at least one complete question');
      return;
    }

    const questionsWithIds: Question[] = validQuestions.map((q, index) => ({
      ...q,
      id: `q${index + 1}`
    }));

    createQuiz({
      title: title.trim(),
      description: description.trim(),
      category,
      questions: questionsWithIds
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('General');
    setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  return (
    <div className="min-h-screen bg-create-pattern bg-cover bg-center bg-fixed relative py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-900/85 to-accent-900/90"></div>
      <div className="relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-3xl shadow-2xl p-10 border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black text-white mb-3">📝 Create New Quiz</h1>
              <p className="text-white font-bold text-lg">🎨 Build an engaging quiz for others to enjoy</p>
            </div>
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2 text-white hover:text-accent-300 transition-colors font-bold"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>🔙 Back</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Quiz Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white mb-3">🏆 Quiz Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-bold"
                  placeholder="Enter quiz title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-3">📋 Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-bold"
                  rows={3}
                  placeholder="Describe what this quiz is about"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-3">📂 Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white font-bold"
                >
                  <option value="General">General Knowledge</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Sports">Sports</option>
                  <option value="Technology">Technology</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-white">❓ Questions</h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex items-center space-x-2 gradient-bg-accent text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  <span>➕ Add Question</span>
                </button>
              </div>

              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="glass-effect p-8 rounded-2xl border border-white/30">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-black text-white">📝 Question {questionIndex + 1}</h4>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(questionIndex)}
                        className="text-danger-400 hover:text-danger-300 transition-colors font-bold p-2 rounded-lg hover:bg-danger-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-white mb-3">❓ Question Text</label>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                        className="w-full px-4 py-4 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-bold"
                        placeholder="Enter your question"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white mb-3">🎯 Answer Options</label>
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name={`correct-${questionIndex}`}
                              checked={question.correctAnswer === optionIndex}
                              onChange={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                              className="text-purple-600 focus:ring-purple-500"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                              className="flex-1 px-4 py-3 glass-effect border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-primary-300 font-bold"
                              placeholder={`Option ${optionIndex + 1}`}
                              required
                            />
                            <span className="text-sm text-accent-300 w-20 font-bold">
                              {question.correctAnswer === optionIndex ? '✅ Correct' : ''}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-primary-200 mt-3 font-bold">🎯 Select the radio button next to the correct answer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setCurrentView('home')}
                className="px-8 py-4 glass-effect border border-white/30 text-white rounded-xl hover:bg-white/20 transition-colors font-bold"
              >
                ❌ Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-3 gradient-bg-secondary text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-2xl"
              >
                <Save className="h-4 w-4" />
                <span>💾 Create Quiz</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}