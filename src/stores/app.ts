import {defineStore} from 'pinia';
import {IUser} from "../interfaces/user";
import API from "../api";
import {toast} from "vue3-toastify";
import {i18n} from "../plugins/i18n";

export const useAppStore = defineStore('app', {
  state: () => ({
    user: localStorage.getItem('app') ?
      (JSON.parse(localStorage.getItem('app'))).user :
      localStorage.setItem('app', JSON.stringify({user: {id: -1, name: '', email: '', is_admin: false}})),
  }),
  actions: {
    setUser(new_user: IUser) {
      this.user = new_user
    },
    clearUser() {
      this.user = {
        id: -1,
        name: '',
        email: '',
        is_admin: false,
      }
    },
    updateUser(new_user: IUser) {
      API.put(`/users/${this.user.id}`, new_user)
        .then((res) => {
          this.setUser(res.data.user)
          toast.success(i18n.global.t('success editing user'));
        })
        .catch((err) => {
          if(err.response.data.message === 'Unique constraint failed on the fields: email')
            toast.error(i18n.global.t(i18n.global.t('email already exists')));
          else
            toast.error(i18n.global.t('error editing user'));
        });
    }
  },
  persist: {
    storage: localStorage,
    paths: ['user'],
  },
})
