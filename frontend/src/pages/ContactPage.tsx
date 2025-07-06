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
    <div className="container">
      <h1>Get In Touch</h1>
      
      <div className="row d-flex">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          {contactMethods.map((contactMethod, index) => (
            <div
              key={index}
              className="GetInTouchContactMethod row d-flex align-items-center"
              onClick={() => handleContactClick(contactMethod)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="col-2 col-md-2 d-flex justify-content-start">
                <div 
                  className="fa-layers fa-4x" 
                  style={{ 
                    position: 'relative', 
                    display: 'inline-block', 
                    width: '1em', 
                    height: '1em'
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faSquare}
                    style={{ 
                      color: hoveredIndex === index ? '#6c757d' : '#212529',
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                  <FontAwesomeIcon 
                    icon={contactMethod.icon}
                    style={{ 
                      position: 'absolute',
                      left: '50%',
                      top: '100%',
                      transform: contactMethod.transform?.includes('shrink') 
                        ? 'translate(-50%, -50%) scale(0.5)' 
                        : 'translate(-50%, -50%) scale(0.7)',
                      color: 'white',
                      zIndex: 1
                    }}
                  />
                </div>
              </div>
              <div className="col-10 col-md-10 d-flex align-items-center">
                <div className="w-100 text-center">
                  <h5 style={{ color: hoveredIndex === index ? '#6c757d' : 'inherit', margin: 0 }}>
                    {contactMethod.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactPage
