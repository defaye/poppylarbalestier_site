import React, { useState, useEffect } from 'react'
import { getTestimonials } from '@/lib/api'

interface TestimonialItem {
  id: number;
  title: string;
  name: string | null;
  body: string;
  slug: string;
  images: Array<{
    id: number;
    path: string;
    name: string;
  }>;
  tags: Array<any>;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface TestimonialsProps {
  page: {
    id: number
    title: string
    name: string
    body: string
    body_prefix?: string
    body_suffix?: string
    images?: Array<{
      id: number
      path: string
      name: string
    }>
    posts?: Array<any>
    component?: {
      element_name: string
    }
    slug: string
    published: boolean
  }
  onNavigate: (path: string) => void
}

const Testimonials: React.FC<TestimonialsProps> = ({ page, onNavigate }) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 32;

  const loadTestimonials = async (page: number = 1, append: boolean = false) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await getTestimonials(page, perPage);
      const mappedTestimonials = response.data.map(item => ({
        id: item.id,
        title: item.title || item.name,
        name: item.name,
        body: item.body || '',
        slug: item.slug,
        images: item.images || [],
        tags: item.tags || [],
        published: item.published || false,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));
      
      setTestimonials(prev => append ? [...prev, ...mappedTestimonials] : mappedTestimonials);
      setHasMorePages(response.meta.has_more_pages);
      setCurrentPage(response.meta.current_page);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleShowMore = () => {
    loadTestimonials(currentPage + 1, true);
  };

  const handleGoToTestimonial = (testimonial: TestimonialItem) => {
    onNavigate(`/${page.slug}/${testimonial.slug}`);
  };

  const formatTestimonialTitle = (title: string) => {
    return title.replace(/'s Testimonial$/i, '');
  };

  return (
    <div className="container mx-auto px-4">
      {page.name && (
        <h1 
          className="mb-6 font-serif text-gray-900"
          dangerouslySetInnerHTML={{ __html: page.name }}
        />
      )}

      {testimonials.length > 0 && (
        <div className="mb-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex flex-col cursor-pointer lg:p-12"
                  role="button"
                  onClick={() => handleGoToTestimonial(testimonial)}
                >
                  <a
                    href={`/${page.slug}/${testimonial.slug}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleGoToTestimonial(testimonial)
                    }}
                    className="PostsGallery--header block text-center"
                    dangerouslySetInnerHTML={{ __html: formatTestimonialTitle(testimonial.title) }}
                  />
                  
                  {testimonial.images.length > 0 && (
                    <div 
                      onClick={() => handleGoToTestimonial(testimonial)}
                      role="button"
                    >
                      <img
                        alt={testimonial.title}
                        src={testimonial.images[0].path}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {hasMorePages && testimonials.length % perPage === 0 && (
            <button
              onClick={handleShowMore}
              disabled={loading}
              className="w-full mt-3 py-3 px-6 bg-purple-600 text-white font-medium rounded hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Testimonials
