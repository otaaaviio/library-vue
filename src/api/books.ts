import API from "./index";

export default {
  namespaced: true,
  state: {
    books: [],
    page: 0,
    items_per_page: 12,
    totalPages: 0,
    currentPage: 1,
  },
  getters: {
    books: (state) => state.books,
    totalPages: (state) => state.totalPages,
    currentPage: (state) => state.currentPage,
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
  },
  actions: {
    index() {
      API.get(`/books`, {
        params: {
          page: this.currentPage,
          items_per_page: 12,
        }
      })
        .then((res) => {
          this.setBooks(res.data.data);
          this.setTotalPages(res.data.pagination.total_pages);
          this.setCurrentPage(res.data.pagination.current_page);
        })
        .catch((err) => {
          console.log(err)
        });
    },
  },
}
