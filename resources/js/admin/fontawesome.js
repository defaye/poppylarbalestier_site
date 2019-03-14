import { library } from '@fortawesome/fontawesome-svg-core'

import {
	faAnchor,
	faChevronDoubleLeft,
	faChevronDoubleRight,
	faFile,
	faHome,
	faLightbulb,
	faMagic,
	faMinusOctagon,
	faNewspaper,
	faPlusOctagon,
	faPowerOff,
	faSquare,
	faTimesSquare,
	faUserCircle,
} from '@fortawesome/pro-light-svg-icons'

library.add(
	faAnchor,
	faChevronDoubleLeft,
	faChevronDoubleRight,
	faFile,
	faHome,
	faLightbulb,
	faMagic,
	faMinusOctagon,
	faNewspaper,
	faPlusOctagon,
	faPowerOff,
	faSquare,
	faTimesSquare,
	faUserCircle,
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
	faFacebookSquare,
	faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons'

library.add(
	faFacebookSquare,
	faTwitterSquare,
)

import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

