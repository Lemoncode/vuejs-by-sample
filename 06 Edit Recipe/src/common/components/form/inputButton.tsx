import Vue, { VNode } from 'vue';

export const InputButton = Vue.extend({
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
  render(h): VNode {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <div class="input-group">
          <input
            class="form-control"
            placeholder={this.placeholder}
            type={this.type}
            value={this.value}
            name={this.name}
            onInput={this.onInput}
          />
          <div class="input-group-btn">
            <button
              class={this.buttonClassName}
              onClick={this.onButtonClick}
            >
              {this.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  },
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    },
    onButtonClick(e) {
      e.preventDefault();
      this.buttonClickHandler(this.value);
    },
  }
});
