<template>
  <v-app>
    <v-main>
      <default-layout v-if="$route.name !== 'NotFound'">
        <router-view />
      </default-layout>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import DefaultLayout from './layouts/default.vue';

export default {
  components: {
    DefaultLayout
  }
}
</script>
