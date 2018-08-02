<template>
  <div class="container-fluid">
    <h1>Recipe {{recipe.name}}</h1>
    <form-component
      :recipe="recipe"
      :recipe-error="recipeError"
      :update-recipe="updateRecipe"
      :add-ingredient="addIngredient"
      :remove-ingredient="removeIngredient"
      :save="save"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { Recipe, RecipeError } from './viewModel';
import { FormComponent } from './components';

interface Props {
  recipe: PropOptions<Recipe>;
  recipeError: PropOptions<RecipeError>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export default Vue.extend({
  name: 'RecipeEditPage',
  components: {
    FormComponent,
  },
  props: {
    recipe: {},
    recipeError: {},
    updateRecipe: {},
    addIngredient: {},
    removeIngredient: {},
    save: {},
  } as Props,
});
</script>