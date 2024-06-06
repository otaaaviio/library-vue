import API from "../api";
import {defineStore} from "pinia";
import {usePaginationStore} from "./pagination";
import {IBook} from "../interfaces/book";

const pagStore = usePaginationStore();

export const useBookStore = defineStore({
  id: 'book',
  state: () => ({
    books: [] as IBook[],
  }),
  getters: {
    getBooks: (state) => state.books,
  },
  actions: {
    index(page) {
      API.get(`/books`, {
        params: {
          page: page,
          items_per_page: 12,
        }
      })
        .then((res) => {
          this.$state.books = res.data.data;
          pagStore.$state.totalPages = res.data.pagination.total_pages;
          pagStore.$state.currentPage = res.data.pagination.page;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    show(id) {
      API.get(`/books/${id}`)
        .then((res) => {
        })
        .catch((err) => {
        });
    }
  },
})
