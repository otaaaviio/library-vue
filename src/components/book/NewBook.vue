<template>
  <v-bottom-sheet :model-value="active"  width="900" @click:outside="handleSheet" fullscreen>
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
            <v-select
              :label="$t('category')"
              color="blue"
              variant="outlined"
              :items="categories"
            />
            <v-select
              :label="$t('author')"
              color="blue"
              variant="outlined"
              prepend-icon="mdi-plus"
            />
            <v-select
              :label="$t('publisher')"
              color="blue"
              variant="outlined"
              prepend-icon="mdi-plus"
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
import {CategoryEnumHelper} from "@/enums/CategoryEnum";

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
  },
  data() {
    return {
      book: {
        title: '',
        description: '',
        author_id: 0,
        publisher_id: 0,
        category_id: 0,
        published_at: null,
        images: [],
      },
      publishers: [],
      authors: [],
      categories: [],
    }
  },
  created() {
    this.categories = CategoryEnumHelper.getList();
  },
  methods: {
    fetchCategories() {
      this.categories = CategoryEnumHelper.getList();
    },
    onSubmit() {
      console.log(this.book)
    },
  }
}
</script>
