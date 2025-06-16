'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog`);
        const serverPosts = await res.json();

        // ✅ Get localStorage posts
        const localPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

        const allPosts = [...serverPosts, ...localPosts];

        const found = allPosts.find((p) => p.slug === slug);

        if (found) {
          setPost(found);
        } else {
          router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) return <p className="text-center py-16">Loading...</p>;
  if (!post) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{new Date(post.date).toLocaleDateString()}</p>

      {post.image && (
        <Image
          src={post.image}
          alt={post.imageAlt || post.title}
          width={800}
          height={400}
          className="w-full h-auto rounded-lg shadow-md mb-6"
        />
      )}

      <div className="prose max-w-none text-lg">
        {post.content?.split('\n').map((para, i) => (
          <p key={i} className="mb-4">{para}</p>
        ))}
      </div>
    </main>
  );
}
