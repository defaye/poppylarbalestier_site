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
              onClick={() => handleNavClick('/')}
              className="text-lg font-serif"
            >
              Poppy Larbalestier
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-purple-600"
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
              className="mt-4 bg-gray-100/50 rounded-lg"
            >
              <div className="py-2">
                {navigation?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(`/${item.page.slug}`)}
                    className={`block w-full px-4 py-2 text-center hover:bg-purple-500/50 hover:text-gray-100 ${
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
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative inline-flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 bg-gray-800 rounded"></div>
                <svg className="relative w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
            </a>
            <a 
              className="ml-3 text-gray-600 hover:text-purple-600 transition-colors" 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative inline-flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 bg-gray-800 rounded"></div>
                <svg className="relative w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block mt-12 text-sm border-t border-gray-200" style={{ borderBottomWidth: '2px', borderBottomColor: '#d1d5db' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            {navigation?.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(`/${item.page.slug}`)}
                className={`nav-link text-gray-600 hover:text-purple-600 transition-colors tracking-wider ${
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
