import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="heading-primary mb-12">Contact</h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="heading-secondary mb-6">Get in Touch</h2>
              <p className="body-text mb-6">
                I'd love to hear about your upcoming event or photography needs. 
                Let's create something beautiful together.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sage-900 mb-2">Email</h3>
                  <a 
                    href="mailto:hello@poppylarbalestier.com" 
                    className="text-sage-700 hover:text-sage-900 transition-colors"
                  >
                    hello@poppylarbalestier.com
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sage-900 mb-2">Social</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/poppylarbalestier/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage-700 hover:text-sage-900 transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.facebook.com/poppylarbalestier/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage-700 hover:text-sage-900 transition-colors"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sage-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-sage-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sage-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-sage-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-sage-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-sage-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
