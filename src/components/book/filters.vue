<template>
  <v-card class="align-center pa-5 rounded-lg">
    <v-row>
      <v-text-field
        :label="$t('book')"
        color="blue"
        variant="outlined"
        class="me-3"
        v-model="book_name"
      />
      <v-autocomplete
        clearable
        :label="$t('category')"
        :no-data-text="$t('no data')"
        color="blue"
        variant="outlined"
        class="me-3"
        :items="categories"
        v-model="category_id"
      />
      <v-autocomplete
        clearable
        :label="$t('author')"
        @update:search="author_name = $event"
        class="me-3"
        :no-data-text="$t('no data')"
        color="blue"
        variant="outlined"
        :items="authors"
        v-model="author_id"
      />
      <v-autocomplete
        clearable
        :label="$t('publisher')"
        @update:search="publisher_name = $event"
        :no-data-text="$t('no data')"
        color="blue"
        variant="outlined"
        :items="publishers"
        v-model="publisher_id"
      />
    </v-row>
    <v-row class="d-flex justify-end">
      <v-btn color="blue" @click="cleanFilters" class="mr-5">{{ $t('clean filters') }}</v-btn>
      <v-btn color="blue" @click="onSubmit">{{ $t('filter') }}</v-btn>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import {usePublisherStore} from "../../stores/publisher";
import {useAuthorStore} from "../../stores/author";
import {CategoryEnumHelper} from "../../enums/category";
import {mapState} from "pinia";
import {onMounted, watch} from "vue";
import {useBookStore, usePaginationStore} from "../../stores";
import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      categories: [],
    }
  },
  setup() {
    const pubStore = usePublisherStore();
    const authorStore = useAuthorStore();
    const bookStore = useBookStore();

    const author_name = ref('');
    const publisher_name = ref('');

    const book_name = ref('');
    const author_id = ref(null);
    const publisher_id = ref(null);
    const category_id = ref(null);

    const fetchPublishers = debounce(async () => {
      await pubStore.index(publisher_name.value);
    }, 300);

    const fetchAuthors = debounce(async () => {
      await authorStore.index(author_name.value);
    }, 300);

    const fetchBooks = debounce(async (filters) => {
      await bookStore.index(1, filters);
    }, 300);

    onMounted(() => {
      fetchPublishers();
      fetchAuthors();
    });

    watch(publisher_name, fetchPublishers);
    watch(author_name, fetchAuthors);

    return {
      author_name,
      publisher_name,
      book_name,
      author_id,
      publisher_id,
      category_id,
      fetchBooks,
    }
  },
  computed: {
    ...mapState(usePublisherStore, ['publishers']),
    ...mapState(useAuthorStore, ['authors']),
    categories() {
      return CategoryEnumHelper.getList();
    }
  },
  methods: {
    async onSubmit() {
      const fields = [
        { field: 'category_id', value: this.category_id },
        { field: 'publisher_id', value: this.publisher_id },
        { field: 'author_id', value: this.author_id },
        { field: 'title', value: this.book_name },
      ];

      const filters = fields.filter(({ value }) => value != null && value != '').map(({ field, value }) => ({ field, value }));

      await this.fetchBooks(filters);
    },
    async cleanFilters() {
      this.book_name = '';
      this.author_id = null;
      this.publisher_id = null;
      this.category_id = null;
      await this.fetchBooks(1, null);
    }
  }
}
</script>