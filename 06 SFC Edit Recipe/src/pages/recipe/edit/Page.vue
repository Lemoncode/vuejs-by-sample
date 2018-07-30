<template>
  <div>
    <form-component
      :recipe="recipe"
      :recipeError="recipeError"
      :updateRecipe="updateRecipe"
      :addIngredient="addIngredient"
      :removeIngredient="removeIngredient"
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
  name: 'EditRecipePage',
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
