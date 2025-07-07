import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Page from './components/dynamic/Page'
import ContactPage from './pages/ContactPage'
import api from './lib/api'

// Dynamic imports for other components
const Contact = React.lazy(() => import('./components/dynamic/Contact'))
const Testimonials = React.lazy(() => import('./components/dynamic/Testimonials'))

interface PageData {
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

const dynamicComponents = {
  page: Page,
  contact: Contact,
  'contact-page': ContactPage,
  testimonials: Testimonials,
}

function App() {
  const [page, setPage] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadPage = async (path: string) => {
    try {
      setLoading(true)
      console.log('Loading page:', path)
      
      // Check if this is the contact page - prioritize our bespoke contact page
      if (path === '/contact') {
        // Set a fake page object for the contact page
        const contactPageData: PageData = {
          id: 0,
          title: 'Contact',
          name: 'Get In Touch',
          body: '',
          slug: 'contact',
          published: true,
          component: {
            element_name: 'contact-page'
          }
        }
        
        document.title = 'Contact — Poppy Larbalestier Photography'
        window.history.pushState(contactPageData, 'Contact — Poppy Larbalestier Photography', path)
        setPage(contactPageData)
        setLoading(false)
        return
      }
      
      // Extract slug from path
      const slug = path === '/' ? 'home' : path.replace(/^\//, '').replace(/\/$/, '') || 'home'
      
      // Check if this is a nested route (e.g., /weddings/john-and-jane)
      const pathParts = slug.split('/')
      let apiUrl = `/${slug}.json`
      
      if (pathParts.length === 2) {
        // This is a post detail page
        apiUrl = `/${pathParts[0]}/${pathParts[1]}.json`
      }
      
      const response = await api.get(apiUrl)
      const pageData = response.data
      console.log('Page data:', pageData)
      
      // Update page title
      const title = pageData.title 
        ? `${pageData.title} — Poppy Larbalestier Photography`
        : pageData.name 
          ? `${pageData.name} — Poppy Larbalestier Photography`
          : 'Poppy Larbalestier Photography'
      
      document.title = title
      
      // Update history
      window.history.pushState(pageData, title, path)
      
      setPage(pageData)
    } catch (error) {
      console.error('Error loading page:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Load initial page
    const currentPath = window.location.pathname
    loadPage(currentPath)

    // Handle browser back/forward
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        document.title = event.state.title || 'Poppy Larbalestier Photography'
        setPage(event.state)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Provide loadPage function to child components
  const handleNavigation = (path: string) => {
    loadPage(path)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600 mx-auto mb-4"></div>
          <p className="text-brown-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Determine which component to render
  const ComponentToRender = page?.component?.element_name 
    ? dynamicComponents[page.component.element_name as keyof typeof dynamicComponents]
    : dynamicComponents.page

  return (
    <div className="min-h-screen flex flex-col">
      <div id="top-wrapper" className="flex-1">
        <Header onNavigate={handleNavigation} />
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          id="content"
        >
          {page && ComponentToRender ? (
            <React.Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
              <ComponentToRender page={page} onNavigate={handleNavigation} />
            </React.Suspense>
          ) : (
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
              <p className="text-gray-600 mt-2">Sorry, the page you're looking for doesn't exist.</p>
            </div>
          )}
        </motion.main>
      </div>
      <Footer />
    </div>
  )
}

export default App
