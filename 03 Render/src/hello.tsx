import Vue, { VNode } from 'vue';

export const HelloComponent = Vue.extend({
  render(h): VNode {
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
