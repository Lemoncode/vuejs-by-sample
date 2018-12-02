import Vue, { VNode, PropOptions } from 'vue';
import { Input } from '../../../../common/components/form';

export const SearchBarComponent = Vue.extend({
  props: {
    searchText: String,
    searchInputHandler: {} as PropOptions<(value: string) => void>,
  },
  render(h): VNode {
    return (
      <Input
        type="text"
        name="searchText"
        value={this.searchText}
        placeholder="Search for ingredients comma separated..."
        inputHandler={this.inputHandler}
      />
    );
  },
  methods: {
    inputHandler(field: string, value: string) {
      this.searchInputHandler(value);
    }
  }
});
