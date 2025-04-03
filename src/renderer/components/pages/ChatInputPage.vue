<script setup lang="tsx">
import { useMessageStore } from '@/renderer/store/message'
import { useChatbotStore } from '@/renderer/store/chatbot'
const messageStore = useMessageStore()
const chatbotStore = useChatbotStore()
</script>

<template>
  <v-row>
    <!-- counter -->
    <v-textarea
      v-model="messageStore.userMessage"
      dirty
      color="primary"
      type="text"
      variant="solo"
      clearable
      hide-details
      auto-grow
      rows="1"
      max-rows="10"
      @keydown="messageStore.handleKeydown"
    ></v-textarea>
  </v-row>
  <v-row>
    <v-select
      v-model="chatbotStore.selectedChatbotId"
      max-width="400px"
      class="pt-3 pb-0"
      :label="$t('chat.select')"
      hide-details
      density="compact"
      variant="outlined"
      :items="chatbotStore.chatbots.map((chatbot, index) => ({ ...chatbot, index }))"
      item-title="name"
      item-value="index"
    ></v-select>
    <v-spacer></v-spacer>
    <div class="pt-3">
      <v-btn
        v-if="messageStore.userMessage"
        size="small"
        color="primary"
        variant="elevated"
        icon="mdi-arrow-up"
        @click="messageStore.sendMessage"
      >
      </v-btn>
      <v-btn
        v-else-if="messageStore.generating"
        size="small"
        color="primary"
        variant="elevated"
        icon="mdi-stop"
        @click="messageStore.stop"
      ></v-btn>
      <v-speed-dial
        v-else-if="messageStore.conversation.length > 0"
        location="bottom center"
        transition="expand-transition"
      >
        <template #activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            size="small"
            icon="mdi-dots-horizontal"
            color="primary"
          ></v-btn>
        </template>
        <v-btn
          key="2"
          v-tooltip:start="$t('chat.reg')"
          size="small"
          color="primary"
          variant="elevated"
          icon="mdi-autorenew"
          @click="messageStore.resendMessage"
        >
        </v-btn>
        <v-btn
          key="1"
          v-tooltip:start="$t('chat.new')"
          color="primary"
          variant="elevated"
          icon="mdi-pencil-plus"
          @click="messageStore.init()"
        >
        </v-btn>
      </v-speed-dial>
      <v-btn v-else size="small" color="grey" variant="elevated" icon="mdi-account-edit"> </v-btn>
      <!-- <v-btn v-else size="small" :color="mcpStore.getServers ? 'primary': 'grey'" variant="elevated"
                            @click="mcpStore.getServers ? promptStore.promptDialog = true : false"
                            icon="mdi-account-edit">
                        </v-btn> -->
    </div>
  </v-row>
</template>
