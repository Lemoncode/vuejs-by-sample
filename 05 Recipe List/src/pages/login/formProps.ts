import { PropOptions } from 'vue';
import { LoginEntity, LoginError } from './viewModel';

export interface FormProps {
  loginEntity: PropOptions<LoginEntity>,
  loginError: PropOptions<LoginError>,
  updateLogin: PropOptions<(login: string, password: string) => void>,
  loginRequest: PropOptions<() => void>,
}
