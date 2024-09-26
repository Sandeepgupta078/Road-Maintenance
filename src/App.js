// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import IssueForm from './components/IssueForm';
import AllIssues from './components/AllIssues';
import Home from './components/Home';  // Import Home component
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar will be shown on every page */}
      <Routes>
        <Route path="/" element={<Home />} />          {/* Home page */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report-issue" element={<IssueForm />} />
        <Route path="/all-issues" element={<AllIssues />} />
      </Routes>
    </Router>
  );
}

export default App;
