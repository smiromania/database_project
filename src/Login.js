import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      console.log(response.data);
      if(response.data.redirect == '/homepage-js')
      {
        window.location.href = '/';
      }  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div><nav className="bg-blue-600 p-4">
    <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Booking423F</div>
        <div>
            <Link to="/" className="text-white px-3 py-2 rounded hover:bg-blue-700">Home</Link>
            <Link to="/about" className="text-white px-3 py-2 rounded hover:bg-blue-700">About Us</Link>
            <Link to="/contact" className="text-white px-3 py-2 rounded hover:bg-blue-700">Contact</Link>
        </div>
    </div>
</nav>
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-10 rounded-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 my-4">Login</button>
        <button type="submit" className="bg-blue-500 flex justify-end text-white py-2 px-4 rounded hover:bg-blue-600"><a href = "/register">Register</a></button>
      </form>
    </div>
    </div>
  );
};

export default Login;
