# jspicl CLI
jspicl CLI is a command line tool that simplifies PICO-8 game development in JavaScript.

Features:
* Comes with its own set of build pipeline so you don't need one.
* JavaScript to PICO-8 Lua transpilation through [jspicl](https://github.com/AgronKabashi/jspicl).
* Treeshaking which prevents unused code from being included and increasing your token count.
* Allows a PNG file to be used as a spritesheet, no need to edit your assets in PICO-8 anymore. Use your image editor of choice.
* Live reloading of PICO-8 cartridge whenever code or spritesheet is updated. See your changes live!

Future goals:
* Importing of audio files to be used as SFX or music.

## Installation

```Shell
npm install jspicl-cli
```

Include `-g` option if you want it globally available instead of a local copy.

## Usage

To see what options are available simply run the CLI without any options:
```Shell
$ jspicl-cli
Options:
  --input                 Path to entry point  [required]
  --output                Path the generated PICO-8 cardridge  [required]
  --spritesheetImagePath  Path to a spritesheet  [required]
  --cartridgePath         Path to existing cardridge  [required]
  --includeBanner         Include jspicl info in code
  --jsOutput              Path to JavaScript output
  --luaOutput             Path to LUA output
  --showStats             Display build stats
  --pipeOutputToConsole   Output console.log to terminal
  --reloadOnSave          Re-run cartridge when updated
  --polyfillTransform     Path to a module that exports a transformation method
  --customPicoPath        Path to PICO-8 executable
  --prettify              Format LUA code
  --watch                 Reload cartridge on rebuilds
```

In order to generate a cartridge you need to supply at least four mandatory options:

```Shell
jspicl-cli
  --input <entryfile.js>
  --output <outputFile.p8>
  --spritesheetImagePath <pathToSpriteSheetFile.png>
  --cartridgePath <pathToExistingCartridge.p8>
```

## Options
| Name                    | Type | Description |
|-------------------------|-|-|
| input                   | string  | Your game's entry point. This file can then import other modules. `[required]` |
| output                  | string  | Where to output the PICO-8 cardridge  `[required]` |
| spritesheetImagePath    | string  | Path to a spritesheet file. Only PNGs are supported.  `[required]` |
| cartridgePath           | string  | Path to an existing cardridge to reuse sound, music and state flags from. Normally you would point this to the generated cartridge so that you can save the assets directly and reuse them. `[required]`. |
| includeBanner           | boolean | Include a short comment at the very top of the generated LUA code that contains info about [jspicl](https://github.com/AgronKabashi/jspicl). Does not affect token count. |
| jsOutput                | string  | Where to output the flattened and transpiled JavaScript code. You may use this with [astexplorer](https://astexplorer.net) to inspect the AST, just make sure to select Esprima as the parser. For debugging purposes. |
| luaOutput               | string  | Where to output the transpiled LUA code. For debugging purposes. |
| showStats               | boolean | Display statistics about the generated cartridge. Useful for determining how much resources your game is using. |
| pipeOutputToConsole     | boolean | Output all console.log to terminal that launched PICO-8. For debugging purposes. |
| reloadOnSave            | boolean | Reload PICO-8 when the cartridge has been updated. |
| customPicoPath          | string  | Custom path to the PICO-8 executable. |
| prettify                | boolean | Format the generated LUA code. |
| watch                   |         | Runs the cartridge in PICO-8 and rebuilds it when the source files change. |

## Watch mode

The CLI will listen for changes when the `--watch` option is passed.

![](https://i.imgur.com/QYj4Xga.gif)

This applies for the spritesheet aswell. Simply update and save the image to reload to see your changes in PICO-8.

![](https://github.com/AgronKabashi/assets/raw/814f6efe24bc9aca5d9d6ca6259279733529e300/rollup-plugin-jspicl/spritesheetLiveReload.gif)

## Other `jspicl` related projects
* [jspicl](https://github.com/AgronKabashi/jspicl)
* [Games](https://github.com/topics/jspicl-sample)
