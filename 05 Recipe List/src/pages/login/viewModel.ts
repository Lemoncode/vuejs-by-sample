import { FieldValidationResult } from 'lc-form-validation';

export interface LoginEntity {
  login: string;
  password: string;
}

export const createEmptyLoginEntity = (): LoginEntity => ({
  login: '',
  password: '',
});

export interface LoginError {
  login: FieldValidationResult;
  password: FieldValidationResult;
}

export const createEmptyLoginError = (): LoginError => ({
  login: {
    key: 'login',
    succeeded: true,
    errorMessage: '',
    type: '',
  },
  password: {
    key: 'password',
    succeeded: true,
    errorMessage: '',
    type: '',
  },
});
