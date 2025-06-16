import { motion } from 'framer-motion';

{blogPosts.map((post, index) => (
  <motion.article
    key={post.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]"
  >
    {/* Card content */}
  </motion.article>
))}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.3 }}
  className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl space-y-4"
>
  {/* modal form content */}
</motion.div>
