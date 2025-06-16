import prisma from '@/app/lib/prisma';

// ----------- UPDATE blog post -----------
export async function PUT(request, { params }) {
  const {slug } = params;
  const body = await request.json();

  try {
    const updatedBlog = await prisma.blogPost.update({
      where: { slug },
      data: {
        title: body.title,
        content: body.content,
        image: body.image || null,
        imageAlt: body.imageAlt || null,
        date: body.date ? new Date(body.date) : undefined,
      },
    });

    return new Response(JSON.stringify(updatedBlog), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Failed to update blog:', err);
    return new Response(JSON.stringify({ error: 'Failed to update blog' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// ----------- DELETE blog post -----------
export async function DELETE(_, { params }) {
  const { slug } = params;

  try {
    await prisma.blogPost.delete({
      where: { slug },
    });

    return new Response(JSON.stringify({ message: 'Blog deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Failed to delete blog:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete blog' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
