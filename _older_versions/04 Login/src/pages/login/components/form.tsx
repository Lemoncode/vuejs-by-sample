import Vue, { VNode, PropOptions } from 'vue';
import { FormProps } from '../formProps';
import { Validation, Input, Button } from '../../../common/components/form';

export const FormComponent = Vue.extend({
  props: {
    loginEntity: {},
    loginError: {},
    updateLogin: {},
    loginRequest: {},
  } as FormProps,
  render(h): VNode {
    return (
      <div class="panel-body">
        <form role="form">
          <Validation
            hasError={!this.loginError.login.succeeded}
            errorMessage={this.loginError.login.errorMessage}
          >
            <Input
              placeholder="e-mail"
              type="text"
              label="Login"
              name="login"
              value={this.loginEntity.login}
              inputHandler={this.updateLogin}
            />
          </Validation>
          <Validation
            hasError={!this.loginError.password.succeeded}
            errorMessage={this.loginError.password.errorMessage}
          >
            <Input
              placeholder="password"
              type="password"
              label="Password"
              name="password"
              value={this.loginEntity.password}
              inputHandler={this.updateLogin}
            />
          </Validation>
          <Button
            className="btn btn-lg btn-success btn-block"
            label="Login"
            clickHandler={this.loginRequest}
          />
        </form>
      </div>
    );
  },
});
