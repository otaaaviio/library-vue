<template>
  <v-container class="d-flex justify-center align-center">
    <v-card class="z-index-2 d-flex flex-column" width="800" >
      <v-card-title class="d-flex align-center">
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
        class="rounded-lg elevation-2"
        :headers="headers"
        :items="data"
        :search="search"
        :items-per-page-text="$t('items per page')"
      >
        <template v-slot:item.title="{ item }">
          <a :href="`/books/${item.book.id}`" style="text-decoration:none;">{{ item.book.title }}</a>
        </template>
        <template v-slot:item.rating="{ item }">
          <v-rating
            v-model="item.rating"
            readonly
            active-color="amber-darken-1"
            color="amber-darken-1"
            density="compact"
          />
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon="mdi-file-edit-outline"/>
          <v-btn icon="mdi-delete-outline"/>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">

export default {
  data() {
    return {
      search: '',
      headers: [
        {title: '', value: 'book.title', key: 'title'},
        {title: '', value: 'comment', key: 'comment'},
        {title: '', value: 'rating', key: 'rating'},
        {title: '', key: 'actions', sortable: false},
      ],
      data: [],
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.display.mobile;
    },
  },
  mounted() {
    this.headers[0].title = this.$t('book');
    this.headers[1].title = this.$t('comment');
    this.headers[2].title = this.$t('rating');

    for(let i = 0; i < 1000; i++) {
      this.data.push({
        book: {
          title: "Don Quixote" + i,
          id: i,
        }, comment: "Miguel de Cervantes", rating: Math.floor(Math.random() * 5 + 1)
      },)
    }
  }
}
</script>
