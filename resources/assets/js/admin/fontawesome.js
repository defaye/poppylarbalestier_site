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
import anchor from "@fortawesome/fontawesome-pro-light/faAnchor";
import file from "@fortawesome/fontawesome-pro-light/faFile";
import newspaper from "@fortawesome/fontawesome-pro-light/faNewspaper";
import home from "@fortawesome/fontawesome-pro-light/faHome";
import powerOff from "@fortawesome/fontawesome-pro-light/faPowerOff";

fontawesome.library.add(facebookSquare);
fontawesome.library.add(twitterSquare);
fontawesome.library.add(expandAlt);
fontawesome.library.add(compressAlt);
fontawesome.library.add(anchor);
fontawesome.library.add(file);
fontawesome.library.add(newspaper);
fontawesome.library.add(home);
fontawesome.library.add(powerOff);

fontawesome.icon({ prefix: "fab", iconName: "facebook-square" });
fontawesome.icon({ prefix: "fab", iconName: "twitter-square" });
fontawesome.icon({ prefix: "far", iconName: "expand-alt" });
fontawesome.icon({ prefix: "far", iconName: "compress-alt" });
fontawesome.icon({ prefix: "fal", iconName: "anchor" });
fontawesome.icon({ prefix: "fal", iconName: "file" });
fontawesome.icon({ prefix: "fal", iconName: "newspaper" });
fontawesome.icon({ prefix: "fal", iconName: "home" });
fontawesome.icon({ prefix: "fal", iconName: "power-off" });

Vue.component("font-awesome-icon", FontAwesomeIcon);
