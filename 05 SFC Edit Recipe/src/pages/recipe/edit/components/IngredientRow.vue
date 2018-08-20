<template>
  <div class="col-sm-3">
    <label class="col-xs-8">
      {{ ingredient }}
    </label>
    <span
      class="btn btn-default"
      @click="removeIngredient(ingredient)"
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
});
</script>