import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getHomePage, getPosts } from '@/lib/api';
import ImageGallery from '@/components/ImageGallery';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data: homePage, isLoading: homeLoading } = useQuery({
    queryKey: ['home'],
    queryFn: getHomePage,
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (homeLoading || postsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {homePage?.images && homePage.images.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-screen overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src={homePage.images[0].path}
              alt="Hero image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30" />
          </div>
          
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-4xl px-4"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-6">
                Poppy Larbalestier
              </h1>
              <p className="text-xl md:text-2xl font-light mb-8 text-gray-200">
                Photography
              </p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Link
                  to="/gallery"
                  className="inline-block bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-4 rounded-sm hover:bg-opacity-30 transition-all duration-300 font-medium"
                >
                  View Portfolio
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* About Section */}
      {homePage?.content && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-padding"
        >
          <div className="page-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-secondary mb-8">Welcome</h2>
              <div
                className="body-text text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: homePage.content }}
              />
            </div>
          </div>
        </motion.section>
      )}

      {/* Featured Images */}
      {homePage?.images && homePage.images.length > 1 && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-padding bg-white"
        >
          <div className="page-container">
            <h2 className="heading-secondary text-center mb-12">Featured Work</h2>
            <ImageGallery 
              images={homePage.images.slice(1)} 
              className="max-w-6xl mx-auto"
            />
          </div>
        </motion.section>
      )}

      {/* Recent Posts */}
      {posts && posts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-padding"
        >
          <div className="page-container">
            <h2 className="heading-secondary text-center mb-12">Recent Work</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {posts.slice(0, 6).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link to={`/posts/${post.slug}`}>
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      {post.images && post.images.length > 0 && (
                        <img
                          src={post.images[0].path}
                          alt={post.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    </div>
                    <div className="mt-4">
                      <h3 className="heading-tertiary group-hover:text-sage-700 transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="body-text mt-2 text-sm">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {posts.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Link to="/gallery" className="btn-secondary">
                  View All Work
                </Link>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Home;
