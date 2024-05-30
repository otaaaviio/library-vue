<template>
  <v-card
    :loading="false"
    elevation="5"
    height="300"
    width="300"
  >
    <v-card-title>{{ book.title }}</v-card-title>
    <v-img height="200">imagem</v-img>
    <v-row class="ml-1">
      <v-card-text><h3>Author:</h3> {{ book.Author.name }}</v-card-text>
      <v-card-text><h3>Category:</h3>{{ book.Category.name }}</v-card-text>
    </v-row>
    <v-row class="d-flex justify-end pr-4">
      <v-card-actions>
        <v-btn :href="`http://localhost:3000/books/${book.id}`">see more</v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import {IBook} from "../interfaces/Book";

export default {
  props: {
    book: {
      type: Object,
      default: null,
    }
  },
};
</script>

<style scoped lang="sass">

</style>
