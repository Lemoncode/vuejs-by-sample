<template>
  <div class="panel-body">
    <form role="form">
      <validation-component
        :has-error="!loginError.login.succeeded"
        :error-message="loginError.login.errorMessage"
      >
        <input-component
          placeholder="e-mail"
          type="text"
          label="Login"
          name="login"
          :value="loginEntity.login"
          :input-handler="updateLogin"
        />
      </validation-component>
      <validation-component
        :has-error="!loginError.password.succeeded"
        :error-message="loginError.password.errorMessage"
      >
        <input-component
          placeholder="password"
          type="password"
          label="Password"
          name="password"
          :value="loginEntity.password"
          :input-handler="updateLogin"
        />
      </validation-component>
      <button-component
        class-name="btn btn-lg btn-success btn-block"
        label="Login"
        :click-handler="loginRequest"
        type="button"
      />
    </form>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { FormProps } from '../formProps';
import { ValidationComponent, InputComponent, ButtonComponent } from '../../../common/components/form';

export default Vue.extend({
  name: 'FormComponent',
  components: {
    ValidationComponent, InputComponent, ButtonComponent,
  },  
  props: {
    loginEntity: {},
    loginError: {},
    updateLogin: {},
    loginRequest: {},
  } as FormProps,
});
</script>
