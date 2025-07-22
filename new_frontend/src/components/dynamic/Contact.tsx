import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { submitContact } from '@/lib/api'

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

// Simple reCAPTCHA component placeholder
const RecaptchaButton: React.FC<{
  onVerify: (token: string) => void;
  disabled: boolean;
  isLoading: boolean;
}> = ({ onVerify, disabled, isLoading }) => {
  const handleClick = () => {
    // In a real implementation, this would trigger reCAPTCHA
    // For now, we'll simulate it
    if (!disabled && !isLoading) {
      // Simulate reCAPTCHA verification
      setTimeout(() => {
        onVerify('simulated-recaptcha-token');
      }, 500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`btn w-100 ${
        isLoading ? 'btn-warning' : 'btn-primary'
      }`}
      style={isLoading ? { cursor: 'pointer' } : {}}
    >
      {isLoading ? 'Sending...' : 'Send'}
    </button>
  );
};

const Contact: React.FC<ContactProps> = ({ page }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: []
      }))
    }
  }

  const isFormFilled = () => {
    return formData.name && formData.email && formData.phone && formData.message
  }

  const validateForm = () => {
    const newErrors: Record<string, string[]> = {}
    
    if (!formData.name || formData.name.length < 4) {
      newErrors.name = ['Name must be at least 4 characters long']
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = ['Please enter a valid email address']
    }
    
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = ['Please enter a valid phone number']
    }
    
    if (!formData.message || formData.message.length < 50) {
      newErrors.message = ['Message must be at least 50 characters long']
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRecaptchaVerify = async (recaptchaToken: string) => {
    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(true)
    setErrors({})
    
    try {
      await submitContact({
        ...formData,
        recaptcha: recaptchaToken
      })
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', phone: '', message: '' })
      setSubmitted(true)
      
      // Show success notification similar to original
      // In the original, this would be handled by the store/notifications system
      // For now, we'll just show the success state
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
      
    } catch (error: any) {
      console.error('Error submitting form:', error)
      
      // Handle Laravel validation errors
      if (error.response?.data && typeof error.response.data === 'object') {
        setErrors(error.response.data)
      } else {
        setErrors({
          general: ['An error occurred. Please try again.']
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This will be handled by the reCAPTCHA component
  }

  const startCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  }

  const pageHeader = page.name ? startCase(page.name) : (page.title || '')

  return (
    <div className="container">
      {pageHeader && (
        <h1>{pageHeader}</h1>
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
      <div className="row my-4">
        <div className="col-12">
          <div className="my-4">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="alert alert-success"
              >
                <p>Thank you, your message has been sent!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* General errors */}
                {errors.general && (
                  <div className="alert alert-danger">
                    {errors.general.map((error, index) => (
                      <div key={index} dangerouslySetInnerHTML={{ __html: error }} />
                    ))}
                  </div>
                )}

                {/* Name Field */}
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    autoFocus
                    aria-label="Name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.map((error, index) => (
                        <div key={index} dangerouslySetInnerHTML={{ __html: error }} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    required
                    aria-label="E-mail address"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.map((error, index) => (
                        <div key={index} dangerouslySetInnerHTML={{ __html: error }} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div className="form-group">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                    aria-label="Phone number"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone.map((error, index) => (
                        <div key={index} dangerouslySetInnerHTML={{ __html: error }} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    rows={3}
                    aria-label="Message"
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                  />
                  {errors.message && (
                    <div className="invalid-feedback">
                      {errors.message.map((error, index) => (
                        <div key={index} dangerouslySetInnerHTML={{ __html: error }} />
                      ))}
                    </div>
                  )}
                </div>

                {/* reCAPTCHA Button */}
                <RecaptchaButton
                  onVerify={handleRecaptchaVerify}
                  disabled={!isFormFilled()}
                  isLoading={isSubmitting}
                />
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Body suffix */}
      {page.body_suffix && (
        <div 
          className="mt-6 prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.body_suffix }}
        />
      )}
    </div>
  )
}

export default Contact
