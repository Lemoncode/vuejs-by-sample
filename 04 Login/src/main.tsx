import Vue, { VNode } from 'vue';
import Router from 'vue-router';
import { router } from './router';
import { App } from './app';

Vue.use(Router);

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#root');
