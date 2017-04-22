import Vue from 'vue';

export const HeaderComponent = Vue.extend({
  render: function(h) {
    return (
      <thead>
        <th>
          Name
        </th>
        <th>
          Description
        </th>
        <th>
        </th>
      </thead>
    );
  }
});