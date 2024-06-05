<template>
  <v-container>
      <new-book :active="sheet" :handleSheet="handleSheet"/>
    <v-container class="d-flex justify-end">
      <v-btn :disabled="isLogged()" class="translateY" @click="handleSheet">{{ $t('newBook') }}</v-btn>
    </v-container>
    <v-row>
      <v-col cols="auto" sm="6" md="4" lg="2" v-for="book in books" :key="book.id" class="d-flex">
        <book-card
          :book="book"
          class="position-relative z-index-2 translateY cursor-pointer"
          @click="console.log('implementar')"
        />
      </v-col>
    </v-row>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      rounded
      class="pagination z-index-2"
    />
  </v-container>
</template>

<script lang="ts">
import axios from "axios";
import {useAppStore} from "../stores/app";
import NewBook from "../components/book/NewBook.vue";

const store = useAppStore();

export default {
  components: {
    NewBook,
  },
  data() {
    return {
      books: [],
      totalPages: 0,
      currentPage: 1,
      sheet: false,
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
    handleSheet() {
      this.sheet = !this.sheet;
    },
  },
}
</script>

<style scoped>

.pagination {
  position: relative;
  margin: 50px 0 50px 0;
}
</style>
