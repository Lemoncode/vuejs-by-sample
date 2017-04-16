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

### ./src/pages/login/header.tsx
```javascript
import Vue from 'vue';

export const HeaderComponent = Vue.extend({
  render: function(h) {
    return (
      <div className="panel-heading">
        <h3 className="panel-title">
          <p>Please sign in</p>
          <p>login: admin / pwd: test</p>
        </h3>
      </div>
    );
  }
});

```

### ./src/pages/login/form.tsx
```javascript
import Vue from 'vue';

export const FormComponent = Vue.extend({
  render: function(h) {
    return (
      <div className="panel-body">
        <form role="form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="e-mail"
              type="text"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="password"
              type="password"
            />
          </div>
          <button
            className="btn btn-lg btn-success btn-block"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
});

```

### ./src/pages/login/page.tsx
```javascript
import Vue from 'vue';
import {HeaderComponent} from './header';
import {FormComponent} from './form';

export const LoginPage = Vue.extend({
  render: function(h) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <HeaderComponent />
              <FormComponent />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

```

### ./src/pages/login/index.ts
```javascript
import {LoginPage} from './page';

export {
  LoginPage
}

```

- Update `main.tsx`:

### ./src/main.tsx
```diff
- import Vue, {ComponentOptions} from 'vue';
+ import Vue from 'vue';
- import {HelloComponent} from './hello';
+ import {LoginPage} from './pages/login';

- interface State extends Vue {
-   message: string;
-   inputHandler: (value: string) => void;
- }

new Vue({
  el: '#root',
  render: function(h) {
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
-   inputHandler: function(value) {
-     this.message = value;
-   }
- }
-} as ComponentOptions<State>);
+});

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
import Router, {RouteConfig} from 'vue-router';
import {LoginPage} from './pages/login';

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
import Vue from 'vue';
- import {LoginPage} from './pages/login';
+ import Router from 'vue-router';
+ import {router} from './router';

+ Vue.use(Router);

new Vue({
- el: '#root',
  render: function(h) {
    return (
-     <LoginPage />
+     <router-view></router-view>
    );
  },
+ router,
-});
+}).$mount('#root');

```

- We can extract render method to `app.tsx` file:

### ./src/app.tsx
```javascript
import Vue from 'vue';

export const App = Vue.extend({
  render: function(h) {
    return (
      <router-view></router-view>
    );
  },
});

```

### ./src/main.tsx
```diff
import Vue from 'vue';
import Router from 'vue-router';
import {router} from './router';
import 

Vue.use(Router);

new Vue({
- render: function(h) {
-   return (
-     <router-view></router-view>
-   );
- },
+ render: (h) => h(App),
  router,
}).$mount('#root');

```

- Create a second page to navigate:

### ./src/pages/recipe/list/page.tsx
```javascript
import Vue from 'vue';

export const RecipeListPage = Vue.extend({
  render: function(h) {
    return (
      <h1> Recipe List Page </h1>
    );
  }
});

```

### ./src/pages/recipe/list/index.ts
```javascript
import {RecipeListPage} from './page';

export {
  RecipeListPage
}

```

- Create route for `RecipeListPage`:

### ./src/router.ts
```diff
import Router, {RouteConfig} from 'vue-router';
import {LoginPage} from './pages/login';
+ import {RecipeListPage} from './pages/recipe/list';

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

### ./src/pages/login/form.tsx
```diff
import Vue from 'vue';

export const FormComponent = Vue.extend({
  render: function(h) {
    return (
      ...
-         <button
+         <router-link to="/recipe"
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

- Create model `LoginEntity`:

### ./src/model/login.ts
```javascript
export interface LoginEntity {
  login: string;
  password: string;
}

```

- Create fake `login` API.

### ./src/api/login/index.ts
```javascript
import {LoginEntity} from '../../model/login';

const loginRequest = (loginEntity: LoginEntity): Promise<boolean> => {
  const isValidLogin = loginEntity.login === 'admin' &&
    loginEntity.password === 'test';

  return isValidLogin ?
    Promise.resolve(isValidLogin) :
    Promise.reject('Not valid login');
}

export const loginAPI = {
  loginRequest,
}

```

- Create `LoginPageContainer`:

### ./src/pages/login/pageContainer.tsx
```javascript
import Vue, {ComponentOptions} from 'vue';
import {LoginPage} from './page';
import {LoginEntity} from '../../model/login';
import {loginAPI} from '../../api/login';
import {router} from '../../router';

interface State extends Vue{
  loginEntity: LoginEntity;
  updateLogin: (login: string, password: string) => void;
  loginRequest: () => void;
}

export const LoginPageContainer = Vue.extend({
  render: function(h) {
    return (
      <LoginPage
        loginEntity={this.loginEntity}
        updateLogin={this.updateLogin}
        loginRequest={this.loginRequest}
      />
    );
  },
  data: function() {
    return {
      loginEntity: {
        login: '',
        password: ''
      },
    }
  },
  methods: {
    updateLogin: function(login: string, password: string) {
      this.loginEntity = {
        login,
        password,
      };
    },
    loginRequest: function() {
      loginAPI.loginRequest(this.loginEntity)
        .then((isValid) => {
          router.push('/recipe');
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
} as ComponentOptions<State>);

```

- Update `LoginPage`:

### ./src/pages/login/page.tsx
```diff
import Vue from 'vue';
import {HeaderComponent} from './header';
import {FormComponent} from './form';

export const LoginPage = Vue.extend({
+ props: [
+   'loginEntity',
+   'updateLogin',
+   'loginRequest',
+ ],
  render: function(h) {
    return (
      <div class="container">
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

### ./src/pages/login/form.tsx
```diff
import Vue from 'vue';

export const FormComponent = Vue.extend({
+ props: [
+   'loginEntity',
+   'updateLogin',
+   'loginRequest',
+ ],
  render: function(h) {
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
-         <router-link to="/recipe"
+         <button
+           onClick={(e) => {
+               e.preventDefault();
+               this.loginRequest();
+             }
+           }
            class="btn btn-lg btn-success btn-block"
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
- import {LoginPage} from './page';
+ import {LoginPageContainer} from './pageContainer';

export {
- LoginPage
+ LoginPageContainer
}

```

- Update `router.ts`

### ./src/router.ts
```diff
import Router, {RouteConfig} from 'vue-router';
- import {LoginPage} from './pages/login';
+ import {LoginPageContainer} from './pages/login';
import {RecipeListPage} from './pages/recipe/list';

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

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.