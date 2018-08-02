import Vue from 'vue';
import Router from 'vue-router';
import { router } from './router';
import App from './App.vue';

Vue.use(Router);

new Vue({
  el: '#root',
  router,
  render: (h) => h(App),
});
