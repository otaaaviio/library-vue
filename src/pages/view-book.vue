<template>
  <v-dialog v-model="deleteDialogOpen" max-width="500">
    <v-card :title="$t('logout')">
      <v-card-text>
        {{ $t('dialogConfirm') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :text="$t('confirm')"
          @click="deleteBook"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogOpen" max-width="500">
    <form-review :handle-confirm="handleReview"/>
  </v-dialog>
  <v-container>
    <manager-book :active="sheet" :handleSheet="handleSheet" :editing="true"/>
    <v-row class="d-flex justify-center align-start mt-5">
      <v-col cols="12" sm="8" md="6" lg="4" xl="3" class="border-thin rounded">
        <v-carousel
          show-arrows="hover"
          cycle
          hide-delimiter-background
          v-if="book.Images && book.Images.length > 0"
        >
          <v-carousel-item
            v-for="(item,i) in book.Images"
            :key="i"
            :src="item?.image_path"
            cover
          />
        </v-carousel>
      </v-col>
      <v-col class="pl-7 pr-7">
        <v-row class="d-flex align-center justify-md-space-between">
          <h1>{{ book.title }}</h1>
          <div :hidden="disableManagerBtn">
            <v-btn @click="handleSheet">{{ $t('edit') }}</v-btn>
            <v-btn class="ml-10" color="red" @click="handleDeleteDialog">{{ $t('delete') }}</v-btn>
          </div>
        </v-row>
        <v-row>
          {{ $t('by') }} {{ book.Author?.name }} ({{ $t('author') }}),
          {{ book.Publisher?.name }} ({{ $t('publisher') }})
          <template v-if="book.CreatedBy">
            , {{ $t('registered by') }} {{ book.CreatedBy.name }} ({{ $t('user') }})
          </template>
        </v-row>
        <v-row class="d-flex align-center">
          <h4 class="mr-1">
            ({{ book.review_count }})
          </h4>
          <v-rating
            v-model="book.avg_rating"
            readonly
            class="mr-5"
            active-color="amber-darken-1"
            color="amber-darken-1"
            size="30"
          />
          <v-btn
            density="compact"
            :disabled="disableNotLogged || alreadyReviewedByUser"
            @click="handleDialog"
          >{{ $t('review') }}
          </v-btn>
        </v-row>
        <v-row class="d-flex justify-start align-center mt-5">
          <v-col>
            <v-row>
              <h3>{{ $t('category') }}:</h3>
              <h3 class="font-weight-regular ml-1">{{ getCategoryTranslated(book.Category?.name) }}</h3>
            </v-row>
          </v-col>
          <v-col class="d-flex justify-end">
            {{ $t('published at') }}: {{ formatDate(book.published_at) }}
          </v-col>
        </v-row>
        <v-row class="mb-5 mt-5">
          <v-divider class="border-opacity-25"></v-divider>
        </v-row>
        <v-row class="d-flex justify-end flex-column">
          <h5 class="font-weight-regular elevation-3 rounded-lg pa-3">{{ book.description }}</h5>
          <v-btn class="mt-10" width="300" :disabled="disableNotLogged || alreadyExistInReadingList"
                 @click="addBookToReadingList(book.id)">
            <v-icon class="mr-2">mdi-book-plus</v-icon>
            {{ $t('addToReadList') }}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mt-10">
      <v-card flat class="elevation-5 rounded-lg z-index-2" width="1200">
        <v-card-title class="d-flex align-center pe-2">
          {{ $t('reviews') }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            density="compact"
            :label="$t('search')"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            class="rounded-lg"
            hide-details
            single-line
          />
        </v-card-title>
        <v-data-table
          :mobile="isMobile"
          :no-data-text="$t('no data')"
          :headers="headers"
          :items-per-page-text="$t('items per page')"
          :items="book.Reviews"
          :search="search"
        >
          <template v-slot:item.rating="{ item }">
            <v-rating
              v-model="item.rating"
              readonly
              active-color="amber-darken-1"
              color="amber-darken-1"
              density="compact"
            />
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {i18n} from "../plugins/i18n";
import {format} from 'date-fns';
import {useBookStore} from "../stores";
import {onMounted} from "vue";
import {useRoute} from 'vue-router';
import {mapState} from "pinia";
import {useAppStore} from "../stores";
import {useReadingListStore} from "../stores/reading-list";
import {useReviewStore} from "../stores/review";

export default {
  data() {
    return {
      sheet: false,
      search: '',
      dialogOpen: false,
      deleteDialogOpen: false,
      headers: [
        {title: '', value: 'CreatedBy.name', key: 'CreatedBy.name'},
        {title: '', value: 'comment', key: 'comment'},
        {title: '', value: 'rating', key: 'rating'},
      ],
    }
  },
  setup() {
    const bookStore = useBookStore();
    const route = useRoute();
    const readStore = useReadingListStore();

    const getReadingList = async () => {
      await readStore.index();
    }

    const getBook = async () => {
      await bookStore.show(route.params.id);
    };

    onMounted(async () => {
      await Promise.all([
        getBook(),
        getReadingList(),
      ]);
    });

    return {
      getBook,
    }
  },
  mounted() {
    this.headers[0].title = i18n.global.t('user');
    this.headers[1].title = i18n.global.t('comment');
    this.headers[2].title = i18n.global.t('rating');
  },
  computed: {
    ...mapState(useBookStore, ['book']),
    ...mapState(useReadingListStore, ['readingList']),
    ...mapState(useAppStore, ['user']),
    isMobile() {
      return this.$vuetify.display.mobile;
    },
    alreadyExistInReadingList() {
      return this.readingList.some((item) => item.Book.id === this.book.id);
    },
    alreadyReviewedByUser() {
      if (!this.book.Reviews)
        return false;

      return this.book.Reviews.some((item) => item.CreatedBy.id === this.user.id);
    },
    disableManagerBtn() {
      const appStore = useAppStore();
      return this.book.CreatedBy?.id !== appStore.user.id && !appStore.user.is_admin;
    },
    disableNotLogged() {
      const appStore = useAppStore();
      return appStore.user.id === -1;
    },
  },
  methods: {
    deleteBook() {
      const bookStore = useBookStore();
      bookStore.delete(this.book.id);
      this.$router.push('/books');
    },
    handleDeleteDialog() {
      this.deleteDialogOpen = !this.deleteDialogOpen;
    },
    async addBookToReadingList(book_id: number) {
      const readStore = useReadingListStore();
      await readStore.createOrDelete(book_id, 'create')
        .then(async () => await readStore.index());
    },
    handleSheet() {
      this.sheet = !this.sheet;
    },
    formatDate(date_string: string) {
      if (!date_string) return '';

      const date = new Date(date_string);
      return format(date, 'dd/MM/yyyy');
    },
    getCategoryTranslated(category) {
      return i18n.global.t(`${category?.toLowerCase()}`);
    },
    handleDialog() {
      this.dialogOpen = !this.dialogOpen;
    },
    async handleReview(data) {
      const reviewStore = useReviewStore();
      const review = {
        book_id: this.book.id,
        ...data
      }
      this.handleDialog();
      await reviewStore.create(review)
      await this.getBook()
    }
  }
}
</script>
