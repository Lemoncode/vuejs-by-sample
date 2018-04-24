import Vue, { VNode, PropOptions } from 'vue';
import { Recipe } from '../viewModel';
const styles = require('./row.css');

export const RowComponent = Vue.extend({
  props: {
    recipe: {} as PropOptions<Recipe>
  },
  render(h): VNode {
    return (
      <tr>
        <td class={styles.name}>
          <span>
            {this.recipe.name}
          </span>
        </td>
        <td class={styles.description}>
          <span>
            {this.recipe.description}
          </span>
        </td>
        <td>
          <router-link
            to={`recipe/${this.recipe.id}`}
            class="btn btn-primary pull-right"
          >
            <i class="glyphicon glyphicon-pencil" />
          </router-link>
        </td>
      </tr>
    );
  },
});
