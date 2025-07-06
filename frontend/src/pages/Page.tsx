import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPage } from '@/lib/api';
import TestimonialsGallery from '@/components/TestimonialsGallery';

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: page, isLoading, error } = useQuery({
    queryKey: ['page', slug],
    queryFn: () => getPage(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <h1>Page not found</h1>
          <p>The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return null;
  }

  // Render dynamic component based on component configuration
  const renderDynamicComponent = () => {
    if (!page.component || !page.component.name) {
      return null;
    }

    // Map component names to React components
    switch (page.component.name) {
      case 'Testimonials':
        return <TestimonialsGallery pageSlug={page.slug} />;
      // Add other dynamic components here as needed
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {page.title && page.title.toLowerCase().trim() !== 'home' && (
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
      )}

      {page.images && page.images.length > 0 && (
        <div className="my-4">
          {page.images.length > 1 ? (
            // Carousel for multiple images
            <div id="pageCarousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {page.images.map((image, index) => (
                  <div key={image.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img
                      src={image.path}
                      alt={page.title || 'Page image'}
                      className="d-block w-100"
                    />
                  </div>
                ))}
              </div>
              {page.images.length > 1 && (
                <>
                  <a className="carousel-control-prev" href="#pageCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#pageCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </>
              )}
            </div>
          ) : (
            // Single image
            <img
              src={page.images[0].path}
              alt={page.title || 'Page image'}
              className="w-100"
            />
          )}
        </div>
      )}

      {page.content && (
        <div className="my-4" dangerouslySetInnerHTML={{ __html: page.content }} />
      )}

      {/* Render dynamic component if it exists */}
      {renderDynamicComponent()}
    </div>
  );
};

export default Page;
