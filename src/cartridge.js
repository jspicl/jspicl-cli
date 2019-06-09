import fs from "fs";
import path from "path";

export function generateCartridgeContent ({
  lua = "",
  gff,
  gfx,
  music,
  map,
  sfx
}) {
  return [
    "pico-8 cartridge // http://www.pico-8.com",
    "version 8",
    `__lua__\n${lua}`,
    gfx && `__gfx__\n${gfx}`,
    gff && `__gff__\n${gff}`,
    map && `__map__\n${map}`,
    sfx && `__sfx__\n${sfx}`,
    music && `__music__\n${music}`,
    "\n"
  ].join("\n");
}

export function getCartridgeSections (cartridgePath) {
  const contents = fs.readFileSync(path.resolve(cartridgePath), "utf8");

  const cartridgeSections = {};
  let content, section;

  // Extract the contents of each section
  const regex = /__([a-z]+)__\n([\s\S]*?)(?=\n__\w+__\n|\n(\n|$))/g;
  while ([, section, content] = regex.exec(contents) || "") { // eslint-disable-line no-cond-assign
    cartridgeSections[section] = content;
  }

  return cartridgeSections;
}
