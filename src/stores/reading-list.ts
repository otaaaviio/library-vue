import API from '../api';
import {toast} from "vue3-toastify";
import {i18n} from "../plugins/i18n";
import {defineStore} from "pinia";
import {IReadingList} from "../interfaces/reading-list";

export const useReadingListStore = defineStore({
  id: 'readingList',
  state: () => ({
    readingList: [] as IReadingList[],
  }),
  actions: {
    index() {
        API.get('userBooks')
          .then((res) => {
            this.$state.readingList = res.data;
          })
          .catch(() => {
            toast.error(i18n.global.t('an error occurred'));
          });
    },
    createOrDelete(book_id: number, action: string) {
      return new Promise((resolve, reject) => {
        API.post(`/userBooks`, {
          action,
          book_id
        })
          .then(() => {
            toast.success(action === 'create' ? i18n.global.t('add to list success') : i18n.global.t('remove from list success'));
            resolve();
          })
          .catch(() => {
            toast.error(i18n.global.t('an error occurred'));
            reject();
          });
      })
    },
    update(book_id: number, is_read: boolean) {
      return new Promise((resolve, reject) => {
        API.post(`/userBooks`, {
          action: 'update',
          book_id,
          is_read
        })
          .then(() => {
            toast.success(i18n.global.t('update success'));
            resolve();
          })
          .catch(() => {
            toast.error(i18n.global.t('an error occurred'));
            reject();
          });
      })
    }
  }
});
