const fontawesome = require('@fortawesome/fontawesome');
// const FontAwesomeIcon = require('@fortawesome/vue-fontawesome');
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
const fontawesomeProLight = require('@fortawesome/fontawesome-pro-light');
// const fontawesomeProRegular = require('@fortawesome/fontawesome-pro-regular');
// const fontawesomeProSolid = require('@fortawesome/fontawesome-pro-solid');
const fontawesomeFreeBrands = require('@fortawesome/fontawesome-free-brands');

fontawesome.library.add(fontawesomeProLight);
// fontawesome.library.add(fontawesomeProRegular);
// fontawesome.library.add(fontawesomeProSolid);
fontawesome.library.add(fontawesomeFreeBrands);

Vue.component('font-awesome-icon', FontAwesomeIcon);
