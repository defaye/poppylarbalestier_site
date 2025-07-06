import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CarouselProps {
  images: Array<{
    id: number
    path: string
    name: string
  }>
  showPagination?: boolean
  autoHeight?: boolean
  ratioX?: number
  ratioY?: number
}

const Carousel: React.FC<CarouselProps> = ({ 
  images, 
  showPagination = true, 
  autoHeight = false,
  ratioX = 826,
  ratioY = 551
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isAutoPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 3000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, images.length])

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000) // Resume autoplay after 5 seconds
  }

  const handleMainImageClick = () => {
    if (images.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  if (!images || images.length === 0) return null

  return (
    <div className="carousel">
      {/* Main image display */}
      <div 
        className="carousel-primary relative cursor-pointer"
        onClick={handleMainImageClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].path}
              alt={images[currentIndex].name}
              className="w-full h-auto block"
              style={{
                aspectRatio: autoHeight ? 'auto' : `${ratioX}/${ratioY}`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination thumbnails */}
      {showPagination && images.length > 1 && (
        <div className="carousel-paginator mt-5">
          <div className="relative overflow-hidden">
            {/* Shadow gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            {/* Thumbnail container - 5 thumbnails filling full width with no gaps */}
            <div className="flex w-full">
              {images.map((image, index) => {
                const isActive = index === currentIndex
                const distance = Math.abs(index - currentIndex)
                const maxVisible = 5
                const isVisible = distance <= Math.floor(maxVisible / 2)
                
                if (!isVisible) return null
                
                return (
                  <motion.div
                    key={image.id}
                    className="cursor-pointer relative flex-1"
                    onClick={() => handleThumbnailClick(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={image.path}
                      alt={image.name}
                      className="w-full h-auto object-cover"
                      style={{
                        aspectRatio: `${ratioX}/${ratioY}`
                      }}
                    />
                    {/* Overlay for active (current) thumbnail - greyed out */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gray-400 opacity-40" />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carousel
