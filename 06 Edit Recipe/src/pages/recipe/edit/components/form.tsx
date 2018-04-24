import Vue, { VNode, PropOptions } from 'vue';
import { Recipe, RecipeError } from '../viewModel';
import { Validation, Input, InputButton, Button, Textarea } from '../../../../common/components/form';
import { IngredientListComponent } from './ingredientList';

const styles = require('./form.css');

interface Props {
  recipe: PropOptions<Recipe>;
  recipeError: PropOptions<RecipeError>;
  updateRecipe: PropOptions<(field, value) => void>;
  addIngredient: PropOptions<(ingredient) => void>;
  removeIngredient: PropOptions<(ingredient) => void>;
  save: PropOptions<() => void>;
}

export const FormComponent = Vue.extend({
  props: {
    recipe: {},
    recipeError: {},
    updateRecipe: {},
    addIngredient: {},
    removeIngredient: {},
    save: {},
  } as Props,
  data: () => ({
    ingredient: '',
  }),
  methods: {
    updateIngredient(fieldName, value) {
      this.ingredient = value;
    },
  },
  render(h): VNode {
    return (
      <form class="container">
        <div class="row">
          <Validation
            hasError={!this.recipeError.name.succeeded}
            errorMessage={this.recipeError.name.errorMessage}
          >
            <Input
              type="text"
              label="Name"
              name="name"
              value={this.recipe.name}
              inputHandler={this.updateRecipe}
            />
          </Validation>
        </div>
        <div class="row">
          <InputButton
            type="text"
            label="Ingredients"
            name="ingredients"
            placeholder="Add ingredient"
            value={this.ingredient}
            inputHandler={this.updateIngredient}
            buttonText="Add"
            buttonClassName="btn btn-primary"
            buttonClickHandler={this.addIngredient}
          />
        </div>
        <div class="row">
          <Validation
            hasError={!this.recipeError.ingredients.succeeded}
            errorMessage={this.recipeError.ingredients.errorMessage}
          >
            <IngredientListComponent
              ingredients={this.recipe.ingredients}
              removeIngredient={this.removeIngredient}
            />
          </Validation>
        </div>
        <div class="row">
          <Textarea
            className={styles.description}
            label="Description"
            name="description"
            placeholder="Description..."
            rows="10"
            value={this.recipe.description}
            inputHandler={this.updateRecipe}
          />
        </div>
        <div class="row">
          <div class="form-group pull-right">
            <Button
              className="btn btn-lg btn-success"
              label="Save"
              clickHandler={this.save}
            />
          </div>
        </div>
      </form>
    );
  },
});
