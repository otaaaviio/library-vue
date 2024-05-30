<template>
  <v-container>
    <v-row>
      <v-col cols="auto" sm="6" md="4" lg="3" v-for="i in 12" :key="i">
        <book-card
          :loading="false"
          class="position-relative book-card"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import axios from "axios";
import {toast} from "vue3-toastify";

export default {
  data() {
    return {
      books: [],
    };
  },
  methods: {
    async books() {
      await axios.get(`http://localhost:4000/books`, {
        page: 1,
        items_per_page: 15
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        });
    },
    async authors() {
      await axios.get(`http://localhost:4000/books`, {
        page: 1,
        items_per_page: 15
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        });
    },
  },
}
</script>


<style scoped>
.book-card {
  z-index: 2;
}
</style>
