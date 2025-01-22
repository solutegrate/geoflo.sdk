const path = require('path');
const fs = require('fs/promises');
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
}, async function (err, stats) {
	if (err) return console.error('Error building:', err);

	const data = await fs.readFile(path.join(output, name), 'utf8');
	if (!data) return console.error('Error handling JS file');

	try {
		const css = await fs.readFile(path.resolve(__dirname, './index.css'), 'utf8');		
		await fs.writeFile(path.resolve(__dirname, folder + '/' + id + '.css'), css);
	} catch (error) {
		console.error('Error handling CSS file:', error);
	}

	exec('node_modules/.bin/jsdoc -c ./jsdoc.config.json', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generating JSDoc: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`JSDoc STDERR: ${stderr}`);
        }

        console.log(`JSDoc Complete`);
    });
});