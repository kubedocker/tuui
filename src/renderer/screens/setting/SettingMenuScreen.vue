<script setup lang="tsx">
// import { computed } from 'vue';
import { useChatbotStore } from '@/renderer/store/chatbot'

const chatbotStore = useChatbotStore()

// const items = computed(() => {
//   return Object.entries(chatbotStore.chatbots).map(([key, value]) => ({
//     title: value.name || key,
//     key: key,
//     value: value
//   }));
// });
</script>

<template>
  <v-list v-model:selected="chatbotStore.currentChatbotId" nav mandatory>
    <v-list-item
      v-for="(item, index) in chatbotStore.chatbots"
      :key="index"
      slim
      :value="index"
      link
      :ripple="false"
    >
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item-content>
      <template #append>
        <v-list-item-action>
          <v-icon-btn
            icon="mdi-delete"
            rounded="lg"
            size="small"
            @click="chatbotStore.removeChatbot(index)"
          >
          </v-icon-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
