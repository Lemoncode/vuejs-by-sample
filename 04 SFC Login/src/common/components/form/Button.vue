<template>
  <button
    :class="className"
    :type="type"
    @click="onClick"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ButtonComponent',
  props: [
    'className',
    'type',
    'label',
    'clickHandler',
    'disabled',
  ],
  methods: {
    onClick(e) {
      e.preventDefault();
      this.clickHandler();
    }
  },
});
</script>
