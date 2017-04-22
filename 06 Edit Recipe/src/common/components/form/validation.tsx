import Vue from 'vue';

export const ValidationComponent = Vue.extend({
  props: [
    'hasError',
    'errorMessage',
    'className',
  ],
  render: function(h) {
    let wrapperClass = `${this.className}`;

    if(this.hasError) {
      wrapperClass = `${wrapperClass} has-error`
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