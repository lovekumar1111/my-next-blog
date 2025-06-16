'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // <-- Track signed up user
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const form = new FormData(e.target);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: form,
      });

      const data = await res.json();

      if (data.success) {
        setStatus('Signup successful!');
        setUser(data.user); // Set returned user with image
        // Optionally auto-login or redirect
        // router.push('/dashboard');
      } else {
        setStatus(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setStatus('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-center">Create Account</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-3">
        <input type="text" name="name" required placeholder="Name" className="w-full p-2 border rounded" />
        <input type="email" name="email" required placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" name="password" required placeholder="Password" className="w-full p-2 border rounded" />
        <input type="file" name="image" accept="image/*" className="w-full p-2" />
        <button type="submit" disabled={loading} className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      {status && <p className="text-center text-sm text-red-500">{status}</p>}

      {/* ✅ Show DP if user signed up */}
      {user && (
        <div className="text-center mt-4">
          <p className="text-green-600 font-semibold">Welcome, {user.name}!</p>
          {user.image && (
            <img
              src={user.image}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mt-2 object-cover border"
            />
          )}
        </div>
      )}
    </div>
  );
}
