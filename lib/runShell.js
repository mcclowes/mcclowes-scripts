"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _child_process = require("child_process");

var R = _interopRequireWildcard(require("ramda"));

var collapseOptions = R.reduce(R.merge, {});
var partitionArgs = R.partition(R.is(Object));

var _default = function _default(cmd) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return new Promise(function (done) {
    var _partitionArgs = partitionArgs(rest),
        _partitionArgs2 = (0, _slicedToArray2.default)(_partitionArgs, 2),
        options = _partitionArgs2[0],
        args = _partitionArgs2[1];

    var child = (0, _child_process.spawn)(cmd, args, collapseOptions(options));
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on("close", done);
  });
};

exports.default = _default;