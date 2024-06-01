<template>
  <v-container>
    <v-container class="d-flex justify-end">
    <v-btn :disabled="!isLogged()" class="translateY">{{ $t('words.new') }} {{ $t('model.book') }}</v-btn>
    </v-container>
      <v-row>
      <v-col cols="auto" sm="6" md="4" lg="2" v-for="book in books" :key="book.id" class="d-flex">
        <book-card
          :loading="false"
          :book="book"
          class="position-relative book-card translateY cursor-pointer"
          @click="console.log('implementar')"
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
import {useAppStore} from "../stores/app";

const store = useAppStore();

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
    isLogged() {
      return store.user?.id !== -1;
    },
    async fetchBooks() {
      await axios.get(`http://localhost:4000/books`, {
        params: {
          page: this.currentPage,
          items_per_page: 12,
        }
      })
        .then((res) => {
          this.books = res.data.data;
          this.totalPages = res.data.pagination.total_pages;
        })
        .catch((err) => {
        });
    },
    async authors() {
      await axios.get(`http://localhost:4000/authors`, {
        page: 1,
        items_per_page: 15
      })
        .then((res) => {
        })
        .catch((err) => {
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
</style>
