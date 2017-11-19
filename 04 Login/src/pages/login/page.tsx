import Vue, { VNode, PropOptions } from 'vue';
import { LoginEntity, LoginError } from './viewModel';
import { HeaderComponent } from './header';
import { FormComponent } from './form';

export const LoginPage = Vue.extend({
  props: {
    loginEntity: {} as PropOptions<LoginEntity>,
    loginError: {} as PropOptions<LoginError>,
    updateLogin: {} as PropOptions<(field: string, value: string) => void>,
    loginRequest: {} as PropOptions<() => void>,
  },
  render(h): VNode {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
              <HeaderComponent />
              <FormComponent
                loginEntity={this.loginEntity}
                loginError={this.loginError}
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
