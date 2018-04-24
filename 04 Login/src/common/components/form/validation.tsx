import Vue, { VNode } from 'vue';

export const Validation = Vue.extend({
  props: [
    'hasError',
    'errorMessage',
    'className',
  ],
  render(h): VNode {
    return (
      <div class={`${this.errorClassName} ${this.className}`}>
        {this.$slots.default}
        {
          this.errorMessage &&
          <div class="help-block">
            {this.errorMessage}
          </div>
        }
      </div>
    );
  },
  computed: {
    errorClassName(): string {
      return (
        this.hasError ?
          'has-error' :
          ''
      )
    },
  }
});
