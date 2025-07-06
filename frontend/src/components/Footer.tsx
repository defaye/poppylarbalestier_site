const Footer = () => {
  return (
    <footer id="bottom" className="mt-4">
      <div className="container">
        <div className="text-uppercase">
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="text-center text-sm-left">
                &copy; Poppy Larbalestier {new Date().getFullYear()}
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="text-center text-sm-right">
                Website by <a href="https://github.com/defaye" target="_blank" rel="noopener noreferrer">Jono de Faye</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
