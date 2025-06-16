'use client';

import { useState } from 'react';

export default function LayoutClient({ children, blogPosts, setBlogPosts }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editSlug, setEditSlug] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    image: '',
    imageAlt: '',
    file: null,
    slug: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const handleFileUpload = async () => {
    if (!newBlog.file) return null;
    const formData = new FormData();
    formData.append('file', newBlog.file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.url || null;
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const slug = newBlog.title.toLowerCase().replace(/\s+/g, '-');
    let imageUrl = newBlog.image;

    if (newBlog.file) {
      imageUrl = await handleFileUpload();
    }

    const blog = {
      title: newBlog.title,
      content: newBlog.content,
      slug,
      date: newBlog.date,
      image: imageUrl || null,
      imageAlt: newBlog.imageAlt || null,
    };

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setBlogPosts((prev) => [data, ...prev]);

      setNewBlog({
        title: '',
        content: '',
        image: '',
        imageAlt: '',
        file: null,
        slug: '',
        date: new Date().toISOString().slice(0, 10),
      });

      setShowPopup(false);
    } catch (err) {
      console.error('Error saving blog:', err);
      alert('Something went wrong while saving the blog post!');
    }
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    let imageUrl = newBlog.image;

    if (newBlog.file) {
      imageUrl = await handleFileUpload();
    }

    try {
      const updated = {
        title: newBlog.title,
        content: newBlog.content,
        image: imageUrl || null,
        imageAlt: newBlog.imageAlt || null,
        date: newBlog.date,
      };

      const res = await fetch(`/api/blog/${editSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error(await res.text());

      const updatedBlog = await res.json();

      setBlogPosts((prev) =>
        prev.map((post) => (post.slug === editSlug ? updatedBlog : post))
      );

      setIsEditMode(false);
      setEditSlug(null);
      setNewBlog({
        title: '',
        content: '',
        image: '',
        imageAlt: '',
        file: null,
        slug: '',
        date: new Date().toISOString().slice(0, 10),
      });

      setShowPopup(false);
    } catch (err) {
      console.error('Failed to update blog:', err);
      alert('Update failed');
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      setBlogPosts((prev) => prev.filter((post) => post.slug !== slug));
    } catch (err) {
      console.error(err);
      alert('Failed to delete blog');
    }
  };

  const handleEditClick = (post) => {
    setNewBlog({
      title: post.title,
      content: post.content,
      image: post.image || '',
      imageAlt: post.imageAlt || '',
      file: null,
      slug: post.slug,
      date: post.date.slice(0, 10),
    });
    setEditSlug(post.slug);
    setIsEditMode(true);
    setShowPopup(true);
  };

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundImage: "url('/background (2).jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      {/* Navbar */}
      <nav className="flex justify-center gap-8 p-4 bg-white shadow-md">
        <button
          onClick={() => {
            setIsEditMode(false);
            setShowPopup(true);
            setNewBlog({
              title: '',
              content: '',
              image: '',
              imageAlt: '',
              file: null,
              slug: '',
              date: new Date().toISOString().slice(0, 10),
            });
          }}
          className="text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded transition-colors"
        >
          Add Blog
        </button>
      </nav>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {isEditMode ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h2>
            <form onSubmit={isEditMode ? handleUpdateBlog : handleAddBlog}>
              <input
                type="text"
                placeholder="Title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                required
              />
              <textarea
                placeholder="Content"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                className="w-full p-2 border rounded mb-2 h-24"
                required
              />
              <input
                type="file"
                onChange={(e) => setNewBlog({ ...newBlog, file: e.target.files[0] })}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Image Alt Text"
                value={newBlog.imageAlt}
                onChange={(e) => setNewBlog({ ...newBlog, imageAlt: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />
              <input
                type="date"
                value={newBlog.date}
                onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })}
                className="w-full p-2 border rounded mb-4"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="text-gray-700 px-4 py-2 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
                >
                  {isEditMode ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="p-4 max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="BADEBHAIYYA yaha Search kro blog posts...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-4 bg-gray-800 text-white placeholder-gray-400"
        />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-3 pb-12 max-w-6x2 mx-auto">
        {filteredPosts.length === 0 && <p className="text-white">No blogs found.</p>}

        {filteredPosts.map((post) => (
          <div key={post.slug} className="bg-white rounded-xl p-5 shadow border">
            <h2 className="text-1x2 font-bold text-gray-800">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(post.date).toDateString()}
            </p>

            {post.image && (
              <img
                src={post.image}
                alt={post.imageAlt || 'Blog Image'}
                className="w-full h-95 object-cover rounded-md mb-4"
              />
            )}

            <p className="text-gray-700 mb-3">{post.content}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(post.slug)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditClick(post)}
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}
