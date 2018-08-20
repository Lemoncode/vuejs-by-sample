import { FieldValidationResult } from 'lc-form-validation';

interface LoginEntity {
  login: string;
  password: string;
};

const createEmptyLoginEntity = (): LoginEntity => ({
  login: '',
  password: '',
});

interface LoginError {
  login: FieldValidationResult;
  password: FieldValidationResult;
};

const createEmptyLoginError = (): LoginError => ({
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

export { LoginEntity, createEmptyLoginEntity, LoginError, createEmptyLoginError };
