<template>
  <div>
    <form-component
      :recipe="recipe"
      :updateRecipe="updateRecipe"
      :addIngredient="addIngredient"
      :removeIngredient="removeIngredient"
      :save="save"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { Recipe } from './viewModel';
import { FormComponent } from './components';

interface Props {
  recipe: PropOptions<Recipe>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export default Vue.extend({
  name: 'EditRecipePage',
  components: {
    FormComponent,
  }
  props: {
    recipe: {},
    updateRecipe: {},
    addIngredient: {},
    removeIngredient: {},
    save: {},
  } as Props,
});
</script>
