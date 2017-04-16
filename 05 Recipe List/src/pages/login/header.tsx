import Vue from 'vue';

export const HeaderComponent = Vue.extend({
  render: function(h) {
    return (
      <div class="panel-heading">
        <h3 class="panel-title">
          <p>Please sign in</p>
          <p>login: admin / pwd: test</p>
        </h3>
      </div>
    );
  }
});