import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'

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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isAutoPlaying && images.length > 1 && !isFullscreen) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 3000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, images.length, isFullscreen])

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000) // Resume autoplay after 5 seconds
  }

  const handleMainImageClick = () => {
    if (images.length > 1 && !isFullscreen) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }
  }

  const handleFullscreenToggle = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the main image click
    setIsFullscreen(!isFullscreen)
  }

  const handleMouseEnter = () => {
    if (!isFullscreen) {
      setIsAutoPlaying(false)
    }
  }

  const handleMouseLeave = () => {
    if (!isFullscreen) {
      setIsAutoPlaying(true)
    }
  }

  if (!images || images.length === 0) return null

  return (
    <div 
      className="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main image display */}
      <div 
        className="carousel-primary relative cursor-pointer group"
        onClick={handleMainImageClick}
      >
        <div className="relative overflow-hidden pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].path}
              alt={images[currentIndex].name}
              className="w-full h-auto block object-cover"
              style={{
                aspectRatio: autoHeight ? 'auto' : `${ratioX}/${ratioY}`,
                width: '100%'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </AnimatePresence>
          
          {/* Fullscreen icon - appears on hover */}
          <button
            onClick={handleFullscreenToggle}
            className="absolute h-16 w-16 top-4 right-4 bg-purple-600 bg-opacity-40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-60"
            aria-label="Toggle fullscreen"
          >
            <FontAwesomeIcon icon={faExpand} className="w-full" />
          </button>
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
      
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={handleFullscreenToggle}
        >
          {/* Close button */}
          <button
            onClick={handleFullscreenToggle}
            className="absolute h-16 w-16 top-4 right-4 bg-purple-600 bg-opacity-40 text-white rounded-full hover:bg-opacity-60 z-10"
            aria-label="Close fullscreen"
          >
            <FontAwesomeIcon icon={faCompress} className="w-full" />
          </button>
          
          {/* Fullscreen image */}
          <img
            src={images[currentIndex].path}
            alt={images[currentIndex].name}
            className="w-full h-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  )
}

export default Carousel
