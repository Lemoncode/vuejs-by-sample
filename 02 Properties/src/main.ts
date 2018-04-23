import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div>
      <h1>{{message}}</h1>
      <input
        v-model="message"
      />
    </div>
  `,
  data: {
    message: 'Hello from Vue.js',
  },
});
