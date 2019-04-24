import * as R from "ramda";
import fs from "fs";
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin";

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export const addLoader = ( loader ) => { return R.over(R.lensPath([ "module", "rules", ]), R.append(loader)); }

export const addPlugin = ( plugin ) => { return R.over(R.lensProp("plugins"), R.append(plugin)); }

export const addConfig = (key, config) => { return R.over(R.lensProp(key), R.append(config)); }

export const packageJSON = require(resolveApp("package.json"));

const config = {
	'entry': {
		app: "./src/index.js",
		vendor: Object.keys(packageJSON.dependencies) || [],
	},
	'output': {
		filename: "static/js/[name].[chunkhash].bundle.js",
		path: resolveApp("build/"),
		publicPath: "/",
	},
	'resolve': {
		modules: [ "node_modules", resolveApp("node_modules"), resolveApp("."), ],
	},
	'module': {
		'rules': [
			{
				test: /\.js$/,
				loader: "shebang-loader",
			},
			//{
				//test: /\.js$/,
				//enforce: "pre",
				//include: resolveApp("src"),
				//use: [
					//{
						//loader: require.resolve("eslint-loader"),
						//options: {
							//extends: [ require.resolve("eslint-config-mcclowes"), ],
						//},
					//},
				//],
			//},

			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: require.resolve("babel-loader"),
					options: {
						presets: [ "mcclowes", ],
						envName: "production",
					},
				},
			},

			{
				test: /\.js$/,
				include: /node_modules/,
				use: {
					loader: require.resolve("thread-loader"),
				},
			},

			{
				test: /\.css$/,
				use: [ "style-loader", "css-loader", ],
			},

			{
				test: /\.(jpg|jpeg|gif|png|ico)$/,
				exclude: /node_modules/,
				loader: "file-loader",
				options: {
					name: "[path][name].[ext]?[hash]",
				},
			},

			{
				test: /\.svg$/,
				exclude: /node_modules/,
				loader: "svg-inline-loader",
			},

			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: require.resolve("graphql-tag/loader"),
			},

			{
				test: /\.md$/,
				use: [
					{
						loader: require.resolve("html-loader"),
					},
					{
						loader: require.resolve("markdown-loader"),
					},
				],
			},
		],
	},
	'plugins': [
		// Generates an `index.html` file with the <script> injected.
		new HtmlWebpackPlugin({
			inject: true,
			filename: "index.html",
			title: packageJSON.name,
			template: resolveApp("public/index.html"),
			hash: true,
			minify: {
				//removeComments: true,
				//collapseWhitespace: true,
				//removeRedundantAttributes: true,
				//useShortDoctype: true,
				//removeEmptyAttributes: true,
				//removeStyleLinkTypeAttributes: true,
				//keepClosingSlash: true,
				//minifyJS: true,
				//minifyCSS: true,
				//minifyURLs: true,
			},
		}),

		new ManifestPlugin({
			fileName: "asset-manifest.json",
		}),

		new webpack.ProvidePlugin({
			R: "ramda",
			React: "react",
			plog: "codogo-plog",
			Consts: resolveApp("src/consts"),
		}),

		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

		new SimpleProgressWebpackPlugin({ format: "compact", }),
	],
};

export default config
