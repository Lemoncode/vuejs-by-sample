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

- Create `recipe` model:

### ./src/model/recipe.ts
```javascript
export interface RecipeEntity {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
}

```

- Create fake `recipe` API:

### ./src/api/recipe/mockData.ts
```javascript
import {RecipeEntity} from '../../model/recipe';

export const mockRecipes: RecipeEntity[] = [
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
]

```

### ./src/api/recipe/index.ts
```javascript
import {RecipeEntity} from '../../model/recipe';
import {mockRecipes} from './mockData';

const fetchRecipes = (): Promise<RecipeEntity[]> => {
  return Promise.resolve(mockRecipes);
}

export const recipeAPI = {
  fetchRecipes,
}

```

- Create `recipe list` page container:

### ./src/pages/recipe/list/pageContainer.tsx
```javascript
import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {recipeAPI} from '../../../api/recipe';
import {RecipeListPage} from './page';

interface State extends Vue {
  recipes: RecipeEntity[];
}

export const RecipeListPageContainer = Vue.extend({
  render: function(h) {
    return (
      <RecipeListPage
        recipes={this.recipes}
      />
    );
  },
  data: function() {
    return {
      recipes: []
    }
  },
  beforeCreate: function() {
    recipeAPI.fetchRecipes()
      .then((recipes) => {
        this.recipes = recipes;
      })
      .catch((error) => {
        console.log(error);
      });
  }
} as ComponentOptions<State>);

```

- Create `header`:

### ./src/pages/recipe/list/header.tsx
```javascript
import Vue from 'vue';

export const HeaderComponent = Vue.extend({
  render: function(h) {
    return (
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
    );
  }
});

```

- To work with CSS Modules, we'll install `webpack-env` typings for use `require`:

```
npm install @types/webpack-env --save-dev
```

- Update `tsconfig.json`:

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
    "allowSyntheticDefaultImports": true,
-   "jsx": "preserve"
+   "jsx": "preserve",
+   "types": [
+     "webpack-env"
+   ]
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

```

- Configure CSS modules:

### ./webpack.config.js
```diff
  ...
  resolve: {
-   extensions: ['.js', '.ts', '.tsx'],
+   extensions: ['.js', '.ts', '.tsx', '.css'],
  },
  ...
  module: {
    rules: [
      ...
      {
        test: /\.css$/,
+       exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
+           options: {
+             module: true,
+             localIdentName: '[name]__[local]___[hash:base64:5]',
+             camelCase: true,
+           }
          },
        }),
      },
+     {
+       test: /\.css$/,
+       include: /node_modules/,
+       loader: ExtractTextPlugin.extract({
+         fallback: 'style-loader',
+         use: {
+           loader: 'css-loader',
+         },
+       }),
+     },
      ...
```

- Create `rowStyles.css`:

### ./src/pages/recipe/list/rowStyles.css
```css
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

```

- Create `row`:

### ./src/pages/recipe/list/row.tsx
```javascript
import Vue from 'vue';
const rowStyles: any = require('./rowStyles');

export const RowComponent = Vue.extend({
  props: [
    'recipe'
  ],
  render: function(h) {
    return (
      <tr>
        <td class={rowStyles.name}>
          <span>
            {this.recipe.name}
          </span>
        </td>
        <td class={rowStyles.description}>
          <span>
            {this.recipe.description}
          </span>
        </td>
        <td>
          <a class="btn btn-primary pull-right">
            <i class="glyphicon glyphicon-pencil" />
          </a>
        </td>
      </tr>
    );
  }
});

```

- Update `recipe list` page:

### ./src/pages/recipe/list/page.tsx
```diff
- import Vue from 'vue';
+ import Vue, {ComponentOptions} from 'vue';
+ import {RecipeEntity} from '../../../model/recipe';
+ import {HeaderComponent} from './header';
+ import {RowComponent} from './row';

+ interface State extends Vue {
+   recipes: RecipeEntity[];
+ }

export const RecipeListPage = Vue.extend({
+ props: [
+   'recipes'
+ ],
  render: function(h) {
    return (
-     <h1> Recipe List Page </h1>
+     <div class="container">
+       <h2>Recipes</h2>
+       <table class="table table-striped">
+         <HeaderComponent />
+         <tbody>
+           {
+             this.recipes.map((recipe) =>
+               <RowComponent
+                 key={recipe.id}
+                 recipe={recipe}
+               />
+             )
+           }
+         </tbody>
+       </table>
+     </div>
    );
  }
-});
+} as ComponentOptions<State>);

```

- Create `SearchBar`:

### ./src/pages/recipe/list/searchBar.tsx
```javascript
import Vue from 'vue';

export const SearchBarComponent = Vue.extend({
  props: [
    'searchInputHandler'
  ],
  render: function(h) {
    return (
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search for ingredients comma separated..."
          onInput={(e) => this.searchInputHandler(e.target.value)}
        />
      </div>
    );
  }
});

```

- Create `filter recipe` business:

### ./src/pages/recipe/list/business/filterRecipeBusiness.ts
```javascript
import {RecipeEntity} from '../../../../model/recipe';

const filterRecipesByCommaSeparatedText = (recipes, searchText) => {
  const searchedIngredients = getSearchedIngredientList(searchText);

  return searchText === '' ?
    recipes :
    filterRecipesBySearchedIngredients(recipes, searchedIngredients);
};

const getSearchedIngredientList = (searchText: string) => {
  return searchText.split(',');
};

const filterRecipesBySearchedIngredients = (recipes, searchedIngredients) => {
  return recipes.filter((recipe: RecipeEntity) => 
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

export const filterRecipeBusiness = {
  filterRecipesByCommaSeparatedText,
};

```

- Update `recipe list` page:

### ./src/pages/recipe/list/page.tsx
```diff
import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {HeaderComponent} from './header';
import {RowComponent} from './row';
+ import {SearchBarComponent} from './searchBar';
+ import {filterRecipeBusiness} from './business/filterRecipeBusiness';

interface State extends Vue {
  recipes: RecipeEntity[];
+ filteredRecipes: RecipeEntity[];
+ searchText: string;
+ searchInputHandler: (value: string) => void;
}

export const RecipeListPage = Vue.extend({
  props: [
    'recipes'
  ],
+ data: function() {
+   return {
+     searchText: ''
+   };
+ },
+ methods: {
+   searchInputHandler: function(value) {
+     this.searchText = value;
+   }
+ },
+ computed: {
+   filteredRecipes: function() {
+     return filterRecipeBusiness.filterRecipesByCommaSeparatedText(this.recipes, this.searchText);
+   }
+ },
  render: function(h) {
    return (
      <div class="container">
        <h2>Recipes</h2>
+       <SearchBarComponent
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
} as ComponentOptions<State>);

```

- Update `index.ts`:

### ./src/pages/recipe/list/index.ts
```diff
- import {RecipeListPage} from './page';
+ import {RecipeListPageContainer} from './pageContainer';

export {
- RecipeListPage
+ RecipeListPageContainer
}

```

- Update `router.ts`:

### ./src/router.ts
```diff
import Router, {RouteConfig} from 'vue-router';
import {LoginPageContainer} from './pages/login';
- import {RecipeListPage} from './pages/recipe/list';
+ import {RecipeListPageContainer} from './pages/recipe/list';

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

- Update `app.tsx`:

### ./src/app.ts
```diff
import Vue from 'vue';

export const App = Vue.extend({
  render: function(h) {
    return (
+     <div class="container-fluid">
        <router-view></router-view>
+     </div>
    );
  },
});

```

- Finally, we are going to create a dummy `edit recipe` page to navigate:

### ./src/pages/recipe/edit/page.tsx
```javascript
import Vue from 'vue';

export const EditRecipePage = Vue.extend({
  props: [
    'id'
  ],
  render: function(h) {
    return (
      <h1> Edit Recipe Page {this.id}</h1>
    );
  }
});

```

### ./src/pages/recipe/edit/index.ts
```javascript
import {EditRecipePage} from './page';

export {
  EditRecipePage
}

```

- Update `router.ts`:

### ./src/router.ts
```diff
import Router, {RouteConfig} from 'vue-router';
import {LoginPageContainer} from './pages/login';
import {RecipeListPageContainer} from './pages/recipe/list';
+ import {EditRecipePage} from './pages/recipe/edit';

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

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.