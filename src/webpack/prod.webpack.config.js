import * as R from "ramda";
import CopyWebpackPlugin from "copy-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import core, { addConfig, } from "./core.webpack.config";
import webpack from "webpack";
import { BundleAnalyzerPlugin, } from "webpack-bundle-analyzer";

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerMode: "static",
  openAnalyzer: false,
});

const hashModuleIdsPlugin = new webpack.HashedModuleIdsPlugin();

const uglifyJsPlugin = new UglifyJsPlugin({
  uglifyOptions: {
    minimize: false,
    ecma: 8,
    compress: {
      warnings: false,
      comparisons: false,
    },
    output: {
      comments: false,
      ascii_only: true,
    },
  },
  parallel: true,
  cache: true,
  sourceMap: true,
});

const environmentVariablesPlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: "\"production\"",
  },
});

module.exports = R.pipe(
  R.assoc("bail", true),
  //addConfig('mode', 'production'),

  addConfig('plugins', hashModuleIdsPlugin),
  addConfig('plugins', bundleAnalyzerPlugin),
  addConfig('plugins', uglifyJsPlugin),
  addConfig('plugins', environmentVariablesPlugin),
  addConfig('plugins', new CopyWebpackPlugin([ "public", ])),

  addConfig('externals', 'child_process'),
  addConfig('externals', 'fs'),
)(core);
