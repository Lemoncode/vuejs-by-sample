<template>
  <button
    :class="className"
    :type="type"
    @click.prevent="clickHandler"
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
});
</script>