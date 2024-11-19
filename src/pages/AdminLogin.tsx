import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
const AdminLogin = () => {
    const [password,setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>(''); 
    const [loading, setLoading] = useState<boolean>(false); 
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const navigate = useNavigate();
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    };
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading state

    try {
        const response = await api.post('/adminLogin', { username, password }); // Adjust the URL as needed
        // Handle successful login (e.g., store token, redirect, etc.)
        console.log('Login successful:', response.data);
        navigate('/adminPage')
        // You can redirect the user or store the token in local storage here
    } catch (error) {
        console.error('Login error:', error);
        setError('Invalid username or password'); // Set an error message
    } finally {
        setLoading(false); // Reset loading state
        console.log(error)
    }
      };
    return (
        <>
            <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <div className="relative">
                    <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
                    <div id="form-container" className="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out">
                    <h2 id="form-title" className="text-center text-3xl font-bold mb-10 text-gray-800">Login</h2>
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <input className="w-full h-12 border border-gray-800 px-3 rounded-lg" required placeholder="Email" id="" name="username" type="text" value={username} onChange={handleUsernameChange}/>
                            <input className="w-full h-12 border border-gray-800 px-3 rounded-lg" required placeholder="Password" id="" name="password" type="password" value={password} onChange={handlePasswordChange}/>
                            <button disabled={loading} className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{loading ? 'Logging in...' : 'Login'}</button>
                            <a className="text-blue-500 hover:text-blue-800 text-sm" href="#">Forgot Password?</a>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}

export default AdminLogin;