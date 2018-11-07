import runShell from "./runShell";

export default async () => {
	await runShell("babel", "--watch", "src", "--out-dir", "lib", {
		env: {
			...process.env,
			BABEL_ENV: "development",
		},
	});
};
