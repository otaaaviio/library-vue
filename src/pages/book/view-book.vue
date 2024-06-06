<template>
  <v-container>
    <manager-book :active="sheet" :handleSheet="handleSheet"/>
    <v-row class="d-flex justify-center align-start mt-5">
      <v-col cols="12" sm="8" md="6" lg="4" xl="3" class="border-thin rounded">
        <v-carousel
          show-arrows="hover"
          cycle
          hide-delimiter-background
        >
          <v-carousel-item
            v-for="(item,i) in book.images"
            :key="i"
            :src="item"
            cover
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col class="pl-7 pr-7">
        <v-row class="d-flex align-center justify-md-space-between">
          <h1>{{ book.title }}</h1>
          <div>
            <v-btn @click="handleSheet">{{ $t('edit') }}</v-btn>
            <v-btn class="ml-10" color="red">{{ $t('delete') }}</v-btn>
          </div>
        </v-row>
        <v-row>
          {{ $t('by') }} {{ book.author }} ({{ $t('author') }}),
          {{ book.publisher }} ({{ $t('publisher') }})
          <template v-if="book.createdBy">
            , {{ $t('registered by') }} {{ book.createdBy.name }} ({{ $t('user') }})
          </template>
        </v-row>
        <v-row class="d-flex align-center">
          ({{ book.avgRating }})
          <v-rating
            v-model="book.avgRating"
            readonly
            active-color="amber-darken-1"
            color="amber-darken-1"
            size="26"
          />
          <v-btn
            density="compact"
          >{{ $t('review') }}
          </v-btn>
        </v-row>
        <v-row class="d-flex justify-start align-center mt-5">
          <v-col>
            <v-row>
              <h3>{{ $t('category') }}:</h3>
              <h3 class="font-weight-regular ml-1">{{ getCategoryTranslated(book.category) }}</h3>
            </v-row>
          </v-col>
          <v-col class="d-flex justify-end">
            {{ $t('published at') }}: {{ formatDate(book.published_at) }}
          </v-col>
        </v-row>
        <v-row class="mb-5 mt-5">
          <v-divider class="border-opacity-25"></v-divider>
        </v-row>
        <v-row class="d-flex justify-end">
          <h5 class="font-weight-regular elevation-3 rounded-lg pa-3">{{ book.description }}</h5>
          <v-btn class="mt-10">
            <v-icon class="mr-2">mdi-book-plus</v-icon>
            {{ $t('addToReadList') }}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mt-10">
      <v-card flat class="elevation-5 rounded-lg z-index-2">
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
          :headers="headers"
          :items-per-page-text="$t('items per page')"
          :items="book.reviews"
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
import {i18n} from "../../plugins/i18n";
import {format} from 'date-fns';
import {useBookStore} from "../../stores";
import {onMounted} from "vue";
import { useRoute } from 'vue-router';
import {mapState} from "pinia";

export default {
  data() {
    return {
      sheet: false,
      search: '',
      headers: [
        {title: '', value: 'createdBy.name', key: 'createdBy.name'},
        {title: '', value: 'comment', key: 'comment'},
        {title: '', value: 'rating', key: 'rating'},
      ],
    }
  },
  setup() {
    const bookStore = useBookStore();
    const route = useRoute();

    const getBook = async () => {
      await bookStore.show(route.params.id);
    };

    onMounted(getBook)
  },
  mounted() {
    this.headers[0].title = i18n.global.t('user');
    this.headers[1].title = i18n.global.t('comment');
    this.headers[2].title = i18n.global.t('rating');
  },
  computed: {
    ...mapState(useBookStore, ['book']),
    isMobile() {
      return this.$vuetify.display.mobile;
    },
  },
  methods: {
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
  }
}
</script>
