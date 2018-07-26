<template>
  <input
    :value="message"
    @input="onChange($event.target.value)"
  />
</template>

<script>
export default {
  name: 'hello',
  props: {
    message: String,
    onChange: Function,
  },
};
</script>