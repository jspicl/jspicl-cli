import jspicl from "jspicl";
import { banner } from "./constants";

export function transpile (javascriptCode, options) {
  const { includeBanner, polyfillTransform, jspicl: jspiclOptions = {} } = options;
  const jspiclBanner = includeBanner && `${banner}` || "";

  const { output, polyfills } = jspicl(javascriptCode, jspiclOptions);
  const polyfillOutput = polyfillTransform ? polyfillTransform(polyfills) : Object.values(polyfills).join("\n");
  const lua = `${polyfillOutput}${output}`;

  return {
    lua,
    polyfillOutput,
    toString () {
      return `${jspiclBanner}${lua}`;
    }
  };
}
