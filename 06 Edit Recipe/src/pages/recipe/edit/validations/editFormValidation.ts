import {
  ValidationConstraints, createFormValidation, Validators
} from 'lc-form-validation';
import {hasItems} from './arrayValidation';

const constraints: ValidationConstraints = {
  fields: {
    name: [
      { validator: Validators.required }
    ],
    ingredients: [
      { validator: hasItems('Should has one or more ingredients')}
    ]
  }
};

export const editFormValidation = createFormValidation(constraints);