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
        onClick={onClick(this)}
        disabled={this.disabled}
      >
        {this.label}
      </button>
    );
  },
});

const onClick = (component) => (e) => {
  e.preventDefault();
  component.clickHandler();
};
