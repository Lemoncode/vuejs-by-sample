import Vue from 'vue';

export const HelloComponent = Vue.extend({
  render: function (h) {
    return (
      <input
        value={this.message}
        onInput={(e) => this.inputHandler(e.target.value)}
      />
    );
  },
  props: {
    message: String,
    inputHandler: Function,
  },
});