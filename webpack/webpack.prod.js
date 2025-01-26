const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const { exec } = require('child_process');
const fs = require('fs/promises');
const baseConfig = require('./webpack.base.js');
const packageJson = require('../package.json');

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: `geoflo-sdk-v${packageJson.version}.min.js`,
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
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
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `geoflo-sdk-v${packageJson.version}.css`,
        }),
        new WebpackObfuscator({
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
        }),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tapPromise('DocsHandlerPlugin', async () => {
                    const docsDir = path.resolve(__dirname, '../docs');

                    try {
                        // Delete old HTML files in the docs directory
                        const htmlFiles = await fs.readdir(docsDir);
                        for (const file of htmlFiles) {
                            if (file.endsWith('.html')) {
                                const filePath = path.join(docsDir, file);
                                await fs.unlink(filePath);
                                console.log(`Deleted file: ${filePath}`);
                            }
                        }
                        console.log('Cleared .html files in the docs directory.');

                        // Generate new documentation
                        const jsdocOutput = await execPromise('npx jsdoc -c ../jsdoc.config.json');
                        console.log(`JSDoc Complete: ${jsdocOutput}`);
                    } catch (error) {
                        console.error(`Error handling docs: ${error.message}`);
                    }
                });
            }
        }
    ],
});

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