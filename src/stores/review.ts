import API from "../api";
import {defineStore} from "pinia";
import {usePaginationStore} from "./pagination";
import {toast} from "vue3-toastify";
import {i18n} from "../plugins/i18n";
import {IFilter} from "../interfaces/filter";
import {ICreateReview, IReview} from "../interfaces/review";

export const useReviewStore = defineStore({
  id: 'review',
  state: () => ({
    reviews: [] as IReview[],
  }),
  actions: {
    create(review: ICreateReview) {
      API.post('/reviews', review)
        .then(() => {
          toast.success(i18n.global.t('create review success'));
        })
        .catch(() => {
          toast.error(i18n.global.t('an error occurred'));
        })
    },
    index(page: number, filters: IFilter[] = []) {
      const pagStore = usePaginationStore();

      let params = {
        page: page,
        items_per_page: 150,
      }

      if (Object.keys(filters).length > 0) {
        params = {
          ...params,
          filters
        }
      }

      API.get(`/reviews`, {params})
        .then((res) => {
          const reviews = res.data.data;
          this.$state.reviews = [];
          reviews.forEach((review) => {
            this.$state.reviews.push({
              id: review.id,
              book: {
                id: review.Book.id,
                title: review.Book.title,
              },
              comment: review.comment,
              rating: review.rating,
              user_id: review.CreatedBy.id,
            });
          })
          pagStore.$state.totalPages = res.data.pagination.total_pages;
          pagStore.$state.currentPage = res.data.pagination.page;
        })
        .catch(() => {
          toast.error(i18n.global.t('an error occurred'));
        });
    },
    update(review: IReview) {
      return new Promise((resolve, reject) => {
        API.put(`/reviews/${review.id}`, {
          rating: review.rating,
          comment: review.comment,
        })
          .then(() => {
            toast.success(i18n.global.t('review updated'));
            resolve();
          })
          .catch(() => {
            toast.error(i18n.global.t('an error occurred'));
            reject();
          });
      });
    },
    delete(id: number) {
      API.delete(`/reviews/${id}`)
        .then(() => {
          toast.success(i18n.global.t('review deleted'));
          this.$state.reviews = this.$state.reviews.filter((review) => review.id !== id);
        })
        .catch(() => {
          toast.error(i18n.global.t('an error occurred'));
        });
    }
  },
})
