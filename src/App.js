// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SecurePage from './components/checklist';
import Navigation from './components/navigation';
import './App.css';

const isAuthenticated = () => !!localStorage.getItem('token');
console.log('Is authenticated:', isAuthenticated());

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/secure"
            element={isAuthenticated() ? (
              <>
                <Navigation /> {/* Render Navigation here */}
                <SecurePage />
              </>
            ) : (
              <Navigate to="/" replace />
            )}
          />
          {/* Redirect any unknown paths to the login page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;