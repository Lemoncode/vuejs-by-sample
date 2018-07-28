<template>
  <login-page
    :login-entity="loginEntity"
    :update-login="updateLogin"
    :login-request="loginRequest"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { loginRequest } from '../../rest-api/api/login';
import { LoginEntity, createEmptyLoginEntity } from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
import LoginPage from './Page.vue';

// export default class PageContainer extends Vue.extend({
export default Vue.extend({  
  name: 'PageContainer',
  components: {
    LoginPage,
  },
  data: () => ({
    loginEntity: createEmptyLoginEntity(),
  }),
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
        .then(() => {
          this.$router.push('/recipe');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
