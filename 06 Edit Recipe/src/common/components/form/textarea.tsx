import Vue from 'vue';

export const TextareaComponent = Vue.extend({
  props: [
    'className',
    'placeholder',
    'value',
    'inputHandler',
    'label',
    'name',
    'rows',
  ],
  render: function(h) {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <textarea
          class="form-control"
          name={this.name}
          placeholder={this.placeholder}
          onInput={this.inputHandler}
          rows={this.rows}
        >
          {this.value}
        </textarea>
      </div>
    );
  },
});