import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore('localeStore', {
  state: () => ({
    list: [
      { title: 'English', value: 'en', name: 'united-states' },
      { title: '简体中文', value: 'zh', name: 'china' }
    ],
    fallback: { title: 'English', value: 'en', name: 'united-states' }
  }),
  getters: {},
  actions: {
    getLocale() {
      const { locale } = useI18n()
      return locale.value
    },
    change(lang) {
      const { locale } = useI18n()
      locale.value = lang
    },
    getIcon(name) {
      return `twemoji:flag-${name}`
    },
    getIcon2() {
      const value = this.getLocale()
      const item = this.list.find((lang) => lang.value === value) || this.fallback
      return `twemoji:flag-${item.name}`
    }
  }
})
