'use strict';
let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'car': './app/car.js'
  },
  output: {
    path: './dist',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      // We are chianing the custom loader to babel loader. 
      // Purely optional but know that the `first` loader in the chain (babel in this case)
      // must always return JavaScript (as it is then processed into the compilation)
      { test: /\.js$/, loaders: ['babel', 'custom-loader'] }
    ]
  },
  // This allows us to add resolving functionality for our custom loader
  // It's used just like the resolve property and we are referencing the 
  // custom loader file.
  resolveLoader: {
    alias: {
      "custom-loader": require.resolve('./custom-loader')
    }
  },
  plugins: [
    // This function is the `apply` function if you were to create an external plugin
    // Having it inline provides some nice conviences for debugging and development
    function() {
      var compiler = this;
      compiler.plugin("compilation", function(compilation) {
        compilation.plugin("after-optimize-modules", function(modules) {
          // debugger;
        });
        compilation.plugin("after-optimize-chunks", function(chunks) {
          // debugger;
        })
      });
    },
    new HtmlWebpackPlugin({
      template: './app/index.html'
    })
  ],

  resolve: {
    root: [ path.join(__dirname, 'app') ],
    extensions: ['', '.js']
  },
  debug: true,
  devtool: false
};
