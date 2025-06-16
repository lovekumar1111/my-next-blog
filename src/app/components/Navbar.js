'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Modal from '@/app/components/Modal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
      <Link href="/" className="text-xl font-bold">🌀 Gosotek</Link>

      <div className="flex items-center space-x-4">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>

        {!user ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-4 py-1 rounded-full hover:bg-yellow-300"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            {user.image && (
              <Image
                src={user.image}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover border-2 border-white"
              />
            )}
            <span className="text-sm">{user.email}</span>
            <button
              onClick={logout}
              className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
}
