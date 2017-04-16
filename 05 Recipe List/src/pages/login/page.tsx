import Vue from 'vue';
import {HeaderComponent} from './header';
import {FormComponent} from './form';

export const LoginPage = Vue.extend({
  props: [
    'loginEntity',
    'updateLogin',
    'loginRequest',
  ],
  render: function(h) {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
              <HeaderComponent />
              <FormComponent
                loginEntity={this.loginEntity}
                updateLogin={this.updateLogin}
                loginRequest={this.loginRequest}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
});