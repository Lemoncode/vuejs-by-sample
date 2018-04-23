import Vue, { VNode } from 'vue';
import { HeaderComponent, FormComponent } from './components';

export const LoginPage = Vue.extend({
  render(h): VNode {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
              <HeaderComponent />
              <FormComponent />
            </div>
          </div>
        </div>
      </div>
    );
  },
});
