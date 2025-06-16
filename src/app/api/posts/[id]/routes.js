import prisma from '@/app/lib/prisma';

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const deleted = await prisma.blogPost.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deleted), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to delete blog post:', error);

    return new Response(
      JSON.stringify({ error: 'Post not found or failed to delete' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
