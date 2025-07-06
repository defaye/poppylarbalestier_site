import { useQuery } from '@tanstack/react-query';
import { getHomePage } from '@/lib/api';

const Home = () => {
  const { data: homePage, isLoading } = useQuery({
    queryKey: ['home'],
    queryFn: getHomePage,
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

  if (!homePage) {
    return null;
  }

  return (
    <div className="container">
      {homePage.images && homePage.images.length > 0 && (
        <div className="my-4">
          {homePage.images.length > 1 ? (
            <>
              {/* Main Carousel */}
              <div id="homeCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {homePage.images.map((image, index) => (
                    <div key={image.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img
                        src={image.path}
                        alt={homePage.title || 'Home image'}
                        className="d-block w-100"
                      />
                    </div>
                  ))}
                </div>
                <a className="carousel-control-prev" href="#homeCarousel" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#homeCarousel" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
              
              {/* Thumbnail Pagination Carousel */}
              <div className="mt-5 d-none d-md-block">
                <div id="homePaginatorCarousel" className="carousel slide" data-interval="false">
                  <div className="carousel-inner">
                    {/* Group thumbnails in sets of 5 */}
                    {Array.from({ length: Math.ceil((homePage.images || []).length / 5) }, (_, groupIndex) => (
                      <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`}>
                        <div className="row">
                          {(homePage.images || [])
                            .slice(groupIndex * 5, (groupIndex + 1) * 5)
                            .map((image, index) => (
                              <div key={image.id} className="col">
                                <img
                                  src={image.path}
                                  alt={`Thumbnail ${groupIndex * 5 + index + 1}`}
                                  className="img-fluid"
                                  style={{ cursor: 'pointer', height: '80px', objectFit: 'cover', width: '100%' }}
                                  onClick={() => {
                                    const carousel = document.getElementById('homeCarousel');
                                    if (carousel) {
                                      // @ts-ignore
                                      $(carousel).carousel(groupIndex * 5 + index);
                                    }
                                  }}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {Math.ceil((homePage.images || []).length / 5) > 1 && (
                    <>
                      <a className="carousel-control-prev" href="#homePaginatorCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                      </a>
                      <a className="carousel-control-next" href="#homePaginatorCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                      </a>
                    </>
                  )}
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
