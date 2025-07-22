import React from 'react'
import { motion } from 'framer-motion'

interface Post {
  id: number
  title: string
  slug: string
  order?: number
  images?: Array<{
    id: number
    path: string
    name: string
  }>
}

interface PostsGalleryProps {
  page: {
    slug: string
    posts?: Post[]
  }
  onNavigate: (path: string) => void
}

const PostsGallery: React.FC<PostsGalleryProps> = ({ page, onNavigate }) => {
  if (!page.posts || page.posts.length === 0) return null

  // Sort posts by order if available
  const sortedPosts = page.posts.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }
    return 0
  })

  return (
    <div className="PostsGallery">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {sortedPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col cursor-pointer"
              role="button"
              onClick={() => onNavigate(`/${page.slug}/${post.slug}`)}
            >
              <a
                href={`/${page.slug}/${post.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(`/${page.slug}/${post.slug}`)
                }}
                className="PostsGallery--header w-full text-center text-purple-600 font-bold mb-6 mt-6 tracking-wider text-xs uppercase hover:text-purple-700 transition-colors"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />

              {post.images && post.images.length > 0 && (
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  alt={post.title}
                  src={post.images[0].path}
                  className="w-full h-auto"
                  style={{ aspectRatio: '826/551' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostsGallery
