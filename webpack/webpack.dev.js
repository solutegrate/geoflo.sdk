const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dev'),
        filename: 'geoflo-sdk.js',
    },
    watch: true,
    devtool: 'inline-source-map', // Easier debugging in development
});
