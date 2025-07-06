import { useQuery } from '@tanstack/react-query';
import { getTestimonials } from '@/lib/api';
import { Link } from 'react-router-dom';

interface TestimonialsGalleryProps {
  pageSlug: string;
}

const TestimonialsGallery = ({ pageSlug }: TestimonialsGalleryProps) => {
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => getTestimonials(),
  });

  console.log('TestimonialsGallery data:', testimonials, 'isLoading:', isLoading, 'error:', error);

  if (isLoading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-3">
        <p>Error loading testimonials: {error.message}</p>
      </div>
    );
  }

  if (!testimonials || !Array.isArray(testimonials) || testimonials.length === 0) {
    console.log('No testimonials or not an array:', testimonials);
    return null;
  }

  return (
    <div className="container">
      <div className="row">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="col-12 col-lg-6 p-lg-5"
          >
            <Link
              to={`/${pageSlug}/${testimonial.slug}`}
              className="PostsGallery--header d-block text-center"
              dangerouslySetInnerHTML={{ 
                __html: (testimonial.title || testimonial.name || '').replace(/'s Testimonial$/i, '') 
              }}
            />
            {testimonial.images && testimonial.images.length > 0 && (
              <Link to={`/${pageSlug}/${testimonial.slug}`}>
                <img
                  src={testimonial.images[0].path}
                  alt={testimonial.title || testimonial.name || 'Testimonial'}
                  className="w-100"
                  style={{ cursor: 'pointer' }}
                />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsGallery;
