import Vue, { VNode } from 'vue';

export const HelloComponent = Vue.extend({
  template: `
    <input
      :value="message"
      @input="onChange($event.target.value)"
    />
  `,
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
