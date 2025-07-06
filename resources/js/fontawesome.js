import { library } from '@fortawesome/fontawesome-svg-core'

import {
    faCircle,
    faEnvelope,
    faEye,
    faPhone,
    faSpinner,
    faSquare,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faCircle,
    faEnvelope,
    faEye,
    faPhone,
    faSpinner,
    faSquare,
)

// Note: Using free solid versions instead of pro regular
import {
    faCompress,
    faExpand,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faCompress,
    faExpand,
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
