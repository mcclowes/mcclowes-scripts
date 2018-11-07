import build from "./build";
import format from "./format";
import pack from "./pack";
import start from "./start";
import watch from "./watch";

const [ _, __, cmd, subcmd, ] = process.argv;

const printCmds = () =>
	console.error(`
ERR!
Valid commands:

$ build 
	builds everything from src -> lib

$ format [add]
	formats everything in the src dir
	[add] adds all files to git

$ pack
	builds everything in src using webpack

$ start
	builds everything from src -> lib, watches for changes, serves on a local server

$ watch 
	builds everything from src -> lib, watches for changes
`);

if (!cmd) {
	printCmds();
} else {
	const noop = () => {
		console.log(`${ cmd } is an invalid command`);
		printCmds();
	};

	(({
		build,
		format,
		pack,
		start,
		watch,
	}[cmd] || noop)({ cmd, subcmd, }));
}
