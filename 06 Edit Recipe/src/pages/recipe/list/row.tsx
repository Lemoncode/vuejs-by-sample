import Vue from 'vue';
const rowStyles: any = require('./rowStyles');

export const RowComponent = Vue.extend({
  props: [
    'recipe'
  ],
  render: function(h) {
    return (
      <tr>
        <td class={rowStyles.name}>
          <span>
            {this.recipe.name}
          </span>
        </td>
        <td class={rowStyles.description}>
          <span>
            {this.recipe.description}
          </span>
        </td>
        <td>
          <router-link
            to={`recipe/${this.recipe.id}`}
            class="btn btn-primary pull-right">
              <i class="glyphicon glyphicon-pencil" />
          </router-link>
        </td>
      </tr>
    );
  }
});