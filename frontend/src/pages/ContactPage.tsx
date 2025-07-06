import React from 'react'

// Contact methods data from the original Vue template
const contactMethods = [
  {
    href: 'mailto:poppy@poppylarbalestier.com',
    icon: ['fas', 'envelope'],
    name: 'poppy@poppylarbalestier.com',
    transform: 'shrink-8',
  },
  {
    href: 'https://www.facebook.com/PoppyLarbalestierPhotography',
    target: '_blank',
    icon: ['fab', 'facebook-f'],
    name: 'PoppyLarbalestierPhotography',
  },
  {
    href: 'https://www.instagram.com/PoppyLarbalestierPhotography',
    target: '_blank',
    icon: ['fab', 'instagram'],
    name: 'PoppyLarbalestierPhotography',
  },
  {
    href: 'tel:00447700832331',
    icon: ['fas', 'phone'],
    name: '+44 (0) 7700 832 331',
    transform: 'shrink-8',
  },
]

// Icon mapping for the contact methods
const getIconSymbol = (iconArray: string[]) => {
  const [, iconName] = iconArray
  const iconMap: Record<string, string> = {
    'envelope': '✉️',
    'facebook-f': '📘',
    'instagram': '📷',
    'phone': '📞',
  }
  return iconMap[iconName] || '📧'
}

const ContactPage: React.FC = () => {
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
              style={{ cursor: 'pointer' }}
            >
              <div className="col-12 col-md-1 text-center">
                <div className="contact-icon-large">
                  <div className="icon-background-large">
                    <span className="icon-symbol-large">
                      {getIconSymbol(contactMethod.icon)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-11 d-flex align-items-center justify-content-center mt-3 mt-md-0">
                <h5>{contactMethod.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactPage
