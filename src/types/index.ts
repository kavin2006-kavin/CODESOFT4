export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdBy: string;
  createdAt: string;
  category: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: number[];
  score: number;
  completedAt: string;
}

export interface AppState {
  currentUser: User | null;
  currentView: 'home' | 'login' | 'register' | 'create-quiz' | 'quiz-list' | 'take-quiz' | 'quiz-results' | 'profile';
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  userAnswers: number[];
  quizAttempts: QuizAttempt[];
}