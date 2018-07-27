<template>
  <div class="panel-body">
    <form role="form">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="e-mail"
          type="text"
          :value="loginEntity.login"
          @input="updateLogin(loginEntity.password)"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="password"
          type="password"
          :value="loginEntity.password"
          @input="updateLogin(loginEntity.login)"         
        />
      </div>
        <button
          class="btn btn-lg btn-success btn-block"
          @click="loginRequest"
        >
          Login
        </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { FormProps } from '../formProps';

export default Vue.extend({
  name: 'FormComponent',
  props: {
    loginEntity: {},
    updateLogin: {},
    loginRequest: {},
  } as FormProps,
});
</script>

