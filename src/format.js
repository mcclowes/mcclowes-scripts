import runShell from "./runShell";

export default async ({ subcmd, }) => {
	console.log("eslint js");
	
	await runShell("./node_modules/.bin/eslint", "--color", "--fix", "src");

	if (subcmd === "add") {
		await runShell("git add -u");
	}
};
