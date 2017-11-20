import Vue, { VNode } from 'vue';

export const HeaderComponent = Vue.extend({
  render(h): VNode {
    return (
      <thead>
        <th>
          Name
        </th>
        <th>
          Description
        </th>
        <th>
        </th>
      </thead>
    );
  }
});
