<template>
  <v-dialog v-model="openDelDialog" max-width="500">
    <v-card>
      <v-card-title>
        {{ $t('delete review of book') + selectedReview?.book.title }}
      </v-card-title>
      <v-card-text>
        {{ $t('dialogConfirm') }}?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :text="$t('confirm')"
          @click="deleteReview(selectedReview?.id)"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="openEditDialog" max-width="500">
    <v-card>
      <v-card-title>
        {{ $t('edit review of book') + selectedReview?.book.title }}
      </v-card-title>
      <v-container class="pa-5">
        <h5 class="ml-1" style="color: gray;">
          {{ $t('rating') }}
        </h5>
        <v-rating
          v-if="selectedReview"
          v-model="selectedReview.rating"
          active-color="amber-darken-1"
          color="amber-darken-1"
          density="compact"
          class="mb-5"
        />
        <v-textarea
          v-if="selectedReview"
          :label="$t('comment')"
          variant="outlined"
          outlined
          v-model="selectedReview.comment"
          dense
          color="blue"
          :rules="[() => !!selectedReview.comment || $t('comment required')]"
        />
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :text="$t('save')"
          @click="updateReview(selectedReview)"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-container class="d-flex justify-center align-center">
    <v-card class="z-index-2 d-flex flex-column" width="1000">
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
        :items="reviews"
        :search="search"
        :no-data-text="$t('no data')"
        :items-per-page-text="$t('items per page')"
      >
        <template v-slot:item.title="{ item }">
          <a :href="`/books/${item.book.id}`" style="text-decoration:none;">{{ item.book.title }}</a>
        </template>
        <template v-slot:item.comment="{ item }">
          <h4 class="text-truncate" style="max-width: 300px;">{{ item.comment }}</h4>
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
          <v-btn icon="mdi-file-edit-outline" elevation="0" @click="openDialog(item, 'edit')"/>
          <v-btn icon="mdi-delete-outline" elevation="0" class="ml-4" @click="openDialog(item, 'delete')"/>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {mapState} from "pinia";
import {useReviewStore} from "../stores/review";
import {useAppStore} from "../stores";
import {onMounted} from "vue";
import {IReview} from "../interfaces/review";

export default {
  data() {
    return {
      search: '',
      selectedReview: null,
      openDelDialog: false,
      openEditDialog: false,
      headers: [
        {title: '', value: 'book.title', key: 'title'},
        {title: '', value: 'comment', key: 'comment'},
        {title: '', value: 'rating', key: 'rating'},
        {title: '', key: 'actions', sortable: false},
      ],
    }
  },
  setup() {
    const reviewStore = useReviewStore();
    const appStore = useAppStore();

    const filters = [{
      field: 'created_by',
      value: appStore.user?.id
    }]

    const fetchReviews = () => {
      reviewStore.index(1, filters);
    }

    onMounted(fetchReviews)
    return {
      fetchReviews,
    }
  },
  computed: {
    ...mapState(useReviewStore, ['reviews']),
    isMobile() {
      return this.$vuetify.display.mobile;
    },
  },
  mounted() {
    this.headers[0].title = this.$t('book');
    this.headers[1].title = this.$t('comment');
    this.headers[2].title = this.$t('rating');
  },
  methods: {
    openDialog(review, dialog) {
      this.selectedReview = {...review};
      if (dialog === 'edit')
        this.openEditDialog = true;
      else
        this.openDelDialog = true;
    },
    async updateReview(review: IReview) {
      this.openEditDialog = false;
      const reviewStore = useReviewStore();
      await reviewStore.update(review);
      await this.fetchReviews();
      this.selectedReview = null;
    },
    async deleteReview(id: number) {
      const reviewStore = useReviewStore();
      await reviewStore.delete(id);
      this.openDelDialog = false;
      this.selectedReview = null;
    }
  }
}
</script>
