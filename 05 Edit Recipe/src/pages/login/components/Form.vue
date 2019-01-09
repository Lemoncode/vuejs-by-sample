<template>
  <form>
    <v-layout column justify-center>
      <v-text-field
        label="Name"
        :value="login.name"
        @input="(name) => updateLogin('name', name)"
        :rules="[() => loginError.name.succeeded || loginError.name.errorMessage]"
      />
      <v-text-field
        label="Password"
        type="password"
        :value="login.password"
        @input="(password) => updateLogin('password', password)"
        :rules="[() => loginError.password.succeeded || loginError.password.errorMessage]"
      />
      <v-btn type="submit" color="info" @click.prevent="loginRequest">Login</v-btn>
    </v-layout>
  </form>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { FormProps } from "../formProps";

export default Vue.extend({
  props: {
    login: {},
    loginError: {},
    updateLogin: {},
    loginRequest: {}
  } as FormProps
});
</script>
