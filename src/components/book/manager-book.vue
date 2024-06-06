<template>
  <form-submit
    :title="$t('create new publisher')"
    :on-submit="createPublisher"
    :open-dialog="publisherDialog"
    @formSubmitted="publisherDialog = false"
  />
  <form-submit
    :title="$t('create new author')"
    :on-submit="createAuthor"
    :open-dialog="authorDialog"
    @formSubmitted="authorDialog = false"
  />
  <v-bottom-sheet :model-value="active" width="900" @click:outside="handleSheet" fullscreen>
    <v-card
      class="text-center"
      height="100%"
    >
      <v-card-title class="mt-5 mb-15">{{ $t('registerNewBook') }}</v-card-title>
      <v-form ref="form" class="desktop-padding" @submit.prevent="onSubmit">
        <v-text-field
          :label="$t('title')"
          outlined
          dense
          variant="outlined"
          color="blue"
          v-model="book.title"
          :rules="[v => !!v || $t('title is required')]"
        />
        <v-textarea
          :label="$t('description')"
          outlined
          dense
          variant="outlined"
          color="blue"
          v-model="book.description"
        />
        <v-row>
          <v-col cols="5">
            <v-date-picker
              color="blue"
              border
              elevation="2"
              :header="$t('published at')"
              v-model="book.published_at"
            />
          </v-col>
          <v-col>
            <v-autocomplete
              clearable
              :label="$t('category')"
              color="blue"
              variant="outlined"
              :items="categories"
              v-model="book.category_id"
              :rules="[v => !!v || $t('category is required')]"
            />
            <v-autocomplete
              clearable
              :label="$t('author')"
              @update:search="author_name = $event"
              :no-data-text="$t('no data')"
              color="blue"
              variant="outlined"
              prepend-icon="mdi-plus"
              @click:prepend="authorDialog = !authorDialog"
              :items="authors"
              v-model="book.author_id"
              :rules="[v => !!v || $t('author is required')]"
            />
            <v-autocomplete
              clearable
              :label="$t('publisher')"
              @update:search="publisher_name = $event"
              :no-data-text="$t('no data')"
              color="blue"
              variant="outlined"
              prepend-icon="mdi-plus"
              @click:prepend="publisherDialog = !publisherDialog"
              :items="publishers"
              v-model="book.publisher_id"
              :rules="[v => !!v || $t('publisher is required')]"
            />
            <v-file-input
              :label="$t('file input')"
              variant="outlined"
              multiple
              v-model="book.images"
            />
          </v-col>
        </v-row>
        <v-row class="d-flex justify-end align-baseline mb-7 mr-7">
          <v-btn
            variant="text"
            @click="handleSheet"
          >
            {{ $t('cancel') }}
          </v-btn>
          <v-btn
            variant="text"
            type="submit"
            class="ml-10"
          >
            {{ $t('save') }}
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import {CategoryEnumHelper} from "../../enums/category";
import {usePublisherStore} from "../../stores/publisher";
import {onMounted, watch} from "vue";
import {mapState} from "pinia";
import debounce from 'lodash/debounce';
import {useAuthorStore} from "../../stores/author";
import {useBookStore} from "../../stores";
import {toast} from "vue3-toastify";
import {i18n} from "../../plugins/i18n";

export default {
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    handleSheet: {
      type: Function,
      default: () => {
      },
    },
    bookEdit: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      book: {
        title: '',
        publisher_id: null,
        author_id: null,
        category_id: null,
        description: '',
        published_at: null,
        images: [],
      },
      book_id: null,
      categories: [],
    }
  },
  computed: {
    ...mapState(usePublisherStore, ['publishers']),
    ...mapState(useAuthorStore, ['authors']),
  },
  setup() {
    const pubStore = usePublisherStore();
    const authorStore = useAuthorStore();

    const author_name = ref('');
    const authorDialog = ref(false);
    const publisher_name = ref('');
    const publisherDialog = ref(false);

    const fetchPublishers = debounce(async () => {
      await pubStore.index(publisher_name.value);
    }, 300);

    const fetchAuthors = debounce(async () => {
      await authorStore.index(author_name.value);
    }, 300);

    const createPublisher = async (new_publisher) => {
      await pubStore.create(new_publisher);
    }

    const createAuthor = async (new_author) => {
      await authorStore.create(new_author);
    }

    onMounted(() => {
      fetchPublishers();
      fetchAuthors();
    });

    watch(publisher_name, fetchPublishers);
    watch(author_name, fetchAuthors);

    return {
      publisher_name,
      author_name,
      publisherDialog,
      authorDialog,
      createPublisher,
      createAuthor
    }
  },
  created() {
    this.categories = CategoryEnumHelper.getList();

    if(!!this.bookEdit) {
      console.log('aqqq')
    }
  },
  methods: {
    async onSubmit() {
      const bookStore = useBookStore();
      const validator = await this.$refs.form.validate();

      if (validator.valid)
        return

      if (!this.book.published_at) {
        toast.error(i18n.global.t('published at is required'));
        return
      } else if (!this.book.images.length > 0) {
        toast.error(i18n.global.t('file input is required'));
        return
      }

      if (this.book_id)
        console.log('att aq')
      else
        await bookStore.create(this.book).then(() => {
          this.active = false;
        });
    },
    resetForm() {
      this.book = {
        title: '',
        publisher_id: null,
        author_id: null,
        category_id: null,
        description: '',
        published_at: null,
        images: [],
      };
    },
  },
  watch: {
    active(value) {
      if (!value)
        this.resetForm();
      this.publisher_name = '';
      this.author_name = '';
    },
  },
}
</script>
