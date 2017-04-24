import Vue from 'vue';
import {FormComponent} from './form';

export const EditRecipePage = Vue.extend({
  props: [
    'recipe',
    'updateRecipe',
    'addIngredient',
    'removeIngredient',
    'save',
  ],
  render: function(h) {
    return (
      <div>
        <h1> Edit Recipe Page {this.id}</h1>
        <FormComponent
          recipe={this.recipe}
          updateRecipe={this.updateRecipe}
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          save={this.save}
        />
      </div>
    );
  }
});