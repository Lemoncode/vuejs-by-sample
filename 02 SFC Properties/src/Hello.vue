<template>
  <input
    :value="value"
    @input="onChange($event.target.value)"
  />
</template>

<script>
export default {
  name: 'hello',
  props: {
    value: String,
  },
  methods: {
    onChange: function(value) {
      this.$emit('input', value);
    },
  },
};
</script>