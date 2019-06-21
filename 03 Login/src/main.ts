import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { router } from './router';
import App from './App.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#root');
