import core, { addPlugin, packageJSON, } from "./core.webpack.config";
import webpack from "webpack";
import * as R from "ramda";

module.exports = R.pipe(
	R.assoc("devtool", "cheap-eval-source-map"),

	R.dissocPath([ "entry", "vendor", ]),

	R.assoc("devServer", {
		compress: true,
		contentBase: "./build",
		historyApiFallback: true,
		host: "0.0.0.0",
		overlay: true,
		port: packageJSON.port || 3000,
		progress: true,
		stats: "minimal",
	}),

	R.assocPath([ "output", "filename", ], "static/js/[name].bundle.js"),

	addPlugin(new webpack.NamedModulesPlugin()),
)(core);
