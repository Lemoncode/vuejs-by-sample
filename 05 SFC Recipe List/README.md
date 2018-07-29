# 05 Recipe List

In this sample we are going to create a `recipe list` page.

We will take a startup point sample _04 Login_.

Summary steps:
 - Create `recipe` model.
 - Create fake `recipe` API.
 - Create `recipe list` page container.
 - Update `recipe list` page.
 - Navigate to `edit recipe` page.

# Steps to build it

## Prerequisites

You will need to have Node.js installed in your computer. In order to follow this step guides you will also need to take sample _04 Login_ as a starting point.

## Steps

- `npm install` to install previous sample dependencies:

```
npm install
```

- Create `recipe` api model:

### ./src/rest-api/model/recipe.ts

```javascript
export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
}

```

### ./src/rest-api/model/index.ts

```diff
export * from './login';
+ export * from './recipe';

```

- Create fake `recipe` API:

### ./src/rest-api/api/recipe/mockData.ts

```javascript
import { Recipe } from '../../model';

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    name: 'Omelette',
    description: `
     1. For a basic omelette, crack the eggs into a mixing bowl with a pinch of sea salt and black pepper. Beat well with a fork.
     2. Heat a small knob of butter in a small frying pan on a low heat, and once melted and bubbling, add the eggs and move the pan around to spread them out evenly.
     3. When the omelette begins to cook and firm up, but still has a little raw egg on top, sprinkle over the cheese (if using).
     4. Using a spatula, ease around the edges of the omelette, then fold it over in half. When it starts to turn golden brown underneath, remove the pan from the heat and slide the omelette on to a plate.
    `,
    ingredients: [
      '2 eggs',
      'cheese',
      'salt',
      'black pepper',
    ],
  },
  {
    id: 2,
    name: 'Salad with tomatoes',
    description: `
     1. Combine salad, tomatoes, avocados, garlic and onion in a large bowl.
     2. Sprinkle with lemon juice, and season with salt and pepper.
     3. Garnish salad with thin lemon slices.
    `,
    ingredients: [
      'salad',
      '2 tomatoes',
      '2 avocados',
      '1 tooth garlic',
      '1 onion',
      'lemon juice',
      'salt',
      'pepper'
    ],
  },
  {
    id: 3,
    name: 'Spaghetti with tomato sauce',
    description: `
     1. Brown beef over medium heat. Drain off fat.
     2. In a large pot, combine beef, salt, oregano, pepper, garlic powder, onion flakes, diced tomatoes, tomato sauce, and mushrooms. Simmer at a low heat setting for 2 hours, stirring occasionally
     3. Cook pasta according to package directions. Drain. Serve sauce over spaghetti.
    `,
    ingredients: [
      'spaghetti',
      '1 beef',
      '1/4 teaspoon garlic powder',
      '1 onion',
      '3 tomatoes',
      '4 mushrooms',
      'oregano',
      'salt',
    ],
  },
];

```

### ./src/rest-api/api/recipe/recipe.ts

```javascript
import { Recipe } from '../../model';
import { mockRecipes } from './mockData';

export const fetchRecipes = (): Promise<Recipe[]> => {
  return Promise.resolve(mockRecipes);
};

```

### ./src/rest-api/api/recipe/index.ts

```javascript
export * from './recipe';

```

- Create `recipe` viewModel:

### ./src/pages/recipe/list/viewModel.ts

```javascript
export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
}

```

- Create `mapper` to map from model to viewModel:

### ./src/pages/recipe/list/mappers.ts

```javascript
import * as model from '../../../rest-api/model';
import * as vm from './viewModel';

export const mapRecipeListModelToVm = (recipes: model.Recipe[]): vm.Recipe[] => (
  recipes.map(mapRecipeModelToVm)
);

const mapRecipeModelToVm = (recipe: model.Recipe): vm.Recipe => ({
  ...recipe,
});

```

- Create `recipe list` page container:

### ./src/pages/recipe/list/pageContainer.tsx

```javascript
<template>
  <recipe-list-page
    :recipes="recipes"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Recipe } from './viewModel';
import { mapRecipeListModelToVm } from './mappers';
import { fetchRecipes } from '../../../rest-api/api/recipe';
import RecipeListPage from './Page.vue';

export default Vue.extend({
  name: 'RecipeListPageContainer',
  components: {
    RecipeListPage,
  },
  data: () => ({
    recipes: [] as Recipe[],
  }),
  created: function() {
    fetchRecipes()
      .then((recipes) => {
        this.recipes = mapRecipeListModelToVm(recipes);
      })
      .catch((error) => console.log(error));
  },
});
</script>

```

- Create `header`:

### ./src/pages/recipe/list/components/Header.vue

```javascript
<template>
  <thead>
    <th>
      Name
    </th>
    <th>
      Description
    </th>
    <th>
    </th>
  </thead>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HeaderComponent',
});
</script>

```

- To work with CSS Modules, we'll install `webpack-env` typings for use `require`:

```
npm install @types/webpack-env --save-dev
```

- Configure CSS modules:

### ./webpack.config.js

```diff
  ...
  ...
  module: {
    rules: [
      ...
      {
        test: /\.css$/,
+       include: /node_modules/,
        use: [
          env !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
+     {
+       test: /\.css$/,
+       exclude: /node_modules/,
+       oneOf: [
+         {
+           resourceQuery: /module/,
+           use: [
+             'vue-style-loader',
+             {
+               loader: 'css-loader',
+               options: {
+                 modules: true,
+                 localIdentName: '[name]__[local]__[hash:base64:5]'
+               }
+             }
+           ]
+         },
+         {
+           use: [
+             env !== 'production'
+               ? 'vue-style-loader'
+               : MiniCssExtractPlugin.loader,
+             'css-loader'
+           ],
+         }
+       ],
+     },
  ...
```

[More info about CSS Modules with `vue-loader`](https://vue-loader.vuejs.org/guide/css-modules.html#usage)

- Create `row`:

### ./src/pages/recipe/list/components/Row.vue

```javascript
<template>
  <tr>
    <td :class="$style.name">
      <span>
        {{ recipe.name }}
      </span>
    </td>
    <td :class="$style.description">
      <span>
        {{ recipe.description }}
      </span>
    </td>
    <td>
      <a class="btn btn-primary pull-right">
        <i class="glyphicon glyphicon-pencil" />
      </a>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Recipe } from "../viewModel";

export default Vue.extend({
  name: "RowComponent",
  props: {
    recipe: {} as PropOptions<Recipe>
  }
});
</script>

<style module>
.name {
  width: 25%;
}

.description {
  max-width: 177px;
}

.description span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
}
</style>

```

### ./src/pages/recipe/list/components/index.ts

```javascript
import HeaderComponent from './Header.vue';
import RowComponent from './Row.vue';

export { HeaderComponent, RowComponent };

```

- Update `recipe list` page:

### ./src/pages/recipe/list/Page.vue

```diff
<template>
  <div class="container-fluid">
-    <h1> Recipe List Page </h1>  
+    <h2>Recipes</h2>
+    <table class="table table-striped">
+      <header-component />
+      <tbody>
+        <template v-for="recipe in recipes">
+          <row-component
+            :key="recipe.id"
+            :recipe="recipe"
+          />
+        </template>
+      </tbody>
+    </table>
  </div>  
</template>

<script lang="ts">
- import Vue from 'vue';
+ import Vue, { PropOptions } from 'vue';
+ import { Recipe } from './viewModel';
+ import { HeaderComponent, RowComponent } from './components';

export default Vue.extend({
  name: 'RecipeListPage',
  components: {
    HeaderComponent, RowComponent,
  },
+ props: {
+   recipes: {} as PropOptions<Recipe[]>,
+ },  
});
</script>

```

- Update `index.ts`:

### ./src/pages/recipe/list/index.ts

```diff
- import RecipeListPage from './Page.vue';
- export { RecipeListPage };
+ import RecipeListPageContainer from './PageContainer.vue';
+ export { RecipeListPageContainer };

```

- Update `router.ts`:

### ./src/router.ts

```diff
import Router, { RouteConfig } from 'vue-router';
import { LoginPageContainer } from './pages/login';
- import { RecipeListPage } from './pages/recipe/list';
+ import { RecipeListPageContainer } from './pages/recipe/list';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPageContainer },
- { path: '/recipe', component: RecipeListPage },
+ { path: '/recipe', component: RecipeListPageContainer },
];

export const router = new Router({
  routes
});

```

- Create `SearchBar`:

### ./src/pages/recipe/list/components/searchBar.tsx

```javascript
import Vue, { VNode, PropOptions } from 'vue';
import { Input } from '../../../../common/components/form';

export const SearchBarComponent = Vue.extend({
  props: {
    searchText: String,
    searchInputHandler: {} as PropOptions<(value: string) => void>,
  },
  render(h): VNode {
    return (
      <Input
        type="text"
        name="searchText"
        value={this.searchText}
        placeholder="Search for ingredients comma separated..."
        inputHandler={this.inputHandler}
      />
    );
  },
  methods: {
    inputHandler(field: string, value: string) {
      this.searchInputHandler(value);
    }
  }
});

```

### ./src/pages/recipe/list/components/index.ts

```diff
export * from './header';
export * from './row';
+ export * from './searchBar';

```

- Create `filter recipe` business:

### ./src/pages/recipe/list/business/filterRecipeBusiness.ts

```javascript
import { Recipe } from '../viewModel';

export const filterRecipesByCommaSeparatedText = (recipes, searchText) => {
  const searchedIngredients = getSearchedIngredientList(searchText);

  return searchText === '' ?
    recipes :
    filterRecipesBySearchedIngredients(recipes, searchedIngredients);
};

const getSearchedIngredientList = (searchText: string) => {
  return searchText.split(',');
};

const filterRecipesBySearchedIngredients = (recipes, searchedIngredients) => {
  return recipes.filter((recipe: Recipe) =>
    matchAllSearchedIngredients(recipe.ingredients, searchedIngredients)
  );
};

const matchAllSearchedIngredients = (ingredients, searchedIngredients) => {
  return searchedIngredients.every((searchedIngredient) =>
    matchSearchedIngredient(searchedIngredient, ingredients)
  );
};

const matchSearchedIngredient = (searchedIngredient: string, ingredients: string[]) => {
  return ingredients.some((ingredient) =>
    matchIngredient(ingredient, searchedIngredient)
  );
};

const matchIngredient = (ingredient, searchedIngredient) => {
  const searchedIngredientLowerCase = searchedIngredient.toLowerCase().trim();
  const ingredientLowerCase = ingredient.toLowerCase().trim();

  return ingredientLowerCase.indexOf(searchedIngredientLowerCase) >= 0;
};

```

- Update `recipe list` page:

### ./src/pages/recipe/list/page.tsx
```diff
import Vue, { VNode, PropOptions } from 'vue';
import { Recipe } from './viewModel';
- import { HeaderComponent, RowComponent } from './components';
+ import { HeaderComponent, RowComponent, SearchBarComponent } from './components';
+ import { filterRecipesByCommaSeparatedText } from './business/filterRecipeBusiness';

export const RecipeListPage = Vue.extend({
  props: {
    recipes: {} as PropOptions<Recipe[]>,
  },
+ data: () => ({
+   searchText: '',
+ }),
+ methods: {
+   searchInputHandler(value: string) {
+     this.searchText = value;
+   },
+ },
+ computed: {
+   filteredRecipes(): Recipe[] {
+     return filterRecipesByCommaSeparatedText(this.recipes, this.searchText);
+   },
+ },
  render(h): VNode {
    return (
      <div class="container">
        <h2>Recipes</h2>
+       <SearchBarComponent
+         searchText={this.searchText}
+         searchInputHandler={this.searchInputHandler}
+       />
        <table class="table table-striped">
          <HeaderComponent />
          <tbody>
            {
-             this.recipes.map((recipe) =>
+             this.filteredRecipes.map((recipe) =>
                <RowComponent
                  key={recipe.id}
                  recipe={recipe}
                />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
});

```

- Finally, we are going to create a dummy `edit recipe` page to navigate:

### ./src/pages/recipe/edit/page.tsx

```javascript
import Vue, { VNode } from 'vue';

export const EditRecipePage = Vue.extend({
  props: {
    id: String,
  },
  render(h): VNode {
    return (
      <h1> Edit Recipe Page {this.id}</h1>
    );
  }
});

```

### ./src/pages/recipe/edit/index.ts

```javascript
export * from './page';

```

- Update `router.ts`:

### ./src/router.ts
```diff
import Router, { RouteConfig } from 'vue-router';
import { LoginPageContainer } from './pages/login';
import { RecipeListPageContainer } from './pages/recipe/list';
+ import { EditRecipePage } from './pages/recipe/edit';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPageContainer },
  { path: '/recipe', component: RecipeListPageContainer },
+ { path: '/recipe/:id', component: EditRecipePage, props: true },
];

export const router = new Router({
  routes
});

```

- Finally, we need to update the `row` component:

### ./src/pages/recipe/list/components/row.tsx

```diff
import Vue, { VNode, PropOptions } from 'vue';
import { Recipe } from '../viewModel';
const styles = require('./row.css');

export const RowComponent = Vue.extend({
  props: {
    recipe: {} as PropOptions<Recipe>
  },
  render(h): VNode {
    return (
      <tr>
        <td class={styles.name}>
          <span>
            {this.recipe.name}
          </span>
        </td>
        <td class={styles.description}>
          <span>
            {this.recipe.description}
          </span>
        </td>
        <td>
-         <a class="btn btn-primary pull-right">
+         <router-link
+           to={`recipe/${this.recipe.id}`}
+           class="btn btn-primary pull-right"
+         >
            <i class="glyphicon glyphicon-pencil" />
-         </a>
+         </router-link>
        </td>
      </tr>
    );
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
