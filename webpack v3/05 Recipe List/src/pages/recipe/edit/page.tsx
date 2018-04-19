import Vue, { VNode } from 'vue';

export const EditRecipePage = Vue.extend({
  props: {
    id: String,
  },
  render(h): VNode {
    return (
      <h1> Edit Recipe Page {this.id}</h1>
    );
  }
});
