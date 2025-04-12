<script setup lang="tsx">
import { useMessageStore } from '@/renderer/store/message'
import { useChatbotStore } from '@/renderer/store/chatbot'
import { useAgentStore } from '@/renderer/store/agent'
const messageStore = useMessageStore()
const chatbotStore = useChatbotStore()
const agentStore = useAgentStore()
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
    <v-col cols="4" class="pt-4 pb-1 pl-0">
      <v-select
        v-model="chatbotStore.selectedChatbotId"
        :label="$t('chat.select-model')"
        hide-details
        density="compact"
        variant="outlined"
        :items="chatbotStore.chatbots.map((chatbot, index) => ({ ...chatbot, index }))"
        item-title="name"
        item-value="index"
      ></v-select>
    </v-col>
    <v-col cols="4" class="pt-4 pb-1 pl-0">
      <v-select
        v-model="agentStore.selected"
        :label="$t('chat.select-agent')"
        hide-details
        density="compact"
        variant="outlined"
        :items="agentStore.agents.map((agent, index) => ({ ...agent, index }))"
        item-title="name"
        item-value="index"
        clearable
      >
      </v-select>
    </v-col>
    <v-col cols="4" class="pt-4 pb-0">
      <!-- Adds a horizontal flex container (row direction) to override parent column layout, ensuring right alignment within v-col -->
      <div class="d-flex justify-end">
        <v-spacer></v-spacer>
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
    </v-col>
  </v-row>
</template>
