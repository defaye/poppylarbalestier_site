import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import fontawesomeProLight from "@fortawesome/fontawesome-pro-light";
// import fontawesomeProRegular from "@fortawesome/fontawesome-pro-regular";
// import fontawesomeProSolid from "@fortawesome/fontawesome-pro-solid";
import fontawesomeFreeBrands from "@fortawesome/fontawesome-free-brands";

fontawesome.library.add(fontawesomeProLight);
// fontawesome.library.add(fontawesomeProRegular);
// fontawesome.library.add(fontawesomeProSolid);
fontawesome.library.add(fontawesomeFreeBrands);

// let fontawesome = require("@fortawesome/fontawesome");
// import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
// let fontawesomeProLight = require("@fortawesome/fontawesome-pro-light");
// // let fontawesomeProRegular = require("@fortawesome/fontawesome-pro-regular");
// // let fontawesomeProSolid = require("@fortawesome/fontawesome-pro-solid");
// let fontawesomeFreeBrands = require("@fortawesome/fontawesome-free-brands");

// fontawesome.library.add(fontawesomeProLight);
// // fontawesome.library.add(fontawesomeProRegular);
// // fontawesome.library.add(fontawesomeProSolid);
// fontawesome.library.add(fontawesomeFreeBrands);

Vue.component("font-awesome-icon", FontAwesomeIcon);
