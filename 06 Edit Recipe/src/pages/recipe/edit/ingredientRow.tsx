import Vue from 'vue';

export const IngredientRowComponent = Vue.extend({
  props: [
    'ingredient',
    'removeIngredient',
  ],
  render: function(h) {
    return (
      <div class="row"> 
        <div class="form-group panel-body">
          <label
            class="col-xs-2"
          >{this.ingredient}</label>
          <span
            class="btn btn-default"
            onClick={this.removeIngredient}
          >
            <i class="glyphicon glyphicon-remove"></i>
          </span>
        </div>
      </div>
    );
  },
});