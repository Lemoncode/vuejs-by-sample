import Vue, { VNode, PropOptions } from 'vue';
import { Recipe } from './viewModel';
import { HeaderComponent, RowComponent } from './components';

export const RecipeListPage = Vue.extend({
  props: {
    recipes: {} as PropOptions<Recipe[]>,
  },
  render(h): VNode {
    return (
      <div class="container-fluid">
        <h2>Recipes</h2>
        <table class="table table-striped">
          <HeaderComponent />
          <tbody>
            {
              this.recipes.map((recipe) =>
                <RowComponent
                  key={recipe.id}
                  recipe={recipe}
                />
              )
            }
          </tbody>
        </table>
      </div>
    );
  },
});
