import {LoginEntity} from '../../model/login';

const loginRequest = (loginEntity: LoginEntity): Promise<boolean> => {
  const isValidLogin = loginEntity.login === 'admin' &&
    loginEntity.password === 'test';

  return isValidLogin ?
    Promise.resolve(isValidLogin) :
    Promise.reject('Not valid login');
}

export const loginAPI = {
  loginRequest,
}