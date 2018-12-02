import Vue from 'vue';
import { HelloComponent } from './hello';

new Vue({
  el: '#root',
  template: `
    <div>
      <h1>{{message}}</h1>
      <hello
        :message="message"
        :onChange="onChange"
      />
    </div>
  `,
  components: {
    hello: HelloComponent,
  },
  data: {
    message: 'Hello from Vue.js',
  },
  methods: {
    onChange: function(value) {
      this.message = value;
    }
  },
});
