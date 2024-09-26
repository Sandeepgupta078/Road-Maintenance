// client/src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to Road Maintenance Portal</h1>
        <p className="text-lg text-gray-700 mb-4">
          Report road issues, track the status of repairs, and contribute to improving road conditions in your area.
        </p>
        <div>
          <a href="/report-issue" className="px-4 py-2 bg-blue-500 text-white rounded">Report an Issue</a>
          <a href="/all-issues" className="ml-4 px-4 py-2 bg-green-500 text-white rounded">View All Issues</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
