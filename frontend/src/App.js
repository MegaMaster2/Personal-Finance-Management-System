import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserSelector from './components/UserSelector';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Personal Finance Manager</h1>
        <Routes>
          <Route path="/" element={<UserSelector />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;