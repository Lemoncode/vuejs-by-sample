import Vue, { VNode } from 'vue';
import { router } from '../../router';
import { loginRequest } from '../../rest-api/api/login';
import {
  LoginEntity, createEmptyLoginEntity,
  LoginError, createEmptyLoginError,
} from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
import { validations } from './validations';
import { LoginPage } from './page';

export const LoginPageContainer = Vue.extend({
  render(h): VNode {
    return (
      <LoginPage
        loginEntity={this.loginEntity}
        loginError={this.loginError}
        updateLogin={this.updateLogin}
        loginRequest={this.loginRequest}
      />
    );
  },
  data: () => ({
    loginEntity: createEmptyLoginEntity(),
    loginError: createEmptyLoginError(),
  }),
  methods: {
    updateLogin(field: string, value: string) {
      this.loginEntity = {
        ...this.loginEntity,
        [field]: value,
      };

      validations.validateField(this.loginEntity, field, value)
        .then((fieldValidationResult) => {
          this.loginError = {
            ...this.loginError,
            [field]: fieldValidationResult,
          };
        })
        .catch((error) => console.log(error));
    },
    loginRequest() {
      validations.validateForm(this.loginEntity)
        .then((formValidationResult) => {
          if (formValidationResult.succeeded) {
            const loginEntityModel = mapLoginEntityVmToModel(this.loginEntity);
            loginRequest(loginEntityModel)
              .then(() => {
                router.push('/recipe');
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => console.log(error));
    },
  },
});
