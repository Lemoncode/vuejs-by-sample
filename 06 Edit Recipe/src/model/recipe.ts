export class RecipeEntity {
  id: number;
  name: string;
  description: string;
  ingredients: string[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.ingredients = [];
  }
}