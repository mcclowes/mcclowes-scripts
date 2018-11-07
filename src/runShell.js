import { spawn, } from "child_process";
import * as R from "ramda";

const collapseOptions = R.reduce(R.merge, {});
const partitionArgs = R.partition(R.is(Object));

export default (cmd, ...rest) =>
	new Promise(done => {
		const [ options, args, ] = partitionArgs(rest);

		const child = spawn(cmd, args, collapseOptions(options));

		child.stdout.pipe(process.stdout);
		child.stderr.pipe(process.stderr);

		child.on("close", done);
	});
