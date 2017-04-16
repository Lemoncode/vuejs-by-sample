import {RecipeEntity} from '../../../../model/recipe';

const getFilteredRecipes = (recipes, searchText) => {
  const searchedIngredients = getSearchedIngredients(searchText);

  return recipes.filter((recipe: RecipeEntity) => {
    return searchText === '' ||
      matchIngredients(recipe.ingredients, searchedIngredients);
  });
};

const getSearchedIngredients = (searchText: string) => {
  return searchText.split(',');
};

const matchIngredients = (ingredients, searchedIngredients) => {
  return ingredients.some((ingredient) => {
    return matchSearchedIngredients(ingredient, searchedIngredients);
  })
};

const matchSearchedIngredients = (ingredient: string, searchedIngredients: string[]) => {
  return searchedIngredients.some((searchedIngredient) => {
    const searchedIngredientLowerCase = searchedIngredient.toLowerCase().trim();
    const ingredientLowerCase = ingredient.toLowerCase().trim();

    return searchedIngredientLowerCase !== '' &&
      ingredientLowerCase.indexOf(searchedIngredientLowerCase) >= 0;
  })
}

export const recipeBusiness = {
  getFilteredRecipes,
};