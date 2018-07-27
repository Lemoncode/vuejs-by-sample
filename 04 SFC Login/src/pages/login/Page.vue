<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <header-component />
          <form-component
            :loginEntity=loginEntity
            :updateLogin=updateLogin
            :loginRequest=loginRequest
          />
        </div>
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { HeaderComponent, FormComponent } from './components';
import { FormProps } from './formProps';

export default Vue.extend({
  name: 'LoginPage',
  components: {
    HeaderComponent, FormComponent,
  },
  props: {
    loginEntity: {},
    updateLogin: {},
    loginRequest: {},
  } as FormProps,
});
</script>
