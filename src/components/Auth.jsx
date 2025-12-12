import { useState } from 'react';
import { supabase } from '../supabaseClient';
import logo from '/src/assets/images/logo.svg';

const Auth = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validatePassword = () => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!validatePassword()) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('already registered')) {
        setError('This email is already registered. Please sign in instead.');
      } else if (error.message.includes('User already registered')) {
        setError('An account with this email already exists. Try signing in.');
      } else {
        setError(error.message);
      }
    } else {
      if (data?.user?.identities && data.user.identities.length === 0) {
        setError('This email is already registered. Please sign in instead.');
      } else {
        setMessage(
          'Verification email sent! Please check your email and click the verification link to activate your account. Once verified, return to this app and log in.'
        );
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    }
    setLoading(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!validatePassword()) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please verify your email address before signing in. Check your inbox for the verification link.');
      } else {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-[#02012B] rounded-2xl shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <img src={logo} alt="logo" className="h-8" />
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="text-center mb-6">
            <h1 className="bricolage text-3xl mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="dm-sans-regular text-gray-400 text-sm">
              {isSignUp
                ? 'Sign up to save your favorite locations'
                : 'Sign in to access your saved weather data'}
            </p>
          </div>

          <div className="bg-transparent-bg rounded-xl p-5 border border-transparent-bg-hover">
            <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm dm-sans-regular text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-transparent-bg-hover border border-transparent-bg-hover rounded-lg text-white focus:ring-2 focus:ring-lightblue outline-none dm-sans-regular"
                  placeholder="your@email.com"
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
                  placeholder="••••••••"
                  required
                />
                {password && password.length < 6 && (
                  <p className="text-orange-400 text-xs mt-1 dm-sans-regular">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm dm-sans-regular text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-transparent-bg-hover border border-transparent-bg-hover rounded-lg text-white focus:ring-2 focus:ring-lightblue outline-none dm-sans-regular"
                    placeholder="••••••••"
                    required
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-red-400 text-xs mt-1 dm-sans-regular">
                      Passwords do not match
                    </p>
                  )}
                  {confirmPassword && password === confirmPassword && (
                    <p className="text-green-400 text-xs mt-1 dm-sans-regular">
                      ✓ Passwords match
                    </p>
                  )}
                </div>
              )}

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
                type="submit"
                disabled={loading || (isSignUp && password !== confirmPassword)}
                className="w-full py-2.5 px-4 bg-lightblue hover:bg-darkblue rounded-lg text-white dm-sans-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-5 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setMessage('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="text-lightblue hover:text-darkblue dm-sans-regular text-sm transition-colors"
              >
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>

          <p className="text-center text-gray-400 text-xs dm-sans-regular mt-4">
            You can browse weather data without an account. Sign in to save locations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
