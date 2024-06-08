import {defineStore} from "pinia";

export const usePaginationStore = defineStore({
  id: 'pagination',
  state: () => ({
    page: 1,
    items_per_page: 12,
    totalPages: 0,
    currentPage: 1,
  }),
  getters: {
    getPage: (state) => state.page,
    getItemsPerPage: (state) => state.items_per_page,
    getTotalPages: (state) => state.totalPages,
    getCurrentPage: (state) => state.currentPage,
  },
})
