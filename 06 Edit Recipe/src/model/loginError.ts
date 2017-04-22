import {FieldValidationResult} from 'lc-form-validation';

export class LoginError {
  login: FieldValidationResult;
  password: FieldValidationResult;

  constructor() {
    this.login = new FieldValidationResult();
    this.login.succeeded = true;

    this.password = new FieldValidationResult();
    this.password.succeeded = true;
  }
}