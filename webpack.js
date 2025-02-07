const path = require('path');
const fs = require('fs/promises');
const { exec } = require('child_process');

const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackObfuscator = require('webpack-obfuscator');
const jsdoc2md = require("jsdoc-to-markdown");

const packageJson = require('./package.json');
const license = require('./LICENSE');
const readme = require('./README.md');

const domain = 'sdk.geoflo.pro';
const id = 'geoflo';
const input = 'index.js';
const args = process.argv;
const mode = args[2];
const entry = path.resolve(__dirname, input);

const tutorials = {
	"basic": {
		"title": `Version ${packageJson.version}`
	}
};

const DISCLAIMER = `
/*! 
 * GeoFlo SDK
 * Version ${packageJson.version}
 * Generated on: ${new Date().toISOString()}
 * Copyright (c) 2022 - present | @solutegrate/geoflo
 */
`;

const HEADER = `
${DISCLAIMER}\n

<p align="center">
  <a href="https://projects.geoflo.pro?referer=docs.geoflo.pro">
    <img width="500" alt="GeoFlo Logo" src="https://geoflo.s3.amazonaws.com/logos/logo_full_white.png" />
  </a>
</p>

<h3 align="center">
  Professional Geospatial Management Library for Mapbox GL JS
</h3>
</br>
<p style="align-items: center; display: flex; flex-direction: row; justify-content: center;">
  <a style="margin:2px;color:transparent;" href="https://sdk.geoflo.pro/license.txt" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/License-MPL.svg?style=flat&label=License&color=333333" alt="MPL 2.0 License" />
  </a>
  <a style="margin:2px;color:transparent;" href="https://projects.geoflo.pro?referer=docs.geoflo.pro" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/GeoFlo-Projects.svg?color=6fafdb" alt="GeoFlo Projects" />
  </a>
  <a style="margin:2px;color:transparent;" href="https://docs.geoflo.pro/tutorial-basic.html" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/GeoFlo-Demo.svg?color=ff7676" alt="GeoFlo Demo" />
  </a>
  <a style="margin:2px;color:transparent;" href="https://sdk.geoflo.pro/geoflo.min.js" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/GeoFlo-v${packageJson.version}.svg?color=d7ef7e" alt="GeoFlo v${packageJson.version}" />
  </a>
</p>
`

console.log(`Building ${id} in ${mode} mode...`);

let options = {
	mode: mode,
	watch: false,
	devtool: mode === 'development' ? 'inline-source-map' : false,
	stats: { colors: true },
	entry: entry,
	output: {
		path: path.resolve(__dirname, mode === 'development' ? './dev' : './dist'),
		filename: mode === 'development' ? `${id}.js` : `${id}.min.js`,
		chunkFilename: mode === 'development' ? `[name].${id}.js` : `[name].${id}.min.js`,
		publicPath: mode === 'development' ? `/` : `https://${domain}/`
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			}
		]
	},
	resolve: { extensions: ['.json', '.js', '.jsx'] },
	plugins: [new webpack.BannerPlugin({ banner: DISCLAIMER.trim() })]
}

if (mode === 'production') {
	options.optimization = {
		splitChunks: { chunks: 'all' },
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
		})]
	}

	/* plugins.push(new HtmlWebpackPlugin({
		templateContent: ({ htmlWebpackPlugin }) => {
			const templatePath = path.resolve(__dirname, "node_modules/tui-jsdoc-template/tmpl/layout.tmpl");
			let template = fs.readFileSync(templatePath, "utf8");
			template = template.replace("<body>", `<body>${HEADER}`);
			return template;
		},
		filename: "index.html",
		inject: false
	})); */

	/* options.plugins.push(new WebpackObfuscator({
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
	})); */
}

(async function () {
	await fs.writeFile(path.join(options.output.path, 'README.md'), `${HEADER}\n\n${readme}`);
	webpack(options, build);
})()

async function build(err, stats) {
	if (err) return console.error('Error building:', err), process.exit(1);

	const data = await fs.readFile(path.join(options.output.path, options.output.filename), 'utf8');
	if (!data) return console.error('Error handling JS file');

	if (mode === 'development') return true;

	const css = await fs.readFile(path.resolve(__dirname, './index.css'), 'utf8');

	try {

		await fs.writeFile(path.join(options.output.path, options.output.filename), `${DISCLAIMER}\n${data}`);
		await fs.writeFile(path.join(options.output.path, 'license.txt'), license);		
		await fs.writeFile(path.resolve(__dirname, options.output.path + '/' + id + '.css'), css);
	} catch (error) {
		console.error('Error handling CSS file:', error);
	}

	await docs();
	return true;
}

async function docs() {
	const docsPath = path.resolve(__dirname, 'docs');
	const docsFolder = await fs.readdir(docsPath);
	const manifestFile = docsFolder.find(file => file.startsWith('manifest') && file.endsWith('.json'));

	try {
		await fs.writeFile(path.join(docsPath, 'tutorials', 'tutorial.json'), JSON.stringify(tutorials, null, 4));
		
		for (const file of docsFolder) {
			if (file.endsWith('.html')) {
				const filePath = path.join(docsPath, file);
				await fs.unlink(filePath); // Delete only .html files
				console.log(`Deleted file: ${filePath}`);
			}
		}

		console.log('Cleared .html files in the docs directory.');
	} catch (error) {
		console.error(`Error clearing .html files in docs directory: ${error.message}`);
	}

	try {
		await execPromise('npx jsdoc -X -c ./jsdoc.config.json > ./docs/jsdoc-output.json');
		console.log(`JSDoc JSON Complete`);
		
		await execPromise('npx jsdoc -c ./jsdoc.config.json');
		console.log(`JSDoc HTML Complete`);

		await generateMarkdownFile('GeoFlo');

		for (const file of docsFolder) {
			if (file.endsWith('.js.html')) {
				const filePath = path.join(docsPath, file);
				await fs.unlink(filePath); // Delete only .js.html files
				console.log(`Deleted file: ${filePath}`);
			} else if (file.endsWith('.html')) {
				let htmlContent = await fs.readFile(path.join(docsPath, file), 'utf8');
				//htmlContent = htmlContent.replace(/<title>.*<\/title>/, `<title>GeoFlo SDK</title>\n<link rel="manifest" href="./${manifestFile}">`);	
				htmlContent = htmlContent.replace("<body>", `<body>${HEADER}`);
				await fs.writeFile(path.join(docsPath, file), htmlContent, 'utf8');			
			}
		}
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

async function generateMarkdownFile(name) {
	return true;
	
	const outputPath = path.join('./docs/sdk', `${name}.md`);
	const sidebarItems = [{ type: "doc", id: `sdk/GeoFlo` }];

	let data = JSON.parse(await fs.readFile('./docs/jsdoc-output.json', 'utf8'));
	data.forEach((item) => { item.id = item.longname; });

	console.log(`\n📝 Generating Markdown for: ${name}`);
	
	// Generate Markdown for entire dataset
	let markdown = await jsdoc2md.render({ data: data });
	if (!markdown.trim()) console.warn(`⚠️ WARNING: Generated empty Markdown for ${name}`);

	// Write Markdown file
	await fs.writeFile(outputPath, markdown, "utf8");
	console.log(`📄 Markdown written: ${outputPath}`);

	// **Generate `sidebars.js`**
	console.log("🛠️ Generating sidebars.js...");

	const sidebarContent = `
		/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
		const sidebars = {
		docs: [
			{
			type: "category",
			label: "SDK",
			collapsed: false,
			items: ${JSON.stringify(sidebarItems, null, 2)},
			}
		],
		};

		module.exports = sidebars;
	`;

	await fs.writeFile(path.resolve(__dirname, 'docs', 'sidebars.js'), sidebarContent, 'utf8');
	console.log(`📄 Sidebar file created: ${path.resolve(__dirname, 'docs', 'sidebars.js')}`)
	console.log("✅ SDK documentation generation complete!");
}