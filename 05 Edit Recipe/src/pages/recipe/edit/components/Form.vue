<template>
  <form>
    <v-container>
      <v-layout row>
        <v-text-field
          label="Name"
          :value="recipe.name"
          @input="(name) => onUpdateRecipe('name', name)"
          :rules="[() => recipeError.name.succeeded || recipeError.name.errorMessage]"
        />
      </v-layout>
      <v-layout column>
        <v-text-field
          label="Ingredients"
          placeholder="Add ingredient"
          :value="ingredient"
          @input="onUpdateIngredient"
          append-icon="add"
          @click:append="() => onAddIngredient(ingredient)"
        />
        <ingredient-list-component
          :ingredients="recipe.ingredients"
          :on-remove-ingredient="onRemoveIngredient"
        />
      </v-layout>
      <v-alert
        :value="!recipeError.ingredients.succeeded"
        color="error"
        outline
      >{{recipeError.ingredients.errorMessage}}</v-alert>
      <v-layout row>
        <v-textarea
          placeholder="Description...."
          :value="recipe.description"
          @input="(value) => onUpdateRecipe('description', value)"
          rows="10"
          :no-resize="true"
        ></v-textarea>
      </v-layout>
      <v-layout row justify-end>
        <v-btn type="button" color="success" @click.prevent="onSave">Save</v-btn>
      </v-layout>
    </v-container>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { FormProps } from "../formProps";
import IngredientListComponent from "./IngredientList.vue";

export default Vue.extend({
  name: "FormComponent",
  components: { IngredientListComponent },
  props: {
    recipe: {},
    recipeError: {},
    onUpdateRecipe: {},
    onAddIngredient: {},
    onRemoveIngredient: {},
    onSave: {}
  } as FormProps,
  data: () => ({
    ingredient: ""
  }),
  methods: {
    onUpdateIngredient: function(value) {
      this.ingredient = value;
    }
  }
});
</script>
