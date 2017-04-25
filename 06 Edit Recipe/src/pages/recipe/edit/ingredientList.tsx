import Vue from 'vue';
import {IngredientRowComponent} from './ingredientRow';

export const IngredientListComponent = Vue.extend({
  props: [
    'ingredients',
    'removeIngredient',
  ],
  render: function(h) {
    return (
      <div class="form-group panel panel-default">
        <div class="panel-body">
          {
            this.ingredients.map((ingredient, index) =>
              <IngredientRowComponent
                key={index}
                ingredient={ingredient}
                removeIngredient={this.removeIngredient}
              />
            )
          }
        </div>
      </div>
    );
  },
});