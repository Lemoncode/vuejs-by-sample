import { ValidationConstraints, createFormValidation, Validators } from 'lc-form-validation';
import { hasItems } from '../../../common/validations/array';

const constraints: ValidationConstraints = {
  fields: {
    name: [
      { validator: Validators.required }
    ],
    ingredients: [
      { validator: hasItems('Should has one or more ingredients') },
    ],
  },
};

export const validations = createFormValidation(constraints);
