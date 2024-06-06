<template>
  <v-container class="d-flex justify-center align-center">
    <v-card class="z-index-2 d-flex flex-column" width="800">
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
        <template v-slot:item.is_read="{ item }">
          <v-btn
            @click="markAsRead(item)"
            :disabled="item.disabled"
            elevation="0"
          >
            <v-icon
              :icon="item.is_read ? 'mdi-check' : 'mdi-close'"
              :color="item.is_read ? 'green' : 'red'"
            />
          </v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon="mdi-delete-outline" elevation="0"/>
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
        {title: '', value: 'is_read', key: 'is_read'},
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
    this.headers[1].title = this.$t('is read');

    for (let i = 0; i < 1000; i++) {
      this.data.push({
        book: {
          title: "Don Quixote" + i,
          id: i,
        },
        is_read: Math.floor(Math.random() * 2) === 1,
        disabled: false
      })
    }
  },
  methods: {
    markAsRead(item) {
      item.is_read = !item.is_read;
      item.disabled = true;
      setTimeout(() => {
        item.disabled = false;
      }, 2000);
    },
  },
}
</script>
