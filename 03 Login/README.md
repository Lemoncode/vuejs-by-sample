# 03 Login

In this sample we are going to create a `login` page.

We will take a startup point sample _02 Properties_.

Summary steps:

- Delete `Hello.vue`.
- Update `App.vue`.
- Update `index.html`.
- Create `login` page.
- Configure router navigation.
- Create `recipe list` page.
- Create `LoginEntity` model.
- Create fake `login` API.
- Check valid login.

# Steps to build it

## Prerequisites

You will need to have Node.js installed in your computer. In order to follow this step guides you will also need to take sample _02 Properties_ as a starting point.

## Steps

- `npm install` to install previous sample dependencies:

```
npm install
```

- Delete `Hello.vue`.

- Update `App.vue`:

### ./src/App.vue

```diff
<template>
  <div>
    <h1>{{message}}</h1>
-    <hello-component
-      :message="message"
-      :on-change="onChange"
-    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
- import HelloComponent from './Hello.vue';

export default Vue.extend({
  name: 'App',
- components: {
-   HelloComponent,
- },
  data() {
    return {
      message: 'Hello from Vue.js',
    };
  },
- methods: {
-   onChange(event) {
-     this.message = event.target.value;
-   }
- },
});
</script>

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
-   <div class="well">
-     <h1>Sample app</h1>
-   </div>
    <div id="root">
    </div>
  </body>
</html>
```

- Create `login` page:

### ./src/pages/login/components/Header.vue

```javascript
<template>
  <div class="panel-heading">
    <h3 class="panel-title">
      <p>Please sign in</p>
      <p>login: admin / pwd: test</p>
    </h3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: 'HeaderComponent',
});
</script>

```

### ./src/pages/login/components/Form.vue

```javascript
<template>
  <div class="panel-body">
    <form role="form">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="e-mail"
          type="text"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="password"
          type="password"
        />
      </div>
      <button
        type="button"
        class="btn btn-lg btn-success btn-block"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FormComponent',
});
</script>

```

### ./src/pages/login/components/index.ts

```javascript
import HeaderComponent from './Header.vue';
import FormComponent from './Form.vue';

export { HeaderComponent, FormComponent };

```

### ./src/pages/login/Page.vue

```javascript
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <header-component />
          <form-component />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { HeaderComponent, FormComponent } from './components';

export default Vue.extend({
  name: 'LoginPage',
  components: {
    HeaderComponent, FormComponent,
  },
});
</script>

```

### ./src/pages/login/index.ts

```javascript
import LoginPage from './Page.vue';
export { LoginPage };

```

- The official router for `Vue.js` is [`vue-router`](https://github.com/vuejs/vue-router) and it has TypeScript typings:

```
npm install vue-router --save
```

- Add it as vendor:

### ./webpack.config.js
```diff
...
  vendor: [
    'vue',
+   'vue-router',
  ],
...

```

- Create `router.ts`:

### ./src/router.ts

```javascript
import Router, { RouteConfig } from 'vue-router';
import { LoginPage } from './pages/login';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
];

export const router = new Router({
  routes
});

```

- Update `main.ts` to work with router:

### ./src/main.ts

```diff
import Vue from 'vue';
+ import Router from 'vue-router';
+ import { router } from './router';
import App from './App.vue';

+ Vue.use(Router);

new Vue({
  el: '#root',
+  router,
  render: (h) => h(App),
});

```

- We can extract view render method to `App.vue` file:

### ./src/App.vue

```diff
<template>
- <div>
-   <h1>{{message}}</h1>
- </div>
+ <router-view />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
- data() {
-   return {
-     message: 'Hello from Vue.js',
-   };
- },
});
</script>

```

- Create a second page to navigate:

### ./src/pages/recipe/list/Page.vue

```javascript
<template>
  <h1>Recipe List Page</h1>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RecipeListPage',
});
</script>

```

### ./src/pages/recipe/list/index.ts

```javascript
import RecipeListPage from './Page.vue';
export { RecipeListPage };

```

- Create route for `RecipeListPage`:

### ./src/router.ts

```diff
import Router, { RouteConfig } from 'vue-router';
import { LoginPage } from './pages/login';
+ import { RecipeListPage } from './pages/recipe/list';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
+ { path: '/recipe', component: RecipeListPage },
];

export const router = new Router({
  routes
});

```

- Navigate using `router-link`:

### ./src/pages/login/components/Form.vue

```diff
<template>
  <div class="panel-body">
    <form role="form">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="e-mail"
          type="text"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="password"
          type="password"
        />
      </div>
-      <button
-        type="button"
+      <router-link
+        to="/recipe"
        class="btn btn-lg btn-success btn-block"
      >
        Login
-      </button>
+      </router-link>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FormComponent',
});
</script>

```

- Now, we could start creating a mock `api`. Create model `LoginEntity`:

### ./src/rest-api/model/login.ts

```javascript
export interface LoginEntity {
  login: string;
  password: string;
}

```

### ./src/rest-api/model/index.ts

```javascript
export * from './login';

```

- Create fake `login` API.

### ./src/rest-api/api/login/login.ts

```javascript
import { LoginEntity } from '../../model';

export const loginRequest = (loginEntity: LoginEntity): Promise<boolean> => (
  isValidLogin(loginEntity) ?
    Promise.resolve(true) :
    Promise.reject('Not valid login')
);

const isValidLogin = (loginEntity: LoginEntity) => (
  loginEntity.login === 'admin' &&
  loginEntity.password === 'test'
);

```

### ./src/rest-api/api/login/index.ts

```javascript
export * from './login';

```

- Create login page `viewModel`:

### ./src/pages/login/viewModel.ts

```javascript
interface LoginEntity {
  login: string;
  password: string;
}

const createEmptyLoginEntity = (): LoginEntity => ({
  login: '',
  password: '',
});

export { LoginEntity, createEmptyLoginEntity };

```

- We'll need a `mapper` to map from `viewModel` to `model`:

### ./src/pages/login/mappers.ts

```javascript
import * as model from '../../rest-api/model';
import * as vm from './viewModel';

export const mapLoginEntityVmToModel = (loginEntity: vm.LoginEntity): model.LoginEntity => ({
  ...loginEntity,
});

```

- Create `LoginPageContainer`:

### ./src/pages/login/PageContainer.vue

```javascript
<template>
  <login-page
    :login-entity="loginEntity"
    :update-login="updateLogin"
    :login-request="loginRequest"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { loginRequest } from '../../rest-api/api/login';
import { LoginEntity, createEmptyLoginEntity } from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
import LoginPage from './Page.vue';

export default Vue.extend({
  name: 'LoginPageContainer',
  components: {
    LoginPage,
  },
  data() {
    return {
      loginEntity: createEmptyLoginEntity(),
    };
  },
  methods: {
    updateLogin(login: string, password: string) {
      this.loginEntity = {
        login,
        password,
      };
    },
    loginRequest() {
      const loginEntityModel = mapLoginEntityVmToModel(this.loginEntity);
      loginRequest(loginEntityModel)
        .then(() => {
          this.$router.push('/recipe');
        })
        .catch(error => console.log(error));
    },
  },
});
</script>

```

>Reference: [Why we have to use Function in data](https://vuejs.org/v2/api/#Options-Data)

- Update `LoginPage`:

### ./src/pages/login/Page.vue

```diff
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <header-component />
-          <form-component />
+          <form-component
+            :login-entity="loginEntity"
+            :update-login="updateLogin"
+            :login-request="loginRequest"
+          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
- import Vue from 'vue';
+ import Vue, { PropOptions } from 'vue';
+ import { LoginEntity } from './viewModel';
import { HeaderComponent, FormComponent } from './components';

export default Vue.extend({
  name: 'LoginPage',
  components: {
    HeaderComponent, FormComponent,
  },
+ props: {
+   loginEntity: {} as PropOptions<LoginEntity>,
+   updateLogin: {} as PropOptions<(login: string, password: string) => void>,
+   loginRequest: {} as PropOptions<() => void>,
+ },
});
</script>

```

- Update `Form.vue`:

### ./src/pages/login/components/Form.vue

```diff
<template>
  <div class="panel-body">
    <form role="form">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="e-mail"
          type="text"
+          :value="loginEntity.login"
+          @input="updateLogin($event.target.value, loginEntity.password)"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="password"
          type="password"
+          :value="loginEntity.password"
+          @input="updateLogin(loginEntity.login, $event.target.value)"
        />
      </div>
-     <router-link
-       to="/recipe"
+     <button
        class="btn btn-lg btn-success btn-block"
+       @click.prevent="loginRequest"
      >
        Login
-     </router-link>
+     </button>
    </form>
  </div>
</template>

<script lang="ts">
- import Vue from 'vue';
+ import Vue, { PropOptions } from 'vue';
+ import { LoginEntity } from '../viewModel';

export default Vue.extend({
  name: 'FormComponent',
+ props: {
+   loginEntity: {} as PropOptions<LoginEntity>,
+   updateLogin: {} as PropOptions<(login: string, password: string) => void>,
+   loginRequest: {} as PropOptions<() => void>,
+ },
});
</script>

```

- Update `index.ts`

### ./src/pages/login/index.ts

```diff
- import LoginPage from './Page.vue';
- export { LoginPage };
+ import LoginPageContainer from './PageContainer.vue';
+ export { LoginPageContainer };

```

- Update `router.ts`

### ./src/router.ts

```diff
import Router, { RouteConfig } from 'vue-router';
- import { LoginPage } from './pages/login';
+ import { LoginPageContainer } from './pages/login';
import { RecipeListPage } from './pages/recipe/list';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/login' },
- { path: '/login', component: LoginPage },
+ { path: '/login', component: LoginPageContainer },
  { path: '/recipe', component: RecipeListPage },
];

export const router = new Router({
  routes
});

```

- We could define props like interface:

### ./src/pages/login/formProps.ts

```javascript
import { PropOptions } from 'vue';
import { LoginEntity } from './viewModel';

export interface FormProps {
  loginEntity: PropOptions<LoginEntity>,
  updateLogin: PropOptions<(login: string, password: string) => void>,
  loginRequest: PropOptions<() => void>,
}

```

- And use it in `Form.vue` and `Page.vue`:

### ./src/pages/login/components/Form.vue

```diff
  ...

<script lang="ts">
- import { LoginEntity } from '../viewModel';
+ import { FormProps } from '../formProps';

export default Vue.extend({
  name: 'FormComponent',
  props: {
-   loginEntity: {} as PropOptions<LoginEntity>,
+   loginEntity: {},
-   updateLogin: {} as PropOptions<(login: string, password: string) => void>,
+   updateLogin: {},
-   loginRequest: {} as PropOptions<() => void>,
+   loginRequest: {},
- },
+ } as FormProps,
});
</script>

```

### ./src/pages/login/Page.vue

```diff
  ...

<script lang="ts">
import Vue, { PropOptions } from 'vue';
- import { LoginEntity } from './viewModel';
import { HeaderComponent, FormComponent } from './components';
+ import { FormProps } from './formProps';

export default Vue.extend({
  name: 'LoginPage',
  components: {
    HeaderComponent, FormComponent,
  },
  props: {
-   loginEntity: {} as PropOptions<LoginEntity>,
+   loginEntity: {},
-   updateLogin: {} as PropOptions<(login: string, password: string) => void>,
+   updateLogin: {},
-   loginRequest: {} as PropOptions<() => void>,
+   loginRequest: {},
- },
+ } as FormProps,
});
</script>

```

- As example about `data` property in a `Vue` component, we could define an object with all app state:

### ./src/state.ts

```javascript
import { LoginEntity, createEmptyLoginEntity } from './pages/login/viewModel';

export const state = {
  loginEntity: createEmptyLoginEntity(),
};

```

### ./src/App.vue

```diff
<template>
+  <div>
+    <h1 class="well">{{ loginEntity.login }}</h1>
    <router-view />
+  </div>
</template>

<script lang="ts">
import Vue from 'vue';
+ import { state } from './state';

export default Vue.extend({
  name: 'app',
+ data() {
+   return state;
+ },
});
</script>

```

### ./src/pages/login/PageContainer.vue

```diff
  ...

<script lang="ts">
import Vue from 'vue';
import { loginRequest } from '../../rest-api/api/login';
import { LoginEntity, createEmptyLoginEntity } from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
import LoginPage from './Page.vue';
+ import { state } from '../../state';

export default Vue.extend({
  name: 'PageContainer',
  components: {
    LoginPage,
  },
  data() {
-   return {
-     loginEntity: createEmptyLoginEntity(),
-   };
+   return state;
  },
  ...

```

- Remove `state.ts` and undo updates.

- Finally, we are going to add `form validations`.

- First we're going to install [`lc-form-validation`](https://github.com/Lemoncode/lcFormValidation):

```
npm install lc-form-validation --save
```

- Add it as `vendor`:

### ./webpack.config.js

```diff
...
vendor: [
  'vue',
  'vue-router',
+ 'lc-form-validation',
],
...

```

- Create validation `constraints`:

### ./src/pages/login/validations.ts

```javascript
import { ValidationConstraints, Validators, createFormValidation } from 'lc-form-validation';

const validationConstraints: ValidationConstraints = {
  fields: {
    login: [
      { validator: Validators.required },
    ],
    password: [
      { validator: Validators.required },
    ],
  },
};

export const validations = createFormValidation(validationConstraints);

```

- Create `LoginError` model:

### ./src/pages/login/viewModel.ts

```diff
+ import { FieldValidationResult } from 'lc-form-validation';

interface LoginEntity {
  login: string;
  password: string;
};

const createEmptyLoginEntity = (): LoginEntity => ({
  login: '',
  password: '',
});

+ interface LoginError {
+   login: FieldValidationResult;
+   password: FieldValidationResult;
+ };

+ const createEmptyLoginError = (): LoginError => ({
+   login: {
+     key: 'login',
+     succeeded: true,
+     errorMessage: '',
+     type: '',
+   },
+   password: {
+     key: 'password',
+     succeeded: true,
+     errorMessage: '',
+     type: '',
+   },
+ });

- export { LoginEntity, createEmptyLoginEntity };
+ export { LoginEntity, createEmptyLoginEntity, LoginError, createEmptyLoginError };

```

- Update `PageContainer`:

### ./src/pages/login/PageContainer.vue
```diff
<template>
  <login-page
    :login-entity="loginEntity"
+   :login-error="loginError"
    :update-login="updateLogin"
    :login-request="loginRequest"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { loginRequest } from '../../rest-api/api/login';
- import { LoginEntity, createEmptyLoginEntity } from './viewModel';
+ import { LoginEntity, createEmptyLoginEntity, LoginError, createEmptyLoginError } from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
+ import { validations } from './validations';
import LoginPage from './Page.vue';

export default Vue.extend({
  name: 'PageContainer',
  components: {
    LoginPage,
  },
  data() {
    return {
      loginEntity: createEmptyLoginEntity(),
+     loginError: createEmptyLoginError(),
    };
  },
  methods: {
-   updateLogin(login: string, password: string) {
+   updateLogin(field: string, value: string) {
-     this.loginEntity = {
-       login,
-       password,
-     };
+     this.loginEntity = {
+       ...this.loginEntity,
+       [field]: value,
+     };

+    validations.validateField(this.loginEntity, field, value)
+     .then(fieldValidationResult => {
+       this.loginError = {
+         ...this.loginError,
+         [field]: fieldValidationResult,
+       };
+     })
+     .catch(error => console.log(error));
    },
    loginRequest() {
+     validations.validateForm(this.loginEntity)
+       .then(formValidationResult => {
+         if (formValidationResult.succeeded) {
            const loginEntityModel = mapLoginEntityVmToModel(this.loginEntity);
            loginRequest(loginEntityModel)
              .then(() => {
                this.$router.push('/recipe');
              })
              .catch(error => console.log(error));
+         } else {
+           this.loginError = {
+             ...this.loginError,
+             ...formValidationResult.fieldErrors,
+           };
+         }
+       })
+       .catch(error => console.log(error));
    }
  },
});
</script>

```

- Update `formProps`:

### ./src/pages/login/formProps.ts

```diff
import { PropOptions } from 'vue';
- import { LoginEntity } from './viewModel';
+ import { LoginEntity, LoginError } from './viewModel';

export interface FormProps {
  loginEntity: PropOptions<LoginEntity>,
+ loginError: PropOptions<LoginError>,
  updateLogin: PropOptions<(login: string, password: string) => void>,
  loginRequest: PropOptions<() => void>,
}

```

- Update `Page`:

### ./src/pages/login/Page.vue

```diff
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <header-component />
          <form-component
            :login-entity="loginEntity"
+           :login-error="loginError"
            :update-login="updateLogin"
            :login-request="loginRequest"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { HeaderComponent, FormComponent } from './components';
import { FormProps } from './formProps';

export default Vue.extend({
  name: 'LoginPage',
  components: {
    HeaderComponent, FormComponent,
  },
  props: {
    loginEntity: {},
+   loginError: {},
    updateLogin: {},
    loginRequest: {},
  } as FormProps,
});
</script>

```

- Before update `FormComponent`, we are going to create reusable `input with validation`:

### ./src/common/components/form/Validation.vue

```javascript
<template>
  <div :class="`${errorClassName} ${className}`">
    <slot />
    <div class="help-block">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ValidationComponent',
  props: [
    'hasError',
    'errorMessage',
    'className',
  ],
  computed: {
    errorClassName(): string {
      return (
        this.hasError ?
          'has-error' :
          ''
      )
    },
  },
});
</script>

```

>Reference: [Computed Caching vs Methods](https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods)

### ./src/common/components/form/Input.vue

```javascript
<template>
  <div :class="`form-group ${className}`">
    <label :for="name">
      {{ label }}
    </label>
    <input
      class="form-control"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      :name="name"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'InputComponent',
  props: [
    'className',
    'placeholder',
    'type',
    'value',
    'inputHandler',
    'label',
    'name',
  ],
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    }
  },
});
</script>

```

### ./src/common/components/form/Button.vue

```javascript
<template>
  <button
    :class="className"
    :type="type"
    @click.prevent="clickHandler"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ButtonComponent',
  props: [
    'className',
    'type',
    'label',
    'clickHandler',
    'disabled',
  ],
});
</script>

```

### ./src/common/components/form/index.ts

```javascript
import ValidationComponent from './Validation.vue';
import InputComponent from './Input.vue';
import ButtonComponent from './Button.vue';

export { ValidationComponent, InputComponent, ButtonComponent };

```

- Update `Form`:

### ./src/pages/login/components/Form.vue

```diff
<template>
  <div class="panel-body">
    <form role="form">
-         <div class="form-group">
-           <input
-             class="form-control"
-             placeholder="e-mail"
-             type="text"
-             :value="loginEntity.login"
-             @input="updateLogin($event.target.value, loginEntity.password)"
-           />
-         </div>
+      <validation-component
+        :has-error="!loginError.login.succeeded"
+        :error-message="loginError.login.errorMessage"
+      >
+        <input-component
+          placeholder="e-mail"
+          type="text"
+          label="Login"
+          name="login"
+          :value="loginEntity.login"
+          :input-handler="updateLogin"
+        />
+      </validation-component>
-         <div class="form-group">
-           <input
-             class="form-control"
-             placeholder="password"
-             type="password"
-             :value="loginEntity.password"
-             @input="updateLogin(loginEntity.login, $event.target.value)"
-           />
-         </div>
+      <validation-component
+        :has-error="!loginError.password.succeeded"
+        :error-message="loginError.password.errorMessage"
+      >
+        <input-component
+          placeholder="password"
+          type="password"
+          label="Password"
+          name="password"
+          :value="loginEntity.password"
+          :input-handler="updateLogin"
+        />
+      </validation-component>
-         <button
-           class="btn btn-lg btn-success btn-block"
-           @click.prevent="loginRequest"
-         >
-           Login
-         </button>
+      <button-component
+        class-name="btn btn-lg btn-success btn-block"
+        label="Login"
+        type="button"
+        :click-handler="loginRequest"
+      />
    </form>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { FormProps } from '../formProps';
+ import { ValidationComponent, InputComponent, ButtonComponent } from '../../../common/components/form';

export default Vue.extend({
  name: 'FormComponent',
+ components: {
+   ValidationComponent, InputComponent, ButtonComponent,
+ },
  props: {
    loginEntity: {},
+   loginError: {},
    updateLogin: {},
    loginRequest: {},
  } as FormProps,
});
</script>

```

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
