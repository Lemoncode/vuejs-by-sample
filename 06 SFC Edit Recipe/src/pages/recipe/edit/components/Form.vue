<template>
  <form class="container">
    <div class="row">
      <validation-component
        :has-error="!recipeError.name.succeeded"
        :error-message="recipeError.name.errorMessage"
      >
        <input-component
          type="text"
          label="Name"
          name="name"
          :value="recipe.name"
          :input-handler="updateRecipe"
        />
      </validation-component>
    </div>
    <div class="row">
      <input-button-component
        type="text"
        label="Ingredients"
        name="ingredients"
        placeholder="Add ingredient"
        button-text="Add"
        button-class-name="btn btn-primary"
        :value="ingredient"
        :input-handler="updateIngredient"
        :button-click-handler="addIngredient"
      />
    </div>
    <div class="row">
      <validation-component
        :has-error="!recipeError.ingredients.succeeded"
        :error-message="recipeError.ingredients.errorMessage"
      >
        <ingredient-list-component
          :ingredients="recipe.ingredients"
          :remove-ingredient="removeIngredient"
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
          class-name="btn btn-lg btn-success"
          label="Save"
          :click-handler="save"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { Recipe, RecipeError } from '../viewModel';
import { ValidationComponent, InputComponent, InputButtonComponent, ButtonComponent, TextareaComponent } from '../../../../common/components/form';
import IngredientListComponent from './IngredientList.vue';

interface Props {
  recipe: PropOptions<Recipe>;
  recipeError: PropOptions<RecipeError>;
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
    recipeError: {},
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