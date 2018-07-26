<template>
  <div class="panel-body">
    <form role="form">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="e-mail"
          type="text"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="password"
          type="password"
        />
      </div>
      <button
        type="button"
        class="btn btn-lg btn-success btn-block"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FormComponent',
});
</script>

