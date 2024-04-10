const path = require('path');
const fs = require('fs/promises');
const obfuscator = require('javascript-obfuscator');
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');

const id = 'geoflo';
const VER = 1;

var ver = 'v' + VER;
var sub = '.0';

const input = 'index.js';

const args = process.argv;
const prod = args[2]; 

const patch = prod !== 'true' ? prod : false;

if (patch) {
	var split = patch.split('.');

	if (split.length > 1) {
		if (Number(split[0]) > VER) throw new Error(ver + ' is the current version');

		ver = 'v' + split[0];
		sub = '.' + split[1] + '.' + (split[2] || '0');
	} else {
		throw new Error(ver + ' is the current version')
	}
}

const mode = prod ? 'production' : 'development';
const dest = prod ? 'dist' : 'dev';
const name = 'bundle' + (prod ? '.min.js' : '.js');

const obfuscate = false;
const target = 'browser';
const redirect = 'about:blank';
const domains = [];

const entry = path.resolve(__dirname, input);
const output = path.resolve(__dirname, dest);

const options = {
	devtool: 'source-map',
	mode: mode,
	watch: false,
	stats: { colors: true },
	entry: entry,
	output: { path: output, filename: name },
	resolve: { extensions: ['.json', '.js', '.jsx'] }
}

if (prod) options.optimization = {
	minimize: true,
	minimizer: [
		  new TerserPlugin({
			terserOptions: {
				ecma: undefined,
				parse: {},
				compress: {
					drop_console: true
				},
				mangle: true,
				output: null,
				format: null,
				toplevel: false,
				nameCache: null,
				keep_classnames: true,
				keep_fnames: false,
			}
		})
	]
}

webpack(options, build);

async function build(err, stats) {
    if (err) return console.log(err);

	const bundle = `./${dest}/${name}`;
	const data = await fs.readFile(bundle, 'utf8');
	if (!data) return false;

	const docs = await import('documentation');

	docs.build(['index.js']).then(docs.formats.html).then(output => {
		fs.writeFile('./docjs/output.html', output);
	});

	if (prod) {
		const css = await fs.readFile('./index.css', 'utf8');

		if (patch) {
			await fs.writeFile('./' + ver + '/' + id + '@' + ver + sub + '.css', css);
			await fs.writeFile('./' + ver + '/' + id + '@' + ver + sub + '.min.js', data);
		} else {
			await fs.writeFile('./' + id + '@' + ver + '.css', css);
			await fs.writeFile('./' + id + '@' + ver + '.min.js', data);
		}
	}

	if (obfuscate) await secure(data);
}

async function secure (data) {
	if (!data) return false;
	const output = `./${dest}/bundle.obf.js`;

	const opt = {
		domainLock: domains,
		target: target,
		compact: true,
		selfDefending: true,
		controlFlowFlattening: true,
		controlFlowFlatteningThreshold: 0.4,
		numbersToExpressions: true,
		simplify: true,
		stringArrayShuffle: true,
		splitStrings: true,
		stringArrayThreshold: 1,
		domainLockRedirectUrl: redirect,
		disableConsoleOutput: true
	}

	const obfuscated = obfuscator.obfuscate(data, opt);
	await fs.writeFile(output, obfuscated.getObfuscatedCode());
}

async function prepare(path, options) {
	const root = dest;
	const sub = options.sub;
	const output = root + sub + options.file;

	const exclude = (await fs.stat(path)).isDirectory();
	if (exclude) { return false }

	const data = await fs.readFile(path, 'utf8')
	if (!data) { return false }

	options.compress ? await compress(output, data, options) : false;
	await write(output, data, options);
}

async function compress(output, data, options) {
	const ext = '.min.' + options.ext;
	const dest = output.replace('.' + options.ext, ext);

	if (options.compress) {
		var min = ugli.minify(data);
		await write(dest, min.code, options);
	}
}

async function write(path, data, options) {
	await fs.writeFile(path, data);
}