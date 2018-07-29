<template>
  <h1> Edit Recipe Page {{ id }}</h1>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: 'EditRecipePage',
  props: {
    id: String,
  },  
});
</script>
