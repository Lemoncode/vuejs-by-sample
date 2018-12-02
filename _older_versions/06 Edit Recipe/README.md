# 06 Edit Recipe

In this sample we are going to create a `edit recipe` page.

We will take a startup point sample _05 Recipe List_.

Summary steps:
 - Create `API` methods.
 - Create `pageContainer`.
 - Update `page`.
 - Create `common` components.
 - Create `edit recipe` form.
 - Add `form validations` with `lc-form-validation`.

# Steps to build it

## Prerequisites

You will need to have Node.js installed in your computer. In order to follow this step guides you will also need to take sample _05 Recipe List_ as a starting point.

## Steps

- `npm install` to install previous sample dependencies:

```
npm install
```

- Create `API` methods:

### ./src/rest-api/api/recipe/recipe.ts

```diff
import { Recipe } from '../../model';
import { mockRecipes } from './mockData';

+ let recipes = mockRecipes;

export const fetchRecipes = (): Promise<Recipe[]> => {
- return Promise.resolve(mockRecipes);
+ return Promise.resolve(recipes);
};

+ export const fetchRecipeById = (id: number): Promise<Recipe> => {
+   const recipe = recipes.find((r) => r.id === id);
+   return Promise.resolve(recipe as Recipe);
+ };

+ export const save = (recipe: Recipe): Promise<string> => {
+   const index = recipes.findIndex((r) => r.id === recipe.id);

+   return index >= 0 ?
+     saveRecipeByIndex(index, recipe) :
+     Promise.reject('Something was wrong saving recipe :(');
+ };

+ const saveRecipeByIndex = (index: number, recipe: Recipe): Promise<string> => {
+   recipes = [
+     ...recipes.slice(0, index),
+     recipe,
+     ...recipes.slice(index + 1),
+   ];

+   return Promise.resolve('Save recipe success');
+ };

```

- Add `viewModel` and `mappers`:

### ./src/pages/recipe/edit/viewModel.ts

```javascript
export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
}

export const createEmptyRecipe = (): Recipe => ({
  id: 0,
  name: '',
  description: '',
  ingredients: [],
});

```

### ./src/pages/recipe/edit/mappers.ts

```javascript
import * as model from '../../../rest-api/model';
import * as vm from './viewModel';

export const mapRecipeModelToVm = (recipe: model.Recipe): vm.Recipe => ({
  ...recipe,
});

```

- Create `pageContainer`:

### ./src/pages/recipe/edit/pageContainer.tsx

```javascript
import Vue, { VNode } from 'vue';
import { router } from '../../../router';
import { fetchRecipeById, save } from '../../../rest-api/api/recipe';
import { Recipe, createEmptyRecipe } from './viewModel';
import { mapRecipeModelToVm } from './mappers';
import { EditRecipePage } from './page';

export const EditRecipeContainer = Vue.extend({
  render(h): VNode {
    return (
      <EditRecipePage
        recipe={this.recipe}
        updateRecipe={this.updateRecipe}
        addIngredient={this.addIngredient}
        removeIngredient={this.removeIngredient}
        save={this.save}
      />
    );
  },
  props: {
    id: String,
  },
  data: () => ({
    recipe: createEmptyRecipe(),
  }),
  beforeMount() {
    const id = Number(this.id || 0);
    fetchRecipeById(id)
      .then((recipe) => {
        this.recipe = mapRecipeModelToVm(recipe);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    updateRecipe(field: string, value) {
      this.recipe = {
        ...this.recipe,
        [field]: value,
      };
    },
    addIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients, ingredient],
      };
    },
    removeIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter((i) => {
          return i !== ingredient;
        }),
      };
    },
    save() {
      save(this.recipe)
        .then((message) => {
          console.log(message);
          router.back();
        })
        .catch((error) => console.log(error));
    },
  },
});

```

- Update `index`:

### ./src/pages/recipe/edit/index.ts

```diff
- export * from './page';
+ export * from './pageContainer';


```

- Update `router`:

### ./src/pages/recipe/edit/index.ts
```diff
import Router, { RouteConfig } from 'vue-router';
import { LoginPageContainer } from './pages/login';
import { RecipeListPageContainer } from './pages/recipe/list';
- import { EditRecipePage } from './pages/recipe/edit';
+ import { EditRecipeContainer } from './pages/recipe/edit';

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

- Create `common components`:

### ./src/common/components/form/inputButton.tsx

```javascript
import Vue, { VNode } from 'vue';

export const InputButton = Vue.extend({
  props: [
    'className',
    'placeholder',
    'type',
    'value',
    'inputHandler',
    'label',
    'name',
    'buttonText',
    'buttonClickHandler',
    'buttonClassName',
  ],
  render(h): VNode {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <div class="input-group">
          <input
            class="form-control"
            placeholder={this.placeholder}
            type={this.type}
            value={this.value}
            name={this.name}
            onInput={this.onInput}
          />
          <div class="input-group-btn">
            <button
              class={this.buttonClassName}
              onClick={this.onButtonClick}
            >
              {this.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  },
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    },
    onButtonClick(e) {
      e.preventDefault();
      this.buttonClickHandler(this.value);
    },
  }
});

```

### ./src/common/components/form/index.tsx

```diff
export * from './validation';
export * from './input';
export * from './button';
+ export * from './inputButton';


```

- Create `edit recipe` form:

### ./src/pages/recipe/edit/components/form.tsx

```javascript
import Vue, { VNode, PropOptions } from 'vue';
import { Recipe } from '../viewModel';
import { Validation, Input, InputButton, Button } from '../../../../common/components/form';

interface Props {
  recipe: PropOptions<Recipe>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export const FormComponent = Vue.extend({
  props: {
    recipe: {},
    updateRecipe: {},
    addIngredient: {},
    removeIngredient: {},
    save: {},
  } as Props,
  data: () => ({
    ingredient: '',
  }),
  methods: {
    updateIngredient(fieldName, value) {
      this.ingredient = value;
    },
  },
  render(h): VNode {
    return (
      <form class="container">
        <div class="row">
          <Validation
            hasError={true}
            errorMessage="Test error"
          >
            <Input
              type="text"
              label="Name"
              name="name"
              value={this.recipe.name}
              inputHandler={this.updateRecipe}
            />
          </Validation>
        </div>
        <div class="row">
          <InputButton
            type="text"
            label="Ingredients"
            name="ingredients"
            placeholder="Add ingredient"
            value={this.ingredient}
            inputHandler={this.updateIngredient}
            buttonText="Add"
            buttonClassName="btn btn-primary"
            buttonClickHandler={this.addIngredient}
          />
        </div>
        <div class="row">
          <div class="form-group pull-right">
            <Button
              className="btn btn-lg btn-success"
              label="Save"
              clickHandler={this.save}
            />
          </div>
        </div>
      </form>
    );
  },
});

```

### ./src/pages/recipe/edit/components/index.ts

```javascript
export * from './form';

```

- Update `page`:

### ./src/pages/recipe/edit/page.tsx

```diff
- import Vue, { VNode } from 'vue';
+ import Vue, { VNode, PropOptions } from 'vue';
+ import { Recipe } from './viewModel';
+ import { FormComponent } from './components';

+ interface Props {
+   recipe: PropOptions<Recipe>;
+   updateRecipe: PropOptions<(field, value) => void>;
+   addIngredient: PropOptions<(ingredient) => void>;
+   removeIngredient: PropOptions<(ingredient) => void>;
+   save: PropOptions<() => void>;
+ }

export const EditRecipePage = Vue.extend({
  props: {
-   id: String,
+   recipe: {},
+   updateRecipe: {},
+   addIngredient: {},
+   removeIngredient: {},
+   save: {},
- },
+ } as Props,
  render(h): VNode {
    return (
+     <div>
-     <h1> Edit Recipe Page {this.id}</h1>
+       <h1>Recipe {this.recipe.name}</h1>
+       <FormComponent
+         recipe={this.recipe}
+         updateRecipe={this.updateRecipe}
+         addIngredient={this.addIngredient}
+         removeIngredient={this.removeIngredient}
+         save={this.save}
+       />
+     </div>
    );
  }
});

```

- Create `ingredients` row and list

### ./src/pages/recipe/edit/components/ingredientRow.tsx

```javascript
import Vue, { VNode, PropOptions } from 'vue';

export const IngredientRowComponent = Vue.extend({
  props: {
    ingredient: String,
    removeIngredient: {} as PropOptions<(ingredient) => void>,
  },
  methods: {
    onClick() {
      this.removeIngredient(this.ingredient);
    },
  },
  render(h): VNode {
    return (
      <div class="col-sm-3">
        <label class="col-xs-8">
          {this.ingredient}
        </label>
        <span
          class="btn btn-default"
          onClick={this.onClick}
        >
          <i class="glyphicon glyphicon-remove"></i>
        </span>
      </div>
    );
  },
});

```

### ./src/pages/recipe/edit/components/ingredientList.tsx

```javascript
import Vue, { VNode, PropOptions } from 'vue';
import { IngredientRowComponent } from './ingredientRow';

export const IngredientListComponent = Vue.extend({
  props: {
    ingredients: {} as PropOptions<string[]>,
    removeIngredient: {} as PropOptions<(ingredient) => void>,
  },
  render(h): VNode {
    return (
      <div class="form-group panel panel-default">
        <div class="panel-body">
          {
            this.ingredients.map((ingredient, index) => (
              <IngredientRowComponent
                key={index}
                ingredient={ingredient}
                removeIngredient={this.removeIngredient}
              />
            ))
          }
        </div>
      </div>
    );
  },
});

```

- Update `edit recipe` form:

### ./src/pages/recipe/edit/components/form.tsx

```diff
import Vue, { VNode, PropOptions } from 'vue';
import { Recipe } from '../viewModel';
import { Validation, Input, InputButton, Button } from '../../../../common/components/form';
+ import { IngredientListComponent } from './ingredientList';

...
  render: function(h) {
    return (
...
        <div class="row">
          <InputButton
            type="text"
            label="Ingredients"
            name="ingredients"
            placeholder="Add ingredient"
            value={this.ingredient}
            inputHandler={this.updateIngredient}
            buttonText="Add"
            buttonClassName="btn btn-primary"
            buttonClickHandler={this.addIngredient}
          />
        </div>
+       <div class="row">
+         <Validation
+           hasError={true}
+           errorMessage="Test error"
+         >
+           <IngredientListComponent
+             ingredients={this.recipe.ingredients}
+             removeIngredient={this.removeIngredient}
+           />
+         </Validation>
+       </div>
        <div class="row">
          <div class="form-group pull-right">
            <Button
              className="btn btn-lg btn-success"
              label="Save"
              clickHandler={this.save}
            />
          </div>
        </div>
      </form>
    );
  },
});

```

- Create `textarea` common component:

### ./src/common/components/form/textarea.tsx

```javascript
import Vue, { VNode } from 'vue';

export const Textarea = Vue.extend({
  props: [
    'className',
    'placeholder',
    'value',
    'inputHandler',
    'label',
    'name',
    'rows',
  ],
  render(h): VNode {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <textarea
          class="form-control"
          name={this.name}
          placeholder={this.placeholder}
          rows={this.rows}
          onInput={this.onInput}
        >
          {this.value}
        </textarea>
      </div>
    );
  },
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    },
  },
});

```

### ./src/common/components/form/index.tsx

```diff
export * from './validation';
export * from './input';
export * from './button';
export * from './inputButton';
+ export * from './textarea';

```

- Add `form styles`:

### ./src/pages/recipe/edit/components/form.css

```css
.description textarea {
  resize: none;
}

```

- Update `edit recipe` form:

### ./src/pages/recipe/edit/components/form.tsx

```diff
import Vue, { VNode, PropOptions } from 'vue';
import { Recipe } from '../viewModel';
- import { Validation, Input, InputButton, Button } from '../../../../common/components/form';
+ import { Validation, Input, InputButton, Button, Textarea } from '../../../../common/components/form';
import { IngredientListComponent } from './ingredientList';

+ const styles = require('./form.css');

...
  render: function(h) {
    return (
      <form class="container">
        ...
        <div class="row">
          <Validation
            hasError={true}
            errorMessage="Test error"
          >
            <IngredientListComponent
              ingredients={this.recipe.ingredients}
              removeIngredient={this.removeIngredient}
            />
          </Validation>
        </div>
+       <div class="row">
+         <Textarea
+           className={styles.description}
+           label="Description"
+           name="description"
+           placeholder="Description..."
+           rows="10"
+           value={this.recipe.description}
+           inputHandler={this.updateRecipe}
+         />
+       </div>
        <div class="row">
          <div class="form-group pull-right">
            <Button
              className="btn btn-lg btn-success"
              label="Save"
              clickHandler={this.save}
            />
          </div>
        </div>
      </form>
    );
  },
});

```

- Create validation `constraints`:

### ./src/pages/recipe/edit/validations.ts

```javascript
import { ValidationConstraints, createFormValidation, Validators } from 'lc-form-validation';

const constraints: ValidationConstraints = {
  fields: {
    name: [
      { validator: Validators.required }
    ],
  },
};

export const validations = createFormValidation(constraints);

```

- Create custom `validator`:

### ./src/common/validations/array/hasItems.ts

```javascript
import { FieldValidationResult } from 'lc-form-validation';

export const hasItems = (message) => (value: any[]): FieldValidationResult => ({
  type: 'ARRAY_HAS_ITEMS',
  succeeded: value.length > 0,
  errorMessage: message,
});

```

### ./src/common/validations/array/index.ts

```javascript
export { hasItems } from './hasItems';

```

- Update `constraints`:

### ./src/pages/recipe/edit/validations.ts

```diff
import { ValidationConstraints, createFormValidation, Validators } from 'lc-form-validation';
+ import { hasItems } from '../../../common/validations/array';

const constraints: ValidationConstraints = {
  fields: {
    name: [
      { validator: Validators.required }
    ],
+   ingredients: [
+     { validator: hasItems('Should has one or more ingredients') },
+   ],
  },
};

export const validations = createFormValidation(constraints);

```

- Create `recipe error` model:

### ./src/pages/recipe/edit/viewModel.ts

```diff
+ import { FieldValidationResult } from 'lc-form-validation';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
}

export const createEmptyRecipe = (): Recipe => ({
  id: 0,
  name: '',
  description: '',
  ingredients: [],
});

+ export interface RecipeError {
+   name: FieldValidationResult;
+   ingredients: FieldValidationResult;
+ }

+ export const createEmptyRecipeError = (): RecipeError => ({
+   name: {
+     key: 'name',
+     succeeded: true,
+     errorMessage: '',
+     type: '',
+   },
+   ingredients: {
+     key: 'ingredients',
+     succeeded: true,
+     errorMessage: '',
+     type: '',
+   },
+ });

```

- Update `pageContainer`:

### ./src/pages/recipe/edit/pageContainer.tsx
```diff
import Vue, { VNode } from 'vue';
import { router } from '../../../router';
import { fetchRecipeById, save } from '../../../rest-api/api/recipe';
- import { Recipe, createEmptyRecipe } from './viewModel';
+ import { Recipe, createEmptyRecipe, RecipeError, createEmptyRecipeError } from './viewModel';
import { mapRecipeModelToVm } from './mappers';
import { EditRecipePage } from './page';
+ import { validations } from './validations';

export const EditRecipeContainer = Vue.extend({
  render(h): VNode {
    return (
      <EditRecipePage
        recipe={this.recipe}
+       recipeError={this.recipeError}
        updateRecipe={this.updateRecipe}
        addIngredient={this.addIngredient}
        removeIngredient={this.removeIngredient}
        save={this.save}
      />
    );
  },
  props: {
    id: String,
  },
  data: () => ({
    recipe: createEmptyRecipe(),
+   recipeError: createEmptyRecipeError(),
  }),
  beforeMount() {
    const id = Number(this.id || 0);
    fetchRecipeById(id)
      .then((recipe) => {
        this.recipe = mapRecipeModelToVm(recipe);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    updateRecipe(field: string, value) {
      this.recipe = {
        ...this.recipe,
        [field]: value,
      };

+     this.validateRecipeField(field, value);
    },
    addIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients, ingredient],
      };

+     this.validateRecipeField('ingredients', this.recipe.ingredients);
    },
    removeIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter((i) => {
          return i !== ingredient;
        }),
      };

+     this.validateRecipeField('ingredients', this.recipe.ingredients);
    },
+   validateRecipeField: function(field, value) {
+     validations.validateField(this.recipe, field, value)
+       .then(result => this.updateRecipeError(field, result));
+   },
+   updateRecipeError: function(field, result) {
+     this.recipeError = {
+       ...this.recipeError,
+       [field]: result,
+     };
+   },
    save() {
+     validations.validateForm(this.recipe)
+       .then(result => {
+         result.fieldErrors
+           .map(error => this.updateRecipeError(error.key, error));

+         if(result.succeeded) {
            save(this.recipe)
              .then((message) => {
                console.log(message);
                router.back();
              })
              .catch((error) => console.log(error));
+         } else {
+           result.fieldErrors
+             .filter(error => !error.succeeded)
+             .map(error => console.log(`Error in ${error.key}: ${error.errorMessage}`));
+         }
+       });
    },
  },
});

```

- Update `page`:

### ./src/pages/recipe/edit/page.tsx

```diff
import Vue, { VNode, PropOptions } from 'vue';
- import { Recipe } from './viewModel';
+ import { Recipe, RecipeError } from './viewModel';
import { FormComponent } from './components';

interface Props {
  recipe: PropOptions<Recipe>;
+ recipeError: PropOptions<RecipeError>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export const EditRecipePage = Vue.extend({
  props: {
    recipe: {},
+   recipeError: {},
    updateRecipe: {},
    addIngredient: {},
    removeIngredient: {},
    save: {},
  } as Props,
  render(h): VNode {
    return (
      <div>
        <h1>Recipe {this.recipe.name}</h1>
        <FormComponent
          recipe={this.recipe}
+         recipeError={this.recipeError}
          updateRecipe={this.updateRecipe}
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          save={this.save}
        />
      </div>
    );
  }
});

```

- Update `form`:

### ./src/pages/recipe/edit/components/form.tsx
```diff
import Vue, { VNode, PropOptions } from 'vue';
- import { Recipe } from '../viewModel';
+ import { Recipe, RecipeError } from '../viewModel';
import { Validation, Input, InputButton, Button, Textarea } from '../../../../common/components/form';
import { IngredientListComponent } from './ingredientList';

const styles = require('./form.css');

interface Props {
  recipe: PropOptions<Recipe>;
+ recipeError: PropOptions<RecipeError>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export const FormComponent = Vue.extend({
  props: {
    recipe: {},
+   recipeError: {},
    updateRecipe: {},
    addIngredient: {},
    removeIngredient: {},
    save: {},
  } as Props,
...
  render: function(h) {
    return (
      <form class="container">
        <div class="row">
          <Validation
-           hasError={true}
+           hasError={!this.recipeError.name.succeeded}
-           errorMessage="Test error"
+           errorMessage={this.recipeError.name.errorMessage}
          >
            <Input
              type="text"
              label="Name"
              name="name"
              value={this.recipe.name}
              inputHandler={this.updateRecipe}
            />
          </Validation>
        </div>
        <div class="row">
          <InputButton
            type="text"
            label="Ingredients"
            name="ingredients"
            placeholder="Add ingredient"
            value={this.ingredient}
            inputHandler={this.updateIngredient}
            buttonText="Add"
            buttonClassName="btn btn-primary"
            buttonClickHandler={this.addIngredient}
          />
        </div>
        <div class="row">
          <Validation
-           hasError={true}
+           hasError={!this.recipeError.ingredients.succeeded}
-           errorMessage="Test error"
+           errorMessage={this.recipeError.ingredients.errorMessage}
          >
            <IngredientListComponent
              ingredients={this.recipe.ingredients}
              removeIngredient={this.removeIngredient}
            />
          </Validation>
        </div>
        <div class="row">
          <Textarea
            className={styles.description}
            label="Description"
            name="description"
            placeholder="Description..."
            rows="10"
            value={this.recipe.description}
            inputHandler={this.updateRecipe}
          />
        </div>
        <div class="row">
          <div class="form-group pull-right">
            <Button
              className="btn btn-lg btn-success"
              label="Save"
              clickHandler={this.save}
            />
          </div>
        </div>
      </form>
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
