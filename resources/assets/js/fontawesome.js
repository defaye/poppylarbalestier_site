import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
// import fontawesomeProLight from "@fortawesome/fontawesome-pro-light";
// import fontawesomeProRegular from "@fortawesome/fontawesome-pro-regular";
// import fontawesomeProSolid from "@fortawesome/fontawesome-pro-solid";
// import fontawesomeFreeBrands from "@fortawesome/fontawesome-free-brands";

// fontawesome.library.add(fontawesomeProLight);
// fontawesome.library.add(fontawesomeProRegular);
// fontawesome.library.add(fontawesomeProSolid);
// fontawesome.library.add(fontawesomeFreeBrands);

import facebookSquare from "@fortawesome/fontawesome-free-brands/faFacebookSquare";
import twitterSquare from "@fortawesome/fontawesome-free-brands/faTwitterSquare";
import expandAlt from "@fortawesome/fontawesome-pro-regular/faExpandAlt";
import compressAlt from "@fortawesome/fontawesome-pro-regular/faCompressAlt";

fontawesome.library.add(facebookSquare);
fontawesome.library.add(twitterSquare);
fontawesome.library.add(expandAlt);
fontawesome.library.add(compressAlt);

fontawesome.icon({ prefix: "fab", iconName: "facebook-square" });
fontawesome.icon({ prefix: "fab", iconName: "twitter-square" });
fontawesome.icon({ prefix: "far", iconName: "expand-alt" });
fontawesome.icon({ prefix: "far", iconName: "compress-alt" });

Vue.component("font-awesome-icon", FontAwesomeIcon);
