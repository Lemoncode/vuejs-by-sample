import Vue from 'vue';
import {ValidationComponent} from '../../common/components/form/validation';
import {InputComponent} from '../../common/components/form/input';

export const FormComponent = Vue.extend({
  props: [
    'loginEntity',
    'loginError',
    'updateLogin',
    'loginRequest',
  ],
  render: function(h) {
    return (
      <div class="panel-body">
        <form role="form">
          <ValidationComponent
            hasError={!this.loginError.login.succeeded}
            errorMessage={this.loginError.login.errorMessage}
          >
            <InputComponent
              placeholder="e-mail"
              type="text"
              value={this.loginEntity.login}
              inputHandler={(e) => this.updateLogin('login', e.target.value)}
            />
          </ValidationComponent>
          <ValidationComponent
            hasError={!this.loginError.password.succeeded}
            errorMessage={this.loginError.password.errorMessage}
          >
            <InputComponent
              placeholder="password"
              type="password"
              value={this.loginEntity.password}
              inputHandler={(e) => this.updateLogin('password', e.target.value)}
            />
          </ValidationComponent>
          <button
            onClick={(e) => {
                e.preventDefault();
                this.loginRequest();
              }
            }
            class="btn btn-lg btn-success btn-block"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
});