import Vue, { VNode } from 'vue';

export const Textarea = Vue.extend({
  props: [
    'className',
    'placeholder',
    'value',
    'inputHandler',
    'label',
    'name',
    'rows',
  ],
  render(h): VNode {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <textarea
          class="form-control"
          name={this.name}
          placeholder={this.placeholder}
          rows={this.rows}
          onInput={this.onInput}
        >
          {this.value}
        </textarea>
      </div>
    );
  },
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    },
  },
});
