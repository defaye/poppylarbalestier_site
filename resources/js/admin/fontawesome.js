import { library } from '@fortawesome/fontawesome-svg-core'

import { faLightbulb as solidLightbulb } from '@fortawesome/free-solid-svg-icons'

library.add(
	solidLightbulb
)

import {
	faAnchor,
	faChevronLeft,
	faChevronRight,
	faFile,
	faHome,
	faLightbulb,
	faMagic,
	faMinusCircle,
	faNewspaper,
	faPlusCircle,
	faPowerOff,
	faSquare,
	faTimesCircle,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faAnchor,
	faChevronLeft,
	faChevronRight,
	faFile,
	faHome,
	faLightbulb,
	faMagic,
	faMinusCircle,
	faNewspaper,
	faPlusCircle,
	faPowerOff,
	faSquare,
	faTimesCircle,
	faUserCircle,
)


import {
	faSquare as faSquareRegular,
	faCircle as faCircleRegular,
} from '@fortawesome/free-regular-svg-icons'

library.add(
	faSquareRegular,
	faCircleRegular,
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

