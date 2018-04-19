import Vue from 'vue';

export const HelloComponent = Vue.extend({
  template: `
    <input
      :value="message"
      @input="onChange($event.target.value)"
    />
  `,
  props: {
    message: String,
    onChange: Function,
  },
});
