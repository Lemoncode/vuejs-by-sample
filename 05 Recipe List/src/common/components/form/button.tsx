import Vue, { VNode } from 'vue';

export const Button = Vue.extend({
  props: [
    'className',
    'type',
    'label',
    'clickHandler',
    'disabled',
  ],
  render(h): VNode {
    return (
      <button
        class={this.className}
        type={this.type}
        onClick={this.onClick}
        disabled={this.disabled}
      >
        {this.label}
      </button>
    );
  },
  methods: {
    onClick(e) {
      e.preventDefault();
      this.clickHandler();
    }
  }
});
