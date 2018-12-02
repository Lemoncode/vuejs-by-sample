# 03 Render

In this sample we are going to work with `render` function.

We will take a startup point sample _02 Properties_.

Summary steps:
 - Configure to work with runtime-only build.
 - Enable and configure jsx
 - Install `babel-plugin-transform-vue-jsx`
 - Rename to `main.tsx` and update it.
 - Rename to `hello.tsx` and update it.

# Steps to build it

## Prerequisites

You will need to have Node.js installed in your computer. In order to follow this step guides you will also need to take sample _02 Properties_ as a starting point.

## Steps

- `npm install` to install previous sample dependencies:

```
npm install
```

- In previous samples, we were working with full build which allow us to define HTML as string `template`. This time, we'll configure runtime-only build to work with `render` option:

### ./webpack.config.js

```diff
...
resolve: {
  extensions: ['.js', '.ts'],
- alias: {
-   vue: 'vue/dist/vue.js',
- },
},
...

```

- To enable `tsx` syntax could be:

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
    "suppressImplicitAnyIndexErrors": true,
-   "strict": true
+   "strict": true,
+   "jsx": "react",
+   "jsxFactory": "h"
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

```

- The problem is TypeScript does not map properly when an element has more than one child, for example:

```javascript
render: function(h) {
  return (
    <div>
      <h1>Hello</h1>
      <h2>World</h2>
    </div>
  );
}

```

> [More info](https://github.com/vuejs/vue/issues/5262)
>
> [`h` is an alias of createElement](https://vuejs.org/v2/guide/render-function.html#JSX) (necessary to work with TypeScript)
>
> [`HypeScript`](https://github.com/hyperhype/hyperscript)

- To solve this issue, the goal is:
    - Avoid TypeScript transpile `tsx`.
    - Use [`babel-plugin-transform-vue-jsx`](https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage) to transpile `jsx`.

- Avoid TypeScript transpile `tsx`:

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
    "suppressImplicitAnyIndexErrors": true,
    "strict": true,
-   "jsx": "react",
-   "jsxFactory": "h"
+   "jsx": "preserve"
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

```

- Install `babel-plugin-transform-vue-jsx` and its dependencies

```
npm i babel-plugin-transform-vue-jsx babel-plugin-syntax-jsx babel-helper-vue-jsx-merge-props --save-dev
```

- Configure `.babelrc`:

### ./.babelrc
```diff
{
  "presets": [
    "env"
- ]
+ ],
+ "plugins": [
+   "transform-vue-jsx"
+ ]
}

```

- Update `webpack.config.js`:

### ./webpack.config.js
```diff
...

  resolve: {
-   extensions: ['.js', '.ts'],
+   extensions: ['.js', '.ts', '.tsx'],
  },
  mode: 'development',
  entry: {
-   app: './main.ts',
+   app: './main.tsx',
    vendor: [
      'vue',
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },

  ...

  module: {
    rules: [
      {
-       test: /\.ts$/,
+       test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
          },
        },
      },
  ...

```

- Rename `main.ts` to `main.tsx`:

### ./src/main.tsx
```diff
- import Vue from 'vue';
+ import Vue, { VNode } from 'vue';
import { HelloComponent } from './hello';

new Vue({
  el: '#root',
- template: `
+ render(h): VNode {
+   return (
      <div>
-       <h1>{{message}}</h1>
+       <h1>{this.message}</h1>
-       <hello
+       <HelloComponent
-         :message="message"
+         message={this.message}
-         :onChange="onChange"
+         inputHandler={this.inputHandler}
        />
      </div>
- `,
+   );
+ },
- components: {
-   hello: HelloComponent,
- },
  data: {
    message: 'Hello from Vue.js'
  },
  methods: {
-   onChange: function(value) {
+   inputHandler(value) {
      this.message = value;
    }
  }
});

```

- Rename `hello.ts` to `hello.tsx`:

### ./src/hello.tsx
```diff
- import Vue from 'vue';
+ import Vue, { VNode } from 'vue';

export const HelloComponent = Vue.extend({
- template: `
+ render(h): VNode {
+   return (
      <input
-       :value="message"
+       value={this.message}
-       @input="onChange($event.target.value)"
+       onInput={(e) => this.inputHandler(e.target.value)}
      />
- `,
+   );
+ },
  props: {
    message: String,
-   onChange: Function,
+   inputHandler: Function,
  },
});

```

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
