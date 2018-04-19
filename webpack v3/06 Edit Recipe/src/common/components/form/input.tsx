import Vue, { VNode } from 'vue';

export const Input = Vue.extend({
  props: [
    'className',
    'placeholder',
    'type',
    'value',
    'inputHandler',
    'label',
    'name',
  ],
  render(h): VNode {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <input
          class="form-control"
          placeholder={this.placeholder}
          type={this.type}
          value={this.value}
          name={this.name}
          onInput={this.onInput}
        />
      </div>
    );
  },
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    }
  }
});
