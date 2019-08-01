import path from "path";
import { spawn, exec } from "child_process";
import { logSuccess, logWarning } from "./logging";

const pico8PathMap = {
  win32: `"C:\\Program Files (x86)\\PICO-8\\pico8.exe"`, // eslint-disable-line quotes
  darwin: "/Applications/PICO-8.app/Contents/MacOS/pico8",
  linux: "~/pico-8/pico8"
};

export function createPico8Launcher ({ watch, customPicoPath, reloadOnSave, pipeOutputToConsole }) {
  let picoProcess = null;

  return cartridgePath => {
    if (!watch || !cartridgePath) {
      return;
    }

    if (picoProcess) {
      if (!reloadOnSave) {
        return;
      }

      if (process.platform === "darwin") {
        // Currently only MacOS supports auto reloading when saving.
        logSuccess("Reloading cartridge in PICO-8");
        exec(`osascript "${path.join(__dirname, "reload-pico8.applescript")}"`);
      }
      else {
        logWarning("Autoreloading is currently only supported on MacOS. Please press Ctrl+R in PICO-8 to see new changes.");
      }
    }
    else {
      logSuccess("Running cartridge in PICO-8");
      // Use customized path if available, otherwise fallback to the default one for the current OS
      const picoPath = customPicoPath || pico8PathMap[process.platform];

      picoProcess = spawn(picoPath, ["-run", `"${path.resolve(cartridgePath)}"`], {
        shell: true,
        stdio: pipeOutputToConsole ? "inherit" : "pipe"
      });

      picoProcess.on("close", code => {
        picoProcess = null;
        code && console.log(`Pico-8 process exited with code ${code}`); // eslint-disable-line no-console
      });
    }
  };
}
