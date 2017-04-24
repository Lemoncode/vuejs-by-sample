import {RecipeEntity} from '../../model/recipe';
import {mockRecipes} from './mockData';

let recipes = mockRecipes;

const fetchRecipes = (): Promise<RecipeEntity[]> => {
  return Promise.resolve(recipes);
}

const fetchRecipeById = (id: number): Promise<RecipeEntity> => {
  const recipe = recipes.find((r) => r.id === id);
  return Promise.resolve(recipe);
}

const save = (recipe: RecipeEntity): Promise<string> => {
  const index = recipes.findIndex(r => r.id === recipe.id);

  return index >= 0 ?
    saveRecipeByIndex(index, recipe) :
    Promise.reject<string>('Something was wrong saving recipe :(');
}

const saveRecipeByIndex = (index, recipe) => {
  recipes = [
    ...recipes.slice(0, index),
    recipe,
    ...recipes.slice(index + 1),
  ];

  return Promise.resolve('Save recipe sucess');
}

export const recipeAPI = {
  fetchRecipes,
  fetchRecipeById,
  save,
}