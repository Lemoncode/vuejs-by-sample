<template>
  <login-page-container 
    loginEntity={this.loginEntity}
    updateLogin={this.updateLogin}
    loginRequest={this.loginRequest}
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { loginRequest } from '../../rest-api/api/login';
import { LoginEntity, createEmptyLoginEntity } from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
import LoginPage from './Page.vue';

export default Vue.extend({
  name: 'LoginPageContainer',
  components: {
    LoginPage,
  },
  data() {
    return {
      loginEntity: createEmptyLoginEntity(),
    };
  },
  methods: {
    updateLogin(login: string, password: string) {
      this.loginEntity = {
        login,
        password,
      };
    },
    loginRequest() {
      const loginEntityModel = mapLoginEntityVmToModel(this.loginEntity);
      loginRequest(loginEntityModel)
        .then(() => this.$router.push('/recipe'))
        .catch((error) => console.log(error));
    },
  },
});
</script>

<style>
</style>