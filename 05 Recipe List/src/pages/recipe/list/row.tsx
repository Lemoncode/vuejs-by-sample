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
          <a class=" btn btn-primary">
            <i class="glyphicon glyphicon-pencil" />
          </a>
        </td>
      </tr>
    );
  }
});