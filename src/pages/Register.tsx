import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [macos, setMacos] = useState('');
  const [role, setRole] = useState('customer');
  const history = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering with:', username, password, macos, role);
    try {
      await axios.post('http://localhost:3000/api/auth/register', { username, password, macos, role });
      history('/login');
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error (e.g., show error message)
    }
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-[#2B4570] to-[#3A5A8C] p-6 flex items-center justify-center'>
      <div className="w-full max-w-md p-4 rounded-lg bg-black/10 backdrop-blur-sm md:w-[400px]">
        <div className="flex flex-col gap-5 py-4 px-4">
        <p className="text-center text-4xl text-gray-300 mb-4 font-bold">Login</p>
        <form onSubmit={handleSubmit} className='space-y-6'>
            <input
            className="w-full p-3 rounded bg-white/20 border border-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            className="w-full p-3 rounded bg-white/20 border border-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <input
            className="w-full p-3 rounded bg-white/20 border border-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20"
            type="text"
            placeholder="MacOS"
            value={macos}
            onChange={(e) => setMacos(e.target.value)}
            />
            <Select value={role} onValueChange={(value) => {setRole(value)}}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select file type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="reseller">Reseller</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit" className="w-full h-12 rounded hover:bg-[#403737] text-white font-medium transition-colors">Register</Button>
        </form>
    </div>
    </div>
    </div>
  );
};

export default Register;

