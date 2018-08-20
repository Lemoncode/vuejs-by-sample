<template>
  <div :class="`form-group ${className}`">
    <label :for="name">
      {{ label }}
    </label>
    <div class="input-group">
      <input
        class="form-control"
        :placeholder="placeholder"
        :type="type"
        :value="value"
        :name="name"
        @input="onInput"
      />
      <div class="input-group-btn">
        <button
          type="button"
          :class="buttonClassName"
          @click.prevent="buttonClickHandler(value)"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'InputButtonComponent',
  props: [
    'className',
    'placeholder',
    'type',
    'value',
    'inputHandler',
    'label',
    'name',
    'buttonText',
    'buttonClickHandler',
    'buttonClassName',
  ],
  methods: {
    onInput(e) {
      this.inputHandler(e.target.name, e.target.value);
    },
  },
});
</script>
