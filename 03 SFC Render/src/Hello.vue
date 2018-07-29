<template>
  <input
    :value="message"
    @input="(e) => inputHandler(e.target.value)"
  />
</template>

<script>
export default {
  name: 'Hello',
  props: {
    message: String,
    inputHandler: Function,
  },
};
</script>