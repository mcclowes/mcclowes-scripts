import path from "path";

import runShell from "./runShell";

export default async () => {
	await runShell(
		"webpack",
		"--config",
		path.resolve(__dirname, "webpack/prod.webpack.config.js"),
		"--color",
	);
};
