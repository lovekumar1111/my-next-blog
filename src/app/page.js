'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LayoutClient from "@/app/components/LayoutClient";
import ChatBot from './components/ChatBot'; // Adjust path if needed

export default function Page() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch blog posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog');
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (Array.isArray(data)) {
            setBlogPosts(data);
          } else {
            console.error('API did not return array:', data);
          }
        } catch (parseErr) {
          console.error('JSON parse error:', parseErr, 'Raw response:', text);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      }
    }
    fetchPosts();
  }, []);

  // Load bookmarks from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bookmarkedBlogs');
      setBookmarks(stored ? JSON.parse(stored) : []);
    }
  }, []);

  // Toggle bookmark
  const toggleBookmark = (slug) => {
    const updated = bookmarks.includes(slug)
      ? bookmarks.filter((s) => s !== slug)
      : [...bookmarks, slug];

    setBookmarks(updated);
    localStorage.setItem('bookmarkedBlogs', JSON.stringify(updated));
  };

  return (
    <LayoutClient blogPosts={blogPosts} setBlogPosts={setBlogPosts}>
      <main className="flex flex-col items-center min-h-screen py-12 px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-black-800 mb-12 bg-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Blog Articles
        </motion.h1>

        <ChatBot blogPosts={blogPosts} />

        {/* Blog List */}
        <div className="w-full space-y-12 mb-16">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-200 pb-8 group hover:bg-gray-50 hover:shadow-md rounded-lg px-4 transition-all duration-300 ease-in-out"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <img
                src={post.image || '/placeholder.jpg'}
                alt={post.imageAlt || post.title}
                className="w-full sm:w-48 h-32 object-cover rounded-md shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                  <button
                    onClick={() => toggleBookmark(post.slug)}
                    className="text-yellow-500 text-xl ml-2"
                    title="Bookmark this post"
                  >
                    {bookmarks.includes(post.slug) ? '⭐' : '☆'}
                  </button>
                </h2>
                <p className="text-gray-600 mb-3">
                  {post.excerpt || (post.content?.slice(0, 100))}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Optional Add Blog Section */}
        <motion.section
          className="w-full bg-white p-6 border rounded-xl shadow-md transition-shadow duration-300 hover:shadow-lg mt-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        ></motion.section>
      </main>
    </LayoutClient>
  );
}
