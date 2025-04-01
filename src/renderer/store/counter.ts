// This is a template store
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  }),
  getters: {
    getCounter: (state): number => state.counter
  },
  actions: {
    counterIncrease(amount: number) {
      this.counter += amount
    }
  }
})
