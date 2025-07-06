import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNavigation } from '@/lib/api';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { data: navigation } = useQuery({
    queryKey: ['navigation'],
    queryFn: getNavigation,
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header id="top" className="my-4">
      {/* Mobile Navigation Toggle - ABOVE header content */}
      <nav className="navbar navbar-expand-lg navbar-light d-block d-lg-none">
        <div className="container">
          <button
            className="navbar-toggler mb-1"
            type="button"
            onClick={toggleMenu}
            aria-controls="headerNavigation"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`navbar-collapse ${isMenuOpen ? 'show' : 'collapse'}`} id="headerNavigation">
            <ul className="navbar-nav mx-auto">
              {navigation?.filter(item => item.position > 0).map((item) => (
                <li key={item.id} className="nav-item">
                  <Link
                    to={`/${item.page.slug}`}
                    className="nav-link text-uppercase"
                    onClick={() => setIsMenuOpen(false)}
                    dangerouslySetInnerHTML={{ __html: item.page.title }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Header Content */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-8 col-xl-6 ml-auto">
            <div id="site-title" className="text-center">
              <Link to="/">
                <img src="/images/logo.jpg" alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="d-none d-lg-flex col-lg-2 col-xl-3 align-items-center" style={{ fontSize: '2rem' }}>
            <a className="ml-auto" href="https://www.instagram.com/poppylarbalestier/" target="_blank" rel="noopener noreferrer">
              <div className="icon-link fa-2x" style={{ position: 'relative', display: 'inline-block' }}>
                <i className="fas fa-square" style={{ color: '#000' }}></i>
                <i className="fab fa-instagram" style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%) scale(0.6)',
                  color: 'white' 
                }}></i>
              </div>
            </a>
            <a className="ml-3" href="https://www.facebook.com/poppylarbalestier/" target="_blank" rel="noopener noreferrer">
              <div className="icon-link fa-2x" style={{ position: 'relative', display: 'inline-block' }}>
                <i className="fas fa-square" style={{ color: '#000' }}></i>
                <i className="fab fa-facebook-f" style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%) scale(0.6)',
                  color: 'white' 
                }}></i>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - BELOW header content */}
      <nav className="navbar navbar-expand-lg navbar-light d-none d-lg-block">
        <div className="container">
          <div className="navbar-collapse">
            <ul className="navbar-nav mx-auto">
              {navigation?.filter(item => item.position > 0).map((item) => (
                <li key={item.id} className="nav-item">
                  <Link
                    to={`/${item.page.slug}`}
                    className="nav-link text-uppercase"
                    dangerouslySetInnerHTML={{ __html: item.page.title }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
