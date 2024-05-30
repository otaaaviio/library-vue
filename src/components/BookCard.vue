<template>
  <v-card
    :loading="false"
    elevation="5"
    height="300"
    width="300"
  >
    <v-card-title>title</v-card-title>
    <v-img>imagem</v-img>
    <v-row>
      <v-card-text>author</v-card-text>
      <v-card-text>category</v-card-text>
    </v-row>
    <v-card-actions>
      <v-btn>Click me</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {IBook} from "../interfaces/Book";

export default {
  props: {
    book: {
      type: Object,
      default: {
        id: 'number',
        title: 'string',
        publisher: 'string',
        author: 'string',
        category: 'string',
        image_url: 'string',
      },
    }
  },
};
</script>

<style scoped lang="sass">

</style>
