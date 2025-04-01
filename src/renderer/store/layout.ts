import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layoutStore', {
  state: () => ({
    sidebar: false,
    apiKeyShow: false,
    screen: 0 // The selected screen is a list: 0,1,2,...
  })
})
