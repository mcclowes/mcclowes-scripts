"use strict";

var _build = _interopRequireDefault(require("./build"));

var _format = _interopRequireDefault(require("./format"));

var _pack = _interopRequireDefault(require("./pack"));

var _start = _interopRequireDefault(require("./start"));

var _watch = _interopRequireDefault(require("./watch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const [_, __, cmd, subcmd] = process.argv;

const printCmds = () => console.error(`
ERR!
Valid commands:

$ build 
	builds everything from src -> lib

$ format [add]
	formats everything in the src dir
	[add] adds all files to git

$ pack
	builds everything in src using webpack

$ start
	builds everything from src -> lib, watches for changes, serves on a local server

$ watch 
	builds everything from src -> lib, watches for changes
`);

if (!cmd) {
  printCmds();
} else {
  const noop = () => {
    console.log(`${cmd} is an invalid command`);
    printCmds();
  };

  (({
    build: _build.default,
    format: _format.default,
    pack: _pack.default,
    start: _start.default,
    watch: _watch.default
  })[cmd] || noop)({
    cmd,
    subcmd
  });
}