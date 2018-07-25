<template>
  <div>
    <h1>{{message}}</h1>
    <hello-component
      v-model="message"
    />
  </div>
</template>

<script>
import HelloComponent from './Hello.vue';

export default {
  name: 'app',
  components: {
    HelloComponent,
  },
  data() {
    return {
      message: 'Hello from Vue.js',
    };
  },
};
</script>