import Vue, { VNode, PropOptions } from 'vue';
import { Recipe, RecipeError } from './viewModel';
import { FormComponent } from './components';

interface Props {
  recipe: PropOptions<Recipe>;
  recipeError: PropOptions<RecipeError>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export const EditRecipePage = Vue.extend({
  props: {
    recipe: {},
    recipeError: {},
    updateRecipe: {},
    addIngredient: {},
    removeIngredient: {},
    save: {},
  } as Props,
  render(h): VNode {
    return (
      <div>
        <h1>Recipe {this.recipe.name}</h1>
        <FormComponent
          recipe={this.recipe}
          recipeError={this.recipeError}
          updateRecipe={this.updateRecipe}
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          save={this.save}
        />
      </div>
    );
  }
});
