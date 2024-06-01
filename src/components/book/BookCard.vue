<template>
  <v-card
    :loading="isLoading"
    elevation="5"
    height="350"
    width="220"
  >
    <v-img height="220" :src="book.image_path"></v-img>
    <v-row class=" ml-1 d-flex justify-center flex-column">
      <v-card-title>{{ getNameRefactored(book.title) }}</v-card-title>
      <v-card-subtitle> {{ book.author }}</v-card-subtitle>
      <v-card-text class="pb-1"> {{ getCategoryTranslated(book.category) }}</v-card-text>
      <v-container class="rating">
        <star-rating
          :increment="0.5"
          :rating="book.avg_rating"
          read-only
          :star-size="19"
          :show-rating="false"
          class="pl-4 mr-1"/>
        ({{ book.review_count }})
      </v-container>
    </v-row>
    <v-row class="d-flex justify-end pr-4">
    </v-row>
  </v-card>
</template>

<script>
import StarRating from 'vue-star-rating'
import {i18n} from "../../plugins/i18n";

export default {
  components: {
    StarRating
  },
  props: {
    book: {
      type: Object,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    getCategoryTranslated(category) {
      return i18n.global.t(`${category.toLowerCase()}`);
    },
    getNameRefactored(name) {
      if (name.length > 15) {
        const words = name.split(' ');
        if (words.length === 1) return name.slice(0, 15) + '...';
        else if (words[0].length + words[1].length < 15) {
          return words[0] + ' ' + words[1];
        } else {
          return words[0] + ' ' + words[1].charAt(0) + '.';
        }
      }
      return name;
    }
  }
}
</script>

<style scoped>
.rating {
  margin: 0;
  padding: 0;
  display: flex;
}

</style>
