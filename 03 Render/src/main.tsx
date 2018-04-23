import Vue, { VNode } from 'vue';
import { HelloComponent } from './hello';

new Vue({
  el: '#root',
  render(h): VNode {
    return (
      <div>
        <h1>{this.message}</h1>
        <HelloComponent
          message={this.message}
          inputHandler={this.inputHandler}
        />
      </div>
    );
  },
  data: {
    message: 'Hello from Vue.js',
  },
  methods: {
    inputHandler(value) {
      this.message = value;
    }
  },
});
