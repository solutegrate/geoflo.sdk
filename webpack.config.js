const devConfig = require('./webpack/webpack.dev');
const prodConfig = require('./webpack/webpack.prod');

const mode = process.env.NODE_ENV || 'development';

let config;

if (mode === 'production') {
    config = prodConfig;
} else {
    config = devConfig;
}

module.exports = config;
