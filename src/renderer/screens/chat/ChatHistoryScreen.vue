<script setup lang="tsx">
import { useHistoryStore } from '@/renderer/store/history'
const historyStore = useHistoryStore()

function parseContent(content) {
  if (typeof content === 'string') {
    return content;
  } else if (Array.isArray(content)) {
    for (const item of content) {
      if (item.type === 'text') {
        return item.text
      }
    }
    return 'NA';
  } else {
    return content;
  }
}

</script>
<template>
  <v-list nav>
    <v-list-item v-for="(item, index) in historyStore.conversation" :key="item.id" :ripple="false" two-line
      :value="item.id" link @click="historyStore.select(index)">
      <v-list-item-content>
        <v-list-item-title>{{ parseContent(item.messages[0]?.content) }}</v-list-item-title>
        <v-list-item-subtitle>{{ parseContent(item.messages.at(-1)?.content) }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
