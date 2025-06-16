// import { NextResponse } from 'next/server';
// import mysql from 'mysql2/promise';

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     const { title, slug, content, image, imageAlt, date } = data;

//     // Create a connection to your MySQL database
//     const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: '', // Use the correct XAMPP password
//       database: 'your_database_name', // ⬅️ Replace this with your actual DB name
//     });

//     // Insert the blog into your database
//     const [result] = await connection.execute(
//       `INSERT INTO blogs (title, slug, content, image, imageAlt, date) VALUES (?, ?, ?, ?, ?, ?)`,
//       [title, slug, content, image, imageAlt, date]
//     );

//     await connection.end();

//     return NextResponse.json({
//       message: 'Blog added successfully',
//       blog: {
//         id: result.insertId,
//         title,
//         slug,
//         content,
//         image,
//         imageAlt,
//         date,
//       },
//     });
//   } catch (err) {
//     console.error('API Error:', err);
//     return NextResponse.json(
//       { error: 'Database insert failed' },
//       { status: 500 }
//     );
//   }
// }
