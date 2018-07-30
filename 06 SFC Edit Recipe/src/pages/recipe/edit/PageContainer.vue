<template>
  <edit-recipe-page
    :recipe="recipe"
    :recipeError="recipeError"
    :updateRecipe="updateRecipe"
    :addIngredient="addIngredient"
    :removeIngredient="removeIngredient"
    :save="save"  
  />  
</template>

<script lang="ts">
import Vue from "vue";
import { router } from "../../../router";
import { fetchRecipeById, save } from "../../../rest-api/api/recipe";
import { Recipe, createEmptyRecipe, RecipeError, createEmptyRecipeError } from "./viewModel";
import { mapRecipeModelToVm } from "./mappers";
import EditRecipePage from "./Page.vue";
import { validations } from './validations';

export default Vue.extend({
  name: "EditRecipePageContainer",
  components: {
    EditRecipePage,
  },
  props: {
    id: String,
  },
  data() {
    return {
      recipe: createEmptyRecipe(),
      recipeError: createEmptyRecipeError(),
    };
  },
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

      validations.validateField(this.recipe, field, value)
        .then((result) => {
          this.recipeError = {
            ...this.recipeError,
            [field]: result,
          };
        })
        .catch((error) => console.log(error));      
    },
    addIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients, ingredient],
      };
    },
    removeIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter((i) => {
          return i !== ingredient;
        }),
      };
    },
    save() {
      validations.validateForm(this.recipe)
        .then((result) => {
          result.fieldErrors.map((error) => {
            this.recipeError = {
              ...this.recipeError,
              [error.key as string]: error,
            }
          });
          
          if (result.succeeded) {
            save(this.recipe)
              .then((message) => {
                console.log(message);
                router.back();
              })
              .catch((error) => console.log(error));
          }
        })
        .catch(error => console.log(error));
    },
  },
});
</script>

