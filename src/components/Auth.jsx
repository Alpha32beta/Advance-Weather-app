import { useState } from 'react';
import { supabase } from '../supabaseClient';
import logo from '/src/assets/images/logo.svg';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the verification link!');
    }
    setLoading(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="logo" className="mx-auto mb-4" />
          <h1 className="bricolage text-4xl mb-2">Welcome to G-T Weather App</h1>
          <p className="dm-sans-regular text-gray-400">
            {isSignUp ? 'Create an account to save your locations' : 'Sign in to access your weather data'}
          </p>
        </div>

        <div className="bg-transparent-bg rounded-2xl p-6 border border-transparent-bg-hover">
          <div className="space-y-4">
            <div>
              <label className="block text-sm dm-sans-regular text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-transparent-bg-hover border border-transparent-bg-hover rounded-lg text-white focus:ring-2 focus:ring-lightblue outline-none dm-sans-regular"
                placeholder="godstime@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm dm-sans-regular text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-transparent-bg-hover border border-transparent-bg-hover rounded-lg text-white focus:ring-2 focus:ring-lightblue outline-none dm-sans-regular"
                placeholder="enter your password"
                required
              />
            </div>

            {message && (
              <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                <p className="text-green-400 text-sm dm-sans-regular">{message}</p>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm dm-sans-regular">{error}</p>
              </div>
            )}

            <button
              onClick={isSignUp ? handleSignUp : handleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-lightblue hover:bg-darkblue rounded-lg text-white dm-sans-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setMessage('');
              }}
              className="text-lightblue hover:text-darkblue dm-sans-regular text-sm transition-colors"
            >
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;