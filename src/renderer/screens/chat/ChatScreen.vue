<script setup lang="tsx">
import { useI18n } from 'vue-i18n'
import ChatPage from '@/renderer/components/pages/ChatPage.vue'
import { useMessageStore } from '@/renderer/store/message'
const messageStore = useMessageStore()

const { locale } = useI18n()
</script>

<template>
  <ChatPage
    :messages="messageStore.conversation"
    :language="locale"
    @request-delete="messageStore.deleteMessage"
  />
</template>
