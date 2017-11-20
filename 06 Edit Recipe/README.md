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

### ./src/rest-api/api/recipe/index.ts

```diff
import { Recipe } from '../../model';
import { mockRecipes } from './mockData';

+ let recipes = mockRecipes;

export const fetchRecipes = (): Promise<Recipe[]> => {
- return Promise.resolve(mockRecipes);
+ return Promise.resolve(recipes);
};

+ export const fetchRecipeById = (id: number): Promise<Recipe | undefined> => {
+   const recipe = recipes.find((r) => r.id === id);
+   return Promise.resolve(recipe);
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
import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {recipeAPI} from '../../../api/recipe';
import {EditRecipePage} from './page';
import {router} from '../../../router';

interface State extends Vue {
  recipe: RecipeEntity;
  updateRecipe: (field, value) => void;
  addIngredient: (ingredient) => void;
  removeIngredient: (ingredient) => void;
  save: () => void;
}

export const EditRecipeContainer = Vue.extend({
  render: function(h) {
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
  props: [
    'id'
  ],
  data: function() {
    return {
      recipe: new RecipeEntity(),
    };
  },
  beforeMount: function() {
    const id = Number(this["id"]) || 0;
    recipeAPI.fetchRecipeById(id)
      .then((recipe) => {
        this.recipe = recipe;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    updateRecipe: function(field: string, value) {
      this.recipe = {
        ...this.recipe,
        [field]: value,
      };
    },
    addIngredient: function(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients, ingredient],
      }
    },
    removeIngredient: function(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter((i) => {
          return i !== ingredient;
        }),
      }
    },
    save: function() {
      recipeAPI.save(this.recipe)
        .then((message) => {
          console.log(message);
          router.back();
        })
        .catch((error) => console.log(error));
    },
  }
} as ComponentOptions<State>);

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
-   'id'
+   'recipe',
+   'updateRecipe',
+   'addIngredient',
+   'removeIngredient',
+   'save',
  ],
  render: function(h) {
    return (
      <div>
-       <h1> Edit Recipe Page {this.id}</h1>
+       <h1>Recipe: {this.recipe.name}</h1>
-       <FormComponent />
+       <FormComponent
+         recipe={this.recipe}
+         updateRecipe={this.updateRecipe}
+         addIngredient={this.addIngredient}
+         removeIngredient={this.removeIngredient}
+         save={this.save}
+       />
      </div>
    );
  }
});

```

- Create `common components`:

### ./src/common/components/form/inputButton.tsx
```javascript
import Vue from 'vue';

export const InputButtonComponent = Vue.extend({
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
  render: function(h) {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <div class="input-group">
          <input
            class="form-control"
            name={this.name}
            placeholder={this.placeholder}
            type={this.type}
            value={this.value}
            onInput={this.inputHandler}
          />
          <div class="input-group-btn">
            <button
              class={this.buttonClassName}
              onClick={this.buttonClickHandler}
            >
              {this.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  },
});

```

### ./src/common/components/form/index.tsx
```javascript
import {InputComponent} from './input';
import {ValidationComponent} from './validation';
import {InputButtonComponent} from './inputButton';

export {
  InputComponent,
  ValidationComponent,
  InputButtonComponent,
}

```

- Create `edit recipe` form:

### ./src/pages/recipe/edit/form.tsx
```javascript
import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {
  ValidationComponent, InputComponent, InputButtonComponent
} from '../../../common/components/form';

interface FormComponentProperties extends Vue {
  recipe: RecipeEntity;
  updateRecipe: (field, value) => void;
  addIngredient: (ingredient) => void;
  removeIngredient: (ingredient) => void;
  save: () => void;
  ingredient: string;
  addIngredientHandler: (event) => void;
}

export const FormComponent = Vue.extend({
  props: [
    'recipe',
    'updateRecipe',
    'addIngredient',
    'removeIngredient',
    'save',
  ],
  data: function() {
    return {
      ingredient: ''
    }
  },
  methods: {
    addIngredientHandler: function(e) {
      e.preventDefault();
      if(this.ingredient) {
        this.addIngredient(this.ingredient);
      }
    },
  },
  render: function(h) {
    return (
      <form class="container">
        <div class="row">
          <ValidationComponent
            hasError={true}
            errorMessage="Test error"
          >
            <InputComponent
              type="text"
              label="Name"
              name="name"
              value={this.recipe.name}
              inputHandler={(e) => { this.updateRecipe('name', e.target.value)}}
            />
          </ValidationComponent>
        </div>
        <div class="row">
          <InputButtonComponent
            label="Ingredients"
            type="text"
            placeholder="Add ingredient"
            value={this.ingredient}
            inputHandler={(e) => { this.ingredient = e.target.value}}
            buttonText="Add"
            buttonClassName="btn btn-primary"
            buttonClickHandler={this.addIngredientHandler}
          />
        </div>
        <div class="row">
          <div class="form-group pull-right">
            <button
              type="button"
              class="btn btn-lg btn-success"
              onClick={this.save}
              >
                Save
              </button>
          </div>
        </div>
      </form>
    );
  },
} as ComponentOptions<FormComponentProperties>);

```

- Create `ingredients` row and list

### ./src/pages/recipe/edit/ingredientRow.tsx
```javascript
import Vue from 'vue';

export const IngredientRowComponent = Vue.extend({
  props: [
    'ingredient',
    'removeIngredient',
  ],
  render: function(h) {
    return (
      <div class="col-sm-3">
        <label class="col-xs-8">
          {this.ingredient}
        </label>
        <span
          class="btn btn-default"
          onClick={() => this.removeIngredient(this.ingredient)}
        >
          <i class="glyphicon glyphicon-remove"></i>
        </span>
      </div>
    );
  },
});

```

### ./src/pages/recipe/edit/ingredientList.tsx
```javascript
import Vue from 'vue';
import {IngredientRowComponent} from './ingredientRow';

export const IngredientListComponent = Vue.extend({
  props: [
    'ingredients',
    'removeIngredient',
  ],
  render: function(h) {
    return (
      <div class="form-group panel panel-default">
        <div class="panel-body">
          {
            this.ingredients.map((ingredient, index) =>
              <IngredientRowComponent
                key={index}
                ingredient={ingredient}
                removeIngredient={this.removeIngredient}
              />
            )
          }
        </div>
      </div>
    );
  },
});

```

- Update `edit recipe` form:

### ./src/pages/recipe/edit/form.tsx
```diff
import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {
  ValidationComponent, InputComponent, InputButtonComponent
} from '../../../common/components/form';
+ import {IngredientListComponent} from './ingredientList';

interface FormComponentProperties extends Vue {
  recipe: RecipeEntity;
  updateRecipe: (field, value) => void;
  addIngredient: (ingredient) => void;
  removeIngredient: (ingredient) => void;
  save: () => void;
  ingredient: string;
  addIngredientHandler: (event) => void;
}

export const FormComponent = Vue.extend({
  props: [
    'recipe',
    'updateRecipe',
    'addIngredient',
    'removeIngredient',
    'save',
  ],
  data: function() {
    return {
      ingredient: ''
    }
  },
  methods: {
    addIngredientHandler: function(e) {
      e.preventDefault();
      if(this.ingredient) {
        this.addIngredient(this.ingredient);
      }
    },
  },
  render: function(h) {
    return (
      <form class="container">
        <div class="row">
          <ValidationComponent
            hasError={true}
            errorMessage="Test error"
          >
            <InputComponent
              type="text"
              label="Name"
              name="name"
              value={this.recipe.name}
              inputHandler={(e) => { this.updateRecipe('name', e.target.value)}}
            />
          </ValidationComponent>
        </div>
        <div class="row">
          <InputButtonComponent
            label="Ingredients"
            type="text"
            placeholder="Add ingredient"
            value={this.ingredient}
            inputHandler={(e) => { this.ingredient = e.target.value}}
            buttonText="Add"
            buttonClassName="btn btn-primary"
            buttonClickHandler={this.addIngredientHandler}
          />
        </div>
+       <div class="row">
+         <ValidationComponent
+           hasError={true}
+           errorMessage="Test error"
+         >
+           <IngredientListComponent
+             ingredients={this.recipe.ingredients}
+             removeIngredient={this.removeIngredient}
+           />
+         </ValidationComponent>
+       </div>
        <div class="row">
          <div class="form-group pull-right">
            <button
              type="button"
              class="btn btn-lg btn-success"
              onClick={this.save}
              >
                Save
              </button>
          </div>
        </div>
      </form>
    );
  },
} as ComponentOptions<FormComponentProperties>);

```

- Create `textarea` common component:

### ./src/common/components/form/textarea.tsx
```javascript
import Vue from 'vue';

export const TextareaComponent = Vue.extend({
  props: [
    'className',
    'placeholder',
    'value',
    'inputHandler',
    'label',
    'name',
    'rows',
  ],
  render: function(h) {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <textarea
          class="form-control"
          name={this.name}
          placeholder={this.placeholder}
          onInput={this.inputHandler}
          rows={this.rows}
        >
          {this.value}
        </textarea>
      </div>
    );
  },
});

```

### ./src/common/components/form/index.tsx
```diff
import {InputComponent} from './input';
import {ValidationComponent} from './validation';
import {InputButtonComponent} from './inputButton';
+ import {TextareaComponent} from './textarea';

export {
  InputComponent,
  ValidationComponent,
  InputButtonComponent,
+ TextareaComponent,
}

```

- Add `form styles`:

### ./src/pages/recipe/edit/formStyles.css
```css
.description textarea {
  resize: none;
}

```

- Update `edit recipe` form:

### ./src/pages/recipe/edit/form.tsx
```diff
import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {
  ValidationComponent, InputComponent, InputButtonComponent,
+ TextareaComponent
} from '../../../common/components/form';
import {IngredientListComponent} from './ingredientList';

+ const classNames: any = require('./formStyles');

interface FormComponentProperties extends Vue {
  recipe: RecipeEntity;
  updateRecipe: (field, value) => void;
  addIngredient: (ingredient) => void;
  removeIngredient: (ingredient) => void;
  save: () => void;
  ingredient: string;
  addIngredientHandler: (event) => void;
}

export const FormComponent = Vue.extend({
  props: [
    'recipe',
    'updateRecipe',
    'addIngredient',
    'removeIngredient',
    'save',
  ],
  data: function() {
    return {
      ingredient: ''
    }
  },
  methods: {
    addIngredientHandler: function(e) {
      e.preventDefault();
      if(this.ingredient) {
        this.addIngredient(this.ingredient);
      }
    },
  },
  render: function(h) {
    return (
      <form class="container">
        <div class="row">
          <ValidationComponent
            hasError={true}
            errorMessage="Test error"
          >
            <InputComponent
              type="text"
              label="Name"
              name="name"
              value={this.recipe.name}
              inputHandler={(e) => { this.updateRecipe('name', e.target.value)}}
            />
          </ValidationComponent>
        </div>
        <div class="row">
          <InputButtonComponent
            label="Ingredients"
            type="text"
            placeholder="Add ingredient"
            value={this.ingredient}
            inputHandler={(e) => { this.ingredient = e.target.value}}
            buttonText="Add"
            buttonClassName="btn btn-primary"
            buttonClickHandler={this.addIngredientHandler}
          />
        </div>
        <div class="row">
          <ValidationComponent
            hasError={true}
            errorMessage="Test error"
          >
            <IngredientListComponent
              ingredients={this.recipe.ingredients}
              removeIngredient={this.removeIngredient}
            />
          </ValidationComponent>
        </div>
+       <div class="row">
+         <TextareaComponent
+           className={classNames.description}
+           label="Description"
+           name="description"
+           placeholder="Description..."
+           rows="10"
+           value={this.recipe.description}
+           inputHandler={(e) => { this.updateRecipe('description', e.target.value)}}
+         />
+       </div>
        <div class="row">
          <div class="form-group pull-right">
            <button
              type="button"
              class="btn btn-lg btn-success"
              onClick={this.save}
              >
                Save
              </button>
          </div>
        </div>
      </form>
    );
  },
} as ComponentOptions<FormComponentProperties>);

```

- Create validation `constraints`:

### ./src/pages/recipe/edit/validations/editFormValidation.ts
```javascript
import {
  ValidationConstraints, createFormValidation, Validators
} from 'lc-form-validation';
import {hasItems} from './arrayValidation';

const constraints: ValidationConstraints = {
  fields: {
    name: [
      { validator: Validators.required }
    ],
    ingredients: [
      { validator: hasItems('Should has one or more ingredients')}
    ]
  }
};

export const editFormValidation = createFormValidation(constraints);

```

- Create custom `validator`:

### ./src/pages/recipe/edit/validations/arrayValidation.ts
```javascript
import {FieldValidationResult} from 'lc-form-validation';

export const hasItems = (message) => (value: any[]): FieldValidationResult => {
  return {
    type: 'ARRAY_HAS_ITEMS',
    succeeded: value.length > 0,
    errorMessage: message,
  }
}

```

- Update `constraints`:

### ./src/pages/recipe/edit/validations/editFormValidation.ts
```diff
import {
  ValidationConstraints, createFormValidation, Validators
} from 'lc-form-validation';
+ import {hasItems} from './arrayValidation';

const constraints: ValidationConstraints = {
  fields: {
    name: [
      { validator: Validators.required }
    ],
+   ingredients: [
+     { validator: hasItems('Should has one or more ingredients')}
+   ]
  }
};

export const editFormValidation = createFormValidation(constraints);

```

- Create `recipe error` model:

### ./src/model/recipeError.ts
```javascript
import {FieldValidationResult} from 'lc-form-validation';

export class RecipeError {
  name: FieldValidationResult;
  ingredients: FieldValidationResult;

  constructor() {
    this.name = new FieldValidationResult();
    this.name.succeeded = true;

    this.ingredients = new FieldValidationResult();
    this.ingredients.succeeded = true;
  }
}

```

- Update `pageContainer`:

### ./src/pages/recipe/edit/pageContainer.tsx
```diff
import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {recipeAPI} from '../../../api/recipe';
import {EditRecipePage} from './page';
import {router} from '../../../router';
+ import {editFormValidation} from './validations/editFormValidation';

interface State extends Vue {
  recipe: RecipeEntity;
+ recipeError: RecipeError;
  updateRecipe: (field, value) => void;
  addIngredient: (ingredient) => void;
  removeIngredient: (ingredient) => void;
  save: () => void;
}

export const EditRecipeContainer = Vue.extend({
  render: function(h) {
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
  props: [
    'id'
  ],
  data: function() {
    return {
      recipe: new RecipeEntity(),
+     recipeError: new RecipeError(),
    };
  },
  beforeMount: function() {
    const id = Number(this["id"]) || 0;
    recipeAPI.fetchRecipeById(id)
      .then((recipe) => {
        this.recipe = recipe;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    updateRecipe: function(field: string, value) {
      this.recipe = {
        ...this.recipe,
        [field]: value,
      };

+     editFormValidation.validateField(this.recipe, field, value)
+       .then((result) => {
+         this.recipeError = {
+           ...this.recipeError,
+           [field]: result,
+         };
+       })
+       .catch((error) => console.log(error));
    },
    addIngredient: function(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients, ingredient],
      }
    },
    removeIngredient: function(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter((i) => {
          return i !== ingredient;
        }),
      }
    },
    save: function() {
+     editFormValidation.validateForm(this.recipe)
+       .then((result) => {
+         result.fieldErrors.map((error) => {
+           this.recipeError = {
+             ...this.recipeError,
+             [error.key]: error,
+           }
+         });

+         if(result.succeeded) {
            recipeAPI.save(this.recipe)
              .then((message) => {
                console.log(message);
                router.back();
              })
              .catch((error) => console.log(error));
+         }
+       })
+       .catch((error) => console.log(error));
    },
  }
} as ComponentOptions<State>);

```

- Update `page`:

### ./src/pages/recipe/edit/page.tsx
```diff
import Vue from 'vue';
import {FormComponent} from './form';

export const EditRecipePage = Vue.extend({
  props: [
    'recipe',
+   'recipeError',
    'updateRecipe',
    'addIngredient',
    'removeIngredient',
    'save',
  ],
  render: function(h) {
    return (
      <div>
        <h1>Recipe: {this.recipe.name}</h1>
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

### ./src/pages/recipe/edit/form.tsx
```diff
import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
+ import {RecipeError} from '../../../model/recipeError';
import {
  ValidationComponent, InputComponent, InputButtonComponent,
  TextareaComponent
} from '../../../common/components/form';
import {IngredientListComponent} from './ingredientList';

const classNames: any = require('./formStyles');

interface FormComponentProperties extends Vue {
  recipe: RecipeEntity;
+ recipeError: RecipeError;
  updateRecipe: (field, value) => void;
  addIngredient: (ingredient) => void;
  removeIngredient: (ingredient) => void;
  save: () => void;
  ingredient: string;
  addIngredientHandler: (event) => void;
}

export const FormComponent = Vue.extend({
  props: [
    'recipe',
+   'recipeError',
    'updateRecipe',
    'addIngredient',
    'removeIngredient',
    'save',
  ],
  data: function() {
    return {
      ingredient: ''
    }
  },
  methods: {
    addIngredientHandler: function(e) {
      e.preventDefault();
      if(this.ingredient) {
        this.addIngredient(this.ingredient);
      }
    },
  },
  render: function(h) {
    return (
      <form class="container">
        <div class="row">
          <ValidationComponent
-           hasError={true}
+           hasError={!this.recipeError.name.succeeded}
-           errorMessage="Test error"
+           errorMessage={this.recipeError.name.errorMessage}
          >
            <InputComponent
              type="text"
              label="Name"
              name="name"
              value={this.recipe.name}
              inputHandler={(e) => { this.updateRecipe('name', e.target.value)}}
            />
          </ValidationComponent>
        </div>
        <div class="row">
          <InputButtonComponent
            label="Ingredients"
            type="text"
            placeholder="Add ingredient"
            value={this.ingredient}
            inputHandler={(e) => { this.ingredient = e.target.value}}
            buttonText="Add"
            buttonClassName="btn btn-primary"
            buttonClickHandler={this.addIngredientHandler}
          />
        </div>
        <div class="row">
          <ValidationComponent
-           hasError={true}
+           hasError={!this.recipeError.ingredients.succeeded}
-           errorMessage="Test error"
+           errorMessage={this.recipeError.ingredients.errorMessage}
          >
            <IngredientListComponent
              ingredients={this.recipe.ingredients}
              removeIngredient={this.removeIngredient}
            />
          </ValidationComponent>
        </div>
        <div class="row">
          <TextareaComponent
            className={classNames.description}
            label="Description"
            name="description"
            placeholder="Description..."
            rows="10"
            value={this.recipe.description}
            inputHandler={(e) => { this.updateRecipe('description', e.target.value)}}
          />
        </div>
        <div class="row">
          <div class="form-group pull-right">
            <button
              type="button"
              class="btn btn-lg btn-success"
              onClick={this.save}
              >
                Save
              </button>
          </div>
        </div>
      </form>
    );
  },
} as ComponentOptions<FormComponentProperties>);

```

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
