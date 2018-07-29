<template>
  <div class="container-fluid">
    <h2>Recipes</h2>
    <table class="table table-striped">
      <header-component />
      <tbody>
        <template v-for="recipe in recipes">
          <row-component
            :key="recipe.id"
            :recipe="recipe"
          />
        </template>
      </tbody>
    </table>
  </div>  
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { Recipe } from './viewModel';
import { HeaderComponent, RowComponent } from './components';

export default Vue.extend({
  name: 'RecipeListPage',
  components: {
    HeaderComponent, RowComponent,
  },
  props: {
    recipes: {} as PropOptions<Recipe[]>,
  },  
});
</script>
