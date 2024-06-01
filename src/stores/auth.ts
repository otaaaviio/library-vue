import { defineStore } from 'pinia';
import {useAppStore} from "./app";
import axios from "axios";
import {toast} from "vue3-toastify";
import {i18n} from "../plugins/i18n";

const appStore = useAppStore();

export const useAuthStore = defineStore('auth', {
  actions: {
    redirectLogout() {
      appStore.clearUser();
      this.$router.push('/home').then(() => {
        toast.success(i18n.global.t('logoutSuccess'));
      });
    },
    async register(user) {
      await axios.post(`http://localhost:4000/users/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      })
        .then((res) => {
          this.$router.push('/login').then(() => {
            toast.success(i18n.global.t('registerSuccess'));
          });
        })
        .catch((err) => {
          if (err.response?.data.message === "Unique constraint failed on the fields: email")
            toast.error(i18n.global.t('userAlreadyExists'))
          else toast.error(i18n.global.t('registerError'));
        });
    },
    async login(user) {
      await axios.post(`http://localhost:4000/sessions/login`, user)
        .then((res) => {
          store.setUser(res.data.user);
          this.$router.push('/books').then(() => {
            toast.success(i18n.global.t('loginSuccess'));
          });
        })
        .catch((err) => {
          if (err.response?.status === 404) toast.error($t('userNotFound'))
          else if (err.response?.status === 401) toast.error($t('invalidPassword'))
          else toast.error(i18n.global.t('loginError'));
        });
    },
    async logout() {
      axios.get('http://localhost:4000/sessions/logout')
        .then(() => {
          this.redirectLogout();
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            this.redirectLogout();
          } else if (err.response?.status === 404) toast.error(i18n.global.t('userNotFound'))
          else toast.error(i18n.global.t('logoutError'));
        });
    },
  },
});
