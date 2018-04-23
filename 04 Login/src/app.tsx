import Vue, { VNode } from 'vue';

export const App = Vue.extend({
  render(h): VNode {
    return (
      <router-view />
    );
  },
});
