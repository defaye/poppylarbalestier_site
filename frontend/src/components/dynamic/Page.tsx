import React from 'react'
import { motion } from 'framer-motion'

interface PageProps {
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

const Page: React.FC<PageProps> = ({ page, onNavigate }) => {
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
            // Multiple images - could implement carousel here
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
            // Single image
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

      <div className="flex flex-col">
        {/* Main body content */}
        {page.body && (
          <div 
            className="mb-8 prose prose-lg max-w-none order-2 lg:order-1"
            dangerouslySetInnerHTML={{ __html: page.body }}
          />
        )}

        {/* Posts gallery */}
        {page.posts && page.posts.length > 0 && (
          <div className="mb-8 order-1 lg:order-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.posts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => onNavigate(`/${page.slug}/${post.slug}`)}
                >
                  {post.images && post.images.length > 0 && (
                    <img
                      src={post.images[0].path}
                      alt={post.title || post.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-brown-800 mb-2">
                      {post.title || post.name}
                    </h3>
                    {post.excerpt && (
                      <p className="text-brown-600 text-sm">{post.excerpt}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

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

export default Page
