import Vue from 'vue';

export const SearchBarComponent = Vue.extend({
  props: [
    'searchInputHandler'
  ],
  render: function(h) {
    return (
      <input
        type="text"
        class="form-control"
        placeholder="Search for ingredients comma separated..."
        onInput={(e) => this.searchInputHandler(e.target.value)}
      />
    );
  }
});