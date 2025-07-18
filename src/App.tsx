import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Login, Register } from './components/Auth';
import { QuizCreation } from './components/QuizCreation';
import { QuizList } from './components/QuizList';
import { QuizTaking } from './components/QuizTaking';
import { QuizResults } from './components/QuizResults';
import { Profile } from './components/Profile';

function AppContent() {
  const { state } = useApp();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'home':
        return <Home />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'create-quiz':
        return <QuizCreation />;
      case 'quiz-list':
        return <QuizList />;
      case 'take-quiz':
        return <QuizTaking />;
      case 'quiz-results':
        return <QuizResults />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;