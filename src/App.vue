<template>
  <v-app>
    <nav-bar v-if="!$route.meta.hideNavbar"></nav-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import NavBar from './components/NavBar.vue';

  export default defineComponent({
    components: {
      NavBar,
    },
    setup() {
      //
    },
  });
</script>