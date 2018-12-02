# 00 Boilerplate

In this sample we are going to setup a web project that can be easily managed
by webpack.

We won't install anything related to Vue.js, just some basic plumbing.

We will setup an initial <abbr title="Node.js package manager, a package manager for the JavaScript runtime environment Node.js">npm</abbr> project and give support to TypeScript. Then we will create a **helloworld.ts** sample.

Summary steps:

- Prerequisites: Install Node.js
- Initialize **package.json** (with `npm init`)
- Install:
    - Webpack and webpack-dev-server.
    - TypeScript.
    - Bootstrap.
- Setup **webpack.config.js**
- Create a test js file.
- Create a simple HTML file.

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.x.x or higher) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Create and navigate to the folder where you are going to create the empty project.

- Execute `npm init`, you will be prompted to answer some information about the project (e.g. set name to _sample-vue-js_ and description to _Sample working with TypeScript and Webpack_).
Once you have successfully fullfilled them a **package.json** file we will generated.

 ```
 npm init
 ```

- Install **webpack** as a development dependency.

 ```
 npm install webpack webpack-cli --save-dev
 ```
- Install **webpack-dev-server** locally, as a development dependency (the reason to install it locally instead of globally is for it to be easy to setup, e.g. It can be launched on a clean machine without having to install anything globally but nodejs).

 ```
 npm install webpack-dev-server --save-dev
 ```

- Let's install a list of plugins and loaders that will add powers to our webpack configuration (handling <abbr title="Cascading Style Sheets">CSS</abbr>, TypeScript...).

 ```bash
 npm install awesome-typescript-loader css-loader file-loader html-webpack-plugin mini-css-extract-plugin url-loader  --save-dev
 ```
- Let's add two commands to our **package.json** to build and start.

### ./package.json
```diff
  "scripts": {
+    "start": "webpack-dev-server",
+    "build": "webpack"
  },

```

- Let's install locally TypeScript:

 ```
 npm install typescript --save-dev
 ```

- We need as well to drop a **tsconfig.json** file in the root folder of our project

### ./tsconfig.json
 ```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "sourceMap": true,
    "noLib": false,
    "suppressImplicitAnyIndexErrors": true
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

 ```

- Since we had configured TypeScript to work with ES6, we need to install `babel` to transpile to ES5:

```
TypeScript transpile to ES6 files and Babel transpile to ES5 files

      TypeScript            Babel
.ts ============> ES6 .js =========> ES5 .js

```

```
npm install babel-core babel-preset-env --save-dev

```

- Add `.babelrc`:

### ./.babelrc
```diff
{
  "presets": [
    "env"
  ]
}

```

- Let's install bootstrap:

 ```
 npm install bootstrap@3 --save
 ```

- Now, our **package.json** file should look something like:

```json
{
  "name": "sample-vue-js",
  "version": "1.0.0",
  "description": "Sample working with TypeScript and Webpack",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Lemoncode/vuejs-by-sample.git"
  },
  "keywords": [
    "vue.js",
    "samples",
    "typescript",
    "webpack"
  ],
  "author": "Lemoncode",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Lemoncode/vuejs-by-sample/issues"
  },
  "homepage": "https://github.com/Lemoncode/vuejs-by-sample#readme",
  "devDependencies": {
    "awesome-typescript-loader": "^5.0.0",
    "babel-core": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.4.0",
    "typescript": "^2.8.3",
    "url-loader": "^1.0.1",
    "webpack": "^4.6.0",
    "webpack-cli": "^2.0.15",
    "webpack-dev-server": "3.1.0"
  },
  "dependencies": {
    "bootstrap": "^3.3.7"
  }
}

```

- Let's create a subfolder called **src**.

```sh
mkdir src
```

- Let's create a basic **main.ts** file (under **src** folder):

### ./src/main.ts
```javascript
document.write("Hello from main.ts !");

```

- Let's create a basic **index.html** file (under **src** folder):

### ./src/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vue.js by sample</title>
  </head>
  <body>
    <div class="well">
      <h1>Sample app</h1>
    </div>
  </body>
</html>

```

- Now it's time to create a basic **webpack.config.js** file, this configuration will
 include plumbing for:
 - Launching a web dev server.
 - Transpiling from TypeScript to JavaScript.
 - Setting up Twitter Bootstrap (including fonts, etc...).
 - Generating the build under a **dist** folder.

### ./webpack.config.js
 ```javascript
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var { CheckerPlugin } = require('awesome-typescript-loader');

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts'],
  },
  mode: 'development',
  entry: {
    app: './main.ts',
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            useCache: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      // Using here url-loader and file-loader
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CheckerPlugin(),
  ],
};

```

- Run webpack with:

 ```
 npm start
 ```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
