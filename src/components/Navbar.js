// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">Home</Link>  {/* Add link to Home */}
        </div>
        <div className="space-x-4">
          <Link to="/register" className="text-white">Register</Link>
          <Link to="/login" className="text-white">Login</Link>
          <Link to="/report-issue" className="text-white">Report Issue</Link>
          <Link to="/all-issues" className="text-white">All Issues</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
