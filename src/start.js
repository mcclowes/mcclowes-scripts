import path from "path";

import runShell from "./runShell";

export default async () => {
	await runShell(
		"webpack-dev-server",
		"--open",
		"--config",
		path.resolve(__dirname, "webpack/dev.webpack.config.js"),
		"--color",
	);
};
