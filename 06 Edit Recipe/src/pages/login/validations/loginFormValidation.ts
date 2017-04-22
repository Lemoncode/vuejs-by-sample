import {ValidationConstraints, createFormValidation, Validators} from 'lc-form-validation';

const loginFormValidationConstraints: ValidationConstraints = {
  fields: {
    login: [
      { validator: Validators.required }
    ],
    password: [
      { validator: Validators.required }
    ],
  }
};

export const loginFormValidation = createFormValidation(loginFormValidationConstraints);
