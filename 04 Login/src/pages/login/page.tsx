import Vue, { VNode, PropOptions } from 'vue';
import { LoginEntity } from './viewModel';
import { HeaderComponent, FormComponent } from './components';

export const LoginPage = Vue.extend({
  props: {
    loginEntity: {} as PropOptions<LoginEntity>,
    updateLogin: {} as PropOptions<(login: string, password: string) => void>,
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
                updateLogin={this.updateLogin}
                loginRequest={this.loginRequest}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
});
