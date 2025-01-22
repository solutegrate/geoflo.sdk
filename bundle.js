const path = require('path');
const fs = require('fs/promises');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const id = 'geoflo-sdk';
const folder = 'dist';
const input = 'index.js';
const args = process.argv;
const prod = args[2];
const mode = prod ? 'production' : 'development';
const name = `${id}.min.js`;

const entry = path.resolve(__dirname, input);
const output = path.resolve(__dirname, folder);

bundle();

async function bundle() {
	//const plugins = [ new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [ path.join(output, `${id}.*.js`) ] }) ];

	const options = {
		mode: mode,
		watch: false,
		stats: { colors: true },
		entry: entry,
		output: {
			path: output,
			filename: name,
			publicPath: '/'
		},
		resolve: { extensions: ['.json', '.js', '.jsx'] },
		plugins: plugins
	};

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

	webpack(options, async (err, stats) => await build(err, stats));
}

async function build(err, stats) {
    if (err) return console.error('Error building:', err);

	const data = await fs.readFile(path.join(output, name), 'utf8');
	if (!data) return console.error('Error handling JS file');

	try {
		const css = await fs.readFile(path.resolve(__dirname, './index.css'), 'utf8');		
		await fs.writeFile(path.resolve(__dirname, folder + '/' + id + '.css'), css);
	} catch (error) {
		console.error('Error handling CSS file:', error);
	}
}