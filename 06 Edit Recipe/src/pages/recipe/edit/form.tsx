import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity} from '../../../model/recipe';
import {RecipeError} from '../../../model/recipeError';
import {
  ValidationComponent, InputComponent, InputButtonComponent,
  TextareaComponent
} from '../../../common/components/form';
import {IngredientListComponent} from './ingredientList';

const classNames: any = require('./formStyles');

interface FormComponentProperties extends Vue {
  recipe: RecipeEntity;
  recipeError: RecipeError;
  updateRecipe: (field, value) => void;
  addIngredient: (ingredient) => void;
  removeIngredient: (ingredient) => void;
  save: () => void;
  ingredient: string;
  addIngredientHandler: (event) => void;
}

export const FormComponent = Vue.extend({
  props: [
    'recipe',
    'recipeError',
    'updateRecipe',
    'addIngredient',
    'removeIngredient',
    'save',
  ],
  data: function() {
    return {
      ingredient: ''
    }
  },
  methods: {
    addIngredientHandler: function(e) {
      e.preventDefault();
      if(this.ingredient) {
        this.addIngredient(this.ingredient);
      }
    },
  },
  render: function(h) {
    return (
      <form class="container">
        <div class="row">
          <ValidationComponent
            hasError={!this.recipeError.name.succeeded}
            errorMessage={this.recipeError.name.errorMessage}
          >
            <InputComponent
              type="text"
              label="Name"
              name="name"
              value={this.recipe.name}
              inputHandler={(e) => { this.updateRecipe('name', e.target.value)}}
            />
          </ValidationComponent>
        </div>
        <div class="row">
          <InputButtonComponent
            label="Ingredients"
            type="text"
            placeholder="Add ingredient"
            value={this.ingredient}
            inputHandler={(e) => { this.ingredient = e.target.value}}
            buttonText="Add"
            buttonClassName="btn btn-primary"
            buttonClickHandler={this.addIngredientHandler}
          />
        </div>
        <div class="row">
          <ValidationComponent
            hasError={!this.recipeError.ingredients.succeeded}
            errorMessage={this.recipeError.ingredients.errorMessage}
          >
            <IngredientListComponent
              ingredients={this.recipe.ingredients}
              removeIngredient={this.removeIngredient}
            />
          </ValidationComponent>
        </div>
        <div class="row">
          <TextareaComponent
            className={classNames.description}
            label="Description"
            name="description"
            placeholder="Description..."
            rows="10"
            value={this.recipe.description}
            inputHandler={(e) => { this.updateRecipe('description', e.target.value)}}
          />
        </div>
        <div class="row">
          <div class="form-group pull-right">
            <button
              type="button"
              class="btn btn-lg btn-success"
              onClick={this.save}
              >
                Save
              </button>
          </div>
        </div>
      </form>
    );
  },
} as ComponentOptions<FormComponentProperties>);