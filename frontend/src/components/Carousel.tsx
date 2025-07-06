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
          <div className="relative">
            {/* Thumbnail container - 5 thumbnails filling full width with small gaps */}
            <div className="flex w-full gap-1">
              {(() => {
                const maxVisible = 5
                const half = Math.floor(maxVisible / 2)
                const visibleIndices = []
                
                // Create array of 5 indices centered around currentIndex with wraparound
                for (let i = -half; i <= half; i++) {
                  let index = (currentIndex + i + images.length) % images.length
                  visibleIndices.push(index)
                }
                
                return visibleIndices.map((index, position) => {
                  const image = images[index]
                  const isActive = index === currentIndex
                  
                  return (
                    <motion.div
                      key={`${image.id}-${position}`}
                      className="cursor-pointer relative flex-1 group"
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <img
                        src={image.path}
                        alt={image.name}
                        className="w-full h-auto object-cover"
                        style={{
                          aspectRatio: `${ratioX}/${ratioY}`
                        }}
                      />
                      {/* Overlay for active (current) thumbnail - whiter highlight */}
                      {isActive && (
                        <div className="absolute inset-0 bg-white opacity-20" />
                      )}
                      {/* Hover overlay - more white and fades in */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                      )}
                    </motion.div>
                  )
                })
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carousel
