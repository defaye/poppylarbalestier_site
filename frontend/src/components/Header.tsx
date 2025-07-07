import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '@/lib/api';

interface NavigationItem {
  id: number;
  title: string;
  name: string;
  slug: string;
  href: string;
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
      const response = await api.get('/navigation.json');
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
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-purple-600 border border-gray-200"
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
                {navigation?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full px-4 py-2 text-center hover:bg-purple-500/50 hover:text-gray-100 uppercase tracking-[0.15em] transition-colors text-base ${
                      currentPath === item.href ? 'bg-purple-500/25' : ''
                    }`}
                  >
                    {item.name || item.title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Desktop Header */}
      <div className="mx-auto">
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
          <div className="hidden lg:flex lg:w-2/12 xl:w-3/12 items-center text-2xl px-4">
            <a 
              className="ml-auto text-stone-400 hover:text-purple-600 transition-colors" 
              href="https://www.instagram.com/PoppyLarbalestierPhotography/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative inline-flex items-center justify-center w-16 h-16 hover:text-purple-600 transition-colors">
                <FontAwesomeIcon icon={['fas', 'square']} className="absolute inset-0 w-16 h-16 text-current" />
                <FontAwesomeIcon icon={['fab', 'instagram']} className="relative w-10 h-10 text-white" />
              </div>
            </a>
            <a 
              className="ml-3 text-stone-400 hover:text-purple-600 transition-colors" 
              href="https://www.facebook.com/PoppyLarbalestierPhotography/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative inline-flex items-center justify-center w-16 h-16 hover:text-purple-600 transition-colors">
                <FontAwesomeIcon icon={['fas', 'square']} className="absolute inset-0 w-16 h-16 text-current" />
                <FontAwesomeIcon icon={['fab', 'facebook-f']} className="relative w-10 h-10 text-white" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block mt-12 text-sm border-t border-gray-200" style={{ borderBottomWidth: '2px', borderBottomColor: '#dee2e6' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            {navigation?.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`text-base transition-colors duration-200 uppercase ${
                  currentPath === item.href
                    ? 'text-purple-600 font-medium tracking-[0.15em]' 
                    : 'text-gray-600 hover:text-purple-600 tracking-[0.15em]'
                }`}
              >
                {item.name || item.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
