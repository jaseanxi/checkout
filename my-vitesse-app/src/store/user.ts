
import { acceptHMRUpdate, defineStore } from 'pinia'
import { reqPersonInformation } from '~/api'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      data: {}
    }
  },
  actions: {
    async getPersonInformation() {


      return await reqPersonInformation()
    }
  }
})





if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
