import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getPage } from '@/lib/api';

const About = () => {
  const { data: page, isLoading } = useQuery({
    queryKey: ['page', 'about'],
    queryFn: () => getPage('about'),
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
          className="max-w-4xl mx-auto"
        >
          <h1 className="heading-primary text-center mb-12">
            {page?.title || 'About'}
          </h1>
          
          {page?.content && (
            <div
              className="body-text text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
