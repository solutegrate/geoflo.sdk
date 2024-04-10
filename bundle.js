const path = require('path');
const fs = require('fs/promises');
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');

const id = 'mapboxgl-geoflo';
const input = 'index.js';
const args = process.argv;
const prod = args[2];
const mode = prod ? 'production' : 'development';
const dest = prod ? 'dist' : 'dev';
const name = id + (prod ? '.min.js' : '.js');

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
}