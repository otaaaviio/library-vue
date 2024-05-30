<template>
  <v-container>
    <v-row >
      <v-col cols="auto" sm="6" md="4" lg="3" v-for="book in books" :key="book.id" class="d-flex">
        <book-card
          :loading="false"
          :book="book"
          class="position-relative book-card"
        />
      </v-col>
    </v-row>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      rounded
      class="pagination"
    />
  </v-container>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      totalPages: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  watch: {
    currentPage() {
      this.fetchBooks();
    },
  },
  methods: {
    async fetchBooks() {
      await axios.get(`http://localhost:4000/books`, {
        params: {
          page: this.currentPage,
          items_per_page: 20
        }
      })
        .then((res) => {
          this.books = res.data.data;
          this.totalPages = res.data.pagination.total_pages;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    async authors() {
      await axios.get(`http://localhost:4000/authors`, {
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

.pagination {
  position: relative;
  margin: 50px 0 50px 0;
  z-index: 2;
}

.flex-wrap {
  flex-wrap: wrap;
}
</style>
