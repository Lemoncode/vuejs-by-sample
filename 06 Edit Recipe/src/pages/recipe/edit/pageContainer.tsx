import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {recipeAPI} from '../../../api/recipe';
import {EditRecipePage} from './page';
import {router} from '../../../router';

interface State extends Vue {
  recipe: RecipeEntity;
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
      recipeAPI.save(this.recipe)
        .then((message) => {
          console.log(message);
          router.back();
        })
        .catch((error) => console.log(error));
    },
  }
} as ComponentOptions<State>);