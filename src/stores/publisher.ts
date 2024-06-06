import API from "../api";
import {defineStore} from "pinia";
import {toast} from "vue3-toastify";
import {i18n} from "../plugins/i18n";
import {IPublisher} from "../interfaces/publisher";

export const usePublisherStore = defineStore({
  id: 'publisher',
  state: () => ({
    publishers: [] as IPublisher[],
  }),
  getters: {
    getPublishers() {
      return this.publishers;
    },
  },
  actions: {
    index(name?: string) {
      const params = {
        page: 1,
        items_per_page: 50,
      };
      if (name) {
        params['filters'] = [{field: 'name', value: name}];
      }

      API.get(`/publishers`, {params})
        .then((res) => {
          this.publishers = res.data.data.map((p) => ({value: p.id, title: p.name}));
        })
        .catch(() => {
          toast.error(i18n.global.t('an error occurred'));
        });
    },
    create(name: string) {
      API.post(`/publishers`, {name})
        .then((res) => {
          toast.success(i18n.global.t('create publisher success'));
        })
        .catch((err) => {
          toast.error(i18n.global.t('error creating publisher'));
        });
    }
  },
})
