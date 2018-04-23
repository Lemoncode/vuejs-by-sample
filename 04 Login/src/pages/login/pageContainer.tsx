import Vue, { VNode } from 'vue';
import { router } from '../../router';
import { loginRequest } from '../../rest-api/api/login';
import { LoginEntity, createEmptyLoginEntity } from './viewModel';
import { mapLoginEntityVmToModel } from './mappers';
import { LoginPage } from './page';

export const LoginPageContainer = Vue.extend({
  render(h): VNode {
    return (
      <LoginPage
        loginEntity={this.loginEntity}
        updateLogin={this.updateLogin}
        loginRequest={this.loginRequest}
      />
    );
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
          router.push('/recipe');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
