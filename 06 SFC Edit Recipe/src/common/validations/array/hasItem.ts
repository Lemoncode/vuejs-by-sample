import { FieldValidationResult } from 'lc-form-validation';

const hasItems = (message) => (value: any[]): FieldValidationResult => ({
  type: 'ARRAY_HAS_ITEMS',
  succeeded: value.length > 0,
  errorMessage: message,
});

export { hasItems };