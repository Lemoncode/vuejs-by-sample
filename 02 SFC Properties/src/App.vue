<template>
  <div>
    <h1>{{message}}</h1>
    <hello-component
      :message="message"
      :onChange="onChange"
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
    onChange: function(value) {
      this.message = value;
    },
  },
};
</script>