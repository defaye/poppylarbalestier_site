import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/api';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="heading-primary mb-6">Gallery</h1>
          <p className="body-text text-lg max-w-2xl mx-auto">
            A collection of captured moments, each telling its own unique story through the lens.
          </p>
        </motion.div>

        {posts && posts.length > 0 && (
          <div className="gallery-grid">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/posts/${post.slug}`}>
                  <div className="gallery-item">
                    {post.images && post.images.length > 0 && (
                      <img
                        src={post.images[0].path}
                        alt={post.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-xl font-serif font-light mb-2">{post.title}</h3>
                        {post.category && (
                          <p className="text-sm text-gray-300">{post.category.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
