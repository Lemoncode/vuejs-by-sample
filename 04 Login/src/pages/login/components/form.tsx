import Vue, { VNode } from 'vue';

export const FormComponent = Vue.extend({
  render(h): VNode {
    return (
      <div class="panel-body">
        <form role="form">
          <div class="form-group">
            <input
              class="form-control"
              placeholder="e-mail"
              type="text"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="password"
              type="password"
            />
          </div>
          <router-link
            to="/recipe"
            class="btn btn-lg btn-success btn-block"
          >
            Login
          </router-link>
        </form>
      </div>
    );
  },
});
