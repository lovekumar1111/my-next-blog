import pool from '@/app/lib/db'; // ✅ If you have jsconfig.json




export async function POST(req) {
  try {
    const body = await req.json();
    const { slug, title, excerpt, content, image, imageAlt, date } = body;

    const [result] = await pool.query(
      `INSERT INTO blog_posts (slug, title, excerpt, content, image, imageAlt, date)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, excerpt, content, image, imageAlt, date]
    );

    return new Response(JSON.stringify({ message: 'Post added!', id: result.insertId }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Something went wrong', details: err.message }), {
      status: 500,
    });
  }
}
