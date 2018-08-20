import Vue, { VNode } from 'vue';
import { router } from '../../../router';
import { fetchRecipeById, save } from '../../../rest-api/api/recipe';
import { Recipe, createEmptyRecipe, RecipeError, createEmptyRecipeError } from './viewModel';
import { mapRecipeModelToVm } from './mappers';
import { EditRecipePage } from './page';
import { validations } from './validations';

export const EditRecipeContainer = Vue.extend({
  render(h): VNode {
    return (
      <EditRecipePage
        recipe={this.recipe}
        recipeError={this.recipeError}
        updateRecipe={this.updateRecipe}
        addIngredient={this.addIngredient}
        removeIngredient={this.removeIngredient}
        save={this.save}
      />
    );
  },
  props: {
    id: String,
  },
  data: () => ({
    recipe: createEmptyRecipe(),
    recipeError: createEmptyRecipeError(),
  }),
  beforeMount() {
    const id = Number(this.id || 0);
    fetchRecipeById(id)
      .then((recipe) => {
        this.recipe = mapRecipeModelToVm(recipe);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    updateRecipe(field: string, value) {
      this.recipe = {
        ...this.recipe,
        [field]: value,
      };

      this.validateRecipeField(field, value);
    },
    addIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients, ingredient],
      };

      this.validateRecipeField('ingredients', this.recipe.ingredients);
    },
    removeIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter((i) => {
          return i !== ingredient;
        }),
      };

      this.validateRecipeField('ingredients', this.recipe.ingredients);
    },
    validateRecipeField: function(field, value) {
      validations.validateField(this.recipe, field, value)
      .then(result => this.updateRecipeError(field, result));
    },
    updateRecipeError: function(field, result) {
      this.recipeError = {
        ...this.recipeError,
        [field]: result,
      };
    },    
    save() {
      validations.validateForm(this.recipe)
        .then(result => {
          result.fieldErrors
            .map(error => this.updateRecipeError(error.key, error));

          if (result.succeeded) {
            save(this.recipe)
              .then((message) => {
                console.log(message);
                router.back();
              })
              .catch((error) => console.log(error));
          } else {
            result.fieldErrors
              .filter(error => !error.succeeded)
              .map(error => console.log(`Error in ${error.key}: ${error.errorMessage}`));
          }
        });
    },
  },
});
