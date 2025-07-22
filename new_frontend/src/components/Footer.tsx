const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="bottom" className="mt-4 border-t border-gray-200 text-gray-400" style={{ lineHeight: '3rem', fontSize: '0.9375rem' }}>
      <div className="container mx-auto px-4">
        <div className="uppercase">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2">
              <div className="text-center sm:text-left">
                © POPPY LARBALESTIER {currentYear}
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="text-center sm:text-right">
                Website by{' '}
                <a 
                  href="https://github.com/defaye" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                >
                  Jono de Faye
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
