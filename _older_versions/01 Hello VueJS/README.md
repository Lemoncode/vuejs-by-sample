# 01 Hello VueJS

In this sample we are going to create our first Vue.js component and connect it with the DOM.

We will take a startup point sample _00 Boilerplate_.

Summary steps:
 - Install Vue.js devtools.
 - Install `vue.js` library.
 - Configure webpack to work with `vue.js`.
 - Update `index.html`.
 - Update `main.ts`.

# Steps to build it

## Prerequisites

You will need to have Node.js installed in your computer. In order to follow this step guides you will also need to take sample _00 BoilerPlate_ as a starting point.

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
    extensions: ['.js', '.ts'],
+   alias: {
+     vue: 'vue/dist/vue.js',
+   },
  },
...

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

- Update `main.ts`:

### ./src/main.ts
```diff
- document.write("Hello from main.ts !");
+ import Vue from 'vue';

+ new Vue({
+   el: '#root',
+   template: '<h1>{{message}}</h1>',
+   data: {
+     message: 'Hello from Vue.js'
+   },
+ });

```

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
