import Vue, { VNode } from 'vue';
import { Recipe } from './viewModel';
import { mapRecipeListModelToVm } from './mappers';
import { fetchRecipes } from '../../../rest-api/api/recipe';
import { RecipeListPage } from './page';

export const RecipeListPageContainer = Vue.extend({
  render(h): VNode {
    return (
      <RecipeListPage
        recipes={this.recipes}
      />
    );
  },
  data: () => ({
    recipes: [] as Recipe[],
  }),
  created: function() {
    fetchRecipes()
      .then((recipes) => {
        this.recipes = mapRecipeListModelToVm(recipes);
      })
      .catch((error) => console.log(error));
  },
});
