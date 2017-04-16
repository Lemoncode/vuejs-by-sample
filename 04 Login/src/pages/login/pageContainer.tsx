import Vue, {ComponentOptions} from 'vue';
import {LoginPage} from './page';
import {LoginEntity} from '../../model/login';
import {loginAPI} from '../../api/login';
import {router} from '../../router';

interface State extends Vue{
  loginEntity: LoginEntity;
  updateLogin: (login: string, password: string) => void;
  loginRequest: () => void;
}

export const LoginPageContainer = Vue.extend({
  render: function(h) {
    return (
      <LoginPage
        loginEntity={this.loginEntity}
        updateLogin={this.updateLogin}
        loginRequest={this.loginRequest}
      />
    );
  },
  data: function() {
    return {
      loginEntity: {
        login: '',
        password: ''
      },
    }
  },
  methods: {
    updateLogin: function(login: string, password: string) {
      this.loginEntity = {
        login,
        password,
      };
    },
    loginRequest: function() {
      loginAPI.loginRequest(this.loginEntity)
        .then((isValid) => {
          router.push('/recipe');
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
} as ComponentOptions<State>);