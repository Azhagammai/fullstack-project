'use client';

import { useState } from 'react';
import SignupForm from '../../frontend/components/SignupForm';
import LoginForm from '../../frontend/components/LoginForm';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (userData: { name: string; email: string; password: string; confirmPassword: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        alert('Account created successfully! You can now login.');
        setIsLogin(true); // Switch to login form
      } else {
        setError(data.error || 'Failed to create account');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (userData: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        // Store token in localStorage for future requests
        localStorage.setItem('token', data.token);
        alert('Login successful!');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // If user is logged in, show dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome, {user.name}!
                </h1>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span> {user.name}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span> {user.email}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Member since:</span> {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Fullstack Next.js App
          </h1>
          <p className="text-lg text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {isLogin ? (
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          ) : (
            <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
          )}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
