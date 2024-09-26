import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/api/users/verify/${token}`);
        setMessage('Email verified successfully!');
        navigate('/login');  // Redirect to login after verification
      } catch (error) {
        setMessage('Invalid or expired token.');
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
