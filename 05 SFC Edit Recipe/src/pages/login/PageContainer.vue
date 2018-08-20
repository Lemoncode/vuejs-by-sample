<template>
  <login-page
    :login-entity="loginEntity"
    :login-error="loginError"
    :update-login="updateLogin"
    :login-request="loginRequest"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { loginRequest } from '../../rest-api/api/login';
import { LoginEntity, createEmptyLoginEntity, LoginError, createEmptyLoginError } from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
import { validations } from './validations';
import LoginPage from './Page.vue';

export default Vue.extend({  
  name: 'LoginPageContainer',
  components: {
    LoginPage,
  },
  data() {
    return {
      loginEntity: createEmptyLoginEntity(),
      loginError: createEmptyLoginError(),
    };
  },
  methods: {
    updateLogin(field: string, value: string) {
      this.loginEntity = {
        ...this.loginEntity,
        [field]: value,
      };

      validations.validateField(this.loginEntity, field, value)
        .then(fieldValidationResult => {
          this.loginError = {
            ...this.loginError,
            [field]: fieldValidationResult,
          };
        })
        .catch(error => console.log(error));
    },
    loginRequest() {
      validations.validateForm(this.loginEntity)
        .then(formValidationResult => {
          if (formValidationResult.succeeded) {      
            const loginEntityModel = mapLoginEntityVmToModel(this.loginEntity);
            loginRequest(loginEntityModel)
              .then(() => {
                this.$router.push('/recipe');
              })
              .catch(error => console.log(error));
          } else {
            for (const obj in this.loginEntity) {
              this.updateLogin(obj, this.loginEntity[obj]);
            }
          }
        })
        .catch(error => console.log(error));
    },
  },
});
</script>