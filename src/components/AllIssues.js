import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const res = await axios.get('/api/issues');
      setIssues(res.data);
    };

    fetchIssues();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-8 w-full max-w-4xl bg-white shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">All Reported Issues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {issues.map(issue => (
            <div key={issue._id} className="p-4 border rounded shadow-sm">
              <h3 className="font-bold text-lg">{issue.title}</h3>
              <p>{issue.description}</p>
              <p><b>Address:</b> {issue.address}</p>
              <p><b>Status:</b> {issue.status}</p>
              {issue.image && <img src={issue.image} alt="Reported issue" className="mt-2" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllIssues;
