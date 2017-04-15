import Vue, {ComponentOptions} from 'vue';
import {HelloComponent} from './hello';

interface State extends Vue {
  message: string;
  inputHandler: (value: string) => void;
}

new Vue({
  el: '#root',
  render: function(h) {
    return (
      <div>
        <h1>{this.message}</h1>
        <HelloComponent
          message={this.message}
          inputHandler={this.inputHandler}
        />
      </div>
    );
  },
  data: {
    message: 'Hello from Vue.js'
  },
  methods: {
    inputHandler: function(value) {
      this.message = value;
    }
  }
} as ComponentOptions<State>);