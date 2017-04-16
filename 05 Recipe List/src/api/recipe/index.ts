import {RecipeEntity} from '../../model/recipe';
import {mockRecipes} from './mockData';

const fetchRecipes = (): Promise<RecipeEntity[]> => {
  return Promise.resolve(mockRecipes);
}

export const recipeAPI = {
  fetchRecipes,
}