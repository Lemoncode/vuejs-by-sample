<template>
  <div class="container-fluid">
    <h2>Recipes</h2>
    <search-bar-component
      :search-text="searchText"
      :search-input-handler="searchInputHandler"
    />    
    <table class="table table-striped">
      <header-component />
      <tbody>
        <template v-for="recipe in filteredRecipes">
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
import { HeaderComponent, RowComponent, SearchBarComponent } from './components';
import { filterRecipesByCommaSeparatedText } from './business/filterRecipeBusiness';

export default Vue.extend({
  name: 'RecipeListPage',
  components: {
    HeaderComponent, RowComponent, SearchBarComponent,
  },
  props: {
    recipes: {} as PropOptions<Recipe[]>,
  },
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    searchInputHandler(value: string) {
      this.searchText = value;
    },
  },
  computed: {
    filteredRecipes(): Recipe[] {
      return filterRecipesByCommaSeparatedText(this.recipes, this.searchText);
    },
  },   
});
</script>
