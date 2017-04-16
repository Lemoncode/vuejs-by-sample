import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {recipeAPI} from '../../../api/recipe';
import {RecipeListPage} from './page';

interface State extends Vue {
  recipes: RecipeEntity[];
}

export const RecipeListPageContainer = Vue.extend({
  render: function(h) {
    return (
      <RecipeListPage
        recipes={this.recipes}
      />
    );
  },
  data: function() {
    return {
      recipes: []
    }
  },
  beforeCreate: function() {
    recipeAPI.fetchRecipes()
      .then((recipes) => {
        this.recipes = recipes;
      })
      .catch((error) => {
        console.log(error);
      });
  }
} as ComponentOptions<State>);