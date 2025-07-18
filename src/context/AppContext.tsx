import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, User, Quiz, QuizAttempt } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppContextType {
  state: AppState;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  setCurrentView: (view: AppState['currentView']) => void;
  createQuiz: (quiz: Omit<Quiz, 'id' | 'createdBy' | 'createdAt'>) => void;
  deleteQuiz: (quizId: string) => void;
  startQuiz: (quiz: Quiz) => void;
  submitAnswer: (answer: number) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_VIEW'; payload: AppState['currentView'] }
  | { type: 'SET_QUIZZES'; payload: Quiz[] }
  | { type: 'ADD_QUIZ'; payload: Quiz }
  | { type: 'DELETE_QUIZ'; payload: string }
  | { type: 'START_QUIZ'; payload: Quiz }
  | { type: 'SUBMIT_ANSWER'; payload: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_QUIZ'; payload: QuizAttempt }
  | { type: 'RESET_QUIZ' };

const initialState: AppState = {
  currentUser: null,
  currentView: 'home',
  quizzes: [],
  currentQuiz: null,
  currentQuestionIndex: 0,
  userAnswers: [],
  quizAttempts: []
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_QUIZZES':
      return { ...state, quizzes: action.payload };
    case 'ADD_QUIZ':
      return { ...state, quizzes: [...state.quizzes, action.payload] };
    case 'DELETE_QUIZ':
      return { 
        ...state, 
        quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload) 
      };
    case 'START_QUIZ':
      return {
        ...state,
        currentQuiz: action.payload,
        currentQuestionIndex: 0,
        userAnswers: [],
        currentView: 'take-quiz'
      };
    case 'SUBMIT_ANSWER':
      const newAnswers = [...state.userAnswers];
      newAnswers[state.currentQuestionIndex] = action.payload;
      return { ...state, userAnswers: newAnswers };
    case 'NEXT_QUESTION':
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        quizAttempts: [...state.quizAttempts, action.payload],
        currentView: 'quiz-results'
      };
    case 'RESET_QUIZ':
      return {
        ...state,
        currentQuiz: null,
        currentQuestionIndex: 0,
        userAnswers: []
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [users, setUsers] = useLocalStorage<User[]>('quiz_users', []);
  const [quizzes, setQuizzes] = useLocalStorage<Quiz[]>('quiz_quizzes', []);
  const [attempts, setAttempts] = useLocalStorage<QuizAttempt[]>('quiz_attempts', []);

  useEffect(() => {
    dispatch({ type: 'SET_QUIZZES', payload: quizzes });
  }, [quizzes]);

  const login = (username: string, password: string): boolean => {
    const user = users.find(u => u.username === username);
    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_VIEW', payload: 'home' });
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string): boolean => {
    if (users.some(u => u.username === username || u.email === email)) {
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      createdAt: new Date().toISOString()
    };
    
    setUsers([...users, newUser]);
    dispatch({ type: 'SET_USER', payload: newUser });
    dispatch({ type: 'SET_VIEW', payload: 'home' });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_VIEW', payload: 'home' });
  };

  const setCurrentView = (view: AppState['currentView']) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };

  const createQuiz = (quizData: Omit<Quiz, 'id' | 'createdBy' | 'createdAt'>) => {
    if (!state.currentUser) return;
    
    const newQuiz: Quiz = {
      ...quizData,
      id: Date.now().toString(),
      createdBy: state.currentUser.id,
      createdAt: new Date().toISOString()
    };
    
    setQuizzes([...quizzes, newQuiz]);
    dispatch({ type: 'ADD_QUIZ', payload: newQuiz });
    dispatch({ type: 'SET_VIEW', payload: 'quiz-list' });
  };

  const deleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
    dispatch({ type: 'DELETE_QUIZ', payload: quizId });
  };

  const startQuiz = (quiz: Quiz) => {
    dispatch({ type: 'START_QUIZ', payload: quiz });
  };

  const submitAnswer = (answer: number) => {
    dispatch({ type: 'SUBMIT_ANSWER', payload: answer });
  };

  const completeQuiz = () => {
    if (!state.currentQuiz || !state.currentUser) return;
    
    const correctAnswers = state.userAnswers.reduce((count, answer, index) => {
      return answer === state.currentQuiz!.questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    
    const score = Math.round((correctAnswers / state.currentQuiz.questions.length) * 100);
    
    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      quizId: state.currentQuiz.id,
      userId: state.currentUser.id,
      answers: state.userAnswers,
      score,
      completedAt: new Date().toISOString()
    };
    
    setAttempts([...attempts, attempt]);
    dispatch({ type: 'COMPLETE_QUIZ', payload: attempt });
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  return (
    <AppContext.Provider value={{
      state,
      login,
      register,
      logout,
      setCurrentView,
      createQuiz,
      deleteQuiz,
      startQuiz,
      submitAnswer,
      completeQuiz,
      resetQuiz
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}