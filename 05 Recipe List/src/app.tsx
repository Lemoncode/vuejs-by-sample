import Vue from 'vue';

export const App = Vue.extend({
  render: function(h) {
    return (
      <div class="container-fluid">
        <router-view></router-view>
      </div>
    );
  },
});