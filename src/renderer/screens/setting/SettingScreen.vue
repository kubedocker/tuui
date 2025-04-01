<script setup lang="ts">
import SettingPage from '@/renderer/components/pages/SettingPage.vue'
import { useChatbotStore } from '@/renderer/store/chatbot'
import { ChatbotConfig } from '@/renderer/types'
import { computed } from 'vue'

const chatbotStore = useChatbotStore()

const currentConfig = computed(() => {
  return chatbotStore.getChatbotByIndex(chatbotStore.currentChatbotId)
})

const handleConfigUpdate = (patch: Partial<ChatbotConfig>) => {
  chatbotStore.updateChatbotConfig(chatbotStore.currentChatbotId, patch)
}
</script>

<template>
  <SettingPage v-if="currentConfig" :config="currentConfig" @update:config="handleConfigUpdate" />
</template>
