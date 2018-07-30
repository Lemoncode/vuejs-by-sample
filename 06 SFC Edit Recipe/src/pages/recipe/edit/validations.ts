import { ValidationConstraints, createFormValidation, Validators } from 'lc-form-validation';

const constraints: ValidationConstraints = {
  fields: {
    name: [
      { validator: Validators.required }
    ],
  },
};

export const validations = createFormValidation(constraints);
