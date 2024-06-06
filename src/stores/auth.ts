import { defineStore } from 'pinia';
import {useAppStore} from "./app";
import axios from "axios";
import {toast} from "vue3-toastify";
import {i18n} from "../plugins/i18n";

const appStore = useAppStore();

export const useAuthStore = defineStore('auth', {
  actions: {
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
  },
});
