<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <header-component /> <!-- <HeaderComponent /> Its the same -->
          <form-component
            :login-entity="loginEntity"
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
import { LoginEntity } from './viewModel';
import { HeaderComponent, FormComponent } from './components';

export default Vue.extend({
  name: 'LoginPage',
  components: {
    HeaderComponent, FormComponent,
  },
  props: {
    loginEntity: {} as PropOptions<LoginEntity>,
    updateLogin: {} as PropOptions<(login: string, password: string) => void>,
    loginRequest: {} as PropOptions<() => void>,
  },  
});
</script>
