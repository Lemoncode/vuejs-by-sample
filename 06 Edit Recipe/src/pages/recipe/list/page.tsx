import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {HeaderComponent} from './header';
import {RowComponent} from './row';
import {SearchBarComponent} from './searchBar';
import {filterRecipeBusiness} from './business/filterRecipeBusiness';

interface State extends Vue {
  recipes: RecipeEntity[];
  filteredRecipes: RecipeEntity[];
  searchText: string;
  searchInputHandler: (value: string) => void;
}

export const RecipeListPage = Vue.extend({
  props: [
    'recipes'
  ],
  data: function() {
    return {
      searchText: ''
    };
  },
  methods: {
    searchInputHandler: function(value) {
      this.searchText = value;
    }
  },
  computed: {
    filteredRecipes: function() {
      return filterRecipeBusiness.filterRecipesByCommaSeparatedText(this.recipes, this.searchText);
    }
  },
  render: function(h) {
    return (
      <div class="container">
        <h2>Recipes</h2>
        <SearchBarComponent
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
  }
} as ComponentOptions<State>);