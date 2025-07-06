import React from 'react'
import { motion } from 'framer-motion'

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

const Testimonials: React.FC<TestimonialsProps> = ({ page }) => {
  const pageHeader = page.name || page.title || ''
  const showHeader = pageHeader.toLowerCase().trim() !== 'home'

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {showHeader && (
        <h1 
          className="text-4xl font-bold text-brown-800 mb-6 text-center"
          dangerouslySetInnerHTML={{ __html: pageHeader }}
        />
      )}

      {/* Images */}
      {page.images && page.images.length > 0 && (
        <div className="mb-8">
          {page.images.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {page.images.map((image) => (
                <img
                  key={image.id}
                  src={image.path}
                  alt={page.name || page.title || ''}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              ))}
            </div>
          ) : (
            <img
              src={page.images[0].path}
              alt={page.name || page.title || ''}
              className="w-full h-auto rounded-lg shadow-lg mb-8"
            />
          )}
        </div>
      )}

      {/* Body prefix */}
      {page.body_prefix && (
        <div 
          className="mb-6 prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.body_prefix }}
        />
      )}

      {/* Main body content */}
      {page.body && (
        <div 
          className="mb-8 prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      )}

      {/* Testimonials Grid */}
      {page.posts && page.posts.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {page.posts.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 border border-brown-100"
              >
                <div className="flex items-start space-x-4">
                  {testimonial.images && testimonial.images.length > 0 && (
                    <img
                      src={testimonial.images[0].path}
                      alt={testimonial.title || testimonial.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-brown-800 mb-2">
                      {testimonial.title || testimonial.name}
                    </h3>
                    <div 
                      className="text-brown-600 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: testimonial.body || testimonial.excerpt }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Body suffix */}
      {page.body_suffix && (
        <div 
          className="mt-6 prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.body_suffix }}
        />
      )}
    </motion.div>
  )
}

export default Testimonials
