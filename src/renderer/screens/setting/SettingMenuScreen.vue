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
  <v-chip-group
    v-model="chatbotStore.currentChatbotId"
    direction="vertical"
    selected-class="text-primary"
    mandatory
  >
    <v-chip
      v-for="(item, index) in chatbotStore.chatbots"
      :key="index"
      class="custom-chip ml-2"
      :value="index"
      filter
      filter-icon="mdi-lead-pencil"
      label
      closable
      close-icon="mdi-delete"
      @click="console.log(chatbotStore.currentChatbotId)"
      @click:close="chatbotStore.removeChatbot(index)"
    >
    <span class="text-truncate" style="max-width: 180px;">{{ item.name }}</span>
  </v-chip>
    <!-- draggable -->
  </v-chip-group>
</template>

<style scoped>
.custom-chip ::v-deep .v-chip__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.custom-chip ::v-deep .v-chip__close {
  order: 2;
  margin-left: auto;
}
</style>
