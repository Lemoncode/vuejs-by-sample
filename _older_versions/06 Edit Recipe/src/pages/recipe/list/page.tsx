import Vue, { VNode, PropOptions } from 'vue';
import { Recipe } from './viewModel';
import { HeaderComponent, RowComponent, SearchBarComponent } from './components';
import { filterRecipesByCommaSeparatedText } from './business/filterRecipeBusiness';

export const RecipeListPage = Vue.extend({
  props: {
    recipes: {} as PropOptions<Recipe[]>,
  },
  data: () => ({
    searchText: '',
  }),
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
  render(h): VNode {
    return (
      <div class="container-fluid">
        <h2>Recipes</h2>
        <SearchBarComponent
          searchText={this.searchText}
          searchInputHandler={this.searchInputHandler}
        />
        <table class="table table-striped">
          <HeaderComponent />
          <tbody>
            {
              this.filteredRecipes.map((recipe) =>
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
