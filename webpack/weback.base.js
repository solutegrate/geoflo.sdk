const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageJson = require('../package.json');

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
`;

module.exports = {
    entry: path.resolve(__dirname, '../index.js'),
    output: {
        publicPath: '/',
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx'],
    },
    plugins: [
        new webpack.BannerPlugin({ banner: DISCLAIMER.trim() }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
};
