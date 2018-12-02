<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <header-component />
          <form-component
            :login-entity="loginEntity"
            :login-error="loginError"
            :update-login="updateLogin"
            :login-request="loginRequest"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { FormProps } from './formProps';
import { HeaderComponent, FormComponent } from './components';

export default Vue.extend({
  name: 'LoginPage',
  components: {
    HeaderComponent, FormComponent,
  },
  props: {
    loginEntity: {},
    loginError: {},
    updateLogin: {},
    loginRequest: {},
  } as FormProps,
});
</script>
