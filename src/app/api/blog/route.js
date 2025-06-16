import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany();
    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.slug || !data.title || !data.date) {
      return new Response(
        JSON.stringify({ error: 'Slug, title and date are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const newBlog = await prisma.blogPost.create({
      data: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || null,
        content: data.content || null,
        image: data.image || null,       // image URL string
        imageAlt: data.imageAlt || null,
        date: new Date(data.date),
      },
    });

    return new Response(JSON.stringify(newBlog), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to create blog:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create blog' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
