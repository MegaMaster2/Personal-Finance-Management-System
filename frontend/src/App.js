import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register'; // <-- Make sure this is your register component
import Login from './components/Login';       // <-- Add this line to import the new component
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Personal Finance Manager</h1>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> {/* <-- Add this line for the login route */}
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/register" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;