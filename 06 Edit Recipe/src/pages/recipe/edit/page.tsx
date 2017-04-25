import Vue from 'vue';
import {FormComponent} from './form';

export const EditRecipePage = Vue.extend({
  props: [
    'recipe',
    'recipeError',
    'updateRecipe',
    'addIngredient',
    'removeIngredient',
    'save',
  ],
  render: function(h) {
    return (
      <div>
        <h1>Recipe: {this.recipe.name}</h1>
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