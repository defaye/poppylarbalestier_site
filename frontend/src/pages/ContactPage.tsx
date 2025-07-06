import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faSquare } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'

// Contact methods data from the original Vue template
const contactMethods = [
  {
    href: 'mailto:poppy@poppylarbalestier.com',
    icon: faEnvelope,
    name: 'poppy@poppylarbalestier.com',
    transform: 'shrink-8',
  },
  {
    href: 'https://www.facebook.com/PoppyLarbalestierPhotography',
    target: '_blank',
    icon: faFacebookF,
    name: 'PoppyLarbalestierPhotography',
  },
  {
    href: 'https://www.instagram.com/PoppyLarbalestierPhotography',
    target: '_blank',
    icon: faInstagram,
    name: 'PoppyLarbalestierPhotography',
  },
  {
    href: 'tel:00447700832331',
    icon: faPhone,
    name: '+44 (0) 7700 832 331',
    transform: 'shrink-8',
  },
]

const ContactPage: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const handleContactClick = (contactMethod: typeof contactMethods[0]) => {
    window.open(contactMethod.href, contactMethod.target || '_self')
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center mb-8">Get In Touch</h1>
      
      <div className="max-w-2xl mx-auto">
        {contactMethods.map((contactMethod, index) => (
          <div
            key={index}
            className="GetInTouchContactMethod flex items-center justify-center gap-6 py-4 cursor-pointer"
            onClick={() => handleContactClick(contactMethod)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex-shrink-0">
              <div 
                className="fa-layers fa-4x relative inline-block w-16 h-16"
              >
                <FontAwesomeIcon 
                  icon={faSquare}
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    color: hoveredIndex === index ? '#6c757d' : '#212529'
                  }}
                />
                <FontAwesomeIcon 
                  icon={contactMethod.icon}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ 
                    left: '50%',
                    top: '110%',
                    transform: 'translate(-50%, -50%) scale(0.5)',
                    color: 'white',
                    zIndex: 1
                  }}
                />
              </div>
            </div>
            <div className="flex-grow text-center">
              <h5 
                className="text-lg font-serif m-0"
                style={{ color: hoveredIndex === index ? '#6c757d' : 'inherit' }}
              >
                {contactMethod.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactPage
