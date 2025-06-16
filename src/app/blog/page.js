'use client';
import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/app/lib/prisma';


const initialPosts = [
  {
    id: 1,
    title: "gosotek",
    slug: "pehla-blog-post",
    excerpt: 'At Gosotek, we believe technology should be simple, smart, and human-friendly.',
    content: "my frist blog",
    image: "/images/blog1.jpg",
    imageAlt: "blogpost image",
    date: "28 May 2025",
  },
  {
    id: 2,
    title: "task create  learn",
    slug: "nextjs-sikhen",
    content: "task.js How to create",
    image: "/images/aii.jpg",
    imageAlt: "Next.js",
    date: "28 May 2025",
  }
];

export default function BlogList() {
  const [blogPosts, setBlogPosts] = useState(initialPosts);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    slug: '',
    content: '',
    image: '',
    imageAlt: '',
  });

  const handleAddPost = () => {
    const date = new Date().toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
    setBlogPosts([
      ...blogPosts,
      {
        ...newPost,
        id: blogPosts.length + 1,
        date,
      },
    ]);
    setNewPost({
      title: '',
      slug: '',
      content: '',
      image: '',
      imageAlt: '',
    });
    setShowModal(false);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Tech for Gosotek</h1>

      {/* Add Blog Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add blog
        </button>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-10 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]"
          >
            <div className="h-55.5 overflow-show">
              <Image
                src={post.image}
                alt={post.imageAlt}
                className="w-full h-full object hover:scale-110 transition-transform duration-300"
                width={400}
                height={250}
              />
            </div>
            <div className="p-7">
              <time className="text-gray-500 text-sm">{post.date}</time>
              <h2 className="text-xl font-semibold my-2">
                <a
                  href={`/blog/${post.slug}`}
                  className="hover:text-red-600 transition-colors"
                >
                  {post.title}
                </a>
              </h2>2025
              <p className="text-gray-700 mb-3">{post.content}</p>
              <a
                href={`/blog/${post.slug}`}
                className="inline-block text-green-600 hover:underline font-medium"
              >
                next page
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl space-y-4">
            <h2 className="text-xl font-bold">Add New Blog</h2>
            
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              placeholder="Slug (e.g., my-first-post)"
              value={newPost.slug}
              onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <textarea
              placeholder="Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setNewPost({ ...newPost, image: imageUrl });
                }
              }}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              placeholder="Image Alt Text"
              value={newPost.imageAlt}
              onChange={(e) => setNewPost({ ...newPost, imageAlt: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPost}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
         
        </div>
      )}
    </div>
  );
}
