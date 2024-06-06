import {defineStore} from 'pinia';
import {IUser} from "../interfaces/user";

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
    }
  },
  persist: {
    storage: localStorage,
    paths: ['user'],
  },
})
