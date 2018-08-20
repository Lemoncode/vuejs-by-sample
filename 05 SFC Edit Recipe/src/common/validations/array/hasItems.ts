import { FieldValidationResult } from 'lc-form-validation';

const hasItems = (message) => (value: any[]): FieldValidationResult => {
  const isValid = value.length > 0;
  return {
    type: 'ARRAY_HAS_ITEMS',
    succeeded: isValid,
    errorMessage: isValid ? '' : message,
  };
};

export { hasItems };
