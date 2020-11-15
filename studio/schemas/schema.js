// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import product from "./documents/product";

// Object types
import blockContent from "./objects/blockContent";
import figure from "./objects/figure";
import link from "./objects/link";
import portableText from "./objects/portableText";
import simplePortableText from "./objects/simplePortableText";
import contactInfo from "./objects/contactInfo";

// Landing page sections
import hero from "./objects/hero";
import imageSection from "./objects/imageSection";
import textSection from "./objects/textSection";

import localeString from "./locale/String";
import localeText from "./locale/Text";
import localeBlockContent from "./locale/BlockContent";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    product,
    // When added to this list, object types can be used as
    figure,
    link,
    hero,
    imageSection,
    textSection,
    portableText,
    simplePortableText,
    contactInfo,
    blockContent,
    localeText,
    localeBlockContent,
    localeString,
  ]),
});