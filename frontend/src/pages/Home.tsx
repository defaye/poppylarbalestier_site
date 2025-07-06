import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getHomePage } from '@/lib/api';

const Home = () => {
  const { data: homePage, isLoading } = useQuery({
    queryKey: ['home'],
    queryFn: getHomePage,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (homePage?.images && homePage.images.length > 0) {
      // Initialize carousel event listeners
      const carousel = document.getElementById('homeCarousel');
      if (carousel) {
        // @ts-ignore
        $(carousel).on('slide.bs.carousel', function (e: any) {
          const newIndex = e.to;
          setCurrentSlide(newIndex);
        });
        
        // Ensure carousel is initialized
        // @ts-ignore
        $(carousel).carousel();
      }
    }
  }, [homePage?.images]);

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

  if (!homePage) {
    return null;
  }

  const handleThumbnailClick = (imageIndex: number) => {
    console.log(`Thumbnail clicked: ${imageIndex}`);
    
    // Manual slide activation - more reliable than Bootstrap carousel methods
    const carousel = document.getElementById('homeCarousel');
    if (carousel) {
      const items = carousel.querySelectorAll('.carousel-item');
      items.forEach((item, idx) => {
        if (idx === imageIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      setCurrentSlide(imageIndex);
    }
  };

  return (
    <div className="container">
      {homePage.images && homePage.images.length > 0 && (
        <div className="my-4">
          {homePage.images.length > 1 ? (
            <>
              {/* Main Carousel - No arrow controls like original */}
              <div id="homeCarousel" className="carousel slide carousel-fade" data-ride="carousel" data-interval="4000">
                <div className="carousel-inner">
                  {homePage.images.map((image, index) => (
                    <div key={image.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img
                        src={image.path}
                        alt={homePage.title || 'Home image'}
                        className="d-block w-100"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          // Click to advance like original
                          const carousel = document.getElementById('homeCarousel');
                          if (carousel) {
                            // @ts-ignore
                            $(carousel).carousel('next');
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Thumbnail Pagination - Simple grid layout like original */}
              <div className="mt-5 d-none d-md-block">
                <div className="row justify-content-center">
                  {homePage.images.map((image, index) => {
                    const isActive = index === currentSlide;
                    return (
                      <div key={image.id} className="col-auto">
                        <img
                          src={image.path}
                          alt={`Thumbnail ${index + 1}`}
                          className={`img-fluid ${isActive ? 'border border-primary' : ''}`}
                          style={{ 
                            cursor: 'pointer', 
                            height: '80px', 
                            width: '80px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            opacity: isActive ? 1 : 0.7,
                            transition: 'all 0.3s ease',
                            margin: '0 2px',
                            pointerEvents: 'auto',
                            userSelect: 'none'
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleThumbnailClick(index);
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.cursor = 'pointer';
                            if (!isActive) {
                              e.currentTarget.style.opacity = '0.9';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.opacity = '0.7';
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            // Single image
            <img
              src={homePage.images[0].path}
              alt={homePage.title || 'Home image'}
              className="w-100"
            />
          )}
        </div>
      )}

      {homePage.content && (
        <div className="my-4" dangerouslySetInnerHTML={{ __html: homePage.content }} />
      )}
    </div>
  );
};

export default Home;
