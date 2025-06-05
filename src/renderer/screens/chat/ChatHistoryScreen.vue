<script setup lang="tsx">
import { useHistoryStore } from '@/renderer/store/history'
const historyStore = useHistoryStore()

function parseContent(content) {
  if (typeof content === 'string') {
    return content
  } else if (Array.isArray(content)) {
    for (const item of content) {
      if (item.type === 'text') {
        return item.text
      }
    }
    return 'NA'
  } else {
    return content
  }
}
</script>
<template>
  <v-list v-model:selected="historyStore.selected" nav>
    <v-list-item
      v-for="(item, index) in historyStore.conversation"
      :key="item.id"
      :ripple="false"
      two-line
      :value="item.id"
      link
      :title="parseContent(item.messages[0]?.content)"
      :subtitle="parseContent(item.messages.at(-1)?.content)"
      @click="historyStore.select(index)"
    >
    </v-list-item>
  </v-list>
</template>
