<template>
  <div :class="`form-group ${className}`">
    <label :for="name">
      {{ label }}
    </label>
    <textarea
      class="form-control"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      :value="value"
      @input="onInput"
    />
  </div>  
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TextareaComponent',
  props: [
    'className',
    'placeholder',
    'value',
    'inputHandler',
    'label',
    'name',
    'rows',
  ],
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    },
  },  
})
</script>
