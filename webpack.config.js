const devConfig = require('./webpack/webpack.dev.js');
const prodConfig = require('./webpack/webpack.prod.js');

const mode = process.env.NODE_ENV || 'development';

let config;
if (mode === 'production') {
    config = prodConfig;
} else {
    config = devConfig;
}

module.exports = config;
