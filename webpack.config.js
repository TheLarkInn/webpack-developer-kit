'use strict';
let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry: {
    'car.prod': './app/car.js'
  },
  output: {
    path: './dist',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel', 'custom-loader'] }
    ]
  },
  resolveLoader: {
    alias: {
      "custom-loader": require.resolve('./custom-loader')
    }
  },
  plugins: [
    function() {
      var compiler = this;

      compiler.plugin("compilation", function(compilation) {
        compilation.plugin("optimize-modules", function(modules) {
          debugger;
        });
      });
    }
  ],

  resolve: {
    root: [ path.join(__dirname, 'app') ],
    extensions: ['', '.js']
  },

  devtool: false
};
