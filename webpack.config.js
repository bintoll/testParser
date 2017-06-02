var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './bin/www',
    target: 'node',
    output: {
        filename: 'server.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets:[ 'es2015', 'react', 'stage-2' ]
                }
            },
            { test: /\.css$/, loader : 'style-loader!css-loader' },
        ]
    },
    resolve: {
        extensions: ['*', 'js', 'json']
    },
    externals: nodeModules
}