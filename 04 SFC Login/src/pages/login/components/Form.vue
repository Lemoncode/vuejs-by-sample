<template>
  <div class="panel-body">
    <form role="form">
      <validation-component
        :hasError="!loginError.login.succeeded"
        :errorMessage="loginError.login.errorMessage"
      >
        <input-component
          placeholder="e-mail"
          type="text"
          label="Login"
          name="login"
          :value="loginEntity.login"
          :inputHandler="updateLogin"
        />
      </validation-component>
      <validation-component
        :hasError="!loginError.password.succeeded"
        :errorMessage="loginError.password.errorMessage"
      >
        <input-component
          placeholder="password"
          type="password"
          label="Password"
          name="password"
          :value="loginEntity.password"
          :inputHandler="updateLogin"
        />
      </validation-component>      
      <button-component
        className="btn btn-lg btn-success btn-block"
        label="Login"
        :clickHandler="loginRequest"
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
