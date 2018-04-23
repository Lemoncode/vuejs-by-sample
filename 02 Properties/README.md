# 02 Properties

In this sample we are going to learn a basic concept, handling properties.

We will take a startup point sample _01 Hello VueJS_.

Summary steps:
 - Update `main.ts` with and input element.
 - Use `v-model` directive.
 - Create our first component.
 - Passing properties from `main.ts` to `hello.ts`.
 - Other approach to work with properties.

# Steps to build it

## Prerequisites

You will need to have Node.js installed in your computer. In order to follow this step guides you will also need to take sample _01 Hello VueJS_ as a starting point.

## Steps

- `npm install` to install previous sample dependencies:

```
npm install
```

- Update `main.ts` with an input element:

### ./src/main.ts
```diff
import Vue from 'vue';

new Vue({
  el: '#root',
- template: '<h1>{{message}}</h1>',
+ template: `
+   <div>
+     <h1>{{message}}</h1>
+     <input
+       v-bind:value="message"
+       v-on:input="message = $event.target.value"
+     />
+   </div>
+ `,
  data: {
    message: 'Hello from Vue.js'
  },
});

```

- We can use too the shorthands:

### ./src/main.ts
```diff
import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div>
      <h1>{{message}}</h1>
      <input
-       v-bind:value="message"
+       :value="message"
-       v-on:input="message = $event.target.value"
+       @input="message = $event.target.value"
      />
    </div>
  `,
  data: {
    message: 'Hello from Vue.js'
  },
});

```

- And finally, use method instead of inline function:

### ./src/main.ts
```diff
import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div>
      <h1>{{message}}</h1>
      <input
        :value="message"
-       @input="message = $event.target.value"
+       @input="onChange($event.target.value)"
      />
    </div>
  `,
  data: {
    message: 'Hello from Vue.js'
  },
+ methods: {
+   onChange: function(value) {
+     this.message = value;
+   },
+ },
});

```

> Reference: [_Don't use arrow functions_](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)

- Using syntactic sugar `v-model`:

### ./src/main.ts
```diff
import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div>
      <h1>{{message}}</h1>
      <input
-       :value="message"
-       @input="onChange($event.target.value)"
+       v-model="message"
      />
    </div>
  `,
  data: {
    message: 'Hello from Vue.js'
  },
- methods: {
-   onChange: function(value) {
-     this.message = value;
-   },
- },
});

```

- Create our first component `hello.ts`:

### ./src/hello.ts
```javascript
import Vue from 'vue';

export const HelloComponent = Vue.extend({
  template: `
    <input
      v-model="value"
    />
  `,
  props: {
    value: String
  },
});

```

- Update `maint.ts`:

### ./src/main.ts
```diff
import Vue from 'vue';
+ import { HelloComponent } from './hello';

new Vue({
  el: '#root',
  template: `
    <div>
      <h1>{{message}}</h1>
-     <input
+     <hello
        v-model="message"
      />
    </div>
  `,
+ components: {
+   hello: HelloComponent,
+ },
  data: {
    message: 'Hello from Vue.js'
  },
});

```

- Since we are using `v-model` in `HelloComponent` we are mutating `value` prop and it's forbidden. To solve this:

### ./src/hello.ts
```diff
import Vue from 'vue';

export const HelloComponent = Vue.extend({
  template: `
    <input
-     v-model="value"
+     :value="value"
+     @input="onChange($event.target.value)"
    />
  `,
  props: {
    value: String
  },
+ methods: {
+   onChange: function(value) {
+     this.$emit('input', value);
+   }
+ },
});

```

- Other approach:

### ./src/hello.ts
```diff
import Vue from 'vue';

export const HelloComponent = Vue.extend({
  template: `
    <input
-     :value="value"
+     :value="message"
      @input="onChange($event.target.value)"
    />
  `,
  props: {
-   value: String
+   message: String,
+   onChange: Function,
  },
- methods: {
-   onChange: function(value) {
-     this.$emit('input', value);
-   }
- }
});

```

### ./src/main.ts
```diff
import Vue from 'vue';
import { HelloComponent } from './hello';

new Vue({
  el: '#root',
  template: `
    <div>
      <h1>{{message}}</h1>
      <hello
-       v-model="message"
+       :message="message"
+       :onChange="onChange"
      />
    </div>
  `,
  components: {
    hello: HelloComponent,
  },
  data: {
    message: 'Hello from Vue.js'
  },
+ methods: {
+   onChange: function(value) {
+     this.message = value;
+   }
+ },
});

```

> [`v-model` directive](https://vuejs.org/v2/api/#v-model)

> [Props types](https://vuejs.org/v2/guide/components.html#Prop-Validation)

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
