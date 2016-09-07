'use strict';
const webpack = require('webpack');
const webpackSources = require('webpack-sources');
const enhancedResolve = require('enhanced-resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');



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
        });

        // This is an example of using the webpack-sources library. Webpack has a set of Tapable classes all inheriting from MainTemplate and Template. 
        // Any file in webpack/webpack/lib that ends in Template, is a custom plugin meant for applying the "shape" of the output bundle/chunk.
        // webpack-sources is a collection of OOP Classes that lets you modify source content in a controlled manner. 
        // There are lots of options so check out the npm modules. ====> https://github.com/webpack/webpack-sources <====
        // 
        compilation.moduleTemplate.plugin("render", function(source) {
          // Important to note that any "render" event on a Template class must return the new source value. 

          // The source.source() is unwrapping another source class (found in webpack-souraces),
          // and returning the raw string. We can use that variable inside of other Source subclasses like ConcatSource. 
          let content = source.source();

          return new webpackSources.ConcatSource('/*I WILL BE IN FRONT OF THE MODULE TEMPLATE*/', content, '/*I WILL BE IN THE END OF THE MODULE TEMPLATE*/');
        });

        compilation.mainTemplate.plugin("render", function(source) {
          let content = source.source();

          return new webpackSources.ConcatSource('/*I WILL BE IN FRONT OF THE MAIN TEMPLATE*/', content, '/*I WILL BE IN THE END OF THE MAIN TEMPLATE*/');
        });
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
