import {defineStore} from 'pinia'
import {IUser} from "../interfaces/user";

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      id: -1,
      name: '',
      email: '',
      is_admin: false,
    } as IUser,
    logout: () => {

    }
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
})
