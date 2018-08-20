<template>
  <div class="form-group panel panel-default">
    <div class="panel-body">
      <template v-for="(ingredient, index) in ingredients">
        <ingredient-row-component
          :key="index"
          :ingredient="ingredient"
          :remove-ingredient="removeIngredient"
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