import { defineStore } from 'pinia';
import { IUser } from "../interfaces/user";
import createPersistedState from 'vuex-persistedstate';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      id: -1,
      name: '',
      email: '',
      is_admin: false,
    },
  }),
  actions: {
    setUser(new_user: IUser) {
      this.user = new_user
    },
    logout() {
      this.user = {
        id: -1,
        name: '',
        email: '',
        is_admin: false,
      };
    }
  },
  plugins: [createPersistedState()],
})
