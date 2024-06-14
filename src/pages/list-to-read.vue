<template>
  <v-dialog v-model="dialogOpen" max-width="500">
    <v-card :title="$t('remove of list')">
      <v-card-text>
        {{ $t('dialogConfirm') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :text="$t('confirm')"
          @click="deleteItem(currentItem.Book.id)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
        :no-data-text="$t('no data')"
        class="rounded-lg elevation-2"
        :headers="headers"
        :items="readingList"
        :search="search"
        :items-per-page-text="$t('items per page')"
      >
        <template v-slot:item.Book.title="{ item }">
          <a :href="`/books/${item.Book.id}`" style="text-decoration:none;">{{ item.Book.title }}</a>
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
          <v-btn icon="mdi-delete-outline" elevation="0" @click="openDialog(item)"/>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {useReadingListStore} from "../stores/reading-list";
import {onMounted} from "vue";
import {mapState} from "pinia";

export default {
  data() {
    return {
      search: '',
      currentItem: null,
      dialogOpen: false,
      headers: [
        {title: '', value: 'Book.title', key: 'Book.title'},
        {title: '', value: 'is_read', key: 'is_read'},
        {title: '', key: 'actions', sortable: false},
      ],
    }
  },
  setup() {
    const readStore = useReadingListStore();

    const fetchReadingList = async () => {
      await readStore.index();
    };

    onMounted(fetchReadingList);
  },
  computed: {
    ...mapState(useReadingListStore, ['readingList']),
    isMobile() {
      return this.$vuetify.display.mobile;
    },
  },
  mounted() {
    this.headers[0].title = this.$t('book');
    this.headers[1].title = this.$t('is read');
  },
  methods: {
    async markAsRead(item) {
      const readStore = useReadingListStore();
      await readStore.update(item.Book.id, !item.is_read)
        .then(() => {
          item.is_read = !item.is_read;
          item.disabled = true;
          setTimeout(() => {
            item.disabled = false;
          }, 2000);
        })
    },
    async deleteItem(book_id) {
      const readStore = useReadingListStore();
      this.dialogOpen = false;
      await readStore.createOrDelete(book_id, 'delete');
      await readStore.index();
    },
    openDialog(item) {
      this.currentItem = {...item};
      this.dialogOpen = true;
    },
  },
}
</script>
