import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your signin logic here
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      const response = await axios.post("http://localhost:4001/user/sign-in",{email: email, password: password});
      console.log('Sign-in successful:', response.data);
      if(response.status === 200 || response.status === 201) {
        // Redirect to the home page
        // alert("sign in successful");
        navigate("/", { state: { from: "login" }, replace: true });
        /*
        The navigate("/") function in React Router DOM can take two main arguments:
        Path: The destination URL, like "/" for the home route.
        Options: An optional second argument, an object that can include:
          1. state: An object of data you want to pass to the destination route.
          2. replace: A boolean value; if true, it will replace the current entry in the history stack instead of adding a new one.
        */
        
        console.log(response.data);
        setEmail('');
        setPassword('');
      } else {
        console.log('Sign-in failed:', response.data.message);
        alert("Invalid email or password");
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            <Link to="/signup" className="underline hover:text-gray-800">create new account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
