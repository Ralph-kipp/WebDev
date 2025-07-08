import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

// Login component: Handles user login.
// It receives 'onNavigate' to switch between auth pages (register, forgot password)
// and 'onLoginSuccess' to signal successful login to App.jsx.
const Login = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic validation
    if (email === 'test@example.com' && password === 'password123') {
      setMessage('Login successful! Redirecting to menu...');
      setMessageType('success');
      setTimeout(() => {
        onLoginSuccess(); // Signal App.jsx to set isLoggedIn to true
      }, 1000);
    } else {
      setMessage('Login failed. Invalid email or password.');
      setMessageType('error');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4 font-inter">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to your SweetBite account.</p>
        </div>

        {message && (
          <div
            className={`p-3 mb-6 rounded-lg text-sm font-medium ${
              messageType === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                placeholder="your@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                placeholder="Your password"
                required
              />
            </div>
            <div className="text-right mt-2">
              <button
                onClick={() => onNavigate('forgotPassword')} // Navigate to ForgotPassword page
                className="text-sm text-pink-600 hover:text-pink-800 font-medium"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {isLoading ? 'Logging In...' : 'Sign In'}
          </button>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-pink-100">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')} // Navigate to Register page
              className="text-pink-600 hover:text-pink-800 font-medium"
            >
              Register now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
