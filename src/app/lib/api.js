// src/lib/api.js
import { blogPosts } from '@/app/lib/blogPost';

export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug) || null;
}

export function getAllPosts() {
  return blogPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date
  }));
}