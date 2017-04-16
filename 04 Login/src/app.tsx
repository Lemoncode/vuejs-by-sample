import Vue from 'vue';

export const App = Vue.extend({
  render: function(h) {
    return (
      <router-view></router-view>
    );
  },
});