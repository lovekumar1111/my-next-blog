'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [formType, setFormType] = useState(null); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = formType === 'login' ? '/api/login' : '/api/signup';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('');
      setShowMenu(false);
      setEmail('');
      setPassword('');
      setFormType(null);
      router.push('/'); // 👈 go to homepage after login/signup
    } else {
      setMessage(data.message || 'Something went wrong');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="px-4 py-1 rounded-full border border-black bg-white text-black hover:bg-black hover:text-white transition duration-300"
      >
        Profile
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-50">
          {!formType ? (
            <>
              <button
                onClick={() => setFormType('login')}
                className="block w-full text-left text-blue-600 hover:underline mb-2"
              >
                Login
              </button>
              <button
                onClick={() => setFormType('signup')}
                className="block w-full text-left text-green-600 hover:underline"
              >
                Signup
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              {message && <p className="text-red-500 text-sm">{message}</p>}
              <input
                type="email"
                placeholder="Email"
                className="w-full border px-2 py-1 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border px-2 py-1 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-1 rounded hover:bg-purple-700"
              >
                {formType === 'login' ? 'Login' : 'Sign Up'}
              </button>
              <button
                type="button"
                onClick={() => setFormType(null)}
                className="text-sm text-gray-500 hover:underline"
              >
                Back
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
