import API from '../api';
import {toast} from "vue3-toastify";
import {i18n} from "../plugins/i18n";
import {useAppStore} from "./app";
import router from "../router";
import {defineStore} from "pinia";
import {ILogin, IRegister} from "../interfaces/auth";
import {useReviewStore} from "./review";

export const useAuthStore = defineStore({
  id: 'auth',
  actions: {
    redirectLogout() {
      const appStore = useAppStore();

      appStore.clearUser();
      router.push('/books').then(() => {
        toast.success(i18n.global.t('logoutSuccess'));
      });
    },
    login(user: ILogin) {
      const appStore = useAppStore();

      API.post(`/sessions/login`, user)
        .then((res) => {
          appStore.setUser(res.data.user);
          router.push('/books').then(() => {
            toast.success(i18n.global.t('loginSuccess'));
          });
        })
        .catch((err) => {
          if (err.response?.status === 404) toast.error(i18n.global.t('userNotFound'))
          else if (err.response?.status === 401) toast.error(i18n.global.t('invalidPassword'))
          else toast.error(i18n.global.t('loginError'));
        });
    },
    logout() {
      const reviewStore = useReviewStore();
      API.get('/sessions/logout',)
        .then(() => {
          this.redirectLogout();
          reviewStore.$state.reviews = [];
        })
        .catch((err) => {
          if (err.response?.status === 401)
            this.redirectLogout();
          else if (err.response?.status === 404)
            toast.error(i18n.global.t('userNotFound'))
          else
            toast.error(i18n.global.t('logoutError'));
        });
    },
    register(user: IRegister) {
      return new Promise((resolve, reject) => {
        API.post(`/users/register`, {
          name: user.name,
          email: user.email,
          password: user.password,
        })
          .then(() => {
            router.push('/login').then(() => {
              toast.success(i18n.global.t('registerSuccess'));
            });
            resolve();
          })
          .catch((err) => {
            if (err.response?.data.message === "Unique constraint failed on the fields: email")
              toast.error(i18n.global.t('userAlreadyExists'))
            else toast.error(i18n.global.t('registerError'));
            reject();
          });
      });
    },
  }
});
