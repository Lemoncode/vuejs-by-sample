import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {RecipeError} from '../../../model/recipeError';
import {recipeAPI} from '../../../api/recipe';
import {EditRecipePage} from './page';
import {router} from '../../../router';
import {editFormValidation} from './validations/editFormValidation';

interface State extends Vue {
  recipe: RecipeEntity;
  recipeError: RecipeError;
  updateRecipe: (field, value) => void;
  addIngredient: (ingredient) => void;
  removeIngredient: (ingredient) => void;
  save: () => void;
}

export const EditRecipeContainer = Vue.extend({
  render: function(h) {
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
  props: [
    'id'
  ],
  data: function() {
    return {
      recipe: new RecipeEntity(),
      recipeError: new RecipeError(),
    };
  },
  beforeMount: function() {
    const id = Number(this["id"]) || 0;
    recipeAPI.fetchRecipeById(id)
      .then((recipe) => {
        this.recipe = recipe;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    updateRecipe: function(field: string, value) {
      this.recipe = {
        ...this.recipe,
        [field]: value,
      };

      editFormValidation.validateField(this.recipe, field, value)
        .then((result) => {
          this.recipeError = {
            ...this.recipeError,
            [field]: result,
          };
        })
        .catch((error) => console.log(error));
    },
    addIngredient: function(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients, ingredient],
      }
    },
    removeIngredient: function(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter((i) => {
          return i !== ingredient;
        }),
      }
    },
    save: function() {
      editFormValidation.validateForm(this.recipe)
        .then((result) => {
          result.fieldErrors.map((error) => {
            this.recipeError = {
              ...this.recipeError,
              [error.key]: error,
            }
          });
          
          if(result.succeeded) {
            recipeAPI.save(this.recipe)
              .then((message) => {
                console.log(message);
                router.back();
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    },
  }
} as ComponentOptions<State>);

