import Vue, { VNode, PropOptions } from 'vue';
import { LoginEntity } from '../viewModel';

export const FormComponent = Vue.extend({
  props: {
    loginEntity: {} as PropOptions<LoginEntity>,
    updateLogin: {} as PropOptions<(login: string, password: string) => void>,
    loginRequest: {} as PropOptions<() => void>,
  },
  render(h): VNode {
    return (
      <div class="panel-body">
        <form role="form">
          <div class="form-group">
            <input
              class="form-control"
              placeholder="e-mail"
              type="text"
              value={this.loginEntity.login}
              onInput={(e) => this.updateLogin(e.target.value, this.loginEntity.password)}
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="password"
              type="password"
              value={this.loginEntity.password}
              onInput={(e) => this.updateLogin(this.loginEntity.login, e.target.value)}
            />
          </div>
          <button
            class="btn btn-lg btn-success btn-block"
            onClick={(e) => {
              e.preventDefault();
              this.loginRequest();
            }}
          >
            Login
          </button>
        </form>
      </div>
    );
  },
});
