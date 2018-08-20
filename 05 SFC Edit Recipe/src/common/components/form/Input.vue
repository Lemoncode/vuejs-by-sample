<template>
  <div :class="`form-group ${className}`">
    <label :for="name">
      {{ label }}
    </label>
    <input
      class="form-control"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      :name="name"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'InputComponent',
  props: [
    'className',
    'placeholder',
    'type',
    'value',
    'inputHandler',
    'label',
    'name',
  ],
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    }
  },
});
</script>
