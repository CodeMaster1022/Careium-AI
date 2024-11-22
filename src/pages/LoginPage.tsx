import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const history = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(identifier, password);
      history('/chatPage');
    } catch (error) {
      console.error('Login error:', error);
      if (error === 403) {
        setErrorMessage('Your IP is temporarily blocked. Please try again later.');
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-[#2B4570] to-[#3A5A8C] p-6 flex items-center justify-center'>
      <div className="w-full max-w-md p-4 rounded-lg bg-black/10 backdrop-blur-sm md:w-[400px]">
        <div className="flex flex-col gap-5 py-4 px-4">
        <p className="text-center text-4xl text-gray-300 mb-4 font-bold">Login</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <input
            className='w-full p-3 rounded bg-white/20 border border-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20'
            type="text"
            placeholder="Username or MacOS"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <input
            className="w-full p-3 rounded bg-white/20 border border-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            className="w-full h-12 rounded hover:bg-[#403737] text-white font-medium transition-colors"
            type="submit">Login</Button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

