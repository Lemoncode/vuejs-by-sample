# 01 SFC Hello VueJS

## Why SFC?

> https://vuejs.org/v2/guide/single-file-components.html

In many Vue projects, global components will be defined using `Vue.component`, followed by `new Vue({ el: '#container' })` to target a container element in the body of every page.

This can work very well for small to medium-sized projects, where JavaScript is only used to enhance certain views. In more complex projects however, or when your frontend is entirely driven by JavaScript, these disadvantages become apparent:

- **Global definitions** force unique names for every component
- **String templates** lack syntax highlighting and require ugly slashes for multiline HTML
- **No CSS support** means that while HTML and JavaScript are modularized into components, CSS is conspicuously left out
- **No build step** restricts us to HTML and ES5 JavaScript, rather than preprocessors like Pug (formerly Jade) and Babel

All of these are solved by **single-file components** with a `.vue` extension, made possible with build tools such as Webpack or Browserify.

Here’s an example of a file we’ll call `Hello.vue`:

![Vue SFC](../Extra/pics/01-vue-component.png)

Now we get:

- Complete syntax highlighting
- CommonJS modules
- Component-scoped CSS

As promised, we can also use preprocessors such as Pug, Babel (with ES2015 modules), and Stylus for cleaner and more feature-rich components.

# Introduction

In this sample we are going to create our first Vue.js SFC and connect it with the DOM.

We will take a startup point sample _00 SFC Boilerplate_.

Summary steps:

- Install Vue.js devtools.
- Install `vue.js` library and others dependencies.
- Configure webpack to work with `vue.js`.
- Update `index.html`.
- Update `main.ts`.

# Steps to build it

## Prerequisites

You will need to have Node.js installed in your computer. In order to follow this step guides you will also need to take sample _00 SFC BoilerPlate_ as a starting point.

## Steps

- `npm install` to install previous sample dependencies:

```
npm install
```

- To get a better experience debugging `vue` we can install [Vue devtools](https://github.com/vuejs/vue-devtools). It's a Chrome extension.

- Install `vue` library as project dependency:

```
npm install vue --save
```

- To use SFC there install vue-loader and vue-template-compiler:

```
npm install vue-loader vue-template-compiler --save
```

- This library has its own TypeScript definition file, so we don't need install other typings.

- Configure `webpack.config` to set `vue.js` as vendor:

### ./webpack.config.js

```diff
...
  entry: {
    app: './main.ts',
+   vendor: [
+     'vue',
+   ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
...
```

- Recommended configuration for [`tsconfig.json`](https://vuejs.org/v2/guide/typescript.html#Recommended-Configuration):

### ./tsconfig.json
```diff
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "sourceMap": true,
    "noLib": false,
-   "suppressImplicitAnyIndexErrors": true
+   "suppressImplicitAnyIndexErrors": true,
+   "strict": true
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

```

- There are [two builds available](https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds) to work with `Vue.js`.

  - `Runtime + Compiler`: needed to compile templates on the client side, e.g. passing a string to `template` property.
  - `Runtime-only`: when using a `pre-compiler` like `vue-loader`, `vueify`, etc.

- For now, we could start using `first one` to keep this sample as simple as possible. To configure it for webpack:

### ./webpack.config.js

```diff
...
resolve: {
-    extensions: ['.js', '.ts'],
+    extensions: ['.js', '.ts', 'vue'],
+    alias: {
+      'vue$': 'vue/dist/vue.esm.js'
+    },
  },
...
  module: {
    rules: [
+     {
+       test: /\.vue$/,
+       exclude: /node_modules/,
+       loader: 'vue-loader'
+     },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
+           appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
        },
      },
···
  plugins: [
+   new VueLoaderPlugin(),
···
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.join(__dirname, './tsconfig.json'),
+     vue: true
    }),
  ],
};

```

- Update `tsconfig.json`:

```diff
{
···
  "compileOnSave": false,
+  "include": [
+    "src/**/*.ts",
+    "src/**/*.vue"
+  ],
  "exclude": [
    "node_modules"
  ]
}

```

- Update `index.html`:

### ./src/index.html

```diff
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
+   <div id="root">
+   </div>
  </body>
</html>
```

- Create `App.vue`:

### ./src/App.vue

```javascript
<template>
  <h1>{{ message }}</h1>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      message: 'Hello from Vue.js',
    };
  },  
});
</script>

```

- Create `sfc.d.ts` in order to TypeScript recognize and treat .vue files

```javascript
declare module '*.vue' {
  import Vue from 'vue';  
  export default Vue;
}
```

- Update `main.ts`:

### ./src/main.ts

```diff
- document.write("Hello from main.ts !");
+ import Vue from 'vue';
+ import App from './App.vue';

+ new Vue({
+   el: '#root',
+   render: (h) => h(App),
+ });

```

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
