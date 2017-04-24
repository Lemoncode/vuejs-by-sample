# 06 Edit Recipe

In this sample we are going to create a `edit recipe` page.

We will take a startup point sample _05 Recipe List_.

Summary steps:
 - Create `API` methods.
 - Create `pageContainer`.
 - Update `page`.
 - Create `edit recipe` form.

# Steps to build it

## Prerequisites

You will need to have Node.js installed in your computer. In order to follow this step guides you will also need to take sample _05 Recipe List_ as a starting point.

## Steps

- `npm install` to install previous sample dependencies:

```
npm install
```

- Create `API` methods:

### ./src/api/recipe/index.ts
```diff
import {RecipeEntity} from '../../model/recipe';
import {mockRecipes} from './mockData';

const fetchRecipes = (): Promise<RecipeEntity[]> => {
  return Promise.resolve(mockRecipes);
}

export const recipeAPI = {
  fetchRecipes,
}

```

- Create `pageContainer`:

### ./src/pages/recipe/edit/pageContainer.tsx
```javascript
```

- Update `index`:

### ./src/pages/recipe/edit/index.ts
```diff
- import {EditRecipePage} from './page';
+ import {EditRecipeContainer} from './pageContainer';

export {
- EditRecipePage
+ EditRecipeContainer
}

```

- Update `router`:

### ./src/pages/recipe/edit/index.ts
```diff
import Router, {RouteConfig} from 'vue-router';
import {LoginPageContainer} from './pages/login';
import {RecipeListPageContainer} from './pages/recipe/list';
- import {EditRecipePage} from './pages/recipe/edit';
+ import {EditRecipeContainer} from './pages/recipe/edit';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPageContainer },
  { path: '/recipe', component: RecipeListPageContainer },
- { path: '/recipe/:id', component: EditRecipePage, props: true },
+ { path: '/recipe/:id', component: EditRecipeContainer, props: true },
];

export const router = new Router({
  routes
});

```

- Update `page`:

### ./src/pages/recipe/edit/page.tsx
```diff
import Vue from 'vue';
import {FormComponent} from './form';

export const EditRecipePage = Vue.extend({
  props: [
    'id'
  ],
  render: function(h) {
    return (
      <div>
        <h1> Edit Recipe Page {this.id}</h1>
        <FormComponent />
      </div>
    );
  }
});

```

- Create `common components`:

### ./src/common/components/form/inputButton.tsx
```javascript
```
### ./src/common/components/form/textarea.tsx
```javascript
```

### ./src/common/components/form/index.tsx
```javascript
```

- Create `edit recipe` form:

### ./src/pages/recipe/edit/form.tsx
```javascript
```

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.