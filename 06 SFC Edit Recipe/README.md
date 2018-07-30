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

### ./src/pages/recipe/edit/PageContainer.vue

```javascript
<template>
  <edit-recipe-page
    :recipe="recipe"
    :updateRecipe="updateRecipe"
    :addIngredient="addIngredient"
    :removeIngredient="removeIngredient"
    :save="save"  
  />  
</template>

<script lang="ts">
import Vue from 'vue';
import { router } from '../../../router';
import { fetchRecipeById, save } from '../../../rest-api/api/recipe';
import { Recipe, createEmptyRecipe } from './viewModel';
import { mapRecipeModelToVm } from './mappers';
import EditRecipePage from './Page.vue';

export default Vue.extend({
  name: 'EditRecipePageContainer',
  components: {
    EditRecipePage,
  },
  props: {
    id: String,
  },
  data() {
    return {
      recipe: createEmptyRecipe(),
    };
  },
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
</script>

```

- Update `index`:

### ./src/pages/recipe/edit/index.ts

```diff
- import EditRecipePage from './Page.vue';
+ import EditRecipeContainer from './PageContainer.vue';
- export { EditRecipePage };
+ import { EditRecipeContainer };

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
<template>
  <div :class="`form-group ${className}`">
    <label :for="name">
      {{ label }}
    </label>
    <div class="input-group">
      <input
        class="form-control"
        :placeholder="placeholder"
        :type="type"
        :value="value"
        :name="name"
        @input="onInput"
      />
      <div class="input-group-btn">
        <button
          :class="buttonClassName"
          @click="onButtonClick"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'InputButtonComponent',
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
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    },
    onButtonClick(e) {
      e.preventDefault();
      this.buttonClickHandler(this.value);
    },
  },
});
</script>

```

### ./src/common/components/form/index.tsx

```diff
import ValidationComponent from './Validation.vue';
import InputComponent from './Input.vue';
import ButtonComponent from './Button.vue';
+ import InputButtonComponent from './InputButton.vue';
- export { ValidationComponent, InputComponent, ButtonComponent };
+ export { ValidationComponent, InputComponent, ButtonComponent, InputButtonComponent };

```

- Create `edit recipe` form:

### ./src/pages/recipe/edit/components/Form.vue

```javascript
<template>
  <form class="container">
    <div class="row">
      <validation-component
        :hasError="true"
        errorMessage="Test error"
      >
        <Input
          type="text"
          label="Name"
          name="name"
          :value="recipe.name"
          :inputHandler="updateRecipe"
        />
      </validation-component>
    </div>
    <div class="row">
      <input-button-component
        type="text"
        label="Ingredients"
        name="ingredients"
        placeholder="Add ingredient"
        :value="ingredient"
        :inputHandler="updateIngredient"
        buttonText="Add"
        buttonClassName="btn btn-primary"
        :buttonClickHandler="addIngredient"
      />
    </div>
    <div class="row">
      <div class="form-group pull-right">
        <button-component
          className="btn btn-lg btn-success"
          label="Save"
          :clickHandler="save"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { Recipe } from '../viewModel';
import { ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent } from '../../../../common/components/form';

interface Props {
  recipe: PropOptions<Recipe>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export default Vue.extend({
  name: 'FormComponent',
  components: {
    ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent,
  },
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
})
</script>

```

### ./src/pages/recipe/edit/components/index.ts

```javascript
import EditRecipeForm from './Form.vue';
export { EditRecipeForm };

```

- Update `page`:

### ./src/pages/recipe/edit/Page.vue

```diff
<template>
+  <div>
-  <h1> Edit Recipe Page {{ id }}</h1>
+    <form-component
+      :recipe="recipe"
+      :updateRecipe="updateRecipe"
+      :addIngredient="addIngredient"
+      :removeIngredient="removeIngredient"
+      :save="save"
+    />
+  </div>
</template>

<script lang="ts">
- import Vue from 'vue';
+ import Vue, { PropOptions } from 'vue';
+ import { Recipe } from './viewModel';
+ import { FormComponent } from './components';

+ interface Props {
+   recipe: PropOptions<Recipe>;
+   updateRecipe: PropOptions<(field, value) => void>;
+   addIngredient: PropOptions<(ingredient) => void>;
+   removeIngredient: PropOptions<(ingredient) => void>;
+   save: PropOptions<() => void>;
+ }

export default Vue.extend({
  name: 'EditRecipePage',
+ components: {
+   FormComponent,
+ },
  props: {
-   id: String,
+   recipe: {},
+   updateRecipe: {},
+   addIngredient: {},
+   removeIngredient: {},
+   save: {},
- },
+ } as Props,
});
</script>

```

- Create `ingredients` row and list

### ./src/pages/recipe/edit/components/IngredientRow.vue

```javascript
<template>
  <div class="col-sm-3">
    <label class="col-xs-8">
      {{ ingredient }}
    </label>
    <span
      class="btn btn-default"
      @click="onClick"
    >
      <i class="glyphicon glyphicon-remove"></i>
    </span>
  </div>  
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

export default Vue.extend({
  name: 'IngredientRowComponent',
  props: {
    ingredient: String,
    removeIngredient: {} as PropOptions<(ingredient) => void>,
  },
  methods: {
    onClick() {
      this.removeIngredient(this.ingredient);
    },
  },
});
</script>

```

### ./src/pages/recipe/edit/components/IngredientList.vue

```javascript
<template>
  <div class="form-group panel panel-default">
    <div class="panel-body">
      <template v-for="(ingredient, index) in ingredients">
        <ingredient-row-component
          :key="index"
          :ingredient="ingredient"
          :removeIngredient="removeIngredient"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import IngredientRowComponent from './IngredientRow.vue';

export default Vue.extend({
  name: 'IngredientListComponent',
  components: {
    IngredientRowComponent,
  },
  props: {
    ingredients: {} as PropOptions<string[]>,
    removeIngredient: {} as PropOptions<(ingredient) => void>,
  },
});
</script>

```

- Update `edit recipe` form:

### ./src/pages/recipe/edit/components/Form.vue

```diff
<template>
  <form class="container">
    <div class="row">
      <validation-component
        :hasError="true"
        errorMessage="Test error"
      >
        <Input
          type="text"
          label="Name"
          name="name"
          :value="recipe.name"
          :inputHandler="updateRecipe"
        />
      </validation-component>
    </div>
    <div class="row">
      <input-button-component
        type="text"
        label="Ingredients"
        name="ingredients"
        placeholder="Add ingredient"
        :value="ingredient"
        :inputHandler="updateIngredient"
        buttonText="Add"
        buttonClassName="btn btn-primary"
        :buttonClickHandler="addIngredient"
      />
    </div>
+    <div class="row">    
+      <validation-component
+        :hasError="true"
+        errorMessage="Test error"
+      >
+        <ingredient-list-component
+          :ingredients="recipe.ingredients"
+          :removeIngredient="removeIngredient"
+        />
+      </validation-component>
+    </div>
    <div class="row">
      <div class="form-group pull-right">
        <button-component
          className="btn btn-lg btn-success"
          label="Save"
          :clickHandler="save"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { Recipe } from '../viewModel';
import { ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent } from '../../../../common/components/form';
+ import IngredientListComponent from './IngredientList.vue';

interface Props {
  recipe: PropOptions<Recipe>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export default Vue.extend({
  name: 'FormComponent',
  components: {
-    ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent,
+    ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent, IngredientListComponent,
  },
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
})
</script>

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
<template>
  <form class="container">
    <div class="row">
      <validation-component
        :hasError="true"
        errorMessage="Test error"
      >
        <Input
          type="text"
          label="Name"
          name="name"
          :value="recipe.name"
          :inputHandler="updateRecipe"
        />
      </validation-component>
    </div>
    <div class="row">
      <input-button-component
        type="text"
        label="Ingredients"
        name="ingredients"
        placeholder="Add ingredient"
        :value="ingredient"
        :inputHandler="updateIngredient"
        buttonText="Add"
        buttonClassName="btn btn-primary"
        :buttonClickHandler="addIngredient"
      />
    </div>
    <div class="row">
      <validation-component
        :hasError="true"
        errorMessage="Test error"
      >
        <ingredient-list-component
          :ingredients="recipe.ingredients"
          :removeIngredient="removeIngredient"
        />
      </validation-component>
    </div>
+   <div class="row">
+     <textarea-component
+       class-name="description"
+       label="Description"
+       name="description"
+       placeholder="Description..."
+       rows="10"
+       :value="recipe.description"
+       :input-handler="updateRecipe"
+     />
+   </div>    
    <div class="row">
      <div class="form-group pull-right">
        <button-component
          className="btn btn-lg btn-success"
          label="Save"
          :clickHandler="save"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { Recipe } from '../viewModel';
- import { ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent } from '../../../../common/components/form';
+ import { ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent, TextareaComponent } from '../../../../common/components/form';
import IngredientListComponent from './IngredientList.vue';

interface Props {
  recipe: PropOptions<Recipe>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export default Vue.extend({
  name: 'FormComponent',
  components: {
-    ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent, IngredientListComponent,
+    ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent, IngredientListComponent, TextareaComponent,
  },
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
})
</script>

<style scoped>
.description textarea {
  resize: none;
}
</style>

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

const hasItems = (message) => (value: any[]): FieldValidationResult => ({
  type: 'ARRAY_HAS_ITEMS',
  succeeded: value.length > 0,
  errorMessage: message,
});

export { hasItems };

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

### ./src/pages/recipe/edit/PageContainer.vue

```diff
<template>
  <edit-recipe-page
    :recipe="recipe"
+   :recipeError="recipeError"
    :updateRecipe="updateRecipe"
    :addIngredient="addIngredient"
    :removeIngredient="removeIngredient"
    :save="save"  
  />  
</template>

<script lang="ts">
import Vue from "vue";
import { router } from "../../../router";
import { fetchRecipeById, save } from "../../../rest-api/api/recipe";
- import { Recipe, createEmptyRecipe } from "./viewModel";
+ import { Recipe, createEmptyRecipe, RecipeError, createEmptyRecipeError } from "./viewModel";
import { mapRecipeModelToVm } from "./mappers";
import EditRecipePage from "./Page.vue";
+ import { validations } from './validations';

export default Vue.extend({
  name: "EditRecipePageContainer",
  components: {
    EditRecipePage,
  },
  props: {
    id: String,
  },
  data() {
    return {
      recipe: createEmptyRecipe(),
+     recipeError: createEmptyRecipeError(),
    };
  },
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

+     validations.validateField(this.recipe, field, value)
+       .then((result) => {
+         this.recipeError = {
+           ...this.recipeError,
+           [field]: result,
+         };
+       })
+       .catch((error) => console.log(error));
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
+     validations.validateForm(this.recipe)
+       .then((result) => {
+         result.fieldErrors.map((error) => {
+           this.recipeError = {
+             ...this.recipeError,
+             [error.key as string]: error,
+           }
+         });

+         if (result.succeeded) {
            save(this.recipe)
              .then((message) => {
                console.log(message);
                router.back();
              })
              .catch((error) => console.log(error));
+         }
+       })
+       .catch(error => console.log(error));
    },
  },
});
</script>

```

- Update `page`:

### ./src/pages/recipe/edit/Page.vue

```diff
<template>
  <div>
    <form-component
      :recipe="recipe"
+     :recipeError="recipeError"
      :updateRecipe="updateRecipe"
      :addIngredient="addIngredient"
      :removeIngredient="removeIngredient"
      :save="save"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
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

export default Vue.extend({
  name: 'EditRecipePage',
  components: {
    FormComponent,
  },
  props: {
    recipe: {},
+   recipeError: {},
    updateRecipe: {},
    addIngredient: {},
    removeIngredient: {},
    save: {},
  } as Props,
});
</script>

```

- Update `form`:

### ./src/pages/recipe/edit/components/Form.vue

```diff
<template>
  <form class="container">
    <div class="row">
      <validation-component
-       :hasError="true"
+       :hasError="!recipeError.name.succeeded"
-       errorMessage="Test error"
+       :errorMessage="recipeError.name.errorMessage"
      >
        <Input
          type="text"
          label="Name"
          name="name"
          :value="recipe.name"
          :inputHandler="updateRecipe"
        />
      </validation-component>
    </div>
    <div class="row">
      <input-button-component
        type="text"
        label="Ingredients"
        name="ingredients"
        placeholder="Add ingredient"
        :value="ingredient"
        :inputHandler="updateIngredient"
        buttonText="Add"
        buttonClassName="btn btn-primary"
        :buttonClickHandler="addIngredient"
      />
    </div>
    <div class="row">
      <validation-component
-       :hasError="true"
+       :hasError="!recipeError.ingredients.succeeded"
-       errorMessage="Test error"
+       :errorMessage="recipeError.ingredients.errorMessage"
      >
        <ingredient-list-component
          :ingredients="recipe.ingredients"
          :removeIngredient="removeIngredient"
        />
      </validation-component>
    </div>
    <div class="row">
      <textarea-component
        class-name="description"
        label="Description"
        name="description"
        placeholder="Description..."
        rows="10"
        :value="recipe.description"
        :input-handler="updateRecipe"
      />
    </div>
    <div class="row">
      <div class="form-group pull-right">
        <button-component
          className="btn btn-lg btn-success"
          label="Save"
          :clickHandler="save"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
- import { Recipe } from '../viewModel';
+ import { Recipe, RecipeError } from '../viewModel';
import { ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent, TextareaComponent } from '../../../../common/components/form';
import IngredientListComponent from './IngredientList.vue';

interface Props {
  recipe: PropOptions<Recipe>;
+ recipeError: PropOptions<RecipeError>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export default Vue.extend({
  name: 'FormComponent',
  components: {
    ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent, IngredientListComponent, TextareaComponent,
  },
  props: {
    recipe: {},
+   recipeError: {},
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
})
</script>

<style scoped>
.description textarea {
  resize: none;
}
</style>

```

- Execute the sample:

```
npm start
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
