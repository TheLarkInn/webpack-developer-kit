'use strict';
// Plugins and extra supporting libs for webpack you might want to extend in your labratory! 😍
// const webpack = require('webpack');
// const memoryFs = require('memory-fs');
// const webpackSources = require('webpack-sources');
// const enhancedResolve = require('enhanced-resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/**
 * @description
 * Typedef's so that you can access type
 * intellisense for each class and instance
 * inside of your hooks and parameters
 *
 * Use @typedef and `import("webpack/lib/WhateverClass")` if you want to pull in a class and its properties from webpack!!!
 *
 */
const welcome = 'webpack-developer-kit';
console.log(welcome);
/** @typedef {import("webpack/lib/Compiler")} Compiler */
/** @typedef {import("webpack/lib/Compilation")} Compilation */
/** @typedef {import("webpack/lib/NormalModule")} NormalModule */
/** @typedef {import("webpack/lib/ContextModule")} ContextModule */
/** @typedef {import("webpack/lib/NormalModuleFactory")} NormalModuleFactory */
/** @typedef {import("webpack/lib/ContextModuleFactory")} ContextModuleFactory */
/** @typedef {import("webpack/lib/Module")} Module */
/** @typedef {import("webpack/lib/Chunk")} Chunk */
/** @typedef {import("webpack/lib/ChunkGroup")} ChunkGroup */
/** @typedef {import("webpack/lib/Dependency")} Dependency */
/** @typedef {{normalModuleFactory: NormalModuleFactory, contextModuleFactory: ContextModuleFactory, compilationDependencies: Set<Dependency>}} CompilationParams */

module.exports = {
  entry: {
    car: ['./app/car.js'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      // We are chaining the custom loader to babel loader.
      // Purely optional but know that the `first` loader in the chain (babel in this case)
      // must always return JavaScript (as it is then processed into the compilation)
      {
        test: /\.js$/,
        oneOf: [
          {
            loaders: ['babel-loader', 'custom-loader'],
          },
        ],
      },
    ],
  },
  // This allows us to add resolving functionality for our custom loader
  // It's used just like the resolve property and we are referencing the
  // custom loader file.
  resolveLoader: {
    alias: {
      'custom-loader': require.resolve('./custom-loader'),
    },
  },
  plugins: [
    // This function is the `apply` function if you were to create an external plugin
    // Having it inline provides some nice conviences for debugging and development
    function apply() {
      /** @type {Compiler} */
      var compiler = this;
      compiler.hooks.compilation.tap('MyCustomInlinePlugin', compilationTapFunction);
    },
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
  ],
  devtool: false,
  mode: 'none',
};

/**
 * @param {Compilation} compilation
 * @param {CompilationParams} params
 */
function compilationTapFunction(compilation, { normalModuleFactory, contextModuleFactory, _compilationDependencies }) {
  compilation.hooks.afterOptimizeModules.tap('MyCustomInlinePlugin', modulesTapFunction);
  compilation.hooks.afterOptimizeChunks.tap('MyCustomInlinePlugin', chunksTapFunction);

  // Inline Tap Functions for ModuleFactories
  normalModuleFactory.hooks.beforeResolve.tapAsync('MyCustomInlinePlugin', (_data, cb) => {
    // debugger;
    cb();
  });
  contextModuleFactory.hooks.afterResolve.tapAsync('MyCustomInlinePlugin', (_data, cb) => {
    // debugger;
    cb();
  });
}

/**
 * `afterOptimizeModules` tap function
 * @param {(Module|ContextModule|NormalModule)[]} _modules
 */
function modulesTapFunction(_modules) {
  // debugger;
  // uncomment the statement above and run the debug script to explore the data in this function/hook/tap
}

/**
 * `afterOptimizeModules` tap function
 * @param {Chunk[]} _chunks
 * @param {ChunkGroup[]} _chunkGroups
 */
function chunksTapFunction(_chunks, _chunkGroups) {
  // debugger;
  // uncomment the statement above and run the debug script to explore the data in this function/hook/tap
}
