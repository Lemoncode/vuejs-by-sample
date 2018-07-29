<template>
  <div>
    <h1>{{message}}</h1>
    <hello-component
      :message="message"
      :input-handler="inputHandler"
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
  methods: {
    inputHandler(value) {
      this.message = value;
    },
  },
};
</script>