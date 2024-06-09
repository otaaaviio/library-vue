<template>
  <v-container>
    <new-book :active="sheet" :handleSheet="handleSheet"/>
    <v-container class="d-flex justify-end">
      <v-btn :disabled="!isLogged()" class="translateY" color="blue" @click="handleSheet">{{ $t('newBook') }}</v-btn>
    </v-container>
    <filters class="mb-5"></filters>
    <v-row class="d-flex align-center justify-center">
      <v-progress-linear color="primary" indeterminate :size="55" class="d-flex align-center justify-center"
                         :active="loadingBooks"/>
      <v-col cols="auto" sm="6" md="4" lg="2" v-for="book in books" :key="book.id" class="d-flex">
        <book-card
          :book="book"
          class="position-relative z-index-2 translateY cursor-pointer"
          @click="() => $router.push('/books/' + book.id)"
        />
      </v-col>
      <div v-if="!books.length">
        <h2>
          {{ $t('noBooks') }}
      </h2>
      </div>
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
import {ref, onMounted, watch} from 'vue';
import {useAppStore, useBookStore, usePaginationStore} from "../stores";
import NewBook from "../components/book/manager-book.vue";
import {mapState} from "pinia";

export default {
  components: {
    NewBook,
  },
  computed: {
    ...mapState(useBookStore, ['books', 'loadingBooks']),
  },
  setup() {
    const appStore = useAppStore();
    const bookStore = useBookStore();
    const pagStore = usePaginationStore();

    const sheet = ref(false);
    const currentPage = ref(pagStore.$state.currentPage);
    const totalPages = ref(pagStore.$state.totalPages);

    const fetchBooks = async () => {
      await bookStore.index(currentPage.value);
    };

    const handleSheet = () => {
      sheet.value = !sheet.value;
    };

    const isLogged = () => {
      return appStore.user?.id !== -1;
    };

    onMounted(fetchBooks);

    watchEffect(() => {
      if (bookStore.books.length > 0) {
        currentPage.value = pagStore.$state.currentPage;
        totalPages.value = pagStore.$state.totalPages;
      }
    });

    watch(currentPage, fetchBooks);

    return {
      sheet,
      currentPage,
      totalPages,
      handleSheet,
      isLogged,
    };
  },
}
</script>
