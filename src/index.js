import { defaultOptions } from "./constants";
import { generateCartridgeContent, getCartridgeSections } from "./cartridge";
import { logStats, logToFile, logSuccess, logInfo } from "./logging";
import { getSpritesheetFromImage } from "./spritesheet";
import { createPico8Launcher } from "./pico8-launcher";
import { transpile } from "./transpile";

export default function plugin (customizedOptions) {
  const options = {
    ...defaultOptions,
    ...customizedOptions
  };

  if (!options.cartridgePath) {
    throw new Error("Ensure that 'cartridgePath' property in options is set.");
  }

  if (!options.spritesheetImagePath) {
    throw new Error("Ensure that 'spritesheetImagePath' property in options is set.");
  }

  let runOnce = true;
  const runPico = createPico8Launcher(options);

  return {
    name: "jspicl",

    buildStart () {
      if (runOnce) {
        options.watch && logSuccess("Watching source files for changes");
        logSuccess("Building cartridge");
      }

      runOnce = false;
      this.addWatchFile(options.spritesheetImagePath);
    },

    async renderChunk (javascriptCode) {
      const {
        cartridgePath,
        jsOutput,
        luaOutput,
        showStats,
        spritesheetImagePath
      } = options;

      const transpiledSource = transpile(javascriptCode, options);
      const cartridgeSections = getCartridgeSections(cartridgePath);
      const gfxSection = await getSpritesheetFromImage(spritesheetImagePath);

      const code = generateCartridgeContent({
        ...cartridgeSections,
        lua: transpiledSource,
        gfx: gfxSection
      });

      // Statistics
      jsOutput && logToFile(javascriptCode, jsOutput);
      luaOutput && logToFile(transpiledSource.lua, luaOutput);
      showStats && logStats(transpiledSource.lua, transpiledSource.polyfillOutput, code);

      return {
        code
      };
    },

    watchChange () {
      console.clear();
      logSuccess("Change detected, rebuilding cartridge");
    },

    generateBundle ({ file }) {
      runPico(file);
      options.watch && console.log("\nPress Ctrl+C to stop watching");
    }
  };
}
