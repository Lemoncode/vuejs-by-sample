import Vue, { VNode, PropOptions } from 'vue';

export const IngredientRowComponent = Vue.extend({
  props: {
    ingredient: String,
    removeIngredient: {} as PropOptions<(ingredient) => void>,
  },
  methods: {
    onClick() {
      this.removeIngredient(this.ingredient);
    },
  },
  render(h): VNode {
    return (
      <div class="col-sm-3">
        <label class="col-xs-8">
          {this.ingredient}
        </label>
        <span
          class="btn btn-default"
          onClick={this.onClick}
        >
          <i class="glyphicon glyphicon-remove"></i>
        </span>
      </div>
    );
  },
});
