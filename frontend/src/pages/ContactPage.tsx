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
              className="GetInTouchContactMethod row"
              onClick={() => handleContactClick(contactMethod)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="col-12 col-md-1 text-center">
                <div className="fa-layers fa-4x" style={{ position: 'relative', display: 'inline-block' }}>
                  <FontAwesomeIcon 
                    icon={faSquare}
                    style={{ color: hoveredIndex === index ? '#6c757d' : '#212529' }}
                  />
                  <FontAwesomeIcon 
                    icon={contactMethod.icon}
                    style={{ 
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      fontSize: contactMethod.transform?.includes('shrink') ? '0.75em' : '1em'
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-md-11 d-flex align-items-center justify-content-center mt-3 mt-md-0">
                <h5 style={{ color: hoveredIndex === index ? '#6c757d' : 'inherit' }}>
                  {contactMethod.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactPage
