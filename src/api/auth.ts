import API from './index';
import {toast} from "vue3-toastify";
import {i18n} from "../plugins/i18n";
import {useAppStore} from "../stores/app";
import router from "../router";

const store = useAppStore();

interface IRegister {
  name: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

export default {
  namespaced: true,
  actions: {
    redirectLogout() {
      store.clearUser();
      router.push('/books').then(() => {
        toast.success(i18n.global.t('logoutSuccess'));
      });
    },
    login(user: ILogin) {
      API.post(`/sessions/login`, user)
        .then((res) => {
          store.setUser(res.data.user);
          router.push('/books').then(() => {
            toast.success(i18n.global.t('loginSuccess'));
          });
        })
        .catch((err) => {
          if (err.response?.status === 404) toast.error($t('userNotFound'))
          else if (err.response?.status === 401) toast.error($t('invalidPassword'))
          else toast.error(i18n.global.t('loginError'));
          console.log(err)
        });
    },
    logout() {
      API.get('/sessions/logout',)
        .then(() => {
          this.redirectLogout();
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
      return new Promise((resolve, _) => {
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
          });
      });
    },
  }
}
