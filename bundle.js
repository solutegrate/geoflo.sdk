const path = require('path');
const fs = require('fs/promises');
const { exec } = require('child_process');
const webpack = require('webpack');

const TerserPlugin = require("terser-webpack-plugin");

const id = 'geoflo-sdk';
const input = 'index.js';
const args = process.argv;
const prod = args[2];
const folder = prod ? 'dist' : 'dev';
const mode = prod ? 'production' : 'development';
const name = `${id}.min.js`;

const entry = path.resolve(__dirname, input);
const output = path.resolve(__dirname, folder);
const docs = path.resolve(__dirname, './docs');

webpack({
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
	optimization: prod ? {
		minimize: true,
		minimizer: [
			new TerserPlugin({
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
			})
		]
	} : {}
}, build);

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