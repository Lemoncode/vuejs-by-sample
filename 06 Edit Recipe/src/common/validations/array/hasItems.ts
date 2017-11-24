import { FieldValidationResult } from 'lc-form-validation';

export const hasItems = (message) => (value: any[]): FieldValidationResult => ({
  type: 'ARRAY_HAS_ITEMS',
  succeeded: value.length > 0,
  errorMessage: message,
});
