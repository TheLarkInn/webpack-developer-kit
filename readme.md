# webpack Developer Kit
Super lightweight boilerplate tailored to help developers understand how to create custom loaders and plugins. 

## Requirements
* Node 6.3 or higher (for native `node --inspect`)

## Usage
Fork and clone this repo and then run `npm install`

## NPM Scripts
There are two scripts that are setup already: 

* `npm run build`
	* will simply execute a webpack build in the repo

* `npm run debug`
	* will run the same build with node debugger.
	* paste provided link in Chrome (or Canary), and you will have the super incredible ChromeDevTools to step through your code for learning, exploration, and debugging. 

## Whats in the config?
You will notice two things that are setup already for you that should assist in learning to rapidly write custom plugins and loaders. 

1. An `inline` webpack plugin already defined. You can use an anon. function inside of the plugins array which will then allow you to `plugin` to the `compiler` instance (which is `this`):
 
```javascript
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
    }
  ]
```

2. A `custom-loader` in the project root, and configuration for resolving it so you can use. Loaders by default automatically resolve from `node_modules` and therefore the `resolveLoader` property on the config allows you to have an `alias`'d resolve for that loader so you can work on it right in your project. (Much easier than creating a npm module, npm link and npm link module-name):

```javascript
module.exports = loader;

function loader(source) {
  console.log(source);
  debugger; 
  return source;
}
```

## Helpful resources: 
* [How to write a webpack loader](https://webpack.github.io/docs/how-to-write-a-loader.html)
* [How to write a plugin](https://github.com/webpack/docs/wiki/How-to-write-a-plugin)
* [Webpack Plugin API](https://webpack.github.io/docs/plugins.html)

## Questions, issues, comments? 
> Sean, I have a great suggestion for this repo, or notice a bug: 
Submit an [issue](https://github.com/TheLarkInn/webpack-developer-kit/issues/new) or a [pull request](https://github.com/TheLarkInn/webpack-developer-kit/compare) for the feature. If I don't respond in a few days, tag me @TheLarkInn or [tweet me](https://twitter.com/TheLarkInn) at the same name (I'm terrible with email notifications).

> Sean, I want to know how to do this, or that with a loader or plugin
Please submit an issue to [the webpack core repository](https://github.com/webpack/webpack/issues/new). Most times, if you are trying to write a custom loader or plugin, one of the contributors or @Sokra, or myself will be able to provide you with guidance. Plus, if it is an undocumented, or poorly documented feature, then we will tag it as documentation and move a copy of it over to our [new docs page](https://github.com/webpack/webpack.io) (Or even better if you find out you can submit a PR to our doc page.)

