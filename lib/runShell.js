"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _child_process = require("child_process");

var R = _interopRequireWildcard(require("ramda"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const collapseOptions = R.reduce(R.merge, {});
const partitionArgs = R.partition(R.is(Object));

var _default = (cmd, ...rest) => new Promise(done => {
  const [options, args] = partitionArgs(rest);
  const child = (0, _child_process.spawn)(cmd, args, collapseOptions(options));
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.on("close", done);
});

exports.default = _default;