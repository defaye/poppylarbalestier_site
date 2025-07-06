import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface ContactProps {
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

const Contact: React.FC<ContactProps> = ({ page }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // TODO: Implement contact form submission
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-green-50 p-8 rounded-lg border border-green-200"
          >
            <h3 className="text-2xl font-bold text-green-800 mb-4">Thank you!</h3>
            <p className="text-green-700">Your message has been sent successfully. I'll get back to you soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brown-800 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brown-800 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brown-800 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors resize-y"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-brown-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-brown-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
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

export default Contact
