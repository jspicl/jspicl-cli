import fs from "fs";
import pngjs from "pngjs";
import { pico8Palette } from "./constants";

const spritesheetWidth = 128;
const spritesheetHeight = 128;
const hexBase = 16;
const pixelDataSize = 4; // red + green + blue + alpha

const toClosestColor = pixels => (unused, offset) => {
  const pixelOffset = offset * pixelDataSize;
  const pixel = {
    r: pixels[pixelOffset],
    g: pixels[pixelOffset + 1],
    b: pixels[pixelOffset + 2] // eslint-disable-line no-magic-numbers
  };

  let minDistance = Number.MAX_VALUE;
  let closestPaletteColor = 0;
  pico8Palette.forEach((color, i) => {
    const diff = (color.r - pixel.r) ** 2 + (color.g - pixel.g) ** 2 + (color.b - pixel.b) ** 2; // eslint-disable-line no-magic-numbers

    if (diff < minDistance) {
      minDistance = diff;
      closestPaletteColor = i;
    }
  });

  return closestPaletteColor.toString(hexBase);
};

export function getSpritesheetFromImage (imagePath) {
  if (!imagePath) {
    throw new Error("Image path is missing");
  }

  const stream = fs.createReadStream(imagePath).pipe(new pngjs.PNG());

  return new Promise(resolve => // eslint-disable-line promise/avoid-new
    stream.on("parsed", () => {
      if (stream.width !== spritesheetWidth || stream.height !== spritesheetHeight) {
        throw new Error("The spritesheet must be a 128x128 png image");
      }

      const pixels = new Array(stream.width * stream.height)
        .fill(0)
        .map(toClosestColor(stream.data));

      const pixelsAsString = new Array(stream.height)
        .fill(0)
        .map((unused, offset) => pixels.slice(offset * spritesheetWidth, offset * spritesheetWidth + spritesheetWidth).join("")) // cut the strings so we get stacks of 128 characters
        .join("\n");

      resolve(pixelsAsString);
    }));
}
