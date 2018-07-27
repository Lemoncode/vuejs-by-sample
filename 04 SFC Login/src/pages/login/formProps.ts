import { PropOptions } from 'vue';
import { LoginEntity } from './viewModel';

export interface FormProps {
  loginEntity: PropOptions<LoginEntity>,
  updateLogin: PropOptions<(login: string, password: string) => void>,
  loginRequest: PropOptions<() => void>,
};
