import { McpScreen, ChatScreen, SettingScreen } from '@/renderer/screens'
import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: McpScreen,
      meta: {
        titleKey: 'title.main'
      }
    },
    {
      path: '/chat',
      components: ChatScreen,
      meta: {
        titleKey: 'title.chat'
      }
    },
    {
      path: '/setting',
      components: SettingScreen,
      meta: {
        titleKey: 'title.setting'
      }
    },
    {
      path: '/error',
      component: () => import('@/renderer/screens/ErrorScreen.vue'),
      meta: {
        titleKey: 'title.error'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
