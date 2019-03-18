"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.packageJSON = exports.addPlugin = exports.addLoader = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _webpackManifestPlugin = _interopRequireDefault(require("webpack-manifest-plugin"));

var _simpleProgressWebpackPlugin = _interopRequireDefault(require("simple-progress-webpack-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = _fs.default.realpathSync(process.cwd());

const resolveApp = relativePath => _path.default.resolve(appDirectory, relativePath);

const addLoader = loader => R.over(R.lensPath(["module", "rules"]), R.append(loader));

exports.addLoader = addLoader;

const addPlugin = plugin => R.over(R.lensProp("plugins"), R.append(plugin));

exports.addPlugin = addPlugin;

const packageJSON = require(resolveApp("package.json"));

exports.packageJSON = packageJSON;
var _default = {
  entry: {
    app: "./src/index.js",
    vendor: Object.keys(packageJSON.dependencies) || []
  },
  output: {
    filename: "static/js/[name].[chunkhash].bundle.js",
    path: resolveApp("build/"),
    publicPath: "/"
  },
  resolve: {
    modules: ["node_modules", resolveApp("node_modules"), resolveApp(".")]
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "shebang-loader"
    }, {
      test: /\.js$/,
      enforce: "pre",
      include: resolveApp("src"),
      use: [{
        loader: require.resolve("eslint-loader"),
        options: {
          extends: [require.resolve("eslint-config-mcclowes")]
        }
      }]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          presets: ["mcclowes"],
          forceEnv: "production"
        }
      }
    }, {
      test: /\.js$/,
      include: /node_modules/,
      use: {
        loader: require.resolve("thread-loader")
      }
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }, {
      test: /\.(jpg|jpeg|gif|png|ico)$/,
      exclude: /node_modules/,
      loader: "file-loader",
      options: {
        name: "[path][name].[ext]?[hash]"
      }
    }, {
      test: /\.svg$/,
      exclude: /node_modules/,
      loader: "svg-inline-loader"
    }, {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: require.resolve("graphql-tag/loader")
    }, {
      test: /\.md$/,
      use: [{
        loader: require.resolve("html-loader")
      }, {
        loader: require.resolve("markdown-loader")
      }]
    }]
  },
  plugins: [// Generates an `index.html` file with the <script> injected.
  new _htmlWebpackPlugin.default({
    inject: true,
    filename: "index.html",
    title: packageJSON.name,
    template: resolveApp("public/index.html"),
    hash: true,
    minify: {//removeComments: true,
      //collapseWhitespace: true,
      //removeRedundantAttributes: true,
      //useShortDoctype: true,
      //removeEmptyAttributes: true,
      //removeStyleLinkTypeAttributes: true,
      //keepClosingSlash: true,
      //minifyJS: true,
      //minifyCSS: true,
      //minifyURLs: true,
    }
  }), new _webpackManifestPlugin.default({
    fileName: "asset-manifest.json"
  }), new _webpack.default.ProvidePlugin({
    R: "ramda",
    React: "react",
    plog: "codogo-plog",
    Consts: resolveApp("src/consts")
  }), new _webpack.default.IgnorePlugin(/^\.\/locale$/, /moment$/), new _simpleProgressWebpackPlugin.default({
    format: "compact"
  })]
};
exports.default = _default;