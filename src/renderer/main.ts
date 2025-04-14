import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStatePersistence } from 'pinia-plugin-state-persistence'

import App from '@/renderer/App.vue'
import router from '@/renderer/router'
import vuetify from '@/renderer/plugins/vuetify'
import i18n from '@/renderer/plugins/i18n'

// Add API key defined in contextBridge to window object type
declare global {
  interface Window {
    mainApi?: any
    mcpServers?: any
  }
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(createStatePersistence())

app.use(vuetify).use(i18n).use(router).use(pinia)

app.mount('#app')
