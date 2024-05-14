import { defineStore } from 'pinia'
import type { User } from '~/pages/login/index.vue'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      userInfo: {} as User,
    }
  },
  actions: {
    setUserInfo(userInfo: User) {
      this.userInfo = userInfo
      setToken(userInfo.token)
    },
  },
})
