<template>
  <form class="container">
    <div class="row">
      <validation-component
        :hasError="!recipeError.name.succeeded"
        :errorMessage="recipeError.name.errorMessage"
      >
        <input-component
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
        :hasError="!recipeError.ingredients.succeeded"
        :errorMessage="recipeError.ingredients.errorMessage"
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
  data() {
    return {
      ingredient: '',
    };
  },
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
