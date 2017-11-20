import Vue, { VNode } from 'vue';

export const Validation = Vue.extend({
  props: [
    'hasError',
    'errorMessage',
    'className',
  ],
  render(h): VNode {
    let wrapperClass = `${this.className}`;

    if (this.hasError) {
      wrapperClass = `${wrapperClass} has-error`;
    }

    return (
      <div class={wrapperClass}>
        {this.$slots.default}
        <div class="help-block">
          {this.errorMessage}
        </div>
      </div>
    );
  },
});
