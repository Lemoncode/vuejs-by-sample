<template>
  <input-component
    type="text"
    name="searchText"
    placeholder="Search for ingredients comma separated..."
    :value="searchText"
    :input-handler="inputHandler"
/>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { InputComponent } from '../../../../common/components/form';

export default Vue.extend({
  name: 'SearchBarComponent',
  components: {
    InputComponent,
  },
  props: {
    searchText: String,
    searchInputHandler: {} as PropOptions<(value: string) => void>,
  },
  methods: {
    inputHandler(field: string, value: string) {
      this.searchInputHandler(value);
    }
  }
});
</script>
