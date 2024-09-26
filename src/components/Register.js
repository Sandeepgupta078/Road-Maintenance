import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleRegister = async () => {
    const res = await axios.post('/api/auth/register', { name, email, password });
    setIsOtpSent(true);
    console.log(res.data);
  };

  const handleVerifyOtp = async () => {
    await axios.post('/api/auth/verify', { email, otp });
    alert('Account verified');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 max-w-md w-full bg-white shadow-lg">
        {!isOtpSent ? (
          <>
            <h2 className="mb-4 text-2xl font-bold">Register</h2>
            <input className="mb-4 w-full p-2 border" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="mb-4 w-full p-2 border" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="mb-4 w-full p-2 border" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister} className="w-full bg-blue-500 text-white p-2">Register</button>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-2xl font-bold">Verify OTP</h2>
            <input className="mb-4 w-full p-2 border" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={handleVerifyOtp} className="w-full bg-blue-500 text-white p-2">Verify</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
