import API from "../api";
import {defineStore} from "pinia";
import {usePaginationStore} from "./pagination";
import {IBook, IBookCreate, IBookDetailed} from "../interfaces/book";
import {toast} from "vue3-toastify";
import {i18n} from "../plugins/i18n";
import {IFilter} from "../interfaces/filter";

export const useBookStore = defineStore({
  id: 'book',
  state: () => ({
    books: [] as IBook[],
    book: {} as IBookDetailed,
    loadingBooks: false,
  }),
  getters: {
    getBooks: (state) => state.books,
  },
  actions: {
    index(page?: number, filters: IFilter[] = []) {
      const pagStore = usePaginationStore();
      this.$state.loadingBooks = true;

      if (!page) {
        page = pagStore.$state.currentPage;
      }

      let params = {
        page: page,
        items_per_page: 12,
      }

      if (Object.keys(filters).length > 0) {
        params = {
          ...params,
          filters
        }
      }

      API.get(`/books`, {params})
        .then((res) => {
          this.$state.books = res.data.data;
          pagStore.$state.totalPages = res.data.pagination.total_pages;
          pagStore.$state.currentPage = res.data.pagination.page;
        })
        .catch(() => {
          toast.error(i18n.global.t('an error occurred'));
        }).finally(() => {
        this.$state.loadingBooks = false;
      });
    },
    show(id: number) {
      return new Promise((resolve, reject) => {
        API.get(`/books/${id}`)
          .then((res) => {
            this.$state.book = res.data;
          })
          .catch(() => {
            toast.error(i18n.global.t('error fetching book'));
          });
      })
    },
    create(book: IBookCreate) {
      return new Promise(async (resolve, reject) => {
        API.post(`/books`, book)
          .then((res) => {
            toast.success(i18n.global.t('create book success'));
            resolve(res);
          })
          .catch((err) => {
            toast.error(i18n.global.t('error creating book'));
            reject(err);
          });
      })
        .catch((err) => {
          toast.error(i18n.global.t('error processing images'));
          reject(err);
        });
    }
  },
})
