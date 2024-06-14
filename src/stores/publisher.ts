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
  actions: {
    index() {
      API.get(`/publishers`)
        .then((res) => {
          this.publishers = res.data.map((p) => ({value: p.id, title: p.name}));
        })
        .catch(() => {
          toast.error(i18n.global.t('an error occurred'));
        });
    },
    create(name: string) {
      API.post(`/publishers`, {name})
        .then(() => {
          toast.success(i18n.global.t('create publisher success'));
        })
        .catch(() => {
          toast.error(i18n.global.t('error creating publisher'));
        });
    }
  },
})
