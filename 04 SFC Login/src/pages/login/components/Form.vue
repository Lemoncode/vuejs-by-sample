<template>
  <div class="panel-body">
    <form role="form">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="e-mail"
          type="text"
          :value="loginEntity.login"
          @input="(e) => updateLogin(e.target.value, loginEntity.password)"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="password"
          type="password"
          :value="loginEntity.password"
          @input="(e) => updateLogin(loginEntity.login, e.target.value)"
        />
      </div>
      <button
        class="btn btn-lg btn-success btn-block"
        @click="(e) => {
            e.preventDefault();
            loginRequest();
          }"      
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
