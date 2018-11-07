import runShell from "./runShell";

export default async () => {
	await runShell("babel", "src", "--out-dir", "lib", {
		env: {
			...process.env,
			BABEL_ENV: "production",
		},
	});
};
