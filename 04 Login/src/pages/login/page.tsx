import Vue, { VNode, PropOptions } from 'vue';
import { LoginEntity } from './viewModel';
import { HeaderComponent, FormComponent } from './components';
import { FormProps } from './formProps';

export const LoginPage = Vue.extend({
  props: {
    loginEntity: {},
    updateLogin: {},
    loginRequest: {},
  } as FormProps,
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
