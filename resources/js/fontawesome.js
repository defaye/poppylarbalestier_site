import { library } from '@fortawesome/fontawesome-svg-core'

import {
    faCircle,
    faSpinner,
    faEye,
    faPhone,
    faPhoneSquare,
    faEnvelope,
    faMailbox,
    faEnvelopeSquare,
    faPenSquare,
} from '@fortawesome/pro-solid-svg-icons'

library.add(
    faCircle,
    faSpinner,
    faEye,
    faPhone,
    faPhoneSquare,
    faEnvelope,
    faMailbox,
    faEnvelopeSquare,
    faPenSquare,
)

import {
    faCompressAlt,
    faExpandAlt,
} from '@fortawesome/pro-regular-svg-icons'

library.add(
    faCompressAlt,
    faExpandAlt,
)

import { 
    faFacebookF,
    faFacebookSquare,
    faInstagram,
    faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons'

library.add(
    faFacebookF,
    faFacebookSquare,
    faInstagram,
    faTwitterSquare,
)

import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
