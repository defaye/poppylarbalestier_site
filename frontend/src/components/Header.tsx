import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

interface NavigationItem {
  id: number;
  position: number;
  page: {
    id: number;
    title: string;
    slug: string;
  };
}

interface HeaderProps {
  onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const { data: navigation } = useQuery<NavigationItem[]>({
    queryKey: ['navigation'],
    queryFn: async () => {
      const response = await api.get('/navigation');
      return response.data;
    },
  });

  useEffect(() => {
    // Listen for path changes
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (path: string) => {
    setCurrentPath(path);
    onNavigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header id="top" className="my-4">
      {/* Mobile Navigation */}
      <nav className="block lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-purple-600"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-9 w-9" />
              ) : (
                <Bars3Icon className="h-9 w-9" />
              )}
            </button>
          </div>
          
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-gray-100/50 rounded-lg"
            >
              <div className="py-2">
                {navigation?.filter(item => item.position > 0).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(`/${item.page.slug}`)}
                    className={`block w-full px-4 py-2 text-center hover:bg-purple-500/50 hover:text-gray-100 uppercase ${
                      currentPath === `/${item.page.slug}` ? 'bg-purple-500/25' : ''
                    }`}
                  >
                    {item.page.title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Desktop Header */}
      <div className="container-fluid mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Logo section */}
          <div className="w-full lg:w-8/12 xl:w-6/12 lg:ml-auto">
            <div 
              id="site-title" 
              role="button" 
              className="text-center cursor-pointer"
              onClick={() => handleNavClick('/')}
            >
              <img src="/images/logo.jpg" alt="Logo" className="max-w-full mx-auto" />
            </div>
          </div>
          
          {/* Social Icons */}
          <div className="hidden lg:flex lg:w-2/12 xl:w-3/12 items-center text-2xl">
            <a 
              className="ml-auto text-gray-600 hover:text-purple-600 transition-colors" 
              href="https://www.instagram.com/PoppyLarbalestierPhotography/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative inline-flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 bg-gray-800 rounded"></div>
                <svg className="relative w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </a>
            <a 
              className="ml-3 text-gray-600 hover:text-purple-600 transition-colors" 
              href="https://www.facebook.com/PoppyLarbalestierPhotography/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative inline-flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 bg-gray-800 rounded"></div>
                <svg className="relative w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block mt-12 text-sm border-t border-gray-200" style={{ borderBottomWidth: '2px', borderBottomColor: '#dee2e6' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            {navigation?.filter(item => item.position > 0).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(`/${item.page.slug}`)}
                className={`nav-link text-gray-600 hover:text-purple-600 transition-colors tracking-wider uppercase ${
                  currentPath === `/${item.page.slug}` ? 'text-purple-600 font-medium' : ''
                }`}
              >
                {item.page.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
