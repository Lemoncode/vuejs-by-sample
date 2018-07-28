<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <header-component /> <!-- <HeaderComponent /> Its the same -->
          <form-component />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { HeaderComponent, FormComponent } from './components';

export default Vue.extend({
  name: 'PageComponent',
  components: {
    HeaderComponent, FormComponent,
  },
});
</script>
