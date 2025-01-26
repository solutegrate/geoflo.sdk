const path = require('path');
const fs = require('fs/promises');
const { exec } = require('child_process');
const webpack = require('webpack');
const packageJson = require('./package.json');
const TerserPlugin = require("terser-webpack-plugin");
var WebpackObfuscator = require('webpack-obfuscator');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const domain = 'sdk.geoflo.pro';
const id = 'geoflo-sdk';
const input = 'index.js';
const args = process.argv;
const entry = path.resolve(__dirname, input);
const docs = path.resolve(__dirname, './docs');

const DISCLAIMER = `
/*! 
 * GeoFlo SDK - Version ${packageJson.version}
 * Generated on: ${new Date().toISOString()}
 * 
 * DISCLAIMER:
 * This software is the property of Solutegrate/GeoFlo. Unauthorized copying, 
 * distribution, modification, or any use outside of licensed terms is strictly prohibited.
 * Violators may be subject to legal actions.
 */
`

let mode = args[2];
let options = getOptions(mode);

if (mode) webpack(options, build);

async function getOptions(mode) {
	if (!mode) return console.error('No mode specified.'), process.exit(1);
	
	let options = {
        mode,
        watch: false,
        stats: { colors: true },
        entry,
        output: {
            path: path.resolve(__dirname, mode === 'development' ? './dev' : './dist'),
            filename: mode === 'development' ? `${id}.js` : `${id}.min.js`,
            publicPath: '/'
        },
        resolve: { extensions: ['.json', '.js', '.jsx'] },
        plugins: [new webpack.BannerPlugin({ banner: DISCLAIMER.trim() })]
    };

	if (mode === 'development') {
		options.watch = true;
        options.devtool = 'inline-source-map';
	} else {
        options.watch = false;
        options.devtool = false;

		options.optimization = {
            minimize: true,
            minimizer: [new TerserPlugin({
				terserOptions: {
					ecma: undefined,
					parse: {},
					compress: { drop_console: true },
					mangle: true,
					output: null,
					format: null,
					toplevel: false,
					nameCache: null,
					keep_classnames: true,
					keep_fnames: false,
				}
			})],
            splitChunks: { chunks: 'all' }
        }

		//options.plugins.push(new MiniCssExtractPlugin({ filename: `${id}.css` }));

		options.plugins.push(new WebpackObfuscator({
			target: 'browser',
			compact: true,
			selfDefending: true,
			controlFlowFlattening: true,
			controlFlowFlatteningThreshold: 0.4,
			numbersToExpressions: true,
			simplify: true,
			stringArrayShuffle: true,
			splitStrings: true,
			stringArrayThreshold: 1,
			rotateStringArray: true,
			disableConsoleOutput: true,
		}));
    }

	return options
}

async function build(err, stats) {
	if (err) return console.error('Error building:', err);

	const data = await fs.readFile(path.join(options.output.path, options.output.filename), 'utf8');
	if (!data) return console.error('Error handling JS file');

	if (mode === 'development') return true;

	try {
		const css = await fs.readFile(path.resolve(__dirname, './index.css'), 'utf8');		
		await fs.writeFile(path.resolve(__dirname, options.output.path + '/' + id + '.css'), css);
	} catch (error) {
		console.error('Error handling CSS file:', error);
	}

	try {
		const htmls = await fs.readdir(docs);
		
		for (const file of htmls) {
			if (file.endsWith('.html')) {
				const filePath = path.join(docs, file);
				await fs.unlink(filePath); // Delete only .html files
				console.log(`Deleted file: ${filePath}`);
			}
		}

		console.log('Cleared .html files in the docs directory.');
	} catch (error) {
		console.error(`Error clearing .html files in docs directory: ${error.message}`);
	}

	try {
		const jsdocs = await execPromise('npx jsdoc -c ./jsdoc.config.json');
		console.log(`JSDoc Complete ${jsdocs}`);
	} catch (error) {
		console.error(`Error generating JSDoc ${error.message}`);
	}

	return true;
}

function execPromise(command) {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				return reject(new Error(`Error: ${error.message}\n${stderr}`));
			}
			resolve(stdout);
		});
	});
}