<template>
  <div>
    <h1 class="well">{{ loginEntity.login }}</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { state } from './state';

export default Vue.extend({
  name: 'app',
  data: () => state,
});
</script>
