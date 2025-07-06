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
        <div className="carousel-paginator mt-5 hidden md:block">
          <div className="relative">
            {/* Shadow gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            {/* Thumbnail container */}
            <div className="flex justify-center space-x-1 px-3 overflow-x-auto scrollbar-hide">
              {images.map((image, index) => {
                const isCenter = index === currentIndex
                const distance = Math.abs(index - currentIndex)
                const maxVisible = 5
                const isVisible = distance <= Math.floor(maxVisible / 2)
                
                if (!isVisible) return null
                
                return (
                  <motion.div
                    key={image.id}
                    className={`flex-shrink-0 cursor-pointer relative ${
                      isCenter ? 'ring-2 ring-white shadow-lg z-20' : 'z-10'
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                    whileHover={{ scale: isCenter ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      transform: isCenter ? 'scale(1.1)' : 'scale(1)',
                      zIndex: isCenter ? 20 : 10
                    }}
                  >
                    <img
                      src={image.path}
                      alt={image.name}
                      className={`w-16 h-16 object-cover ${isCenter ? 'rounded' : 'rounded opacity-75'}`}
                      style={{
                        aspectRatio: `${ratioX}/${ratioY}`
                      }}
                    />
                    {/* Overlay for non-active thumbnails */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-gray-100 opacity-25 rounded" />
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
