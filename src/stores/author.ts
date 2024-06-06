import API from "../api";
import {defineStore} from "pinia";
import {toast} from "vue3-toastify";
import {i18n} from "../plugins/i18n";
import {IAuthor} from "../interfaces/author";

export const useAuthorStore = defineStore({
  id: 'author',
  state: () => ({
    authors: [] as IAuthor[],
  }),
  actions: {
    index(name?: string) {
      const params = {
        page: 1,
        items_per_page: 50,
      };
      if (name) {
        params['filters'] = [{field: 'name', value: name}];
      }

      API.get(`/authors`, {params})
        .then((res) => {
          this.authors = res.data.data.map((a) => ({value: a.id, title: a.name}));
        })
        .catch(() => {
          toast.error(i18n.global.t('an error occurred'));
        });
    },
    create(name: string) {
      API.post(`/authors`, {name})
        .then((res) => {
          toast.success(i18n.global.t('create author success'));
        })
        .catch((err) => {
          toast.error(i18n.global.t('error creating author'));
        });
    }
  },
})
