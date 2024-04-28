import React from 'react';
import TodoList from './components/TodoList';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Login />
        <TodoList />
      </div>
    </AuthProvider>
  );
}

export default App;