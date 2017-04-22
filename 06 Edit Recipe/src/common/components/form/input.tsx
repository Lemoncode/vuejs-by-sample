import Vue from 'vue';

export const InputComponent = Vue.extend({
  props: [
    'className',
    'placeholder',
    'type',
    'value',
    'inputHandler',
    'label',
    'name',
  ],
  render: function(h) {
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
          onInput={this.inputHandler}
        />
      </div>
    );
  },
});