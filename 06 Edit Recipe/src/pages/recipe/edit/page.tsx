import Vue from 'vue';

export const EditRecipePage = Vue.extend({
  props: [
    'id'
  ],
  render: function(h) {
    return (
      <h1> Edit Recipe Page {this.id}</h1>
    );
  }
});