import core, { addPlugin, } from "./core.webpack.config";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import * as R from "ramda";
import { BundleAnalyzerPlugin, } from "webpack-bundle-analyzer";
import CopyWebpackPlugin from "copy-webpack-plugin";
import webpack from "webpack";

const vendorChunkPlugins = [
	new webpack.optimize.CommonsChunkPlugin({
		name: "vendor",
		minChunks: Infinity,
	}),
];

const manifestChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: "manifest",
	minChunks: Infinity,
});

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
	analyzerMode: "static",
	openAnalyzer: false,
});
const hashModuleIdsPlugin = new webpack.HashedModuleIdsPlugin();

const uglifyJsPlugin = new UglifyJsPlugin({
	uglifyOptions: {
		ecma: 8,
		compress: {
			warnings: false,
			comparisons: false,
		},
		mangle: {
			safari10: true,
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

	addPlugin(hashModuleIdsPlugin),
	addPlugin(bundleAnalyzerPlugin),
	addPlugin(uglifyJsPlugin),
	addPlugin(environmentVariablesPlugin),
	addPlugin(CopyWebpackPlugin([ "public", ])),

	...vendorChunkPlugins.map(addPlugin),

	addPlugin(manifestChunkPlugin),
)(core);
