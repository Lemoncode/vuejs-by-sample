<template>
  <login-page />
</template>

<script lang="ts">
import Vue from 'vue';
import { LoginPage } from './pages/login';

export default Vue.extend({
  name: 'App',
  components: {
    LoginPage,
  },
});
</script>
