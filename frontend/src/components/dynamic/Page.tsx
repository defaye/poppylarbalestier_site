import React from 'react'
import Carousel from '../Carousel'
import PostsGallery from '../PostsGallery'

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
    <div className="container mx-auto px-4">
      {showHeader && (
        <h1 className="mb-6 font-serif text-gray-900">
          {pageHeader}
        </h1>
      )}

      {/* Images */}
      {page.images && page.images.length > 0 && (
        <div className="mb-4">
          <Carousel 
            images={page.images}
            showPagination={page.images.length > 1}
            autoHeight={true}
            ratioX={826}
            ratioY={551}
          />
        </div>
      )}

      {/* Body prefix */}
      {page.body_prefix && (
        <div 
          className="mb-4 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: page.body_prefix }}
        />
      )}

      <div className="flex flex-col">
        {/* Main body content */}
        {page.body && (
          <div 
            className="mb-4 prose prose-sm max-w-none order-2 lg:order-1"
            dangerouslySetInnerHTML={{ __html: page.body }}
          />
        )}

        {/* Posts gallery */}
        {page.posts && page.posts.length > 0 && (
          <div className="mb-4 order-1 lg:order-2">
            <PostsGallery page={page} onNavigate={onNavigate} />
          </div>
        )}
      </div>

      {/* Body suffix */}
      {page.body_suffix && (
        <div 
          className="mt-4 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: page.body_suffix }}
        />
      )}
    </div>
  )
}

export default Page
