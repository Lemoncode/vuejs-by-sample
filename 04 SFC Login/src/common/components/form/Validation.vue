<template>
  <div :class="`${errorClassName} ${className}`">
    <slot />
    {{ errorMessage }}
    <div class="help-block">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ValidationComponent',
  props: [
    'hasError',
    'errorMessage',
    'className',
  ],  
  computed: {
    errorClassName(): string {
      return (
        this.hasError ?
          'has-error' :
          ''
      )
    },
  },
});
</script>
