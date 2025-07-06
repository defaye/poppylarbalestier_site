import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/lib/api';
import ImageGallery from '@/components/ImageGallery';

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPost(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-900"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="heading-secondary">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="page-container">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <header className="text-center mb-12">
            <h1 className="heading-primary mb-6">{post.title}</h1>
            
            {post.category && (
              <span className="inline-block bg-sage-100 text-sage-800 px-4 py-2 rounded-full text-sm font-medium">
                {post.category.name}
              </span>
            )}
          </header>

          {post.images && post.images.length > 0 && (
            <div className="mb-12">
              <ImageGallery images={post.images} />
            </div>
          )}

          {post.body && (
            <div
              className="body-text text-lg leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          )}

          {post.tags && post.tags.length > 0 && (
            <footer className="mt-12 pt-8 border-t border-sage-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </motion.article>
      </div>
    </div>
  );
};

export default Post;
