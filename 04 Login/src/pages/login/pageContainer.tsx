import Vue, {ComponentOptions} from 'vue';
import {LoginPage} from './page';
import {LoginEntity} from '../../model/login';
import {loginAPI} from '../../api/login';
import {router} from '../../router';
import {LoginError} from '../../model/loginError';
import {loginFormValidation} from './validations/loginFormValidation';

interface State extends Vue{
  loginEntity: LoginEntity;
  loginError: LoginError;
  updateLogin: (login: string, password: string) => void;
  loginRequest: () => void;
}

export const LoginPageContainer = Vue.extend({
  render: function(h) {
    return (
      <LoginPage
        loginEntity={this.loginEntity}
        loginError={this.loginError}
        updateLogin={this.updateLogin}
        loginRequest={this.loginRequest}
      />
    );
  },
  data: function() {
    return {
      loginEntity: new LoginEntity(),
      loginError: new LoginError(),
    }
  },
  methods: {
    updateLogin: function(field: string, value: string) {
      this.loginEntity = {
        ...this.loginEntity,
        [field]: value,
      };

      loginFormValidation.validateField(this.loginEntity, field, value)
        .then((fieldValidationResult) => {
          this.loginError = {
            ...this.loginError,
            [field]: fieldValidationResult,
          };
        })
        .catch((error) => console.log(error));
    },
    loginRequest: function() {
      loginFormValidation.validateForm(this.loginEntity)
        .then((formValidationResult) => {
          if(formValidationResult.succeeded) {
            loginAPI.loginRequest(this.loginEntity)
              .then((isValid) => {
                router.push('/recipe');
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => console.log(error));
    }
  }
} as ComponentOptions<State>);