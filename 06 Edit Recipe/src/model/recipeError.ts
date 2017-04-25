import {FieldValidationResult} from 'lc-form-validation';

export class RecipeError {
  name: FieldValidationResult;
  ingredients: FieldValidationResult;

  constructor() {
    this.name = new FieldValidationResult();
    this.name.succeeded = true;

    this.ingredients = new FieldValidationResult();
    this.ingredients.succeeded = true;
  }
}