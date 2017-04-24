import Vue from 'vue';

export const InputButtonComponent = Vue.extend({
  props: [
    'className',
    'placeholder',
    'type',
    'value',
    'inputHandler',
    'label',
    'name',
    'buttonText',
    'buttonClickHandler',
    'buttonClassName',
  ],
  render: function(h) {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <div class="input-group">
          <input
            class="form-control"
            name={this.name}
            placeholder={this.placeholder}
            type={this.type}
            value={this.value}
            onInput={this.inputHandler}
          />
          <div class="input-group-btn">
            <button
              class={this.buttonClassName}
              onClick={this.buttonClickHandler}
            >
              {this.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  },
});