<script setup lang="tsx">
import { useHistoryStore } from '@/renderer/store/history'
const historyStore = useHistoryStore()
</script>
<template>
  <v-list nav>
    <v-list-item
      v-for="(item, index) in historyStore.conversation"
      :key="item.id"
      :ripple="false"
      two-line
      :value="item.id"
      link
      @click="historyStore.select(index)"
    >
      <v-list-item-content>
        <v-list-item-title>{{ item.messages[0]?.content }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.messages.at(-1)?.content }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
