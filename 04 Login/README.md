# 04 Login

In this sample we are going to create a `login` page.

We will take a startup point sample _03 Render_.

Summary steps:
 - Delete `hello.tsx`.
 - Update `index.html`.
 - Create `login` page.
 - Configure router navigation.
 - Create `recipe list` page.
 - Create `LoginEntity` model.
 - Create fake `login` API.
 - Check valid login.

# Steps to build it

## Prerequisites

You will need to have Node.js installed in your computer. In order to follow this step guides you will also need to take sample _03 Render_ as a starting point.

## Steps

- `npm install` to install previous sample dependencies:

```
npm install
```

- Delete `hello.tsx`.

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

### ./src/pages/login/components/header.tsx
```javascript
import Vue, { VNode } from 'vue';

export const HeaderComponent = Vue.extend({
  render(h): VNode {
    return (
      <div class="panel-heading">
        <h3 class="panel-title">
          <p>Please sign in</p>
          <p>login: admin / pwd: test</p>
        </h3>
      </div>
    );
  },
});

```

### ./src/pages/login/components/form.tsx
```javascript
import Vue, { VNode } from 'vue';

export const FormComponent = Vue.extend({
  render(h): VNode {
    return (
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
    );
  },
});

```

### ./src/pages/login/components/index.ts

```javascript
export * from './header';
export * from './form';

```

### ./src/pages/login/page.tsx
```javascript
import Vue, { VNode } from 'vue';
import { HeaderComponent, FormComponent } from './components';

export const LoginPage = Vue.extend({
  render(h): VNode {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
              <HeaderComponent />
              <FormComponent />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

```

### ./src/pages/login/index.ts
```javascript
export * from './page';

```

- Update `main.tsx`:

### ./src/main.tsx
```diff
import Vue, { VNode } from 'vue';
- import { HelloComponent } from './hello';
+ import { LoginPage } from './pages/login';

new Vue({
  el: '#root',
  render(h): VNode {
    return (
-     <div>
-       <h1>{this.message}</h1>
-       <HelloComponent
-         message={this.message}
-         inputHandler={this.inputHandler}
-       />
-     </div>
+     <LoginPage />
    );
  },
- data: {
-   message: 'Hello from Vue.js'
- },
- methods: {
-   inputHandler(value) {
-     this.message = value;
-   }
- },
});

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

- Update `main.tsx` to work with router:

### ./src/main.tsx
```diff
import Vue, { VNode } from 'vue';
- import { LoginPage } from './pages/login';
+ import Router from 'vue-router';
+ import { router } from './router';

+ Vue.use(Router);

new Vue({
- el: '#root',
  render(h): VNode {
    return (
-     <LoginPage />
+     <router-view />
    );
  },
+ router,
-});
+}).$mount('#root');

```

- We can extract render method to `app.tsx` file:

### ./src/app.tsx
```javascript
import Vue, { VNode } from 'vue';

export const App = Vue.extend({
  render(h): VNode {
    return (
      <router-view />
    );
  },
});

```

### ./src/main.tsx
```diff
import Vue from 'vue';
import Router from 'vue-router';
import { router } from './router';
+ import { App } from './app';

Vue.use(Router);

new Vue({
- render(h): VNode {
-   return (
-     <router-view />
-   );
- },
+ render: (h) => h(App),
  router,
}).$mount('#root');

```

- Create a second page to navigate:

### ./src/pages/recipe/list/page.tsx
```javascript
import Vue, { VNode } from 'vue';

export const RecipeListPage = Vue.extend({
  render(h): VNode {
    return (
      <h1>Recipe List Page </h1>
    );
  },
});

```

### ./src/pages/recipe/list/index.ts
```javascript
export * from './page';

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

### ./src/pages/login/components/form.tsx
```diff
import Vue, { VNode } from 'vue';

export const FormComponent = Vue.extend({
  render(h): VNode {
    return (
      ...
-         <button
-           type="button"
+         <router-link
+           to="/recipe"
            class="btn btn-lg btn-success btn-block"
          >
            Login
-         </button>
+         </router-link>
        </form>
      </div>
    );
  }
});

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
export interface LoginEntity {
  login: string;
  password: string;
}

export const createEmptyLoginEntity = (): LoginEntity => ({
  login: '',
  password: '',
});

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

### ./src/pages/login/pageContainer.tsx

```javascript
import Vue, { VNode } from 'vue';
import { router } from '../../router';
import { loginRequest } from '../../rest-api/api/login';
import { LoginEntity, createEmptyLoginEntity } from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
import { LoginPage } from './page';

export const LoginPageContainer = Vue.extend({
  render(h): VNode {
    return (
      <LoginPage
        loginEntity={this.loginEntity}
        updateLogin={this.updateLogin}
        loginRequest={this.loginRequest}
      />
    );
  },
  data: () => ({
    loginEntity: createEmptyLoginEntity(),
  }),
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
          router.push('/recipe');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});

```

>Reference: [Why we have to use Function in data](https://vuejs.org/v2/api/#Options-Data)

- Update `LoginPage`:

### ./src/pages/login/page.tsx

```diff
- import Vue, { VNode } from 'vue';
+ import Vue, { VNode, PropOptions } from 'vue';
+ import { LoginEntity } from './viewModel';
import { HeaderComponent, FormComponent } from './components';

export const LoginPage = Vue.extend({
+ props: {
+   loginEntity: {} as PropOptions<LoginEntity>,
+   updateLogin: {} as PropOptions<(login: string, password: string) => void>,
+   loginRequest: {} as PropOptions<() => void>,
+ },
  render(h): VNode {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
              <HeaderComponent />
-             <FormComponent />
+             <FormComponent
+               loginEntity={this.loginEntity}
+               updateLogin={this.updateLogin}
+               loginRequest={this.loginRequest}
+             />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

```

- Update `form.tsx`:

### ./src/pages/login/components/form.tsx
```diff
- import Vue, { VNode } from 'vue';
+ import Vue, { VNode, PropOptions } from 'vue';
+ import { LoginEntity } from '../viewModel';

export const FormComponent = Vue.extend({
+ props: {
+   loginEntity: {} as PropOptions<LoginEntity>,
+   updateLogin: {} as PropOptions<(login: string, password: string) => void>,
+   loginRequest: {} as PropOptions<() => void>,
+ },
  render(h): VNode {
    return (
      <div class="panel-body">
        <form role="form">
          <div class="form-group">
            <input
              class="form-control"
              placeholder="e-mail"
              type="text"
+             value={this.loginEntity.login}
+             onInput={(e) => this.updateLogin(e.target.value, this.loginEntity.password)}
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="password"
              type="password"
+             value={this.loginEntity.password}
+             onInput={(e) => this.updateLogin(this.loginEntity.login, e.target.value)}
            />
          </div>
-         <router-link
-           to="/recipe"
+         <button
            class="btn btn-lg btn-success btn-block"
+           onClick={(e) => {
+               e.preventDefault();
+               this.loginRequest();
+             }
+           }
          >
            Login
-         </router-link>
+         </button>
        </form>
      </div>
    );
  }
});

```

- Update `index.ts`

### ./src/pages/login/index.ts

```diff
- export * from './page';
+ export * from './pageContainer';

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

- And use it in `form.tsx` and `page.tsx`:

### ./src/pages/login/components/form.tsx

```diff
import Vue, { VNode, PropOptions } from 'vue';
- import { LoginEntity } from '../viewModel';
+ import { FormProps } from '../formProps';

export const FormComponent = Vue.extend({
  props: {
-   loginEntity: {} as PropOptions<LoginEntity>,
+   loginEntity: {},
-   updateLogin: {} as PropOptions<(login: string, password: string) => void>,
+   updateLogin: {},
-   loginRequest: {} as PropOptions<() => void>,
+   loginRequest: {},
- },
+ } as FormProps,
  ...

```

### ./src/pages/login/page.tsx

```diff
import Vue, { VNode, PropOptions } from 'vue';
- import { LoginEntity } from './viewModel';
import { HeaderComponent, FormComponent } from './components';
+ import { FormProps } from './formProps';

export const LoginPage = Vue.extend({
  props: {
-   loginEntity: {} as PropOptions<LoginEntity>,
+   loginEntity: {},
-   updateLogin: {} as PropOptions<(login: string, password: string) => void>,
+   updateLogin: {},
-   loginRequest: {} as PropOptions<() => void>,
+   loginRequest: {},
- },
+ } as FormProps,
  ...

```

- As example about `data` property in a `Vue` component, we could define an object with all app state:

### ./src/state.ts

```javascript
import { LoginEntity, createEmptyLoginEntity } from './pages/login/viewModel';

export const state = {
  loginEntity: createEmptyLoginEntity(),
};

```

### ./src/app.tsx

```diff
import Vue, { VNode } from 'vue';
+ import { state } from './state';

export const App = Vue.extend({
+ data: () => state,
  render(h): VNode {
    return (
+     <div>
+       <h1 class="well">{this.loginEntity.login}</h1>
        <router-view />
+     </div>
    );
  },
});

```

### ./src/pages/login/pageContainer.tsx
```diff
import Vue, { VNode } from 'vue';
import { router } from '../../router';
import { loginRequest } from '../../rest-api/api/login';
import { LoginEntity, createEmptyLoginEntity } from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
import { LoginPage } from './page';
+ import { state } from '../../state';

...

export const LoginPageContainer = Vue.extend({
...
- data: () => ({
-   loginEntity: createEmptyLoginEntity(),
- }),
+ data: () => state,
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
+ 'lc-form-validation',
  'vue',
  'vue-router',
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

export interface LoginEntity {
  login: string;
  password: string;
}

export const createEmptyLoginEntity = (): LoginEntity => ({
  login: '',
  password: '',
});

+ export interface LoginError {
+   login: FieldValidationResult;
+   password: FieldValidationResult;
+ }

+ export const createEmptyLoginError = (): LoginError => ({
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

```

- Update `pageContainer`:

### ./src/pages/login/pageContainer.tsx
```diff
import Vue, { VNode } from 'vue';
import { router } from '../../router';
import { loginRequest } from '../../rest-api/api/login';
- import { LoginEntity, createEmptyLoginEntity } from './viewModel';
+ import {
+   LoginEntity, createEmptyLoginEntity,
+   LoginError, createEmptyLoginError,
+ } from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
+ import { validations } from './validations';
import { LoginPage } from './page';

export const LoginPageContainer = Vue.extend({
  render: function(h) {
    return (
      <LoginPage
        loginEntity={this.loginEntity}
+       loginError={this.loginError}
        updateLogin={this.updateLogin}
        loginRequest={this.loginRequest}
      />
    );
  },
  data: () => ({
    loginEntity: createEmptyLoginEntity(),
+   loginError: createEmptyLoginError(),
  }),
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

+     validations.validateField(this.loginEntity, field, value)
+       .then((fieldValidationResult) => {
+         this.loginError = {
+           ...this.loginError,
+           [field]: fieldValidationResult,
+         };
+       })
+       .catch((error) => console.log(error));
    },
    loginRequest() {
+     validations.validateForm(this.loginEntity)
+       .then((formValidationResult) => {
+         if(formValidationResult.succeeded) {
            const loginEntityModel = mapLoginEntityVmToModel(this.loginEntity);
            loginRequest(loginEntityModel)
              .then(() => {
                router.push('/recipe');
              })
              .catch((error) => {
                console.log(error);
              });
+         }
+       })
+       .catch((error) => console.log(error));
    }
  }
});

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

- Update `page`:

### ./src/pages/login/page.tsx

```diff
import Vue, { VNode, PropOptions } from 'vue';
import { HeaderComponent, FormComponent } from './components';
import { FormProps } from './formProps';

export const LoginPage = Vue.extend({
export const LoginPage = Vue.extend({
  props: {
    loginEntity: {},
+   loginError: {},
    updateLogin: {},
    loginRequest: {},
  } as FormProps,
  render(h): VNode {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
              <HeaderComponent />
              <FormComponent
                loginEntity={this.loginEntity}
+               loginError={this.loginError}
                updateLogin={this.updateLogin}
                loginRequest={this.loginRequest}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

```

- Before update `FormComponent`, we are going to create reusable `input with validation`:

### ./src/common/components/form/validation.tsx

```javascript
import Vue, { VNode } from 'vue';

export const Validation = Vue.extend({
  props: [
    'hasError',
    'errorMessage',
    'className',
  ],
  render(h): VNode {
    return (
      <div class={`${this.errorClassName} ${this.className}`}>
        {this.$slots.default}
        {
          this.errorMessage &&
          <div class="help-block">
            {this.errorMessage}
          </div>
        }
      </div>
    );
  },
  computed: {
    errorClassName(): string {
      return (
        this.hasError ?
          'has-error' :
          ''
      )
    },
  }
});

```

>Reference: [Computed Caching vs Methods](https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods)

### ./src/common/components/form/input.tsx

```javascript
import Vue, { VNode } from 'vue';

export const Input = Vue.extend({
  props: [
    'className',
    'placeholder',
    'type',
    'value',
    'inputHandler',
    'label',
    'name',
  ],
  render(h): VNode {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <input
          class="form-control"
          placeholder={this.placeholder}
          type={this.type}
          value={this.value}
          name={this.name}
          onInput={this.onInput}
        />
      </div>
    );
  },
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    }
  }
});

```

### ./src/common/components/form/button.tsx

```javascript
import Vue, { VNode } from 'vue';

export const Button = Vue.extend({
  props: [
    'className',
    'type',
    'label',
    'clickHandler',
    'disabled',
  ],
  render(h): VNode {
    return (
      <button
        class={this.className}
        type={this.type}
        onClick={this.onClick}
        disabled={this.disabled}
      >
        {this.label}
      </button>
    );
  },
  methods: {
    onClick(e) {
      e.preventDefault();
      this.clickHandler();
    }
  }
});

```

### ./src/common/components/form/index.ts

```javascript
export * from './validation';
export * from './input';
export * from './button';

```

- Update `form`:

### ./src/pages/login/components/form.tsx
```diff
import Vue, { VNode, PropOptions } from 'vue';
import { FormProps } from '../formProps';
+ import { Validation, Input, Button } from '../../../common/components/form';

export const FormComponent = Vue.extend({
  props: {
    loginEntity: {},
+   loginError: {},
    updateLogin: {},
    loginRequest: {},
  } as FormProps,
  render(h): VNode {
    return (
      <div class="panel-body">
        <form role="form">
-         <div class="form-group">
-           <input
-             class="form-control"
-             placeholder="e-mail"
-             type="text"
-             value={this.loginEntity.login}
-             onInput={(e) => this.updateLogin('login', e.target.value)}
-           />
-         </div>
+         <Validation
+           hasError={!this.loginError.login.succeeded}
+           errorMessage={this.loginError.login.errorMessage}
+         >
+           <Input
+             placeholder="e-mail"
+             type="text"
+             label="Login"
+             name="login"
+             value={this.loginEntity.login}
+             inputHandler={this.updateLogin}
+           />
+         </Validation>
-         <div class="form-group">
-           <input
-             class="form-control"
-             placeholder="password"
-             type="password"
-             value={this.loginEntity.password}
-             onInput={(e) => this.updateLogin('password', e.target.value)}
-           />
-         </div>
+         <Validation
+           hasError={!this.loginError.password.succeeded}
+           errorMessage={this.loginError.password.errorMessage}
+         >
+           <Input
+             placeholder="password"
+             type="password"
+             label="Password"
+             name="password"
+             value={this.loginEntity.password}
+             inputHandler={this.updateLogin}
+           />
+         </Validation>
-         <button
-           class="btn btn-lg btn-success btn-block"
-           onClick={(e) => {
-               e.preventDefault();
-               this.loginRequest();
-             }
-           }
-         >
-           Login
-         </button>
+         <Button
+           className="btn btn-lg btn-success btn-block"
+           label="Login"
+           clickHandler={this.loginRequest}
+         />
        </form>
      </div>
    );
  }
});

```

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
