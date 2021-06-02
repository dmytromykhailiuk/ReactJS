const { merge } = require('webpack-merge');
const commonConfig = require('./config/webpack.config.common');
const devConfig = require('./config/webpack.config.dev');
const prodConfig = require('./config/webpack.config.prod');

module.exports = merge(commonConfig, process.env.NODE_ENV === 'development' ? devConfig : prodConfig);
