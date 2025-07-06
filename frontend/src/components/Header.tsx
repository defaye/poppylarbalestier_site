import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => handleNavClick('/')}
              className="text-lg font-serif hover:text-purple-600 transition-colors"
            >
              Poppy Larbalestier
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-gray-100/50 rounded-lg overflow-hidden"
            >
              <div className="py-2">
                {navigation?.filter(item => item.position > 0).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(`/${item.page.slug}`)}
                    className={`block w-full px-4 py-3 text-center hover:bg-purple-500/50 hover:text-gray-100 uppercase tracking-wider transition-colors ${
                      currentPath === `/${item.page.slug}` ? 'bg-purple-500/25 text-purple-600' : 'text-gray-700'
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
      <div className="w-full mx-auto px-4">
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
          <div className="hidden lg:flex lg:w-2/12 xl:w-3/12 items-center justify-end gap-4 text-2xl">
            <a 
              className="text-gray-600 hover:text-purple-600 transition-colors" 
              href="https://www.instagram.com/PoppyLarbalestierPhotography/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative inline-flex items-center justify-center w-12 h-12">
                <FontAwesomeIcon 
                  icon={faSquare}
                  className="absolute inset-0 w-full h-full text-gray-800"
                />
                <FontAwesomeIcon 
                  icon={faInstagram}
                  className="relative text-white z-10"
                  style={{ 
                    fontSize: '1.5rem'
                  }}
                />
              </div>
            </a>
            <a 
              className="text-gray-600 hover:text-purple-600 transition-colors" 
              href="https://www.facebook.com/PoppyLarbalestierPhotography/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative inline-flex items-center justify-center w-12 h-12">
                <FontAwesomeIcon 
                  icon={faSquare}
                  className="absolute inset-0 w-full h-full text-gray-800"
                />
                <FontAwesomeIcon 
                  icon={faFacebookF}
                  className="relative text-white z-10"
                  style={{ 
                    fontSize: '1.5rem'
                  }}
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block mt-12 text-sm border-t border-gray-200 border-b-2 border-b-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            {navigation?.filter(item => item.position > 0).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(`/${item.page.slug}`)}
                className={`text-gray-600 hover:text-purple-600 transition-colors tracking-wider uppercase font-sans text-sm ${
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
