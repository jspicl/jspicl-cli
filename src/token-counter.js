// Each token is a word (e.g. variable name) or
// operator. Pairs of brackets, and strings count as 1 token.
// Commas, periods, LOCALs, semi-colons, ENDs, and comments are not counted.
/* eslint-disable no-multi-spaces */
const tokens = [
  "\"[^\"]*\"",       // Strings
  "\\d+\\.\\d+",      // floating numbers
  "\\w+",             // words
  "\\d+",             // numbers

  "!=",               // inequality
  "==",               // comparison
  "\\+=",             // incrementing assignment
  "-=",               // decrementing assignment
  "<=",               // equal or less than
  ">=",               // equal or greater than
  "\\.\\.",           // string concatenation

  "<",                // less than
  ">",                // greater than
  "\\+",              // addition
  "-",                // subtraction
  "\\/",              // division
  "\\*",              // multiplication
  "=",                // equals
  "\\%",              // percentage
  "\\(",              // paranthesis
  "\\[",              // left bracket
  "\\{"               // left curly brace
].join("|");

const regex = new RegExp(`(${tokens})`, "gi");

export function tokenCounter (luaCode) {
  return (luaCode.match(regex) || [])
    .filter(token => token !== "local" && token !== "end")
    .length;
}
