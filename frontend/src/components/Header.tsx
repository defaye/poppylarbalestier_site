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
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const { data: navigation } = useQuery<NavigationItem[]>({
    queryKey: ['navigation'],
    queryFn: async () => {
      const response = await api.get('/navigation');
      return response.data;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Listen for path changes
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('/')}
            className="flex items-center space-x-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-serif font-light text-sage-900"
            >
              Poppy Larbalestier
            </motion.div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('/')}
              className={`nav-link ${currentPath === '/' ? 'nav-link-active' : ''}`}
            >
              Home
            </button>
            {navigation?.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(`/${item.page.slug}`)}
                className={`nav-link ${
                  currentPath === `/${item.page.slug}` ? 'nav-link-active' : ''
                }`}
              >
                {item.page.title}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-sage-700 hover:text-sage-900 transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-sage-200"
          >
            <div className="py-4 space-y-4">
              <button
                onClick={() => handleNavClick('/')}
                className={`block px-4 py-2 text-sage-700 hover:text-sage-900 w-full text-left ${
                  currentPath === '/' ? 'font-semibold' : ''
                }`}
              >
                Home
              </button>
              {navigation?.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(`/${item.page.slug}`)}
                  className={`block px-4 py-2 text-sage-700 hover:text-sage-900 w-full text-left ${
                    currentPath === `/${item.page.slug}` ? 'font-semibold' : ''
                  }`}
                >
                  {item.page.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
