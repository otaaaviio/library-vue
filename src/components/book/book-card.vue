<template>
  <v-card
    elevation="5"
    height="350"
    width="220"
  >
    <v-img height="220" :src="book.image_path"/>
    <v-row class=" ml-1 d-flex justify-center flex-column">
      <v-card-title>{{ getNameRefactored(book.title) }}</v-card-title>
      <v-card-subtitle>{{ book.author }}</v-card-subtitle>
      <v-card-text class="pb-1"> {{ getCategoryTranslated(book.category) }}</v-card-text>
      <v-container class="rating">
        <star-rating
          :increment="0.5"
          :rating="book.avg_rating"
          read-only
          :star-size="15"
          :show-rating="false"
          class="pl-4 mr-1"
        />
        <h5>({{ book.review_count }})</h5>
      </v-container>
    </v-row>
  </v-card>
</template>

<script>
import StarRating from 'vue-star-rating';
import {i18n} from "../../plugins/i18n";

export default {
  components: {
    StarRating
  },
  props: {
    book: {
      type: Object,
      default: [],
    },
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
