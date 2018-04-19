import { LoginEntity } from '../../model';

export const loginRequest = (loginEntity: LoginEntity): Promise<boolean> => (
  isValidLogin(loginEntity) ?
    Promise.resolve(true) :
    Promise.reject('Not valid login')
);

const isValidLogin = (loginEntity: LoginEntity) => (
  loginEntity.login === 'admin' &&
  loginEntity.password === 'test'
);
