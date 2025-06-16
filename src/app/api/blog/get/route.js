// // ✅ If alias working:
// import prisma from '@/src/app/lib/prisma';

// // ❌ OR use this if alias not working:


// export async function GET() {
//   try {
//     const posts = await prisma.blogPost.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });

//     return new Response(JSON.stringify(posts), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//     });
//   }
// }
