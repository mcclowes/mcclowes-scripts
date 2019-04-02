"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _build = _interopRequireDefault(require("./build"));

var _format = _interopRequireDefault(require("./format"));

var _pack = _interopRequireDefault(require("./pack"));

var _start = _interopRequireDefault(require("./start"));

var _watch = _interopRequireDefault(require("./watch"));

var _process$argv = (0, _slicedToArray2.default)(process.argv, 4),
    _ = _process$argv[0],
    __ = _process$argv[1],
    cmd = _process$argv[2],
    subcmd = _process$argv[3];

var printCmds = function printCmds() {
  return console.error("\nERR!\nValid commands:\n\n$ build \n\tbuilds everything from src -> lib\n\n$ format [add]\n\tformats everything in the src dir\n\t[add] adds all files to git\n\n$ pack\n\tbuilds everything in src using webpack\n\n$ start\n\tbuilds everything from src -> lib, watches for changes, serves on a local server\n\n$ watch \n\tbuilds everything from src -> lib, watches for changes\n");
};

if (!cmd) {
  printCmds();
} else {
  var noop = function noop() {
    console.log("".concat(cmd, " is an invalid command"));
    printCmds();
  };

  (({
    build: _build.default,
    format: _format.default,
    pack: _pack.default,
    start: _start.default,
    watch: _watch.default
  })[cmd] || noop)({
    cmd: cmd,
    subcmd: subcmd
  });
}